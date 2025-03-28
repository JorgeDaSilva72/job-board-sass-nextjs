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

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
        endDate: {
          gte: new Date(),
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
    });

    if (!subscription) {
      return NextResponse.json({ status: "INACTIVE" }, { status: 200 });
    }

    return NextResponse.json({
      status: subscription.status,
      endDate: subscription.endDate,
      plan: subscription.plan,
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
