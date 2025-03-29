import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est associé à une entreprise
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { Company: true },
    });

    if (!user?.Company?.id) {
      return NextResponse.json(
        { message: "Only recruiters can access this resource" },
        { status: 403 }
      );
    }

    // const companyId = user.Company.id;

    // Vérifier l'abonnement actif
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
        endDate: {
          gte: new Date(), // Seulement les abonnements non expirés
        },
      },
      select: {
        status: true,
        endDate: true,
        plan: {
          select: {
            name: true,
            features: true,
          },
        },
      },
      orderBy: {
        endDate: "desc", // Prendre le plus récent
      },
    });

    if (!activeSubscription) {
      return NextResponse.json({ status: "INACTIVE" }, { status: 200 });
    }

    return NextResponse.json({
      status: activeSubscription.status,
      endDate: activeSubscription.endDate,
      plan: activeSubscription.plan,
    });
  } catch (error) {
    console.error("[SUBSCRIPTION_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  try {
    // Verify user session
    const sessionUser = await auth();

    if (!sessionUser?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 }
      );
    }

    const userId = sessionUser.user.id;

    const { planId } = await req.json();
    if (!planId) {
      return NextResponse.json(
        { message: "Plan ID is required" },
        { status: 400 }
      );
    }

    // Récupérer le plan depuis la base de données
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      return new NextResponse("Plan not found", { status: 404 });
    }

    // Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Company: true },
    });

    if (!user || !user.Company) {
      return new NextResponse("User or company not found", { status: 404 });
    }

    // Vérifier si l'utilisateur a déjà un abonnement actif
    // const activeSubscription = await prisma.subscription.findFirst({
    //   where: {
    //     userId,
    //     status: "ACTIVE",
    //     endDate: { gt: new Date() },
    //   },
    // });

    // if (activeSubscription) {
    //   return new NextResponse("User already has an active subscription", {
    //     status: 400,
    //   });
    // }

    // Si l'utilisateur a déjà un abonnement actif, annuler l'ancien avant d'en créer un nouveau
    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: "ACTIVE",
        endDate: { gt: new Date() },
      },
    });

    if (activeSubscription) {
      // Option 1: Permettre le changement de plan
      // Mettre à jour le statut de l'abonnement existant
      await prisma.subscription.update({
        where: { id: activeSubscription.id },
        data: { status: "CANCELED" },
      });

      // Si vous utilisez Stripe, vous devriez également annuler l'abonnement côté Stripe
      if (activeSubscription.stripeSubscriptionId) {
        try {
          await stripe.subscriptions.update(
            activeSubscription.stripeSubscriptionId,
            {
              cancel_at_period_end: true,
            }
          );
        } catch (error) {
          console.error("Failed to cancel Stripe subscription:", error);
        }
      }
    }

    // Créer ou récupérer le client Stripe
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: { userId },
      });
      stripeCustomerId = customer.id;

      // Mettre à jour l'utilisateur avec l'ID Stripe
      await prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId },
      });
    }

    // Créer une session de checkout Stripe
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        // {
        //   // price: plan.stripePriceId, // Vous devriez stocker cet ID dans votre table Plan
        //   price: Number(plan.price) * 100, // Vous devriez stocker cet ID dans votre table Plan
        //   quantity: 1,
        // },
        {
          price_data: {
            product_data: {
              name: plan.name,
              description: plan.description || "plan d'abonnement",
              images: ["https://job-board-sass-nextjs.vercel.app/logo.png"],
            },
            currency: "USD",
            unit_amount: Math.round(Number(plan.price) * 100),
            recurring: {
              interval: "month", // ou la période appropriée
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      // success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,

      // cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,

      metadata: {
        userId,
        planId,
        paymentType: "subscription",
      },
      subscription_data: {
        metadata: {
          userId,
          planId,
          paymentType: "subscription",
        },
      },
    });

    // Créer un enregistrement d'abonnement en statut PENDING
    await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: "PENDING",
        startDate: new Date(),
        endDate: new Date(
          new Date().setDate(new Date().getDate() + plan.duration)
        ),
        stripeSubscriptionId: session.subscription?.toString(),
      },
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[SUBSCRIPTION_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  } finally {
    //await prisma.$disconnect();
  }
}
