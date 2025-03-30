"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { jobListingDurationPricing } from "@/app/utils/pricingTiers";
import { renew as renewJobListing } from "@/app/actions"; // Vous devrez créer cette action serveur

export default function RenewJobPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState(30); // Valeur par défaut
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrer l'offre gratuite pour le renouvellement
  const availableDurations = jobListingDurationPricing.filter(
    (option) => option.price > 0
  );

  const handleRenew = async () => {
    setIsSubmitting(true);
    try {
      const result = await renewJobListing({
        jobId: params.jobId as string,
        duration: selectedDuration,
      });
      if (!result.success) {
        toast.error(result.error || "An error occured");
        return;
      }

      if (result.data?.redirectUrl) {
        // Rediriger côté client

        window.location.href = result.data.redirectUrl;
      }

      // if (result.success) {
      //   if (result.data?.redirectUrl) {
      //     // Si nous avons une URL de redirection (paiement Stripe), rediriger l'utilisateur
      //     window.location.href = result.data.redirectUrl;
      //   } else {
      //     // Sinon (renouvellement gratuit), afficher un message de succès et rediriger
      //     toast.success("Job listing renewed successfully!");
      //     router.push("/my-jobs");
      //   }
      // } else {
      //   toast.error(result.error || "Failed to renew job listing");
      // }
    } catch (error) {
      console.error("Error renewing job:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Renew Job Listing
          </CardTitle>
          <CardDescription className="text-center">
            Choose a duration to extend your job listing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {availableDurations.map((option) => (
              <Card
                key={option.days}
                className={`cursor-pointer hover:border-primary transition-colors ${
                  selectedDuration === option.days
                    ? "border-2 border-primary"
                    : ""
                }`}
                onClick={() => setSelectedDuration(option.days)}
              >
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-lg">{option.days} Days</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold">${option.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleRenew} disabled={isSubmitting}>
            {isSubmitting
              ? "Processing..."
              : `Renew for ${selectedDuration} days`}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
