// app/api/recruiter/plans/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET() {
  const plans = await prisma.plan.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" },
  });

  return NextResponse.json(
    plans.map((plan) => ({
      ...plan,
      isPopular: plan.name === "Professional", // Marquer un plan comme populaire
    }))
  );
}
