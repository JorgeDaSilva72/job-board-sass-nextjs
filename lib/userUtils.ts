// import { prisma } from "@/app/utils/db";

// /**
//  * Détermine si un utilisateur est une entreprise ou un chercheur d'emploi
//  * @param userId - L'identifiant de l'utilisateur
//  * @returns Le type d'utilisateur (COMPANY, JOB_SEEKER) ou null si non défini
//  */
// export async function getUserType(userId: string) {
//   // Importer le client Prisma (assurez-vous que votre configuration l'exporte correctement)

//   try {
//     // Récupérer l'utilisateur avec ses relations Company et JobSeeker
//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//       include: {
//         Company: true,
//         JobSeeker: true,
//       },
//     });

//     // Vérifier si l'utilisateur existe
//     if (!user) {
//       throw new Error(`Utilisateur avec l'ID ${userId} non trouvé`);
//     }

//     // Déterminer le type d'utilisateur
//     if (user.Company) {
//       return "COMPANY";
//     } else if (user.JobSeeker) {
//       return "JOB_SEEKER";
//     } else {
//       // L'utilisateur n'a pas encore choisi son type
//       return user.userType || null;
//     }
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération du type d'utilisateur:",
//       error
//     );
//     throw error;
//   }
// }

import { prisma } from "@/app/utils/db";

/**
 * Détermine si un utilisateur est un demandeur d'emploi ou une entreprise
 * @param userId L'identifiant de l'utilisateur
 * @returns Un objet contenant le type d'utilisateur et les données associées
 *
 */

// Exemple d'utilisation
// const { type, data, user } = await getUserType("user-id-123");

// if (type === "JOB_SEEKER") {
//   console.log("C'est un demandeur d'emploi:", data.firstName, data.lastName);
// } else if (type === "COMPANY") {
//   console.log("C'est une entreprise:", data.name);
// } else {
//   console.log("L'utilisateur n'a pas encore défini son type");
// }

export async function getUserType(userId: string) {
  try {
    // Récupérer l'utilisateur depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        JobSeeker: true,
        Company: true,
      },
    });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Vérifier le type d'utilisateur en fonction des relations
    if (user.userType === "JOB_SEEKER" && user.JobSeeker) {
      return {
        type: "JOB_SEEKER",
        data: user.JobSeeker,
        user,
      };
    } else if (user.userType === "COMPANY" && user.Company) {
      return {
        type: "COMPANY",
        data: user.Company,
        user,
      };
    } else if (user.JobSeeker) {
      // Cas où le userType n'est pas défini mais la relation existe
      return {
        type: "JOB_SEEKER",
        data: user.JobSeeker,
        user,
      };
    } else if (user.Company) {
      // Cas où le userType n'est pas défini mais la relation existe
      return {
        type: "COMPANY",
        data: user.Company,
        user,
      };
    } else {
      // Utilisateur sans type défini
      return {
        type: "UNDEFINED",
        data: null,
        user,
      };
    }
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du type d'utilisateur:",
      error
    );
    throw error;
  }
}
