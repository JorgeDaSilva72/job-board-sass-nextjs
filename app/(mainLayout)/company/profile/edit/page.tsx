import { getCompanyProfile } from "@/app/actions";
import EditCompanyForm from "@/components/forms/EditCompanyForm";

import { notFound } from "next/navigation";
import React from "react";

const EditCompanyPage = async () => {
  const company = await getCompanyProfile();

  if (!company) {
    return notFound();
  }

  return (
    <>
      <EditCompanyForm company={company} />
    </>
  );
};

export default EditCompanyPage;
