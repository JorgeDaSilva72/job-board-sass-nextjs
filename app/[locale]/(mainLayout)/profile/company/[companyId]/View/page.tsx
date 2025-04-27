import { getCompanyProfileById } from "@/app/actions";
import { redirect } from "next/navigation";
import CompanyProfileViewById from "@/components/forms/CompanyProfileViewById";

// 🚀 Force Next.js à utiliser le rendu dynamique
export const dynamic = "force-dynamic";

export default async function CompanyProfilePageById({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  // const userData: CompanyProfileData | null = await getCompanyProfile();

  const response = await getCompanyProfileById(companyId);

  if (!response.success || !response.data) {
    redirect("/find-job");
  }

  return <CompanyProfileViewById company={response.data} />;
}
