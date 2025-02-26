import { prisma } from "@/app/utils/db";

/**
 * Détermine si un utilisateur est une entreprise ou un chercheur d'emploi
 * @param userId - L'identifiant de l'utilisateur
 * @returns Le type d'utilisateur (COMPANY, JOB_SEEKER) ou null si non défini
 */
export async function getUserType(userId: string) {
  // Importer le client Prisma (assurez-vous que votre configuration l'exporte correctement)

  try {
    // Récupérer l'utilisateur avec ses relations Company et JobSeeker
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Company: true,
        JobSeeker: true,
      },
    });

    // Vérifier si l'utilisateur existe
    if (!user) {
      throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
    }

    // Déterminer le type d'utilisateur
    if (user.Company) {
      return "COMPANY";
    } else if (user.JobSeeker) {
      return "JOB_SEEKER";
    } else {
      // L'utilisateur n'a pas encore choisi son type
      return user.userType || null;
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du type d'utilisateur:",
      error
    );
    throw error;
  }
}
