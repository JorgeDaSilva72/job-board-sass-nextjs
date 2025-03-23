// app/api/jobs/[jobId]/applications/[applicationId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ApplicationStatus } from "@prisma/client";
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";

export async function GET(
  request: NextRequest,
  //   { params }: { params: { jobId: string; applicationId: string } }
  context: { params: Promise<{ jobId: string; applicationId: string }> }
) {
  try {
    const params = await context.params;
    const { jobId, applicationId } = params;

    if (!jobId || !applicationId) {
      return NextResponse.json({ error: "Missing settings" }, { status: 400 });
    }

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

    // Vérifier que l'offre d'emploi appartient à l'entreprise
    const jobPost = await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        companyId: user.Company.id,
      },
    });

    if (!jobPost) {
      return NextResponse.json(
        { error: "Job offer not found or unauthorized access" },
        { status: 404 }
      );
    }

    // Récupérer les détails de la candidature
    const application = await prisma.jobApplication.findUnique({
      where: {
        id: applicationId,
        jobPostId: jobId,
      },
      include: {
        jobSeeker: {
          include: {
            education: true,
          },
        },
        jobPost: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Error retrieving application details:", error);
    return NextResponse.json(
      {
        error: "An error occurred while retrieving application details",
      },
      { status: 500 }
    );
  }
}

// Mettre à jour le statut d'une candidature
export async function PATCH(
  request: NextRequest,
  //   { params }: { params: { jobId: string; applicationId: string } }
  context: { params: Promise<{ jobId: string; applicationId: string }> }
) {
  try {
    const params = await context.params;

    const { jobId, applicationId } = params;

    if (!jobId || !applicationId) {
      return NextResponse.json({ error: "Missing settings" }, { status: 400 });
    }

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

    // Vérifier que l'offre d'emploi appartient à l'entreprise
    const jobPost = await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        companyId: user.Company.id,
      },
    });

    if (!jobPost) {
      return NextResponse.json(
        { error: "Job offer not found or unauthorized access" },
        { status: 404 }
      );
    }

    const data = await request.json();

    // Vérifier que le statut est valide
    if (
      !data.status ||
      !Object.values(ApplicationStatus).includes(data.status)
    ) {
      return NextResponse.json(
        { error: "Invalid application status" },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de la candidature
    const updatedApplication = await prisma.jobApplication.update({
      where: {
        id: applicationId,
        jobPostId: jobId,
      },
      data: {
        status: data.status,
      },
    });

    return NextResponse.json(updatedApplication);
  } catch (error) {
    console.error("Error updating application status:", error);
    return NextResponse.json(
      {
        error: "An error occurred while updating the application status",
      },
      { status: 500 }
    );
  }
}
