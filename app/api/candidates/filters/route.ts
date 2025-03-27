// app/api/candidates/filters/route.ts
import { auth } from "@/app/utils/auth";
import { prisma } from "@/app/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get the current user session
    const session = await auth();

    // Check if user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be logged in to access saved filters" },
        { status: 401 }
      );
    }

    // Get the company profile associated with the current user
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { Company: true },
    });

    if (!user?.Company?.id) {
      return NextResponse.json(
        { error: "No company profile found for this user" },
        { status: 404 }
      );
    }

    // Fetch all saved filters for this company
    const savedFilters = await prisma.candidateFilter.findMany({
      where: {
        companyId: user.Company.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(savedFilters);
  } catch (error) {
    console.error("Error fetching saved filters:", error);
    return NextResponse.json(
      { error: "Failed to load saved filters" },
      { status: 500 }
    );
  }
}
