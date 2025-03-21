"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditApplicationFormProps {
  applicationId: string;
  initialCoverLetter: string | null;
}

export function EditApplicationForm({
  applicationId,
  initialCoverLetter = "",
}: EditApplicationFormProps) {
  const [coverLetter, setCoverLetter] = useState(initialCoverLetter || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/job-applications/${applicationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ coverLetter }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "An error occurred while updating your application"
        );
      }

      setSubmitted(true);
      toast.success("Application updated successfully");

      setTimeout(() => {
        router.push("/job-seeker/applications");
        router.refresh();
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Application updated!</h2>
        <p className="text-muted-foreground">
          Your application has been successfully updated. Redirecting...
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Edit your application</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Modify your cover letter to better showcase your skills.
          </p>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="coverLetter">Cover letter</Label>
          <Textarea
            id="coverLetter"
            placeholder="Describe why you are the ideal candidate..."
            className="min-h-[200px]"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update my application"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
