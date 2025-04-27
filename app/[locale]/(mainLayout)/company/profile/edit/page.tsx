import { getCompanyProfile } from "@/app/actions";
import EditCompanyForm from "@/components/forms/EditCompanyForm";

import { notFound } from "next/navigation";
import React from "react";

// 🚀 Force Next.js à utiliser le rendu dynamique
export const dynamic = "force-dynamic";

const EditCompanyPage = async () => {
  const response = await getCompanyProfile();

  if (!response.success || !response.data) {
    return notFound();
  }

  return (
    <>
      <EditCompanyForm company={response.data} />
    </>
  );
};

export default EditCompanyPage;
