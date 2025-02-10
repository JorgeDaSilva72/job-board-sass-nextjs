// we need a webhook because payments are not synchronous

import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Méthode non autorisée" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
// Gérer la méthode GET (optionnel, pour les tests)
export async function GET(req: Request) {
  console.log("GET request received on /api/webhook/stripe");
  return methodNotAllowed();
}
// Gérer la méthode PUT (optionnel, pour les tests)
export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE(req: Request) {
  return methodNotAllowed();
}

export async function POST(req: Request) {
  try {
    // 1. Logging initial request
    console.log("🔵 POST reçu sur /api/webhook/stripe");
    // 2. Get request body and validate signature
    const body = await req.text();
    console.log("🔵 Body reçu:", body.substring(0, 100) + "..."); // On limite l'affichage pour la lisibilité
    const headersList = await headers();

    const signature = headersList.get("Stripe-Signature") as string;
    console.log("🔹 Signature Stripe :", signature);
    console.log(
      "🔵 STRIPE_WEBHOOK_SECRET:",
      process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10) + "..."
    );

    if (!signature) {
      console.error("❌ Signature Stripe manquante");
      return new Response("Signature manquante", { status: 400 });
    }
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      console.error("❌ STRIPE_WEBHOOK_SECRET non défini");
      return new Response("Configuration error", { status: 500 });
    }

    // 3. Construct and validate Stripe event
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
      console.log("🟢 Événement Stripe validé :", event.type);
    } catch (err) {
      console.error("❌ Erreur lors de la validation du webhook :", err);
      return new Response(
        `Webhook Error: ${
          err instanceof Error ? err.message : "Unknown Error"
        }`,
        { status: 400 }
      );
    }
    // 4. Handle checkout.session.completed event

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("🔹 Données de la session :", session);

      // Validate required data
      const customerId = session.customer as string;
      const jobId = session.metadata?.jobId;
      console.log("🔹 Customer ID :", customerId);
      console.log("🔹 Job ID :", jobId);

      console.log("🔵 Session data:", {
        customerId,
        jobId,
        metadata: session.metadata,
        object: session.object,
        eventType: event.type,
      });

      if (!customerId || !jobId) {
        console.error("❌ Données manquantes:", { customerId, jobId });
        // Pour les tests, on peut retourner un succès même si les données sont manquantes
        // return NextResponse.json(
        //   { message: "Test webhook received successfully" },
        //   { status: 200 }
        // );
        return new Response("Missing required data", { status: 400 });
      }

      // const user = await prisma.user.findUnique({
      //   where: {
      //     stripeCustomerId: customerId,
      //   },
      // });

      // if (!user) throw new Error("User not found...");

      // Find company
      const company = await prisma.user.findUnique({
        where: {
          stripeCustomerId: customerId,
        },
        select: {
          Company: {
            select: {
              id: true,
            },
          },
        },
      });

      if (!company?.Company?.id) {
        console.error(
          "❌ Entreprise non trouvée pour le customerId:",
          customerId
        );
        return new Response("Company not found", { status: 404 });
      }

      // Update the job post status to PUBLISHED
      try {
        const updatedJob = await prisma.jobPost.update({
          where: {
            id: jobId,
            companyId: company?.Company?.id as string, // Ensure the job belongs to the user
          },
          data: {
            status: "ACTIVE",
          },
          select: { id: true, status: true },
        });
        console.log("🟢 Annonce mise à jour avec succès:", updatedJob);
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.error("❌ Erreur lors de la mise à jour de l'annonce :", err);
        return new Response(
          `Update failed: ${
            err instanceof Error ? err.message : "Unknown Error"
          }`,
          { status: 500 }
        );
      }
    }

    // 5. Handle other event types if needed
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    // Global error handler
    console.error("❌ Erreur globale du webhook:", err);
    return new Response(
      `Server Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 500 }
    );
  }
}
