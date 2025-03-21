import { prisma } from "@/app/utils/db";

export async function getApplications(userId: string) {
  const data = await prisma.jobApplication.findMany({
    where: {
      jobSeeker: {
        userId: userId,
      },
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      jobPost: {
        select: {
          id: true,
          jobTitle: true,
          company: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}
