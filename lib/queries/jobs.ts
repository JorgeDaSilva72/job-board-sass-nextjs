import { prisma } from "@/app/utils/db";

export async function getJobs(userId: string) {
  return await prisma.jobPost.findMany({
    where: {
      company: {
        userId: userId,
      },
    },
    select: {
      id: true,
      jobTitle: true,
      status: true,
      createdAt: true,
      company: {
        select: {
          name: true,
          logo: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
