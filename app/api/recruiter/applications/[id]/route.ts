import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { getUserType } from "@/lib/userUtils";
import { NextRequest, NextResponse } from "next/server";

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "You must be logged in" },
//         { status: 401 }
//       );
//     }

//     // Vérifier que l'utilisateur est un Recruiter
//     const { type, data } = await getUserType(session.user.id);
//     if (type !== "COMPANY") {
//       return NextResponse.json(
//         { message: "Only recruiters can update applications" },
//         { status: 403 }
//       );
//     }

//     const applicationId = params.id;
//     const { status } = await request.json();

//     // Vérifier que les valeurs de status sont valides
//     if (!["PENDING", "APPROVED", "REJECTED", "SCHEDULED"].includes(status)) {
//       return NextResponse.json(
//         { message: "Invalid status value" },
//         { status: 400 }
//       );
//     }

//     // Vérifier que la candidature existe et appartient au recruteur
//     const application = await prisma.jobApplication.findFirst({
//       where: {
//         id: applicationId,
//         jobPost: {
//           companyId: data?.id,
//         },
//       },
//     });

//     if (!application) {
//       return NextResponse.json(
//         { message: "Application not found or you don't have permission" },
//         { status: 404 }
//       );
//     }

//     // Mettre à jour le statut de la candidature
//     const updatedApplication = await prisma.jobApplication.update({
//       where: {
//         id: applicationId,
//       },
//       data: {
//         status,
//       },
//     });

//     return NextResponse.json({
//       message: "Application updated successfully",
//       application: updatedApplication,
//     });
//   } catch (error) {
//     console.error("Error updating application:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing your request" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "You must be logged in" },
//         { status: 401 }
//       );
//     }

//     // Vérifier que l'utilisateur est un Recruiter
//     const { type, data } = await getUserType(session.user.id);
//     if (type !== "COMPANY") {
//       return NextResponse.json(
//         { message: "Only recruiters can access this resource" },
//         { status: 403 }
//       );
//     }

//     const applicationId = params.id;

//     // Récupérer les détails de la candidature
//     const application = await prisma.jobApplication.findFirst({
//       where: {
//         id: applicationId,
//         jobPost: {
//           companyId: data?.id,
//         },
//       },
//       include: {
//         jobPost: true,
//         jobSeeker: {
//           include: {
//             user: true,
//           },
//         },
//       },
//     });

//     if (!application) {
//       return NextResponse.json(
//         { message: "Application not found or you don't have permission" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ application });
//   } catch (error) {
//     console.error("Error fetching application details:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing your request" },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
        { message: "Only recruiters can update applications" },
        { status: 403 }
      );
    }

    const companyId = user.Company.id;
    const applicationId = params.id;
    const { status } = await request.json();

    // Vérifier que les valeurs de status sont valides
    if (
      ![
        "PENDING",
        "REVIEWED",
        "SHORTLISTED",
        "INTERVIEWED",
        "ACCEPTED",
        "REJECTED",
      ].includes(status)
    ) {
      return NextResponse.json(
        { message: "Invalid status value" },
        { status: 400 }
      );
    }

    // Vérifier que la candidature existe et appartient à l'entreprise
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        jobPost: {
          companyId: companyId,
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found or you don't have permission" },
        { status: 404 }
      );
    }

    // Mettre à jour le statut de la candidature
    const updatedApplication = await prisma.jobApplication.update({
      where: {
        id: applicationId,
      },
      data: {
        status: status as any,
      },
    });

    return NextResponse.json({
      message: "Application updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const applicationId = params.id;

    // Récupérer les détails de la candidature
    const application = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        jobPost: {
          companyId: companyId,
        },
      },
      include: {
        jobPost: true,
        jobSeeker: true,
      },
    });

    if (!application) {
      return NextResponse.json(
        { message: "Application not found or you don't have permission" },
        { status: 404 }
      );
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error fetching application details:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
