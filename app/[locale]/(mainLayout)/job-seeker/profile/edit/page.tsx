import { getJobSeekerProfile } from "@/app/actions";
import EditJobSeekerForm from "@/components/forms/EditJobSeekerForm";

import { notFound } from "next/navigation";
import React from "react";

const EditJobPage = async () => {
  const response = await getJobSeekerProfile();

  if (!response.success || !response.data) {
    return notFound();
  }

  return (
    <>
      <EditJobSeekerForm jobSeeker={response.data} />
    </>
  );
};

export default EditJobPage;
