// import { NextResponse } from "next/server";
// import { prisma } from "@/app/utils/db";

// export async function GET() {
//   const plans = await prisma.plan.findMany({
//     where: { isActive: true },
//     orderBy: { price: "asc" },
//   });

//   return NextResponse.json(
//     plans.map((plan) => ({
//       ...plan,
//       // isPopular: plan.name === "Professional", // Marquer un plan comme populaire
//     }))
//   );
// }
import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/db";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
      select: {
        id: true,
        name: true,
        price: true,
        duration: true,
        features: true,
        isPopular: true,
      },
    });

    // Transformation des données pour le format attendu par le frontend
    const formattedPlans = plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: Number(plan.price), // Conversion de Decimal en Number pour JSON
      duration: plan.duration,
      features: Array.isArray(plan.features) ? plan.features : [], // Assure que features est un tableau
      isPopular: plan.isPopular,
    }));

    return NextResponse.json(formattedPlans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch plans" },
      { status: 500 }
    );
  }
}
