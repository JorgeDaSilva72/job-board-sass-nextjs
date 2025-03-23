// candidatesController.ts
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// import prisma from '@/lib/prisma';
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in" },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est une entreprise
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

    // Récupérer les paramètres de filtrage depuis l'URL
    const searchParams = request.nextUrl.searchParams;
    const skills = searchParams.get("skills")?.split(",") || [];
    const languages = searchParams.get("languages")?.split(",") || [];
    const experienceMin = searchParams.get("experienceMin")
      ? parseInt(searchParams.get("experienceMin") as string)
      : undefined;
    const experienceMax = searchParams.get("experienceMax")
      ? parseInt(searchParams.get("experienceMax") as string)
      : undefined;
    const availability = searchParams.get("availability")?.split(",") || [];
    const jobTypes = searchParams.get("jobTypes")?.split(",") || [];
    const location = searchParams.get("location") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    // Construire la requête avec les filtres
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const whereClause: any = {};

    if (skills.length > 0) {
      whereClause.skills = { hasSome: skills };
    }

    if (languages.length > 0) {
      whereClause.languages = { hasSome: languages };
    }

    if (experienceMin !== undefined || experienceMax !== undefined) {
      whereClause.experience = {};
      if (experienceMin !== undefined)
        whereClause.experience.gte = experienceMin;
      if (experienceMax !== undefined)
        whereClause.experience.lte = experienceMax;
    }

    if (availability.length > 0) {
      whereClause.availability = { in: availability };
    }

    if (jobTypes.length > 0) {
      whereClause.preferredJobType = { hasSome: jobTypes };
    }

    if (location) {
      whereClause.OR = [
        { city: { contains: location, mode: "insensitive" } },
        { countryCode: { contains: location, mode: "insensitive" } },
      ];
    }

    // Récupérer le nombre total de candidats correspondant aux critères
    const totalCandidates = await prisma.jobSeeker.count({
      where: whereClause,
    });

    // Récupérer les candidats avec pagination
    const candidates = await prisma.jobSeeker.findMany({
      where: whereClause,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        experience: true,
        skills: true,
        languages: true,
        availability: true,
        preferredJobType: true,
        countryCode: true,
        city: true,
        // Ne pas exposer les informations sensibles comme l'email ou le numéro de téléphone
        // dans la vue de liste
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { updatedAt: "desc" },
    });

    // Enregistrer les vues des candidats
    // const companyId = user.Company.id;

    return NextResponse.json({
      candidates,
      pagination: {
        total: totalCandidates,
        pages: Math.ceil(totalCandidates / limit),
        current: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error retrieving candidates:", error);
    return NextResponse.json(
      {
        error: "An error occurred while retrieving candidates",
      },
      { status: 500 }
    );
  }
}

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

// Route pour marquer un candidat comme vu
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
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

    if (!data.jobSeekerId) {
      return NextResponse.json(
        { error: "Candidate ID required" },
        { status: 400 }
      );
    }

    // Enregistrer la vue du candidat
    const viewedCandidate = await prisma.viewedCandidate.upsert({
      where: {
        companyId_jobSeekerId: {
          companyId: user.Company.id,
          jobSeekerId: data.jobSeekerId,
        },
      },
      update: {
        viewedAt: new Date(),
      },
      create: {
        companyId: user.Company.id,
        jobSeekerId: data.jobSeekerId,
      },
    });

    return NextResponse.json(viewedCandidate);
  } catch (error) {
    console.error("Error saving view:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the view" },
      { status: 500 }
    );
  }
}
