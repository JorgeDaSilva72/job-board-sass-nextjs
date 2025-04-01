// import { prisma } from "@/app/utils/db";
// import { EmptyState } from "./EmptyState";
// import { PaginationComponent } from "./PaginationComponent";
// import { JobCard } from "./JobCard";
// import { JobPostStatus } from "@prisma/client";

// async function getJobs(
//   page: number = 1,
//   pageSize: number = 12,
//   jobTypes: string[] = [],
//   location: string = ""
// ) {
//   const skip = (page - 1) * pageSize;

//   const where = {
//     status: JobPostStatus.ACTIVE,
//     ...(jobTypes.length > 0 && {
//       employmentType: {
//         in: jobTypes,
//       },
//     }),
//     ...(location &&
//       location !== "worldwide" && {
//         location: location,
//       }),
//   };

//   const [data, totalCount] = await Promise.all([
//     prisma.jobPost.findMany({
//       skip,
//       take: pageSize,
//       where,
//       select: {
//         jobTitle: true,
//         id: true,
//         salaryFrom: true,
//         salaryTo: true,
//         employmentType: true,
//         location: true,
//         createdAt: true,
//         company: {
//           select: {
//             name: true,
//             logo: true,
//             location: true,
//             about: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     }),
//     prisma.jobPost.count({ where }),
//   ]);

//   return {
//     jobs: data,
//     totalPages: Math.ceil(totalCount / pageSize),
//     currentPage: page,
//   };
// }

// export default async function JobListings({
//   currentPage,
//   jobTypes,
//   location,
//   pageSize,
// }: {
//   currentPage: number;
//   jobTypes: string[];
//   location: string;
//   pageSize?: number;
// }) {
//   const {
//     jobs,
//     totalPages,
//     currentPage: page,
//   } = await getJobs(currentPage, pageSize, jobTypes, location);

//   return (
//     <>
//       {jobs.length > 0 ? (
//         <div className="flex flex-col gap-6">
//           {jobs.map((job, index) => (
//             <JobCard job={job} key={index} />
//           ))}
//         </div>
//       ) : (
//         <EmptyState
//           title="No jobs found"
//           description="Try searching for a different job type or location."
//           buttonText="Clear all filters"
//           href="/find-job"
//         />
//       )}

//       <div className="flex justify-center mt-6">
//         <PaginationComponent totalPages={totalPages} currentPage={page} />
//       </div>
//     </>
//   );
// }
// END --------------------------------
// BEGIN----------------------------

import { prisma } from "@/app/utils/db";
import { EmptyState } from "./EmptyState";
import { PaginationComponent } from "./PaginationComponent";
import { JobCard } from "./JobCard";
import {
  JobPostStatus,
  ExperienceLevel,
  EducationLevel,
  JobType,
  Prisma,
} from "@prisma/client";

async function getJobs(
  page: number = 1,
  pageSize: number = 12,
  filters: {
    jobTypes?: string[];
    location?: string;
    experience?: string[];
    education?: string[];
    remote?: boolean;
    minSalary?: number;
    maxSalary?: number;
    skills?: string;
    companySize?: string;
  } = {}
) {
  const skip = (page - 1) * pageSize;

  // Convertir les compétences en tableau et nettoyer
  const skillsArray = filters.skills
    ? filters.skills.split(",").map((skill) => skill.trim().toLowerCase())
    : [];

  const where: Prisma.JobPostWhereInput = {
    status: JobPostStatus.ACTIVE,
    // Filtre par type d'emploi
    ...(filters.jobTypes &&
      filters.jobTypes.length > 0 && {
        employmentType: {
          in: filters.jobTypes as JobType[], // Cast explicite vers le enum
        },
      }),
    // Filtre par localisation
    ...(filters.location &&
      filters.location !== "worldwide" && {
        location: filters.location,
      }),
    // Filtre remote
    ...(filters.remote && {
      remote: true,
    }),
    // Filtre par salaire
    ...((filters.minSalary || filters.maxSalary) && {
      AND: [
        ...(filters.minSalary
          ? [{ salaryFrom: { gte: filters.minSalary } }]
          : []),
        ...(filters.maxSalary
          ? [{ salaryTo: { lte: filters.maxSalary } }]
          : []),
      ],
    }),
    // Filtre par compétences (recherche dans le titre ou la description)
    ...(skillsArray.length > 0 && {
      OR: skillsArray.map((skill) => ({
        OR: [
          {
            jobTitle: {
              contains: skill,
              mode: "insensitive",
            },
          },
          {
            jobDescription: {
              contains: skill,
              mode: "insensitive",
            },
          },
        ],
      })),
    }),
    // Filtre par niveau d'expérience
    ...(filters.experience &&
      filters.experience.length > 0 && {
        experienceLevel: {
          in: filters.experience as ExperienceLevel[], // Cast explicite
        },
      }),
    // Filtre par niveau d'éducation
    ...(filters.education &&
      filters.education.length > 0 && {
        educationLevel: {
          in: filters.education as EducationLevel[], // Cast explicite
        },
      }),
    // Filtre par taille d'entreprise
    ...(filters.companySize && {
      company: {
        companySize: filters.companySize,
      },
    }),
  };

  const [data, totalCount] = await Promise.all([
    prisma.jobPost.findMany({
      skip,
      take: pageSize,
      where,
      select: {
        id: true,
        jobTitle: true,
        employmentType: true,
        location: true,
        // remote: true,
        salaryFrom: true,
        salaryTo: true,
        // experienceLevel: true,
        // educationLevel: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            name: true,
            logo: true,
            location: true,
            about: true,
            companySize: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.jobPost.count({ where }),
  ]);

  return {
    jobs: data,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export default async function JobListings({
  currentPage,
  jobTypes = [],
  location = "",
  experience = [],
  education = [],
  remote = false,
  minSalary,
  maxSalary,
  skills = "",
  companySize = "",
  pageSize = 12,
}: {
  currentPage: number;
  jobTypes?: string[];
  location?: string;
  experience?: string[];
  education?: string[];
  remote?: boolean;
  minSalary?: number;
  maxSalary?: number;
  skills?: string;
  companySize?: string;
  pageSize?: number;
}) {
  const {
    jobs,
    totalPages,
    currentPage: page,
  } = await getJobs(currentPage, pageSize, {
    jobTypes,
    location,
    experience,
    education,
    remote,
    minSalary,
    maxSalary,
    skills,
    companySize,
  });

  return (
    <>
      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={{
                ...job,
                employmentType: job.employmentType as JobType,
                // experienceLevel: job.experienceLevel as ExperienceLevel,
                // educationLevel: job.educationLevel as EducationLevel,
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No jobs found"
          description="Try adjusting your search filters or clear all filters to see more results."
          buttonText="Clear all filters"
          href="/find-job"
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <PaginationComponent totalPages={totalPages} currentPage={page} />
        </div>
      )}
    </>
  );
}
