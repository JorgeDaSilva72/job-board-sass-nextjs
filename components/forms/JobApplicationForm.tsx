"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileText, Send, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface JobApplicationFormProps {
  jobId: string;
  jobSeekerId: string;
  resumeUrl?: string;
}

export function JobApplicationForm({
  jobId,
  jobSeekerId,
  resumeUrl,
}: JobApplicationFormProps) {
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobPostId: jobId,
          jobSeekerId: jobSeekerId,
          coverLetter: coverLetter,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.message || "An error occurred while submitting your application"
        );
      }

      setSubmitted(true);
      toast.success("Application sent successfully");

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        router.push("/dashboard/applications");
        router.refresh();
      }, 2000);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card className="p-8 flex flex-col items-center justify-center text-center space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Application sent !</h2>
        <p className="text-muted-foreground">
          Your application has been successfully submitted. You will be
          redirected to your applications.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your application</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Complete your application by adding a cover letter to stand out to
            the recruiter.
          </p>
        </div>

        {resumeUrl && (
          <div>
            <h3 className="text-md font-medium mb-3">Your CV</h3>
            <div className="flex items-center gap-2 p-4 rounded-md border bg-muted/20">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  CV associated with your profile
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {resumeUrl}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => window.open(resumeUrl, "_blank")}
              >
                See
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This CV will be automatically attached to your application.
            </p>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="coverLetter">Cover letter (optional)</Label>
          <Textarea
            id="coverLetter"
            placeholder="Describe why you are the ideal candidate for this position..."
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
            {isSubmitting ? (
              "Sending in progress..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send my application
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
