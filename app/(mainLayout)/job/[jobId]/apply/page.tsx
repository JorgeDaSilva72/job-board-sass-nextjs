import { getUserType } from "@/lib/userUtils";
import { prisma } from "@/app/utils/db";
import { notFound, redirect } from "next/navigation";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { requireUser } from "@/app/utils/hooks";

// Désactiver l'erreur ESLint pour cette ligne spécifique
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ApplyPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const user = await requireUser();
  if (!user || !user.id) {
    redirect("/login?error=unauthorized");
  }

  const { type, data } = await getUserType(user.id);
  if (type !== "JOB_SEEKER" || !data?.id) {
    redirect("/find-job?error=not_a_job_seeker");
  }

  // const jobPost = await prisma.jobPost.findUnique({
  //   where: { id: params.jobId, status: "ACTIVE" },
  //   include: { company: { select: { name: true } } },
  // });

  const jobPost = await prisma.jobPost.findUnique({
    where: { id: jobId, status: "ACTIVE" },
    include: {
      company: { select: { name: true } },
      applications: {
        where: { jobSeekerId: data.id },
        select: { id: true }, // On récupère juste l'ID pour voir s'il existe
      },
    },
  });

  // // Vérifier si déjà postulé
  // const existingApplication = await prisma.jobApplication.findFirst({
  //   where: {
  //     jobPostId: params.jobId,
  //     jobSeekerId: data?.id,
  //   },
  // });

  if (!jobPost) {
    notFound();
  }

  // if (existingApplication) {
  //   redirect(`/dashboard/applications?toast=already_applied`);
  // }

  if (jobPost.applications.length > 0) {
    redirect(`/job-seeker/applications?toast=already_applied`);
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">
        Postuler à: {jobPost?.jobTitle}
      </h1>
      <p className="mb-8">Entreprise: {jobPost?.company.name}</p>

      <JobApplicationForm
        jobId={jobId}
        jobSeekerId={data.id}
        //  resumeUrl={data?.resume}
      />
    </div>
  );
}
