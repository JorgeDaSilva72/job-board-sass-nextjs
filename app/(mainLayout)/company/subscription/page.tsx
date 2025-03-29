// "use client";

// import { useState, useEffect } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Loader2, CheckCircle, Zap } from "lucide-react";
// // import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// type Plan = {
//   id: string;
//   name: string;
//   price: number;
//   duration: number; // in days
//   features: string[];
//   isPopular?: boolean;
// };

// type SubscriptionStatus = "ACTIVE" | "CANCELED" | "EXPIRED" | "PENDING";

// type UserSubscription = {
//   id: string;
//   status: SubscriptionStatus;
//   endDate: string;
//   plan: Plan;
// };

// export default function SubscriptionPage() {
//   //   const router = useRouter();
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [currentSubscription, setCurrentSubscription] =
//     useState<UserSubscription | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const [plansRes, subscriptionRes] = await Promise.all([
//         fetch("/api/recruiter/plans"),
//         fetch("/api/recruiter/subscription"),
//       ]);

//       if (!plansRes.ok || !subscriptionRes.ok) {
//         throw new Error("Failed to fetch data");
//       }

//       const [plansData, subscriptionData] = await Promise.all([
//         plansRes.json(),
//         subscriptionRes.json(),
//       ]);

//       setPlans(plansData);
//       if (subscriptionData.status === "ACTIVE") {
//         setCurrentSubscription(subscriptionData);
//       }
//     } catch (error) {
//       console.log("Failed to load subscription data", error);
//       toast.error("Failed to load subscription data");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleSubscribe = async (planId: string) => {
//     try {
//       setIsProcessing(true);
//       const response = await fetch("/api/recruiter/subscription", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ planId }),
//       });

//       if (!response.ok) {
//         throw new Error("Subscription failed");
//       }

//       const { url } = await response.json();
//       window.location.href = url; // Redirect to Stripe checkout
//     } catch (error) {
//       console.log("Subscription failed. Please try again.", error);
//       toast.error("Subscription failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const handleCancel = async () => {
//     try {
//       setIsProcessing(true);
//       const response = await fetch("/api/recruiter/subscription", {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Cancellation failed");
//       }

//       toast.success("Subscription cancelled successfully");
//       fetchData(); // Refresh data
//     } catch (error) {
//       console.log("Cancellation failed. Please try again.", error);
//       toast.error("Cancellation failed. Please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
//         <p className="text-muted-foreground">
//           Select the perfect plan for your recruitment needs
//         </p>
//       </div>

