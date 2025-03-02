import { getCompanyProfile } from "@/app/actions";
import EditCompanyForm from "@/components/forms/EditCompanyForm";

import { notFound } from "next/navigation";
import React from "react";

// 🚀 Force Next.js à utiliser le rendu dynamique
export const dynamic = "force-dynamic";

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
