// import { auth } from "@/app/utils/auth";
// import { prisma } from "@/app/utils/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "You must be logged in" },
//         { status: 401 }
//       );
//     }

//     // Vérifier que l'utilisateur est associé à une entreprise
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: { Company: true },
//     });

//     if (!user?.Company?.id) {
//       return NextResponse.json(
//         { message: "Only recruiters can access this resource" },
//         { status: 403 }
//       );
//     }

//     const activeSubscription = await prisma.subscription.findFirst({
//       where: {
//         userId: session.user.id,
//         status: "ACTIVE",
//         endDate: { gte: new Date() }, // Seulement les abonnements non expirés
//       },
//       include: { plan: { select: { name: true } } },
//       orderBy: {
//         endDate: "desc", // Prendre le plus récent
//       },
//     });

//     if (!activeSubscription) {
//       return NextResponse.json({
//         active: false,
//       });
//     }

//     return NextResponse.json({
//       active: true,
//       planName: activeSubscription?.plan.name,
//       endDate: activeSubscription?.endDate.toISOString(),
//     });
//   } catch (error) {
//     console.error("[SUBSCRIPTION_ERROR]", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";
import { SubscriptionStatus } from "@prisma/client";

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

    // Utiliser le champ hasActiveSubscription pour une vérification rapide
    if (user.hasActiveSubscription) {
      // Récupérer les détails de l'abonnement actif
      const activeSubscription = await prisma.subscription.findFirst({
        where: {
          userId: session.user.id,
          status: {
            in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.EXPIRING_SOON],
          },
          endDate: { gte: new Date() },
        },
        include: {
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

      // Vérifier si l'abonnement expire bientôt (dans les 7 jours)
      const expiringStatus =
        activeSubscription?.status === SubscriptionStatus.EXPIRING_SOON;

      return NextResponse.json({
        active: true,
        planName: activeSubscription?.plan.name,
        endDate: activeSubscription?.endDate.toISOString(),
        features: activeSubscription?.plan.features,
        expiringStatus: expiringStatus ? "expiring_soon" : "active",
        autoRenew: activeSubscription?.autoRenew || false,
      });
    } else {
      // Vérifier si l'utilisateur a un abonnement expiré pour potentiellement
      // proposer un renouvellement
      const expiredSubscription = await prisma.subscription.findFirst({
        where: {
          userId: session.user.id,
          status: SubscriptionStatus.EXPIRED,
        },
        include: {
          plan: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          endDate: "desc", // Prendre le plus récent
        },
      });

      return NextResponse.json({
        active: false,
        lastPlan: expiredSubscription
          ? {
              id: expiredSubscription.plan.id,
              name: expiredSubscription.plan.name,
            }
          : null,
        expiredAt: expiredSubscription?.endDate.toISOString() || null,
      });
    }
  } catch (error) {
    console.error("[SUBSCRIPTION_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
