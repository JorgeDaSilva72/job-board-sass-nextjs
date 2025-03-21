import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { EditApplicationForm } from "@/components/forms/EditApplicationForm";

import { notFound } from "next/navigation";
import React from "react";

const DEBUG = process.env.DEBUG_MODE === "true";

async function getApplicationPost({
  applicationId,
}: {
  applicationId: string;
}) {
  const applicationPost = await prisma.jobApplication.findUnique({
    where: {
      id: applicationId,
    },
    select: {
      id: true,
      jobSeekerId: true,
      coverLetter: true,
    },
  });

  if (DEBUG) console.log("applicationPost:", applicationPost);

  if (!applicationPost) {
    return notFound();
  }

  return applicationPost;
}

type Params = Promise<{ applicationId: string }>; // applicationId is the same name than the route [applicationId]/edit

const EditApplicationPage = async ({ params }: { params: Params }) => {
  const { applicationId } = await params;
  if (DEBUG) console.log("applicationId:", applicationId);
  const user = await requireUser();
  if (DEBUG) console.log("userId:", user.id);
  const applicationPost = await getApplicationPost({
    applicationId,
  });

  if (DEBUG) console.log("applicationPost:", applicationPost);

  if (!applicationPost) {
    return notFound();
  }

  const jobSeeker = await prisma.jobSeeker.findUnique({
    where: { userId: user.id },
    select: { id: true },
  });

  if (!jobSeeker || jobSeeker.id !== applicationPost.jobSeekerId) {
    return notFound();
  }

  return (
    <>
      <EditApplicationForm
        applicationId={applicationPost.id}
        initialCoverLetter={applicationPost.coverLetter || null}
      />
    </>
  );
};

export default EditApplicationPage;
