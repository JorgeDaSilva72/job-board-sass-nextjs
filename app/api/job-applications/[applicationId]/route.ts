// app/api/job-applications/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";
import { auth } from "@/app/utils/auth";
import { z } from "zod";

// Schéma de validation pour les données entrantes
const updateApplicationSchema = z.object({
  coverLetter: z.string().optional().nullable(),
});

// Fonction pour gérer les requêtes PUT
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ applicationId: string }> }
) {
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
    const params = await context.params;
    const applicationId = params.applicationId;
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