//       {currentSubscription && (
//         <Card className="mb-8 border-green-500">
//           <CardHeader>
//             <CardTitle className="flex items-center justify-between">
//               <span>Your Current Plan</span>
//               <Badge
//                 variant="outline"
//                 className="text-green-500 border-green-500"
//               >
//                 Active until{" "}
//                 {new Date(currentSubscription.endDate).toLocaleDateString()}
//               </Badge>
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold">
//                   {currentSubscription.plan.name}
//                 </h3>
//                 <p className="text-muted-foreground">
//                   ${currentSubscription.plan.price}/month
//                 </p>
//               </div>
//               <Button
//                 variant="destructive"
//                 onClick={handleCancel}
//                 disabled={isProcessing}
//               >
//                 {isProcessing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : (
//                   "Cancel Subscription"
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {plans.map((plan) => (
//           <Card
//             key={plan.id}
//             className={plan.isPopular ? "border-2 border-primary" : ""}
//           >
//             {plan.isPopular && (
//               <div className="bg-primary text-white text-center py-1 text-sm font-medium">
//                 MOST POPULAR
//               </div>
//             )}
//             <CardHeader>
//               <CardTitle className="flex justify-between items-center">
//                 {plan.name}
//                 {plan.isPopular && <Zap className="h-5 w-5 text-yellow-400" />}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="mb-6">
//                 <span className="text-3xl font-bold">${plan.price}</span>
//                 <span className="text-muted-foreground">/month</span>
//               </div>
//               <ul className="space-y-3">
//                 {plan.features.map((feature, index) => (
//                   <li key={index} className="flex items-center">
//                     <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button
//                 className="w-full"
//                 onClick={() => handleSubscribe(plan.id)}
//                 disabled={
//                   isProcessing ||
//                   (currentSubscription?.plan.id === plan.id &&
//                     currentSubscription?.status === "ACTIVE")
//                 }
//               >
//                 {isProcessing ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Processing...
//                   </>
//                 ) : currentSubscription?.plan.id === plan.id &&
//                   currentSubscription?.status === "ACTIVE" ? (
//                   "Current Plan"
//                 ) : (
//                   "Get Started"
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-8 text-center text-sm text-muted-foreground">
//         <p>Need help choosing a plan? Contact our support team.</p>
//       </div>
//     </div>
//   );
// }

// --------------------------------------------------------------

//

"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Zap, AlertTriangle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Plan = {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  isPopular?: boolean;
};

type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELED"
  | "EXPIRED"
  | "PENDING"
  | "INACTIVE";

// Modifié pour correspondre à la structure de ton API
type UserSubscription = {
  status: SubscriptionStatus;
  endDate?: string;
  plan?: {
    id?: string;
    name: string;
    features: string[];
    price?: number;
  };
};

export default function SubscriptionPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmCancelOpen, setConfirmCancelOpen] = useState(false);
  const [confirmSubscribeOpen, setConfirmSubscribeOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [plansRes, subscriptionRes] = await Promise.all([
        fetch("/api/recruiter/plans"),
        fetch("/api/recruiter/subscription"),
      ]);

      if (!plansRes.ok || !subscriptionRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [plansData, subscriptionData] = await Promise.all([
        plansRes.json(),
        subscriptionRes.json(),
      ]);

      setPlans(plansData);

      // Debug log
      console.log("Subscription data from API:", subscriptionData);

      // Si nous avons un statut et qu'il n'est pas INACTIVE, définir l'abonnement actuel
      if (subscriptionData.status && subscriptionData.status !== "INACTIVE") {
        // Trouver l'ID du plan dans notre liste de plans
        if (subscriptionData.plan && subscriptionData.plan.name) {
          const matchingPlan = plansData.find(
            (p) => p.name === subscriptionData.plan.name
          );
          if (matchingPlan) {
            // Enrichir les données du plan avec l'ID et le prix
            subscriptionData.plan.id = matchingPlan.id;
            subscriptionData.plan.price = matchingPlan.price;
          }
        }
        setCurrentSubscription(subscriptionData);
      } else {
        setCurrentSubscription(null);
      }
    } catch (error) {
      console.error("Failed to load subscription data", error);
      toast.error(
        "Failed to load subscription data. Please refresh or try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initiateSubscribe = (planId: string) => {
    setSelectedPlanId(planId);
    setConfirmSubscribeOpen(true);
  };

  const handleSubscribe = async () => {
    if (!selectedPlanId) return;

    try {
      setIsProcessing(true);
      const response = await fetch("/api/recruiter/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId: selectedPlanId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Subscription request failed");
      }

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe checkout
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.";
      console.error("Subscription error:", error);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      setConfirmSubscribeOpen(false);
    }
  };

  const initiateCancelSubscription = () => {
    setConfirmCancelOpen(true);
  };

  const handleCancel = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/recruiter/subscription", {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Cancellation failed");
      }

      toast.success(
        "Subscription cancelled successfully. Your benefits will continue until the end of your billing period."
      );
      fetchData(); // Refresh data
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Cancellation failed. Please try again.";
      console.error("Cancellation error:", error);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
      setConfirmCancelOpen(false);
    }
  };

  // Helper function to get status badge
  const getStatusBadge = (status: SubscriptionStatus) => {
    if (!currentSubscription?.endDate) return null;

    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="outline" className="text-green-500 border-green-500">
            <CheckCircle className="h-3 w-3 mr-1" aria-hidden="true" />
            Active until{" "}
            {new Date(currentSubscription.endDate).toLocaleDateString()}
          </Badge>
        );
      case "CANCELED":
        return (
          <Badge
            variant="outline"
            className="text-orange-500 border-orange-500"
          >
            <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
            Cancelled - Expires{" "}
            {new Date(currentSubscription.endDate).toLocaleDateString()}
          </Badge>
        );
      case "PENDING":
        return (
          <Badge variant="outline" className="text-blue-500 border-blue-500">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" aria-hidden="true" />
            Payment Processing
          </Badge>
        );
      case "EXPIRED":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            <AlertTriangle className="h-3 w-3 mr-1" aria-hidden="true" />
            Expired
          </Badge>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
          aria-label="Loading"
        />
      </div>
    );
  }

  // On n'affiche la carte d'abonnement actuel que s'il existe
  const hasActiveSubscription =
    currentSubscription && currentSubscription.status !== "INACTIVE";

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground">
          Select the perfect plan for your recruitment needs
        </p>
      </div>

      {hasActiveSubscription && currentSubscription.plan && (
        <Card
          className={`mb-8 ${
            currentSubscription.status === "ACTIVE"
              ? "border-green-500"
              : currentSubscription.status === "CANCELED"
              ? "border-orange-500"
              : currentSubscription.status === "PENDING"
              ? "border-blue-500"
              : "border-red-500"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span>Your Current Plan</span>
              {getStatusBadge(currentSubscription.status)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {currentSubscription.plan.name}
                </h3>
                {currentSubscription.plan.price && (
                  <p className="text-muted-foreground">
                    ${currentSubscription.plan.price}/month
                  </p>
                )}
              </div>
              {currentSubscription.status === "ACTIVE" && (
                <Button
                  variant="destructive"
                  onClick={initiateCancelSubscription}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2
                        className="mr-2 h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      Processing...
                    </>
                  ) : (
                    "Cancel Subscription"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={
              plan.isPopular ? "border-2 border-primary relative" : "relative"
            }
          >
            {plan.isPopular && (
              <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {plan.name}
                {plan.isPopular && (
                  <Zap
                    className="h-5 w-5 text-yellow-400"
                    aria-label="Popular plan"
                  />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle
                      className="h-4 w-4 text-green-500 mr-2"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => initiateSubscribe(plan.id)}
                disabled={
                  isProcessing ||
                  (currentSubscription?.plan?.id === plan.id &&
                    currentSubscription?.status === "ACTIVE")
                }
                variant={
                  currentSubscription?.plan?.id === plan.id &&
                  currentSubscription?.status === "ACTIVE"
                    ? "outline"
                    : "default"
                }
              >
                {isProcessing && selectedPlanId === plan.id ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Processing...
                  </>
                ) : currentSubscription?.plan?.id === plan.id &&
                  currentSubscription?.status === "ACTIVE" ? (
                  "Current Plan"
                ) : currentSubscription?.plan?.id === plan.id &&
                  currentSubscription?.status === "CANCELED" ? (
                  "Renew Plan"
                ) : (
                  "Get Started"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help choosing a plan?{" "}
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => router.push("/support")}
          >
            Contact our support team
          </Button>
          .
        </p>
      </div>

      {/* Subscription Confirmation Dialog */}
      <Dialog
        open={confirmSubscribeOpen}
        onOpenChange={setConfirmSubscribeOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Subscription</DialogTitle>
            <DialogDescription>
              You are about to be redirected to our secure payment processor to
              complete your subscription.
              {currentSubscription?.status === "ACTIVE" && (
                <div className="mt-2">
                  <AlertTriangle
                    className="h-4 w-4 inline text-amber-500 mr-1"
                    aria-hidden="true"
                  />
                  <span className="text-amber-500">
                    You already have an active subscription. This will replace
                    your current plan.
                  </span>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmSubscribeOpen(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button onClick={handleSubscribe} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Processing...
                </>
              ) : (
                "Continue to Payment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancellation Confirmation Dialog */}
      <Dialog open={confirmCancelOpen} onOpenChange={setConfirmCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will still
              have access to all features until{" "}
              {currentSubscription?.endDate
                ? new Date(currentSubscription.endDate).toLocaleDateString()
                : "the end of your billing period"}
              .
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmCancelOpen(false)}
              disabled={isProcessing}
            >
              Keep Subscription
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Processing...
                </>
              ) : (
                "Cancel Subscription"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
