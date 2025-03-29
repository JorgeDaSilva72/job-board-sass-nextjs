import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Verify user session
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "You must be logged in" },
        { status: 401 }
      );
    }

    // Find the company associated with the logged-in user
    const company = await prisma.company.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!company) {
      return NextResponse.json(
        { message: "Company profile not found" },
        { status: 403 }
      );
    }

    // Retrieve job posts for the company
    const jobPosts = await prisma.jobPost.findMany({
      where: {
        companyId: company.id,
      },
      include: {
        _count: {
          select: { applications: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform the response to match frontend expectations
    const formattedJobPosts = jobPosts.map((post) => ({
      id: post.id,
      jobTitle: post.jobTitle,
      status: post.status,
      createdAt: post.createdAt,
      applications: Array(post._count.applications).fill(null), // Create an array of applications
      employmentType: post.employmentType,
      location: post.location,
      salaryRange:
        post.salaryFrom && post.salaryTo
          ? `${post.salaryFrom} - ${post.salaryTo}`
          : "N/A",
    }));

    return NextResponse.json(formattedJobPosts);
  } catch (error) {
    console.error("GET Job Posts API Error:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  } finally {
    // Ensure Prisma connection is closed
    //await prisma.$disconnect();
  }
}
