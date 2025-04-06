// // we need a webhook because payments are not synchronous

// import { prisma } from "@/app/utils/db";
// import { stripe } from "@/app/utils/stripe";
// import { headers } from "next/headers";
// import Stripe from "stripe";
// import { NextResponse } from "next/server";

// function methodNotAllowed() {
//   return NextResponse.json(
//     { error: "Méthode non autorisée" },
//     { status: 405, headers: { Allow: "POST" } }
//   );
// }
// // Gérer la méthode GET (optionnel, pour les tests)
// export async function GET() {
//   console.log("GET request received on /api/webhook/stripe");
//   return methodNotAllowed();
// }
// // Gérer la méthode PUT (optionnel, pour les tests)
// export async function PUT() {
//   return methodNotAllowed();
// }

// export async function DELETE() {
//   return methodNotAllowed();
// }

// export async function POST(req: Request) {
//   try {
//     // 1. Logging initial request
//     console.log("🔵 POST reçu sur /api/webhook/stripe");
//     // 2. Get request body and validate signature
//     const body = await req.text();
//     console.log("🔵 Body reçu:", body.substring(0, 100) + "..."); // On limite l'affichage pour la lisibilité
//     const headersList = await headers();

//     const signature = headersList.get("Stripe-Signature") as string;
//     console.log("🔹 Signature Stripe :", signature);
//     console.log(
//       "🔵 STRIPE_WEBHOOK_SECRET:",
//       process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 10) + "..."
//     );

//     if (!signature) {
//       console.error("❌ Signature Stripe manquante");
//       return new Response("Signature manquante", { status: 400 });
//     }
//     if (!process.env.STRIPE_WEBHOOK_SECRET) {
//       console.error("❌ STRIPE_WEBHOOK_SECRET non défini");
//       return new Response("Configuration error", { status: 500 });
//     }

//     // 3. Construct and validate Stripe event
//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET as string
//       );
//       console.log("🟢 Événement Stripe validé :", event.type);
//     } catch (err) {
//       console.error("❌ Erreur lors de la validation du webhook :", err);
//       return new Response(
//         `Webhook Error: ${
//           err instanceof Error ? err.message : "Unknown Error"
//         }`,
//         { status: 400 }
//       );
//     }
//     // 4. Handle checkout.session.completed event

//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
//       console.log("🔹 Données de la session :", session);

//       // Validate required data
//       const customerId = session.customer as string;
//       const jobId = session.metadata?.jobId;
//       console.log("🔹 Customer ID :", customerId);
//       console.log("🔹 Job ID :", jobId);

//       console.log("🔵 Session data:", {
//         customerId,
//         jobId,
//         metadata: session.metadata,
//         object: session.object,
//         eventType: event.type,
//       });

//       if (!customerId || !jobId) {
//         console.error("❌ Données manquantes:", { customerId, jobId });
//         // Pour les tests, on peut retourner un succès même si les données sont manquantes
//         // return NextResponse.json(
//         //   { message: "Test webhook received successfully" },
//         //   { status: 200 }
//         // );
//         return new Response("Missing required data", { status: 400 });
//       }

//       // const user = await prisma.user.findUnique({
//       //   where: {
//       //     stripeCustomerId: customerId,
//       //   },
//       // });

//       // if (!user) throw new Error("User not found...");

//       // Find company
//       const company = await prisma.user.findUnique({
//         where: {
//           stripeCustomerId: customerId,
//         },
//         select: {
//           Company: {
//             select: {
//               id: true,
//             },
//           },
//         },
//       });

//       if (!company?.Company?.id) {
//         console.error(
//           "❌ Entreprise non trouvée pour le customerId:",
//           customerId
//         );
//         return new Response("Company not found", { status: 404 });
//       }

//       // Update the job post status to PUBLISHED
//       try {
//         const updatedJob = await prisma.jobPost.update({
//           where: {
//             id: jobId,
//             companyId: company?.Company?.id as string, // Ensure the job belongs to the user
//           },
//           data: {
//             status: "ACTIVE",
//           },
//           select: { id: true, status: true },
//         });
//         console.log("🟢 Annonce mise à jour avec succès:", updatedJob);
//         return new Response(JSON.stringify({ success: true }), {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         });
//       } catch (err) {
//         console.error("❌ Erreur lors de la mise à jour de l'annonce :", err);
//         return new Response(
//           `Update failed: ${
//             err instanceof Error ? err.message : "Unknown Error"
//           }`,
//           { status: 500 }
//         );
//       }
//     }

