import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";

// Route pour enregistrer les filtres
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { Company: true },
    });

    if (!user || user.userType !== "COMPANY" || !user.Company) {
      return NextResponse.json(
        { error: "Only recruiters can access this resource" },
        { status: 403 }
      );
    }

    const data = await request.json();

    // Valider les données
    if (!data.name) {
      return NextResponse.json(
        { error: "Filter name is required" },
        { status: 400 }
      );
    }

    // Créer le filtre
    const filter = await prisma.candidateFilter.create({
      data: {
        name: data.name,
        companyId: user.Company.id,
        skills: data.skills || [],
        languages: data.languages || [],
        experienceMin: data.experienceMin,
        experienceMax: data.experienceMax,
        availability: data.availability || [],
        jobTypes: data.jobTypes || [],
        location: data.location,
      },
    });

    return NextResponse.json(filter);
  } catch (error) {
    console.error("Error saving filter:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the filter" },
      { status: 500 }
    );
  }
}
