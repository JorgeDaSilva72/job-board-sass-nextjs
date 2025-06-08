// import { EmptyState } from "@/components/general/EmptyState";
// import React from "react";

// import { JobCard } from "@/components/general/JobCard";

// import { prisma } from "@/app/utils/db";
// import { requireUser } from "@/app/utils/hooks";

// async function getFavorites(userId: string) {
//   const data = await prisma.savedJobPost.findMany({
//     where: {
//       userId: userId,
//     },
//     select: {
//       job: {
//         select: {
//           id: true,
//           jobTitle: true,
//           salaryFrom: true,
//           salaryTo: true,
//           employmentType: true,
//           location: true,
//           createdAt: true,
//           company: {
//             select: {
//               name: true,
//               logo: true,
//               location: true,
//               about: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   return data;
// }

// const FavoritesPage = async () => {
//   const session = await requireUser();
//   const favorites = await getFavorites(session.id as string);

//   if (favorites.length === 0) {
//     return (
//       <EmptyState
//         title="No favorites found"
//         description="You don't have any favorites yet."
//         buttonText="Find a job"
//         href="/find-job"
//       />
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 mt-5   gap-4">
//       {favorites.map((favorite) => (
//         <JobCard job={favorite.job} key={favorite.job.id} />
//       ))}
//     </div>
//   );
// };

// export default FavoritesPage;

// 08/06/2025 inyegration de next-intl
// BEGIN

import { EmptyState } from "@/components/general/EmptyState";
import React from "react";
import { JobCard } from "@/components/general/JobCard";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";
import { getTranslations } from "next-intl/server";
// import { Link } from "@/i18n/navigation";

async function getFavorites(userId: string) {
  const data = await prisma.savedJobPost.findMany({
    where: {
      userId: userId,
    },
    select: {
      job: {
        select: {
          id: true,
          jobTitle: true,
          salaryFrom: true,
          salaryTo: true,
          employmentType: true,
          location: true,
          createdAt: true,
          company: {
            select: {
              name: true,
              logo: true,
              location: true,
              about: true,
            },
          },
        },
      },
    },
  });

  return data;
}

const FavoritesPage = async () => {
  const session = await requireUser();
  const favorites = await getFavorites(session.id as string);
  const t = await getTranslations("FavoritesPage");

  if (favorites.length === 0) {
    return (
      <EmptyState
        title={t("emptyState.title")}
        description={t("emptyState.description")}
        buttonText={t("emptyState.buttonText")}
        href="/find-job"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 mt-5 gap-4">
      {favorites.map((favorite) => (
        // <JobCard
        //   job={favorite.job}
        //   key={favorite.job.id}
        //   translations={{
        //     salary: t('jobCard.salary'),
        //     posted: t('jobCard.posted'),
        //     ago: t('jobCard.ago'),
        //     days: t('jobCard.days'),
        //   }}
        // />
        <JobCard job={favorite.job} key={favorite.job.id} />
      ))}
    </div>
  );
};

export default FavoritesPage;
