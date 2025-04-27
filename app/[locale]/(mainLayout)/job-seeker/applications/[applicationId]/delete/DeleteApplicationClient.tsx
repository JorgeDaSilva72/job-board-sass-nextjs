"use client";

import { deleteApplicationPost } from "@/app/actions";
import { GeneralSubmitButton } from "@/components/general/SubmitButtons";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Trash2Icon, ArrowLeftIcon, AlertCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface DeleteApplicationClientProps {
  applicationId: string;
}

// Ce composant client gère l'interface et les interactions
export function DeleteApplicationClient({
  applicationId,
}: DeleteApplicationClientProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const result = await deleteApplicationPost(applicationId);

      if (result.success) {
        toast.success("Your application has been successfully deleted.!");
        router.push("/job-seeker/applications");
      } else {
        setError(result.error || "An error occurred while deleting");
        toast.error(result.error || "An error occured while deleting");
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error has occurred.");
      toast.error("An unexpected error has occurred.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="max-w-lg mx-auto w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 justify-center">
            <AlertCircleIcon className="size-5" />
            Delete this application
          </CardTitle>
          <CardDescription className="flex text-center">
            This action cannot be undone. This will permanently delete your
            application and remove your data from our servers.
          </CardDescription>
        </CardHeader>

        {error && (
          <CardContent>
            <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
              {error}
            </div>
          </CardContent>
        )}

        <CardFooter className="flex justify-between gap-4">
          <Link
            href={`/job-seeker/applications`}
            className={buttonVariants({ variant: "outline" })}
          >
            <ArrowLeftIcon className="size-4 mr-2" />
            Cancel
          </Link>

          <GeneralSubmitButton
            text="Delete application"
            variant="destructive"
            icon={<Trash2Icon className="size-4" />}
            onClick={handleDelete}
            isLoading={isDeleting}
            disabled={isDeleting}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
