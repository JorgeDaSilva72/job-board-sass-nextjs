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

    const companyId = user.Company.id;

    // Récupérer toutes les candidatures pour les offres de l'entreprise
    const totalJobs = await prisma.jobPost.count({ where: { companyId } });
    const totalApplications = await prisma.jobApplication.count({
      where: { jobPost: { companyId } },
    });
    const totalViews = 0; // Ajoute la logique pour récupérer les vues

    return NextResponse.json({ totalJobs, totalApplications, totalViews });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
