// app/api/job-applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { auth } from "@/app/utils/auth";
import { getUserType } from "@/lib/userUtils";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to apply" },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur est un JobSeeker
    const { type, data } = await getUserType(session.user.id);
    if (type !== "JOB_SEEKER") {
      return NextResponse.json(
        { message: "Only job seekers can apply" },
        { status: 403 }
      );
    }

    // Vérifier que jobSeekerId est bien défini
    if (!data?.id) {
      throw new Error("jobSeekerId is required");
    }

    const body = await request.json();
    const { jobPostId, coverLetter } = body;

    if (!jobPostId) {
      return NextResponse.json(
        { message: "Missing job post ID" },
        { status: 400 }
      );
    }

    // Vérifier si le job existe et est actif
    const job = await prisma.jobPost.findUnique({
      where: {
        id: jobPostId,
        status: "ACTIVE",
      },
    });

    if (!job) {
      return NextResponse.json(
        { message: "This job post is no longer available" },
        { status: 404 }
      );
    }

    // Vérifier si une candidature existe déjà
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobPostId,
        jobSeekerId: data?.id,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        { message: "You have already applied for this offer" },
        { status: 409 }
      );
    }

    // Créer la candidature
    const application = await prisma.jobApplication.create({
      data: {
        jobPostId,
        jobSeekerId: data.id!,
        coverLetter,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        message: "Application sent successfully",
        applicationId: application.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing your request",
      },
      { status: 500 }
    );
  }
}

// Schéma de validation pour les données entrantes
const updateApplicationSchema = z.object({
  coverLetter: z.string().optional().nullable(),
});

interface Context {
  params: { applicationId: string };
}

// Fonction pour gérer les requêtes PUT
export async function PUT(request: NextRequest, context: Context) {
  try {
    // Vérifier l'authentification
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in to update" },
        { status: 401 }
      );
    }

    // Récupérer l'ID de l'application
    const { applicationId } = context.params;
    if (!applicationId) {
      return NextResponse.json(
        { message: "Missing application ID" },
        { status: 400 }
      );
    }

    // Valider la requête JSON
    const body = await request.json();
    const validationResult = updateApplicationSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validationResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Extraire les données validées
    const { coverLetter } = validationResult.data;

    // Vérifier que l'application existe et appartient à l'utilisateur actuel
    const existingApplication = await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
      },
      select: { id: true, jobSeekerId: true },
    });

    if (!existingApplication) {
      return NextResponse.json(
        { message: "Application not found" },
        { status: 404 }
      );
    }
    // Vérifier que l'application  appartient à l'utilisateur actuel
    const jobSeeker = await prisma.jobSeeker.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!jobSeeker || jobSeeker.id !== existingApplication.jobSeekerId) {
      return NextResponse.json(
        { message: " Unauthorized access" },
        { status: 403 }
      );
    }

    // Mettre à jour l'application
    const updatedApplication = await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        coverLetter,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Application successfully updated",
        application: updatedApplication,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      {
        message: "An error occurred while updating your application",
      },
      { status: 500 }
    );
  }
}
