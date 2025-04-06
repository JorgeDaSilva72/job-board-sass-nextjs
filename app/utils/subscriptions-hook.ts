import { useEffect, useState } from "react";

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
        console.error(
          "Erreur lors de la récupération du statut d'abonnement:",
          error
        );

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
