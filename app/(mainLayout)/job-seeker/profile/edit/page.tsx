import { getJobSeekerProfile } from "@/app/actions";
import EditJobSeekerForm from "@/components/forms/EditJobSeekerForm";

import { notFound } from "next/navigation";
import React from "react";

const EditJobPage = async () => {
  const jobSeeker = await getJobSeekerProfile();

  if (!jobSeeker) {
    return notFound();
  }

  return (
    <>
      <EditJobSeekerForm jobSeeker={jobSeeker} />
    </>
  );
};

export default EditJobPage;
