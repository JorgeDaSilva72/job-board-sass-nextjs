import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const candidateId = params.id;

    if (!candidateId) {
      return NextResponse.json(
        { error: "ID de candidat manquant" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    // Vérifier que l'utilisateur est une entreprise
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      include: { Company: true },
    });

    if (!user || user.userType !== "COMPANY" || !user.Company) {
      return NextResponse.json(
        { error: "Accès réservé aux employeurs" },
        { status: 403 }
      );
    }

    // Récupérer les informations du candidat
    const candidate = await prisma.jobSeeker.findUnique({
      where: { id: candidateId },
      include: {
        education: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { error: "Candidat non trouvé" },
        { status: 404 }
      );
    }

    // Récupérer les candidatures de ce candidat aux offres de l'entreprise
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobSeekerId: candidateId,
        jobPost: {
          companyId: user.Company.id,
        },
      },
      include: {
        jobPost: {
          select: {
            id: true,
            jobTitle: true,
            location: true,
            employmentType: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Enregistrer la vue du candidat si elle n'existe pas déjà
    await prisma.viewedCandidate.upsert({
      where: {
        companyId_jobSeekerId: {
          companyId: user.Company.id,
          jobSeekerId: candidateId,
        },
      },
      update: {
        viewedAt: new Date(),
      },
      create: {
        companyId: user.Company.id,
        jobSeekerId: candidateId,
      },
    });

    return NextResponse.json({
      candidate,
      applications,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails du candidat:",
      error
    );
    return NextResponse.json(
      {
        error:
          "Une erreur est survenue lors de la récupération des détails du candidat",
      },
      { status: 500 }
    );
  }
}
