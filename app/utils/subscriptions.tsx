import { SubscriptionStatus } from "@prisma/client";
import { addDays } from "date-fns";
import { prisma } from "./db";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "./auth";
import { useEffect, useState } from "react";

/**
 * Vérifie et met à jour le statut des abonnements
 * - Marque les abonnements comme EXPIRING_SOON 7 jours avant expiration
 * - Marque les abonnements comme EXPIRED après leur date de fin
 * - Met à jour le champ hasActiveSubscription des utilisateurs
 */
export async function checkSubscriptionExpirations() {
  const now = new Date();
  const expiringThreshold = addDays(now, 7); // 7 jours avant expiration

  try {
    // 1. Mettre à jour les abonnements qui vont bientôt expirer
    await prisma.subscription.updateMany({
      where: {
        status: SubscriptionStatus.ACTIVE,
        endDate: {
          lt: expiringThreshold,
          gt: now,
        },
        expirationNotifiedAt: null,
      },
      data: {
        status: SubscriptionStatus.EXPIRING_SOON,
        expirationNotifiedAt: now,
      },
    });

    // 2. Marquer les abonnements expirés
    await prisma.subscription.updateMany({
      where: {
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.EXPIRING_SOON],
        },
        endDate: {
          lt: now,
        },
      },
      data: {
        status: SubscriptionStatus.EXPIRED,
      },
    });

    // 3. Mettre à jour le champ hasActiveSubscription pour tous les utilisateurs
    const usersWithActiveSubscriptions = await prisma.subscription.findMany({
      where: {
        status: {
          in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.EXPIRING_SOON],
        },
        endDate: {
          gt: now,
        },
      },
      select: {
        userId: true,
      },
      distinct: ["userId"],
    });

    const activeUserIds = usersWithActiveSubscriptions.map((sub) => sub.userId);

    // Mettre à jour tous les utilisateurs avec un abonnement actif
    await prisma.user.updateMany({
      where: {
        id: {
          in: activeUserIds,
        },
        hasActiveSubscription: false,
      },
      data: {
        hasActiveSubscription: true,
      },
    });

    // Mettre à jour tous les utilisateurs sans abonnement actif
    await prisma.user.updateMany({
      where: {
        id: {
          notIn: activeUserIds.length > 0 ? activeUserIds : ["placeholder-id"],
        },
        hasActiveSubscription: true,
      },
      data: {
        hasActiveSubscription: false,
      },
    });

    console.log("Vérification des abonnements terminée");
  } catch (error) {
    console.error("Erreur lors de la vérification des abonnements:", error);
    throw error;
  }
}

/**
 * Vérifie si un utilisateur a un abonnement actif
 */
export async function checkUserSubscriptionStatus(userId: string) {
  const now = new Date();

  const activeSubscription = await prisma.subscription.findFirst({
    where: {
      userId,
      status: {
        in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.EXPIRING_SOON],
      },
      endDate: {
        gt: now,
      },
    },
    include: {
      plan: true,
    },
  });

  return {
    hasActiveSubscription: !!activeSubscription,
    subscription: activeSubscription,
  };
}

/**
 * Renouvelle un abonnement pour la durée spécifiée dans le plan
 */
export async function renewSubscription(subscriptionId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new Error(`Abonnement ${subscriptionId} non trouvé`);
    }

    const startDate = new Date();
    const endDate = addDays(startDate, subscription.plan.duration);

    // Créer un nouvel abonnement basé sur l'ancien
    const newSubscription = await prisma.subscription.create({
      data: {
        userId: subscription.userId,
        planId: subscription.planId,
        status: SubscriptionStatus.ACTIVE,
        startDate,
        endDate,
        autoRenew: subscription.autoRenew,
        // Les champs Stripe seraient remplis après le paiement
      },
    });

    // Mettre à jour l'utilisateur
    await prisma.user.update({
      where: { id: subscription.userId },
      data: {
        hasActiveSubscription: true,
        updatedAt: new Date(),
      },
    });

    return newSubscription;
  } catch (error) {
    console.error("Erreur lors du renouvellement de l'abonnement:", error);
    throw error;
  }
}

/**
 * Middleware pour vérifier l'abonnement d'un utilisateur
 */
export async function checkSubscriptionMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return res.status(401).json({ error: "Non autorisé" });
    }

    const userId = session.user.id;
    const { hasActiveSubscription, subscription } =
      await checkUserSubscriptionStatus(userId!);

    // Attacher l'information d'abonnement à la requête pour utilisation ultérieure
    (req as any).userSubscription = {
      hasActiveSubscription,
      subscription,
      planFeatures: subscription?.plan.features,
    };

    // Si cette route nécessite un abonnement actif
    if ((req as any).requiresSubscription && !hasActiveSubscription) {
      return res.status(403).json({
        error: "Abonnement requis",
        message:
          "Un abonnement actif est nécessaire pour accéder à cette fonctionnalité",
      });
    }

    next();
  } catch (error) {
    console.error("Erreur lors de la vérification de l'abonnement:", error);
    return res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

/**
 * Hook React pour vérifier l'abonnement d'un utilisateur côté client
 */
export function useSubscription(userId: string) {
  const [subscriptionStatus, setSubscriptionStatus] = useState({
    loading: true,
    hasActiveSubscription: false,
    subscription: null,
    error: "",
  });

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      try {
        const response = await fetch(
          `/api/subscriptions/status?userId=${userId}`
        );
        const data = await response.json();

        setSubscriptionStatus({
          loading: false,
          hasActiveSubscription: data.hasActiveSubscription,
          subscription: data.subscription,
          error: "",
        });
      } catch (error) {
        setSubscriptionStatus({
          loading: false,
          hasActiveSubscription: false,
          subscription: null,
          error: "Erreur lors de la récupération du statut d'abonnement",
        });
      }
    }

    if (userId) {
      fetchSubscriptionStatus();
    }
  }, [userId]);

  return subscriptionStatus;
}
