import { JobPostStatus } from "@prisma/client";
import { prisma } from "./db";

/**
 * Vérifie l'état d'une annonce en fonction de sa date d'expiration
 */
// export function checkJobPostingStatus(jobPosting) {
//   const now = new Date();
//   const expiresAt = new Date(jobPosting.expiresAt);

//   return now > expiresAt ? "Expired" : "Active";
// }

/**
 * Met à jour l'état de toutes les annonces
 * À exécuter via une API Route ou un middleware
 */
// export async function updateAllJobPostingStatuses() {
//   try {
//     // Récupérer toutes les annonces actives
//     const activeJobPostings = await prisma.jobPost.findMany({
//       where: { status: "ACTIVE" },
//     });

//     const now = new Date();
//     const expiredPostings = activeJobPostings.filter((job) => {
//       return new Date(job.expiresAt) < now;
//     });

//     // Mettre à jour les annonces expirées
//     if (expiredPostings.length > 0) {
//       await db.jobPosting.updateMany({
//         where: {
//           id: { in: expiredPostings.map((job) => job.id) },
//         },
//         data: {
//           status: "Expired",
//         },
//       });

//       console.log(
//         `${expiredPostings.length} annonces ont été marquées comme expirées`
//       );
//     }

//     return { updated: expiredPostings.length };
//   } catch (error) {
//     console.error("Erreur lors de la mise à jour des statuts:", error);
//     throw error;
//   }
// }

export async function updateExpiredJobPosts() {
  const now = new Date();

  try {
    // Trouver toutes les annonces actives qui ont dépassé leur date d'expiration
    const expiredJobs = await prisma.jobPost.updateMany({
      where: {
        status: JobPostStatus.ACTIVE,
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: JobPostStatus.EXPIRED,
      },
    });

    console.log(`${expiredJobs.count} annonces marquées comme expirées`);
    return expiredJobs.count;
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des annonces expirées:",
      error
    );
    throw error;
  }
}

// Fonction pour calculer la date d'expiration lors de la création d'une annonce
export function calculateExpiryDate(durationInDays: number): Date {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + durationInDays);
  return expiryDate;
}

// Fonction pour le renouvellement d'une annonce
export async function renewJobPost(jobPostId: string, durationInDays: number) {
  const now = new Date();
  const newExpiryDate = calculateExpiryDate(durationInDays);

  try {
    const updatedJob = await prisma.jobPost.update({
      where: {
        id: jobPostId,
      },
      data: {
        status: JobPostStatus.ACTIVE,
        expiresAt: newExpiryDate,
        lastRenewedAt: now,
      },
    });

    return updatedJob;
  } catch (error) {
    console.error(
      `Erreur lors du renouvellement de l'annonce ${jobPostId}:`,
      error
    );
    throw error;
  }
}
