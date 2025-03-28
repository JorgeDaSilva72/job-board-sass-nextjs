import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

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
