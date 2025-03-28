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

    const activeSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
        endDate: { gte: new Date() }, // Seulement les abonnements non expirés
      },
      include: { plan: { select: { name: true } } },
      orderBy: {
        endDate: "desc", // Prendre le plus récent
      },
    });

    if (!activeSubscription) {
      return NextResponse.json({
        active: false,
      });
    }

    return NextResponse.json({
      active: true,
      planName: activeSubscription?.plan.name,
      endDate: activeSubscription?.endDate.toISOString(),
    });
  } catch (error) {
    console.error("[SUBSCRIPTION_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