//     // 5. Handle other event types if needed
//     return new Response(JSON.stringify({ received: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     // Global error handler
//     console.error("❌ Erreur globale du webhook:", err);
//     return new Response(
//       `Server Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
//       { status: 500 }
//     );
//   }
// }

// ------------------------------------------
import { prisma } from "@/app/utils/db";
import { stripe } from "@/app/utils/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { addDays } from "date-fns";

function methodNotAllowed() {
  return NextResponse.json(
    { error: "Méthode non autorisée" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

export async function GET() {
  console.log("GET request received on /api/webhook/stripe");
  return methodNotAllowed();
}

export async function PUT() {
  return methodNotAllowed();
}

export async function DELETE() {
  return methodNotAllowed();
}

export async function POST(req: Request) {
  try {
    console.log("🔵 POST reçu sur /api/webhook/stripe");
    const body = await req.text();
    console.log("🔵 Body reçu:", body.substring(0, 100) + "...");

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

    // Gérer différents types d'événements
    switch (event.type) {
      // Pour les annonces d'emploi
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("🔹 Données de la session :", session);

        // Déterminer le type de paiement basé sur les métadonnées
        const paymentType = session.metadata?.paymentType;
        console.log("🔹 Type de paiement:", paymentType);

        // Si c'est un paiement pour une annonce d'emploi
        if (paymentType === "job_creation") {
          return await handleJobPayment(session);
        }

        // Si c'est un paiement pour un renouvelement d annonce d'emploi
        if (paymentType === "job_renewal" || session.metadata?.duration) {
          return await handleJobRenewal(session);
        }

        // Si c'est un paiement unique pour l'accès à la base de données candidats
        if (paymentType === "one_time_access" || session.metadata?.planId) {
          return await handleOneTimeAccessPayment(session);
        }

        // Si c'est un paiement pour un abonnement
        // if (paymentType === "subscription" || session.metadata?.planId) {
        //   return await handleSubscriptionCreated(session);
        // }

        // Si aucun type n'est spécifié, on tente de déterminer par la présence des métadonnées
        // if (session.metadata?.jobId) {
        //   return await handleJobPayment(session);
        // } else if (session.metadata?.planId) {
        //   return await handleSubscriptionCreated(session);
        // }

        console.warn(
          "⚠️ Type de paiement non identifié dans la session:",
          session.metadata
        );
        return new Response("Payment type not identified", { status: 400 });
      }

      // Pour les mises à jour d'abonnement
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        return await handleSubscriptionUpdated(subscription);
      }

      // Pour les factures payées (renouvellements d'abonnement)
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;
        return await handleInvoicePaid(invoice);
      }

      // Événements non traités
      default:
        console.log(`🔹 Événement non traité: ${event.type}`);
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    }
  } catch (err) {
    console.error("❌ Erreur globale du webhook:", err);
    return new Response(
      `Server Error: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 500 }
    );
  }
}

// Fonction pour gérer les paiements d'annonces
async function handleJobPayment(session: Stripe.Checkout.Session) {
  console.log("🔹 Traitement du paiement d'annonce d'emploi");

  const customerId = session.customer as string;
  const jobId = session.metadata?.jobId;
  const duration = session.metadata?.duration;

  if (!customerId || !jobId || !duration) {
    console.error("❌ Métadonnées manquantes:");
    return new Response("Missing required data", { status: 400 });
  }

  console.log("🔹 Customer ID :", customerId);
  console.log("🔹 Job ID :", jobId);
  console.log("🔹 Duration :", duration);

  const durationDays = parseInt(duration || "0", 10); // Convertit la valeur obtenue en un entier en base 10 (10 indique la base décimale).

  if (isNaN(durationDays) || durationDays <= 0) {
    console.error("❌ Durée invalide:", session.metadata?.duration);
    return new Response("Invalid duration", { status: 400 });
  }
  try {
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

    //  Calculer la nouvelle date d'expiration
    // const newExpiresAt = new Date();
    // newExpiresAt.setDate(newExpiresAt.getDate() + durationDays);

    //newExpiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    const newExpiresAt = addDays(new Date(), durationDays);
    // 4. Mettre à jour l'annonce avec TOUS les champs nécessaires
    const updatedJob = await prisma.jobPost.update({
      where: {
        id: jobId,
        companyId: company?.Company?.id as string,
      },
      data: {
        status: "ACTIVE",
        listingDuration: durationDays,
        expiresAt: newExpiresAt,
      },
      select: {
        id: true,
        status: true,
        listingDuration: true,
        expiresAt: true,
      },
    });

    console.log("🟢 Annonce mise à jour avec succès:", updatedJob);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Erreur lors de la mise à jour de l'annonce :", err);
    return new Response(
      `Update failed: ${err instanceof Error ? err.message : "Unknown Error"}`,
      { status: 500 }
    );
  }
}

// Fonction pour gérer la création d'abonnement
// async function handleSubscriptionCreated(session: Stripe.Checkout.Session) {
//   console.log("🔹 [SUBSCRIPTION] Traitement de la création d'abonnement");
//   console.log("🔹 Session complète:", JSON.stringify(session, null, 2));

//   // 1. Validation des métadonnées

//   const customerId = session.customer as string;
//   const planId = session.metadata?.planId;
//   const userId = session.metadata?.userId;
//   const subscriptionId = session.subscription as string;

//   console.log("🔹 Customer ID:", customerId);
//   console.log("🔹 Plan ID:", planId);
//   console.log("🔹 User ID:", userId);
//   console.log("🔹 Subscription ID:", subscriptionId);

//   if (!customerId || !planId || !userId || !subscriptionId) {
//     console.error("❌ [SUBSCRIPTION] Données manquantes:", {
//       customerId,
//       planId,
//       userId,
//       subscriptionId,
//     });
//     return new Response("Missing required subscription data", { status: 400 });
//   }

//   try {
//     // 2.Récupérer les détails de l'abonnement Stripe
//     const stripeSubscription = await stripe.subscriptions.retrieve(
//       subscriptionId
//     );
//     console.log("🔹 Données de l'abonnement Stripe:", {
//       status: stripeSubscription.status,
//       current_period_end: stripeSubscription.current_period_end,
//     });

//     // Calculer la date de fin basée sur la période de facturation
//     const endDate = new Date(stripeSubscription.current_period_end * 1000);
//     // const status =
//     //   stripeSubscription.status === "active" ? "ACTIVE" : "PENDING"; // ajout

//     // pour le DEBUG
//     const pendingSubscription = await prisma.subscription.findFirst({
//       where: {
//         userId: userId,
//         planId: planId,
//         status: "PENDING",
//       },
//     });
//     console.log("🔹 Abonnement PENDING trouvé:", pendingSubscription);
//     // Mettre à jour l'abonnement dans la base de données
//     const updatedSubscription = await prisma.subscription.updateMany({
//       where: {
//         userId: userId,
//         planId: planId,
//         status: "PENDING",
//         stripeSubscriptionId: subscriptionId,
//       },
//       data: {
//         status: "ACTIVE",
//         endDate: endDate,
//         stripeSubscriptionId: subscriptionId,
//       },
//     });

//     console.log(
//       "🟢 [SUBSCRIPTION] Abonnement mis à jour avec succès:",
//       updatedSubscription
//     );
//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error(
//       "❌ [SUBSCRIPTION]  Erreur lors de la mise à jour de l'abonnement:",
//       err
//     );
//     return new Response(
//       `Subscription update failed: ${
//         err instanceof Error ? err.message : "Unknown Error"
//       }`,
//       { status: 500 }
//     );
//   }
// }

// Nouvelle fonction pour gérer les mises à jour d'abonnement
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log("🔹 Traitement de la mise à jour d'abonnement");

  const subscriptionId = subscription.id;
  const status = subscription.status;

  console.log("🔹 Stripe Subscription ID:", subscriptionId);
  console.log("🔹 Status:", status);

  try {
    // Récupérer l'abonnement dans notre base de données
    const dbSubscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!dbSubscription) {
      console.error(
        "❌ Aucun abonnement trouvé avec l'ID Stripe:",
        subscriptionId
      );
      return new Response("Subscription not found", { status: 404 });
    }

    // Mapper le statut Stripe à notre statut interne
    let appStatus: string;
    switch (status) {
      case "active":
        appStatus = "ACTIVE";
        break;
      case "canceled":
      case "unpaid":
        appStatus = "CANCELED";
        break;
      case "past_due":
        appStatus = "ACTIVE"; // Vous pouvez choisir "ACTIVE" ou ajouter un nouveau statut comme "PAST_DUE"
        break;
      default:
        appStatus = "PENDING";
    }

    // Calculer la date de fin
    const endDate = new Date(subscription.current_period_end * 1000);

    // Mettre à jour l'abonnement
    const updated = await prisma.subscription.update({
      where: { id: dbSubscription.id },
      data: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        status: appStatus as any, // Cast pour correspondre à votre enum
        endDate: endDate,
      },
    });

    console.log("🟢 Statut d'abonnement mis à jour:", {
      id: updated.id,
      status: updated.status,
      endDate: updated.endDate,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(
      "❌ Erreur lors de la mise à jour du statut d'abonnement:",
      err
    );
    return new Response(
      `Subscription status update failed: ${
        err instanceof Error ? err.message : "Unknown Error"
      }`,
      { status: 500 }
    );
  }
}

// Nouvelle fonction pour gérer les factures payées
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log("🔹 Traitement de la facture payée");

  if (!invoice.subscription) {
    console.log("⚠️ La facture n'est pas associée à un abonnement");
    return new Response(JSON.stringify({ received: true }), { status: 200 });
  }

  const subscriptionId = invoice.subscription as string;
  console.log("🔹 ID d'abonnement associé:", subscriptionId);

  try {
    // Récupérer l'abonnement dans Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscriptionId
    );

    // Récupérer l'abonnement dans notre base de données
    const subscription = await prisma.subscription.findFirst({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!subscription) {
      console.error(
        "❌ Aucun abonnement trouvé avec l'ID Stripe:",
        subscriptionId
      );
      return new Response("Subscription not found", { status: 404 });
    }

    // Calculer la nouvelle date de fin basée sur la période de facturation
    const endDate = new Date(stripeSubscription.current_period_end * 1000);

    // Mettre à jour l'abonnement
    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "ACTIVE",
        endDate: endDate,
      },
    });

    console.log("🟢 Abonnement renouvelé avec succès:", {
      id: updated.id,
      endDate: updated.endDate,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Erreur lors du traitement du paiement de facture:", err);
    return new Response(
      `Invoice processing failed: ${
        err instanceof Error ? err.message : "Unknown Error"
      }`,
      { status: 500 }
    );
  }
}
// Votre fonction pour gérer les paiements de renouvellement d'annonces
async function handleJobRenewal(session: Stripe.Checkout.Session) {
  console.log("🔹 Traitement du paiement de renouvellement d'annonce d'emploi");

  // 1. Validation des métadonnées

  const customerId = session.customer as string;
  const jobId = session.metadata?.jobId;
  const duration = session.metadata?.duration;

  if (!customerId || !jobId || !duration) {
    console.error("❌ Métadonnées manquantes");
    return new Response("Missing metadata", { status: 400 });
  }

  console.log("🔹 Customer ID :", customerId);
  console.log("🔹 Job ID :", jobId);
  console.log("🔹 Duration :", duration);

  // 2. Conversion de la durée
  const durationDays = Math.max(1, parseInt(duration, 10));
  if (isNaN(durationDays)) {
    console.error("❌ Durée invalide:", duration);
    return new Response("Invalid duration", { status: 400 });
  }

  try {
    // 3. Trouver l'entreprise associée au customer Stripe
    const company = await prisma.company.findFirst({
      where: {
        user: {
          stripeCustomerId: customerId,
        },
      },
      select: {
        id: true,
      },
    });

    if (!company?.id) {
      console.error(
        "❌ Entreprise non trouvée pour le customerId:",
        customerId
      );

      return new Response("Company not found", { status: 404 });
    }

    // 4. Vérifier que le job existe et appartient à cette entreprise
    const existingJob = await prisma.jobPost.findUnique({
      where: {
        id: jobId,
        companyId: company.id,
      },
    });

    if (!existingJob) {
      console.error("❌ Annonce non trouvée ou non autorisée:", jobId);
      return new Response("Annonce non trouvée ou non autorisée", {
        status: 404,
      });
    }
    // 5. Calculer la nouvelle date d'expiration
    const newExpiresAt = addDays(new Date(), durationDays);
    const RenewedAt = addDays(new Date(), 0);
    console.log("📅 nouvelle date d'expiration:", newExpiresAt);
    console.log("📅  date renew :", RenewedAt);
    // 6. Transaction atomique pour mMettre à jour l'annonce avec TOUS les champs nécessaires
    // const updatedJob = await prisma.jobPost.update({
    //   where: {
    //     id: jobId,
    //     companyId: company?.id as string,
    //   },
    //   data: {
    //     status: "ACTIVE",
    //     listingDuration: durationDays,
    //     expiresAt: newExpiresAt,
    //     lastRenewedAt: new Date(),
    //   },
    //   select: {
    //     id: true,
    //     status: true,
    //     listingDuration: true,
    //     expiresAt: true,
    //     lastRenewedAt: true,
    //   },
    // });

    const [updatedJob] = await prisma.$transaction([
      prisma.jobPost.update({
        where: { id: jobId },
        data: {
          status: "ACTIVE",
          listingDuration: durationDays,
          expiresAt: newExpiresAt,
          lastRenewedAt: RenewedAt,
        },
        select: {
          lastRenewedAt: true, // Vérification explicite dans le select
        },
      }),

      // console.log("🔄 lastRenewedAt mis à jour:", updatedJob.lastRenewedAt);
      // prisma.paymentHistory.create({
      //   data: {
      //     amount: session.amount_total ? session.amount_total / 100 : 0,
      //     currency: session.currency || "EUR",
      //     paymentType: "JOB_RENEWAL",
      //     status: "COMPLETED",
      //     stripeSessionId: session.id,
      //     jobPostId: jobId,
      //     companyId: company.id,
      //     metadata: { durationDays },
      //   },
      // }),
    ]);

    // Enregistrer le paiement dans l'historique
    // await prisma.paymentHistory.create({
    //   data: {
    //     amount: session.amount_total ? session.amount_total / 100 : 0,
    //     currency: session.currency || "USD",
    //     paymentType: "JOB_RENEWAL",
    //     status: "COMPLETED",
    //     stripeSessionId: session.id,
    //     jobPostId: jobId,
    //     companyId: company.id,
    //     metadata: {
    //       durationDays: durationDays,
    //     },
    //   },
    // });
    console.log("🟢 Renouvellement réussi:", updatedJob);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("❌ Job renewal failed :", err);

    return new Response(
      `Job renewal failed: ${
        err instanceof Error ? err.message : "Unknown Error"
      }`,
      { status: 500 }
    );
  }
}

async function handleOneTimeAccessPayment(session: Stripe.Checkout.Session) {
  console.log("🔹 [ONE_TIME_ACCESS] Traitement du paiement unique");

  // 1. Validation des métadonnées
  const customerId = session.customer as string;
  const planId = session.metadata?.planId;
  const userId = session.metadata?.userId;
  const paymentIntentId = session.payment_intent as string;

  console.log("🔹 Customer ID:", customerId);
  console.log("🔹 Plan ID:", planId);
  console.log("🔹 User ID:", userId);
  console.log("🔹 Payment Intent ID:", paymentIntentId);

  if (!customerId || !planId || !userId) {
    console.error("❌ [ONE_TIME_ACCESS] Missing required data:", {
      customerId,
      planId,
      userId,
    });
    return new Response("Missing required data", { status: 400 });
  }

  try {
    // 2. Récupérer le plan pour connaître la durée
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
      select: { duration: true },
    });

    if (!plan) {
      console.error("❌ [ONE_TIME_ACCESS] Plan not found:", planId);
      return new Response("Plan not found", { status: 404 });
    }

    // 3. Calculer la date de fin
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    // 4. Mettre à jour l'abonnement en BDD dans une transaction
    const [updatedSubscription, updatedUser] = await prisma.$transaction([
      prisma.subscription.updateMany({
        where: {
          userId: userId,
          planId: planId,
          stripeSessionId: session.id,
          status: "PENDING",
        },
        data: {
          status: "ACTIVE",
          endDate: endDate,
          stripePaymentIntentId: paymentIntentId,
          updatedAt: new Date(),
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          hasActiveSubscription: true,
          lastActiveAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ]);

    if (updatedSubscription.count === 0) {
      console.error("❌ [ONE_TIME_ACCESS] No PENDING subscriptions found");
      return new Response("No PENDING subscription found", { status: 404 });
    }

    console.log(
      "✅ [ONE_TIME_ACCESS] Subscription updated:",
      updatedSubscription
    );
    console.log("✅ [ONE_TIME_ACCESS] User updated:", updatedUser);

    // 5. Vérification finale de cohérence
    const finalCheck = await prisma.user.findUnique({
      where: { id: userId },
      select: { hasActiveSubscription: true },
    });

    if (!finalCheck?.hasActiveSubscription) {
      throw new Error("User subscription status not properly updated");
    }
    console.log("🟢 [ONE_TIME_ACCESS] Access activated successfully");
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ [ONE_TIME_ACCESS] Error:", err);
    // Tentative de remise à false en cas d'échec
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { hasActiveSubscription: false },
      });
    } catch (cleanupError) {
      console.error("❌ Cleanup failed:", cleanupError);
    }
    return new Response(
      `Payment processing failed: ${
        err instanceof Error ? err.message : "Unknown Error"
      }`,
      { status: 500 }
    );
  }
}
