import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
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

//     // Récupérer toutes les candidatures pour les offres du recruteur
//     const applications = await prisma.jobApplication.findMany({
//       where: {
//         jobPost: {
//           companyId: data?.id,
//         },
//       },
//       include: {
//         jobPost: {
//           select: {
//             id: true,
//             jobTitle: true,
//           },
//         },
//         jobSeeker: {
//           select: {
//             id: true,
//             resume: true,
//             user: {
//               select: {
//                 name: true,
//                 email: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json({ applications });
//   } catch (error) {
//     console.error("Error fetching applications:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing your request" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
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
    const applications = await prisma.jobApplication.findMany({
      where: {
        jobPost: {
          companyId: companyId,
        },
      },
      include: {
        jobPost: {
          select: {
            id: true,
            jobTitle: true,
            location: true,
            employmentType: true,
          },
        },
        jobSeeker: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            resume: true,
            title: true,
            experience: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
