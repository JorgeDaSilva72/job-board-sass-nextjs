import { checkSubscriptionExpirations } from "@/app/utils/subscriptions";
import { NextResponse } from "next/server";

// Clé API secrète pour sécuriser l'endpoint (stockée dans les variables d'environnement)
const CRON_API_KEY = process.env.CRON_API_KEY;

export async function GET(request: Request) {
  // Vérification de la clé API pour sécuriser l'endpoint
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("apiKey");

  if (apiKey !== CRON_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await checkSubscriptionExpirations();
    console.log("Vérification des abonnements terminée avec succès");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de la vérification des abonnements:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
