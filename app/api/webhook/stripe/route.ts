// we need a webhook because payments are not synchronous

import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  console.log("🔹 Webhook Stripe reçu");
  const body = await req.text();
  console.log("🔹 Corps de la requête reçu :", body);
  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;
  console.log("🔹 Signature Stripe :", signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    console.log("🟢 Événement Stripe validé :", event.type);
  } catch (err) {
    console.error("❌ Erreur lors de la validation du webhook :", err);
    return new Response("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("🔹 Données de la session :", session);
  if (event.type === "checkout.session.completed") {
    const customerId = session.customer as string;
    const jobId = session.metadata?.jobId;
    console.log("🔹 Customer ID :", customerId);
    console.log("🔹 Job ID :", jobId);

    if (!jobId) {
      console.error("No job ID found in session metadata");
      return new Response("No job ID found in session metadata", {
        status: 400,
      });
    }

    // const user = await prisma.user.findUnique({
    //   where: {
    //     stripeCustomerId: customerId,
    //   },
    // });

    // if (!user) throw new Error("User not found...");

    const company = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
      select: {
        Company: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!company) {
      console.error("No company found for the user");
      return new Response("No company found for the user", { status: 400 });
    }

    // Update the job post status to PUBLISHED
    try {
      await prisma.jobPost.update({
        where: {
          id: jobId,
          companyId: company?.Company?.id as string, // Ensure the job belongs to the user
        },
        data: {
          status: "ACTIVE",
        },
      });
      console.log(
        "🟢 Mise à jour de l'annonce réussie pour le job ID :",
        jobId
      );
    } catch (err) {
      console.error("❌ Erreur lors de la mise à jour de l'annonce :", err);
      return new Response("Job update failed", { status: 500 });
    }
  }

  return new Response(null, { status: 200 });
}
