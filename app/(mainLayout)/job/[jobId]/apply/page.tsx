// import JobApplicationPage from "@/components/general/JobApplicationPage";

// const ApplyJobPage = () => {
//   //   const { jobData } = await getJob(params.jobId);
//   //   return <JobApplicationPage jobData={jobData} />;
//   return <JobApplicationPage />;
// };

// export default ApplyJobPage;

import { auth } from "@/app/utils/auth";
import { getUserType } from "@/lib/userUtils";
import { prisma } from "@/app/utils/db";
import { redirect } from "next/navigation";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";

export default async function ApplyPage({
  params,
}: {
  params: { jobId: string };
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect(
      "/login?callbackUrl=" + encodeURIComponent(`/job/${params.jobId}/apply`)
    );
  }

  const { type, data } = await getUserType(session.user.id);
  if (type !== "JOB_SEEKER") {
    redirect("/dashboard");
  }

  const jobPost = await prisma.jobPost.findUnique({
    where: { id: params.jobId, status: "ACTIVE" },
    include: { company: { select: { name: true } } },
  });

  if (!jobPost) {
    redirect("/jobs");
  }

  // Vérifier si déjà postulé
  const existingApplication = await prisma.jobApplication.findFirst({
    where: {
      jobPostId: params.jobId,
      jobSeekerId: data?.id,
    },
  });

  if (existingApplication) {
    redirect(`/dashboard/applications`);
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        Postuler à: {jobPost.jobTitle}
      </h1>
      <p className="mb-8">Entreprise: {jobPost.company.name}</p>

      <JobApplicationForm
        jobId={params.jobId}
        jobSeekerId={data?.id!}
        // resumeUrl={data?.resume}
      />
    </div>
  );
}
