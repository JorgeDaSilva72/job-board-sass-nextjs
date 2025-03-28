// import { auth } from "@/app/utils/auth";
// import { prisma } from "@/app/utils/db";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const session = await auth();

//     if (!session?.user?.id) {
//       return NextResponse.json(
//         { message: "You must be logged in" },
//         { status: 401 }
//       );
//     }

//     // Vérifier que l'utilisateur est associé à une entreprise
//     const user = await prisma.user.findUnique({
//       where: { id: session.user.id },
//       include: { Company: true },
//     });

//     if (!user?.Company?.id) {
//       return NextResponse.json(
//         { message: "Only recruiters can access this resource" },
//         { status: 403 }
//       );
//     }

//     const companyId = user.Company.id;

//     // Récupérer toutes les candidatures pour les offres de l'entreprise
//     const totalJobs = await prisma.jobPost.count({ where: { companyId } });
//     const totalApplications = await prisma.jobApplication.count({
//       where: { jobPost: { companyId } },
//     });
//     const totalViews = 0; // Ajoute la logique pour récupérer les vues

//     return NextResponse.json({ totalJobs, totalApplications, totalViews });
//   } catch (error) {
//     console.error("Error fetching stats:", error);
//     return NextResponse.json(
//       { message: "An error occurred while processing your request" },
//       { status: 500 }
//     );
//   }
// }

// // -------------------------------------------------

// // import { auth } from "@/app/utils/auth";
// // import { prisma } from "@/app/utils/db";
// // import { NextResponse } from "next/server";

// // export async function GET() {
// //   try {
// //     const session = await auth();

// //     if (!session?.user?.id) {
// //       return NextResponse.json(
// //         { message: "You must be logged in" },
// //         { status: 401 }
// //       );
// //     }

// //     // Vérifier que l'utilisateur est associé à une entreprise
// //     const user = await prisma.user.findUnique({
// //       where: { id: session.user.id },
// //       include: { Company: true },
// //     });

// //     if (!user?.Company?.id) {
// //       return NextResponse.json(
// //         { message: "Only recruiters can access this resource" },
// //         { status: 403 }
// //       );
// //     }

// //     const companyId = user.Company.id;

// //     // Récupération des statistiques en une seule requête avec Prisma
// //     const [jobStats, applicationStats, candidateStats] = await Promise.all([
// //       // Statistiques sur les offres d'emploi
// //       prisma.jobPost.aggregate({
// //         where: { companyId },
// //         _count: { _all: true },
// //         _sum: { viewCount: true },
// //         where: {
// //           companyId,
// //           status: "ACTIVE",
// //         },
// //       }),
// //       // Statistiques sur les candidatures
// //       prisma.jobApplication.groupBy({
// //         by: ["status"],
// //         _count: { _all: true },
// //         where: { jobPost: { companyId } },
// //       }),
// //       // Statistiques sur les candidats (vues de profils)
// //       prisma.candidateView.count({
// //         where: { companyId },
// //       }),
// //     ]);

// //     // Formatage des données
// //     const statusCounts = applicationStats.reduce((acc, curr) => {
// //       acc[curr.status] = curr._count._all;
// //       return acc;
// //     }, {} as Record<string, number>);

// //     return NextResponse.json({
// //       // Statistiques générales
// //       totalJobs: jobStats._count._all,
// //       activeJobs: jobStats._count._all,
// //       totalApplications: applicationStats.reduce((sum, curr) => sum + curr._count._all, 0),
// //       totalViews: jobStats._sum.viewCount || 0,
// //       viewedCandidates: candidateStats,

// //       // Détails par statut de candidature
// //       pendingApplications: statusCounts["PENDING"] || 0,
// //       reviewedApplications: statusCounts["REVIEWED"] || 0,
// //       shortlistedApplications: statusCounts["SHORTLISTED"] || 0,
// //       interviewedApplications: statusCounts["INTERVIEWED"] || 0,
// //       acceptedApplications: statusCounts["ACCEPTED"] || 0,
// //       rejectedApplications: statusCounts["REJECTED"] || 0,

// //       // Statistiques temporelles (30 derniers jours)
// //       recentStats: {
// //         jobsPostedLast30Days: await prisma.jobPost.count({
// //           where: {
// //             companyId,
// //             createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
// //           },
// //         }),
// //         applicationsLast30Days: await prisma.jobApplication.count({
// //           where: {
// //             jobPost: { companyId },
// //             createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
// //           },
// //         }),
// //       },

// //       // Top 5 des offres les plus populaires
// //       popularJobs: await prisma.jobPost.findMany({
// //         where: { companyId },
// //         orderBy: { viewCount: "desc" },
// //         take: 5,
// //         select: {
// //           id: true,
// //           jobTitle: true,
// //           viewCount: true,
// //           applications: {
// //             select: { id: true },
// //           },
// //         },
// //       }),
// //     });
// //   } catch (error) {
// //     console.error("Error fetching stats:", error);
// //     return NextResponse.json(
// //       { message: "An error occurred while processing your request" },
// //       { status: 500 }
// //     );
// //   }
// // }

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

    // Verify user is associated with a company
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

    // Get total jobs and jobs by status
    const [totalJobs, jobsByStatus] = await Promise.all([
      prisma.jobPost.count({ where: { companyId } }),
      prisma.jobPost.groupBy({
        by: ["status"],
        where: { companyId },
        _count: { _all: true },
      }),
    ]);

    // Transform jobsByStatus into a more accessible object
    const jobStatusCounts = jobsByStatus.reduce((acc, curr) => {
      acc[curr.status] = curr._count._all;
      return acc;
    }, {} as Record<string, number>);

    // Get application statistics
    const [totalApplications, applicationsByStatus] = await Promise.all([
      prisma.jobApplication.count({
        where: { jobPost: { companyId } },
      }),
      prisma.jobApplication.groupBy({
        by: ["status"],
        where: { jobPost: { companyId } },
        _count: { _all: true },
      }),
    ]);

    // Transform applicationsByStatus into a more accessible object
    const applicationStatusCounts = applicationsByStatus.reduce((acc, curr) => {
      acc[curr.status] = curr._count._all;
      return acc;
    }, {} as Record<string, number>);

    return NextResponse.json({
      // Total jobs
      totalJobs,

      // Jobs by status
      jobStatusCounts: {
        DRAFT: jobStatusCounts["DRAFT"] || 0,
        ACTIVE: jobStatusCounts["ACTIVE"] || 0,
        EXPIRED: jobStatusCounts["EXPIRED"] || 0,
      },

      // Total applications
      totalApplications,

      // Applications by status
      applicationStatusCounts: {
        PENDING: applicationStatusCounts["PENDING"] || 0,
        REVIEWED: applicationStatusCounts["REVIEWED"] || 0,
        SHORTLISTED: applicationStatusCounts["SHORTLISTED"] || 0,
        INTERVIEWED: applicationStatusCounts["INTERVIEWED"] || 0,
        ACCEPTED: applicationStatusCounts["ACCEPTED"] || 0,
        REJECTED: applicationStatusCounts["REJECTED"] || 0,
      },

      // Viewed candidates (placeholder - replace with actual logic if needed)
      viewedCandidates: 0,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
