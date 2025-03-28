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
import { Loader2, CheckCircle, Zap } from "lucide-react";
// import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Plan = {
  id: string;
  name: string;
  price: number;
  duration: number; // in days
  features: string[];
  isPopular?: boolean;
};

type SubscriptionStatus = "ACTIVE" | "CANCELED" | "EXPIRED" | "PENDING";

type UserSubscription = {
  id: string;
  status: SubscriptionStatus;
  endDate: string;
  plan: Plan;
};

export default function SubscriptionPage() {
  //   const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] =
    useState<UserSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

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
      if (subscriptionData.status === "ACTIVE") {
        setCurrentSubscription(subscriptionData);
      }
    } catch (error) {
      console.log("Failed to load subscription data", error);
      toast.error("Failed to load subscription data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubscribe = async (planId: string) => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/recruiter/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      const { url } = await response.json();
      window.location.href = url; // Redirect to Stripe checkout
    } catch (error) {
      console.log("Subscription failed. Please try again.", error);
      toast.error("Subscription failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const handleCancel = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch("/api/recruiter/subscription", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Cancellation failed");
      }

      toast.success("Subscription cancelled successfully");
      fetchData(); // Refresh data
    } catch (error) {
      console.log("Cancellation failed. Please try again.", error);
      toast.error("Cancellation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-muted-foreground">
          Select the perfect plan for your recruitment needs
        </p>
      </div>

      {currentSubscription && (
        <Card className="mb-8 border-green-500">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Current Plan</span>
              <Badge
                variant="outline"
                className="text-green-500 border-green-500"
              >
                Active until{" "}
                {new Date(currentSubscription.endDate).toLocaleDateString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  {currentSubscription.plan.name}
                </h3>
                <p className="text-muted-foreground">
                  ${currentSubscription.plan.price}/month
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={handleCancel}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={plan.isPopular ? "border-2 border-primary" : ""}
          >
            {plan.isPopular && (
              <div className="bg-primary text-white text-center py-1 text-sm font-medium">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {plan.name}
                {plan.isPopular && <Zap className="h-5 w-5 text-yellow-400" />}
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
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
                disabled={
                  isProcessing ||
                  (currentSubscription?.plan.id === plan.id &&
                    currentSubscription?.status === "ACTIVE")
                }
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : currentSubscription?.plan.id === plan.id &&
                  currentSubscription?.status === "ACTIVE" ? (
                  "Current Plan"
                ) : (
                  "Get Started"
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Need help choosing a plan? Contact our support team.</p>
      </div>
    </div>
  );
}
