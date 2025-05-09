"use server";

import { z } from "zod";
import { requireUser } from "./utils/hooks";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import { stripe } from "./utils/stripe";
import { jobListingDurationPricing } from "./utils/pricingTiers";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";
import { inngest } from "./utils/inngest/client";
import { revalidatePath } from "next/cache";
import type { Availability, JobType } from "@prisma/client";
import { getUserType } from "@/lib/userUtils";
import { ActionUpdateJobPostResultTypes } from "./types/types";

const DEBUG = process.env.DEBUG_MODE === "true";

const aj = arcjet
  .withRule(
    shield({
      mode: "LIVE",
    })
  )
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  );

// Fonctions utilitaires
async function checkAuthentication() {
  const user = await requireUser();
  if (!user) {
    if (DEBUG) console.log("Unauthorized");
    return { success: false, error: "Unauthorized", details: undefined };
  }
  return { success: true, user };
}

async function checkSecurity() {
  try {
    const req = await request();
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.log("Forbidden by security rules");
      return { success: false, error: "Forbidden by security rules" };
    }
    return { success: true };
  } catch {
    if (DEBUG) console.log("Security check failed");
    return { success: false, error: "Security check failed" };
  }
}

function checkRequiredEnvironmentVariables() {
  const requiredVars = [
    "NEXT_PUBLIC_URL",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    return {
      success: false,
      error: `Missing environment variables: ${missingVars.join(", ")}`,
    };
  }

  return { success: true };
}

async function validateJobData(data: z.infer<typeof jobSchema>) {
  // Sanitization
  const sanitizedData = {
    ...data,
    jobTitle: data.jobTitle?.trim(),
    jobDescription: data.jobDescription?.trim(),
    location: data.location?.trim(),
    benefits: data.benefits?.map((benefit) => benefit.trim()),
  };

  // Server-side validation avec Zod
  const validatedFields = jobSchema.safeParse(sanitizedData);
  if (!validatedFields.success) {
    if (DEBUG)
      console.error("Validation error:", validatedFields.error.format());
    return {
      success: false,
      error: `Validation failed: ${validatedFields.error.message}`,
      details: validatedFields.error.format(),
    };
  }

  const validatedData = validatedFields.data;

  // Vérification que salaryFrom est inférieur à salaryTo
  if (validatedData.salaryFrom >= validatedData.salaryTo) {
    if (DEBUG) console.error("Minimum salary must be less than maximum salary");
    return {
      success: false,
      error: "Minimum salary must be less than maximum salary",
    };
  }

  return { success: true, data: validatedData };
}

// async function getOrCreateCompany(userId: string) {
//   const company = await prisma.company.findUnique({
//     where: {
//       userId: userId,
//     },
//     select: {
//       id: true,
//       user: {
//         select: {
//           stripeCustomerId: true,
//         },
//       },
//     },
//   });

//   if (!company?.id) {
//     return {
//       success: false,
//       error: "Company profile not found",
//       redirect: "/",
//     };
//   }

//   return {
//     success: true,
//     data: {
//       company,
//       stripeCustomerId: company.user.stripeCustomerId,
//     },
//   };
// }

// async function createJobInDatabase(
//   companyId: string,
//   validatedData: z.infer<typeof jobSchema>,
//   user: any,
//   currentStripeCustomerId: string | null
// ) {
//   try {
//     // Wrapper les opérations dans une transaction
//     const [jobPost, stripeCustomerId] = await prisma.$transaction(
//       async (tx) => {
//         let updatedStripeCustomerId = currentStripeCustomerId;

//         // Si pas de stripeCustomerId, créer le customer et mettre à jour l'utilisateur
//         if (!updatedStripeCustomerId) {
//           const customer = await stripe.customers.create({
//             email: user.email!,
//             name: user.name || undefined,
//           });

//           updatedStripeCustomerId = customer.id;

//           await tx.user.update({
//             where: { id: user.id },
//             data: { stripeCustomerId: customer.id },
//           });
//         }

//         // Créer le job post
//         const job = await tx.jobPost.create({
//           data: {
//             companyId: companyId,
//             jobDescription: validatedData.jobDescription,
//             jobTitle: validatedData.jobTitle,
//             employmentType: validatedData.employmentType,
//             location: validatedData.location,
//             salaryFrom: validatedData.salaryFrom,
//             salaryTo: validatedData.salaryTo,
//             listingDuration: validatedData.listingDuration,
//             benefits: validatedData.benefits,
//           },
//         });

//         if (!job) {
//           throw new Error("Failed to create job post");
//         }

//         return [job, updatedStripeCustomerId];
//       }
//     );

//     return {
//       success: true,
//       data: jobPost,
//       stripeCustomerId,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "Failed to create job in database",
//     };
//   }
// }

// async function triggerJobExpiration(jobId: string, expirationDays: number) {
//   try {
//     // Décommenté pour être actif
//     await inngest.send({
//       name: "job/created",
//       data: {
//         jobId: jobId,
//         expirationDays: expirationDays,
//       },
//     });
//     return { success: true };
//   } catch (error) {
//     console.error("Failed to trigger job expiration, but continuing:", error);
//     // On continue même si cette partie échoue
//     return { success: true };
//   }
// }

// async function createStripeCheckoutSession(
//   stripeCustomerId: string,
//   listingDuration: number,
//   jobId: string
// ) {
//   // Get price from pricing tiers based on duration
//   const pricingTier = jobListingDurationPricing.find(
//     (tier) => tier.days === listingDuration
//   );

//   if (!pricingTier) {
//     return {
//       success: false,
//       error: "Invalid listing duration selected",
//     };
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       customer: stripeCustomerId,
//       line_items: [
//         {
//           price_data: {
//             product_data: {
//               name: `Job Posting - ${pricingTier.days} Days`,
//               description: pricingTier.description,
//               images: [
//                 "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
//               ],
//             },
//             currency: "USD",
//             unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       metadata: {
//         jobId: jobId,
//       },
//       success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
//     });

//     if (!session?.url) {
//       return {
//         success: false,
//         error: "Failed to create Stripe checkout session",
//       };
//     }

//     return {
//       success: true,
//       data: { url: session.url },
//     };
//   } catch (error) {
//     return {
//       success: false,
//       error:
//         error instanceof Error
//           ? error.message
//           : "Failed to create payment session",
//     };
//   }
// }

function formatError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      success: false,
      error: "Invalid input data",
      details: error.errors,
    };
  }

  return {
    success: false,
    error:
      error instanceof Error ? error.message : "An unexpected error occurred",
  };
}

async function checkJobOwnership(jobId: string, userId: string) {
  const job = await prisma.jobPost.findUnique({
    where: { id: jobId },
    include: { company: true },
  });

  const DEBUG = process.env.DEBUG_MODE === "true";
  if (DEBUG) console.log("Job trouvé:", job);

  if (!job) {
    if (DEBUG) console.error("Job non trouvé");
    return { success: false, error: "Job not found" };
  }

  if (job.company?.userId !== userId) {
    if (DEBUG) console.error("Utilisateur non autorisé");
    return {
      success: false,
      error: "Forbidden - You don't have permission to update this job",
    };
  }

  return { success: true, data: job };
}

async function updateJobInDatabase(
  jobId: string,
  validatedData: z.infer<typeof jobSchema>
) {
  try {
    const updateData = {
      jobTitle: validatedData.jobTitle,
      employmentType: validatedData.employmentType,
      location: validatedData.location,
      salaryFrom: validatedData.salaryFrom,
      salaryTo: validatedData.salaryTo,
      jobDescription: validatedData.jobDescription,
      benefits: validatedData.benefits,
      listingDuration: validatedData.listingDuration,
    };

    if (DEBUG) console.log("Données envoyées à Prisma:", updateData);

    // Job update
    const updatedJob = await prisma.jobPost.update({
      where: {
        id: jobId,
      },
      data: updateData,
    });

    return {
      success: true,
      data: updatedJob,
    };
  } catch (error) {
    if (DEBUG) console.error("Failed to update job in database:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to update job in database",
    };
  }
}

// server actions :
export async function createCompany(data: z.infer<typeof companySchema>) {
  try {
    console.log("Début de l'action createCompany");
    console.log("Données reçues:", data);

    // Vérification de l'authentification
    const user = await requireUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = companySchema.safeParse(data);

    if (!validatedData.success) {
      console.error("Validation failed:", validatedData.error.format());
      return { success: false, error: validatedData.error.format() };
    }

    console.log(
      "Structure du validatedData:",
      validatedData.success ? validatedData.data : "validatedData error"
    );

    // Création de la company et mise à jour du user
    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        onboardingCompleted: true,
        userType: "COMPANY",
        Company: {
          create: {
            ...validatedData.data, // works only if zod schema naming is the same than prisma schema naming
          },
        },
      },
      include: {
        Company: true,
      },
    });

    if (!result) return { success: false, error: "Failed to create company" };

    return { success: true };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error creating company:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const DEBUG = true; // Active/Désactive les logs
  try {
    if (DEBUG) console.log("Début de l'action createJobSeeker", { data });

    // Vérification de l'authentification
    const user = await requireUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    //Access the request object so Arcjet can analyze it
    const req = await request();
    //Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = jobSeekerSchema.safeParse(data);

    if (!validatedData.success) {
      if (DEBUG)
        console.error("Validation failed:", validatedData.error.format());
      return { success: false, error: validatedData.error.format() };
    }

    console.log(
      "Structure du validatedData:",
      validatedData.success ? validatedData.data : "validatedData error"
    );

    // Création du job seeker  et mise à jour du user
    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        onboardingCompleted: true,
        userType: "JOB_SEEKER",
        JobSeeker: {
          create: {
            firstName: validatedData.data.firstName,
            lastName: validatedData.data.lastName,
            email: validatedData.data.email,
            about: validatedData.data.about,
            title: validatedData.data.title,
            experience: validatedData.data.experience,
            skills: validatedData.data.skills,
            languages: validatedData.data.languages,
            city: validatedData.data.city,
            countryCode: validatedData.data.countryCode,
            phoneNumber: validatedData.data.phoneNumber,
            linkedinProfile: validatedData.data.linkedinProfile,
            portfolioUrl: validatedData.data.portfolioUrl,
            availability: validatedData.data
              .availability as (typeof Availability)[keyof typeof Availability],
            preferredJobType: validatedData.data.preferredJobType as Array<
              (typeof JobType)[keyof typeof JobType]
            >,
            expectedSalary: validatedData.data.expectedSalary,
            resume: validatedData.data.resume,
          },
        },
      },
    });

    if (!result)
      return { success: false, error: "Failed to create job seeker" };

    return { success: true };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error creating job seeker:", error);
    // Gestion des erreurs
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// export async function createJob(data: z.infer<typeof jobSchema>) {
//   try {
//     // Vérification de l'authentification
//     const user = await requireUser();
//     if (!user) {
//       throw new Error("Unauthorized");
//     }

//     // Access the request object so Arcjet can analyze it
//     const req = await request();
//     // Call Arcjet protect
//     const decision = await aj.protect(req);

//     if (decision.isDenied()) {
//       throw new Error("Forbidden");
//     }

//     // Server-side validation
//     const validatedData = jobSchema.safeParse(data);
//     if (!validatedData.success) {
//       throw new Error(`Validation failed: ${validatedData.error.message}`);
//     }

//     // Vérification que salaryFrom est inférieur à salaryTo
//     if (validatedData.data.salaryFrom >= validatedData.data.salaryTo) {
//       throw new Error("Minimum salary must be less than maximum salary");
//     }

//     // Calcul automatique de la deadline si non fournie
//     // const deadline =
//     //   validatedData.data.deadline ||
//     //   new Date(
//     //     Date.now() + validatedData.data.listingDuration * 24 * 60 * 60 * 1000
//     //   );

//     const company = await prisma.company.findUnique({
//       where: {
//         userId: user.id,
//       },
//       select: {
//         id: true,
//         user: {
//           select: {
//             stripeCustomerId: true,
//           },
//         },
//       },
//     });

//     if (!company?.id) {
//       throw new Error(
//         "Unauthorized: You don't have permission to create job posts for this company"
//       );
//       // return redirect("/");
//     }

//     let stripeCustomerId = company.user.stripeCustomerId;

//     if (!stripeCustomerId) {
//       const customer = await stripe.customers.create({
//         email: user.email!,
//         name: user.name || undefined,
//       });

//       stripeCustomerId = customer.id;

//       // Update user with Stripe customer ID
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { stripeCustomerId: customer.id },
//       });
//     }

//     // Création du job post
//     const jobPost = await prisma.jobPost.create({
//       data: {
//         companyId: company.id,
//         jobDescription: validatedData.data.jobDescription,
//         jobTitle: validatedData.data.jobTitle,
//         employmentType: validatedData.data.employmentType,
//         location: validatedData.data.location,
//         salaryFrom: validatedData.data.salaryFrom,
//         salaryTo: validatedData.data.salaryTo,
//         listingDuration: validatedData.data.listingDuration,
//         benefits: validatedData.data.benefits,
//         // ...validatedData.data,
//         // jobTitle: validatedData.data.jobTitle,
//         // employmentType: validatedData.data.employmentType,
//         // location: validatedData.data.location,
//         // salaryFrom: validatedData.data.salaryFrom,
//         // salaryTo: validatedData.data.salaryTo,
//         // jobDescription: validatedData.data.jobDescription,
//         // listingDuration: validatedData.data.listingDuration,
//         // benefits: validatedData.data.benefits,
//         // companyId: company.id,
//         // status: validatedData.data.status,
//         // requiredSkills: validatedData.data.requiredSkills,

//         applications: {
//           create: [], // Initialisation d'un array vide pour les applications
//         },
//       },
//       // select: {
//       //   id: true,
//       // },
//     });

//     if (!jobPost) {
//       throw new Error("Failed to create job post");
//     }
//     // MISE EN PAUSE EN DVLP
//     // Trigger the job expiration function
//     // await inngest.send({
//     //   name: "job/created",
//     //   data: {
//     //     jobId: jobPost.id,
//     //     expirationDays: validatedData.data.listingDuration,
//     //   },
//     // });

//     //Get price from pricing tiers based on duration
//     const pricingTier = jobListingDurationPricing.find(
//       (tier) => tier.days === validatedData.data.listingDuration
//     );

//     if (!pricingTier) {
//       throw new Error("Invalid listing duration selected");
//     }

//     const session = await stripe.checkout.sessions.create({
//       customer: stripeCustomerId,
//       line_items: [
//         {
//           price_data: {
//             product_data: {
//               name: `Job Posting - ${pricingTier.days} Days`,
//               description: pricingTier.description,
//               images: [
//                 "https://ok4ti6421c.ufs.sh/f/CtVwROvCTE2owy4sD2rbepfB2G0Vq7uoNhHS5IxsLvt3YznF",
//               ],
//             },
//             currency: "USD",
//             unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       metadata: {
//         jobId: jobPost.id,
//       },
//       success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
//     });
//     if (!session.url) {
//       throw new Error("Failed to create Stripe checkout session");
//     }
//     // Construire un nouvel objet simple avec uniquement les données nécessaires
//     const redirectUrl = new URL(session.url);
//     // Use temporary redirect for external URLs
//     return Response.redirect(redirectUrl.toString(), 303);
//     // return redirect(session.url as string);
//   } catch (error) {
//     // Gestion des erreurs
//     if (error instanceof z.ZodError) {
//       throw new Error(`Validation error: ${error.message}`);
//     }
//     if (error instanceof Error) {
//       throw new Error(`Failed to create job post: ${error.message}`);
//     }
//     throw new Error("An unexpected error occurred");
//   }
// }

// export async function createJob(data: z.infer<typeof jobSchema>) {
//   const DEBUG = true; // Active/Désactive les logs
//   try {
//     if (DEBUG) console.log("Début de l'action createJob", { data });
//     // Vérification de l'authentification
//     const user = await requireUser();
//     if (!user) {
//       return { success: false, error: "Unauthorized" };
//     }

//     // Protection Arcjet

//     // Access the request object so Arcjet can analyze it
//     const req = await request();
//     // Call Arcjet protect
//     const decision = await aj.protect(req);

//     if (decision.isDenied()) {
//       if (DEBUG) console.error("Accès refusé par Arcjet");
//       return { success: false, error: "Forbidden by security rules" };
//     }

//     // sanitization
//     const sanitizedData = {
//       ...data,
//       jobTitle: data.jobTitle?.trim(),
//       jobDescription: data.jobDescription?.trim(),
//       location: data.location?.trim(),
//       benefits: data.benefits?.map((benefit) => benefit.trim()),
//       // Les champs numériques n'ont pas besoin d'être sanitized car ils seront validés par Zod
//     };

//     // Server-side validation
//     const validatedFields = jobSchema.safeParse(sanitizedData);
//     if (!validatedFields.success) {
//       return {
//         success: false,
//         error: `Validation failed: ${validatedFields.error.message}`,
//       };
//     }

//     // Utiliser les données validées
//     const validatedData = validatedFields.data;

//     // Vérification que salaryFrom est inférieur à salaryTo
//     if (validatedData.salaryFrom >= validatedData.salaryTo) {
//       return {
//         success: false,
//         error: "Minimum salary must be less than maximum salary",
//       };
//     }

//     // Validation des variables d'environnement
//     if (!process.env.NEXT_PUBLIC_URL) {
//       return {
//         success: false,
//         error: "Missing NEXT_PUBLIC_URL environment variable",
//       };
//     }

//     // Exécuter toutes les opérations dans une seule transaction
//     const result = await prisma.$transaction(async (tx) => {
//       // Vérification de la compagnie associée à l'utilisateur
//       const company = await tx.company.findUnique({
//         where: {
//           userId: user.id,
//         },
//         select: {
//           id: true,
//           user: {
//             select: {
//               stripeCustomerId: true,
//             },
//           },
//         },
//       });

//       if (!company?.id) {
//         return {
//           success: false,
//           error: "Company profile not found",
//           redirect: "/",
//         };
//       }

//       let stripeCustomerId = company.user.stripeCustomerId;

//       // Si pas de stripeCustomerId, créer le customer
//       if (!stripeCustomerId) {
//         const customer = await stripe.customers.create({
//           email: user.email!,
//           name: user.name || undefined,
//         });

//         stripeCustomerId = customer.id;

//         // Mettre à jour l'utilisateur avec le Stripe customer ID
//         await tx.user.update({
//           where: { id: user.id },
//           data: { stripeCustomerId: customer.id },
//         });
//       }

//       // Créer l'offre d'emploi
//       const jobPost = await tx.jobPost.create({
//         data: {
//           companyId: company.id,
//           jobDescription: validatedData.jobDescription,
//           jobTitle: validatedData.jobTitle,
//           employmentType: validatedData.employmentType,
//           location: validatedData.location,
//           salaryFrom: validatedData.salaryFrom,
//           salaryTo: validatedData.salaryTo,
//           listingDuration: validatedData.listingDuration,
//           benefits: validatedData.benefits,
//         },
//       });

//       // Get price from pricing tiers based on duration
//       const pricingTier = jobListingDurationPricing.find(
//         (tier) => tier.days === validatedData.listingDuration
//       );

//       if (!pricingTier) {
//         return { success: false, error: "Invalid listing duration selected" };
//       }

//       // MISE EN PAUSE POUR LE DEVELOPPEMENT
//       // Trigger the job expiration function
//       // await inngest.send({
//       //   name: "job/created",
//       //   data: {
//       //     jobId: jobPost.id,
//       //     expirationDays: validatedData.listingDuration,
//       //   },
//       // });

//       // Créer la session Stripe
//       const session = await stripe.checkout.sessions.create({
//         customer: stripeCustomerId!,
//         line_items: [
//           {
//             price_data: {
//               product_data: {
//                 name: `Job Posting - ${pricingTier.days} Days`,
//                 description: pricingTier.description,
//                 images: [
//                   "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
//                 ],
//               },
//               currency: "USD",
//               unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
//             },
//             quantity: 1,
//           },
//         ],
//         mode: "payment",
//         metadata: {
//           jobId: jobPost.id,
//         },
//         success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
//         cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
//       });
//       return {
//         success: true,
//         data: { jobPost, session },
//       };
//     });

//     // Gérer le redirection spéciale si nécessaire
//     if (result.redirect) {
//       return { success: false, error: result.error, redirect: result.redirect };
//     }

//     // Gérer les erreurs
//     if (!result.success) {
//       return { success: false, error: result.error };
//     }
//     // Retourner l'URL de redirection vers Stripe
//     return {
//       success: true,
//       data: result?.data?.jobPost,
//       redirectUrl: result?.data?.session.url,
//     };
//   } catch (error) {
//     console.error("Error creating job post:", error);
//     if (error instanceof z.ZodError) {
//       return {
//         success: false,
//         error: "Invalid input data",
//         details: error.errors,
//       };
//     }
//     return {
//       success: false,
//       error:
//         error instanceof Error ? error.message : "An unexpected error occurred",
//     };
//   }
// }

// export async function createJob(data: z.infer<typeof jobSchema>) {
//   // Mode debug lié à une variable d'environnement
//   const DEBUG = process.env.DEBUG_MODE === 'true';

//   try {
//     if (DEBUG) console.log("Début de l'action createJob", { data });

//     // Vérification de l'authentification
//     const authResult = await checkAuthentication();
//     if (!authResult.success) {
//       return authResult;
//     }
//     const user = authResult.user;

//     // Protection Arcjet
//     const securityResult = await checkSecurity();
//     if (!securityResult.success) {
//       return securityResult;
//     }

//     // Sanitization et validation
//     const validationResult = await validateJobData(data);
//     if (!validationResult.success) {
//       return validationResult;
//     }
//     const validatedData = validationResult.data;

//     // Vérification des variables d'environnement
//     const envCheckResult = checkRequiredEnvironmentVariables();
//     if (!envCheckResult.success) {
//       return envCheckResult;
//     }

//     // Récupération ou création de la company
//     const companyResult = await getOrCreateCompany(user.id);
//     if (!companyResult.success) {
//       return companyResult;
//     }
//     const { company, stripeCustomerId } = companyResult.data;

//     // Création du job et mise à jour du customer si nécessaire
//     const jobResult = await createJobInDatabase(company.id, validatedData, user, stripeCustomerId);
//     if (!jobResult.success) {
//       return jobResult;
//     }
//     const jobPost = jobResult.data;

//     // Activation du job expiration (décommenté)
//     await triggerJobExpiration(jobPost.id, validatedData.listingDuration);

//     // Création de la session de paiement Stripe
//     const paymentResult = await createStripeCheckoutSession(
//       stripeCustomerId,
//       validatedData.listingDuration,
//       jobPost.id
//     );

//     if (!paymentResult.success) {
//       return paymentResult;
//     }

//     // Retour standardisé
//     return {
//       success: true,
//       data: {
//         redirectUrl: paymentResult.data.url
//       }
//     };

//   } catch (error) {
//     // Gestion des erreurs
//     if (DEBUG) console.error("Error creating job post:", error);
//     return formatError(error);
//   }
// }

export async function createJob(data: z.infer<typeof jobSchema>) {
  const DEBUG = process.env.DEBUG_MODE === "true"; // Active/Désactive les logs
  try {
    if (DEBUG) console.log("Début de l'action createJob", { data });
    // Vérification de l'authentification
    // const user = await requireUser();
    // if (!user) {
    //   return { success: false, error: "Unauthorized" };
    // }
    const authResult = await checkAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    const user = authResult.user!;
    // Protection Arcjet

    // // Access the request object so Arcjet can analyze it
    // const req = await request();
    // // Call Arcjet protect
    // const decision = await aj.protect(req);

    // if (decision.isDenied()) {
    //   if (DEBUG) console.error("Accès refusé par Arcjet");
    //   return { success: false, error: "Forbidden by security rules" };
    // }

    const securityResult = await checkSecurity();
    if (!securityResult.success) {
      return securityResult;
    }

    // sanitization
    // const sanitizedData = {
    //   ...data,
    //   jobTitle: data.jobTitle?.trim(),
    //   jobDescription: data.jobDescription?.trim(),
    //   location: data.location?.trim(),
    //   benefits: data.benefits?.map((benefit) => benefit.trim()),
    //   // Les champs numériques n'ont pas besoin d'être sanitized car ils seront validés par Zod
    // };

    // Server-side validation
    // const validatedFields = jobSchema.safeParse(sanitizedData);
    // if (!validatedFields.success) {
    //   return {
    //     success: false,
    //     error: `Validation failed: ${validatedFields.error.message}`,
    //     details: validatedFields.error.format(),
    //   };
    // }

    // Utiliser les données validées
    // const validatedData = validatedFields.data;

    // Vérification que salaryFrom est inférieur à salaryTo
    // if (validatedData.salaryFrom >= validatedData.salaryTo) {
    //   return {
    //     success: false,
    //     error: "Minimum salary must be less than maximum salary",
    //   };
    // }

    // Sanitization et validation
    const validationResult = await validateJobData(data);
    if (!validationResult.success) {
      return validationResult;
    }
    const validatedData = validationResult.data;

    // Validation des variables d'environnement
    // if (!process.env.NEXT_PUBLIC_URL) {
    //   return {
    //     success: false,
    //     error: "Missing NEXT_PUBLIC_URL environment variable",
    //   };
    // }

    const envCheckResult = checkRequiredEnvironmentVariables();
    if (!envCheckResult.success) {
      if (DEBUG) console.log("Missing environment variables");

      return envCheckResult;
    }

    // Exécuter toutes les opérations dans une seule transaction
    const result = await prisma.$transaction(async (tx) => {
      // Vérification de la compagnie associée à l'utilisateur
      const company = await tx.company.findUnique({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          user: {
            select: {
              stripeCustomerId: true,
            },
          },
        },
      });

      if (!company?.id) {
        return {
          success: false,
          error: "Company profile not found",
          redirect: "/",
        };
      }

      let stripeCustomerId = company.user.stripeCustomerId;

      // Si pas de stripeCustomerId, créer le customer
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email!,
          name: user.name || undefined,
        });

        stripeCustomerId = customer.id;

        // Mettre à jour l'utilisateur avec le Stripe customer ID
        await tx.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
      }

      // Créer l'offre d'emploi
      const jobPost = await tx.jobPost.create({
        data: {
          companyId: company.id,
          jobDescription: validatedData?.jobDescription || "",
          jobTitle: validatedData?.jobTitle || "",
          employmentType: validatedData?.employmentType || "",
          location: validatedData?.location || "",
          salaryFrom: validatedData?.salaryFrom || 0,
          salaryTo: validatedData?.salaryTo || 1000000,
          listingDuration: validatedData?.listingDuration || 30,
          benefits: validatedData?.benefits,
        },
      });

      // Get price from pricing tiers based on duration
      const pricingTier = jobListingDurationPricing.find(
        (tier) => tier.days === validatedData?.listingDuration
      );

      if (!pricingTier) {
        return { success: false, error: "Invalid listing duration selected" };
      }

      // MISE EN PAUSE POUR LE DEVELOPPEMENT
      // Trigger the job expiration function
      // await inngest.send({
      //   name: "job/created",
      //   data: {
      //     jobId: jobPost.id,
      //     expirationDays: validatedData.listingDuration,
      //   },
      // });

      // Activation du job expiration (décommenté pour la production )
      // await triggerJobExpiration(jobPost.id, validatedData?.listingDuration!);

      // Créer la session Stripe
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId!,
        line_items: [
          {
            price_data: {
              product_data: {
                name: `Job Posting - ${pricingTier.days} Days`,
                description: pricingTier.description,
                images: [
                  "https://job-board-sass-nextjs.vercel.app/logo.png",
                  // "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
                ],
              },
              currency: "USD",
              unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        metadata: {
          jobId: jobPost.id,
          companyId: company.id,
          paymentType: "job_creation",
          duration: pricingTier.days.toString(),
        },
        success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
      });
      return {
        success: true,
        data: { jobPost, session },
      };
    });

    // Gérer le redirection spéciale si nécessaire
    if (result.redirect) {
      return { success: false, error: result.error, redirect: result.redirect };
    }

    // Gérer les erreurs
    if (!result.success) {
      return { success: false, error: result.error };
    }
    // Retourner l'URL de redirection vers Stripe
    return {
      success: true,
      // data: result?.data?.jobPost,
      //redirectUrl: result?.data?.session.url,
      data: {
        // data: result?.data?.jobPost,
        redirectUrl: result?.data?.session.url,
      },
    };
  } catch (error) {
    if (DEBUG) console.error("Error creating job post:", error);
    return formatError(error);
  }
}

// export async function updateJobPost(
//   data: z.infer<typeof jobSchema>,
//   jobId: string
// ) {
//   try {
//     console.log("Début de l'action updateJobPost");
//     console.log("Données reçues:", data);
//     console.log("jobId reçu:", jobId);

//     // Vérification de l'authentification
//     const user = await requireUser();

//     if (!user) return { success: false, error: "Unauthorized" };

//     // Vérification du jobId

//     if (!jobId) {
//       console.error("jobId is required");
//       // throw new Error("jobId is required");
//       return { success: false, error: "jobId is required" };
//     }

//     // Access the request object so Arcjet can analyze it
//     const req = await request();
//     // Call Arcjet protect
//     const decision = await aj.protect(req);

//     if (decision.isDenied()) {
//       console.error("Accès refusé par Arcjet");
//       // throw new Error("Forbidden");
//       return { success: false, error: "Forbidden by security rules" };
//     }

//     // Server-side validation
//     const validatedData = jobSchema.safeParse(data);

//     if (!validatedData.success) {
//       console.error("Validation error:", validatedData.error.format());
//       // throw new Error(`Invalid job data: ${validatedData.error.message}`);
//       return {
//         success: false,
//         error: `Invalid job data: ${validatedData.error.message}`,
//       };
//     }

//     console.log(
//       "Structure du validatedData:",
//       validatedData.success ? validatedData.data : "validatedData error"
//     );
//     // Check if the user has this job offer
//     const job = await prisma.jobPost.findUnique({
//       where: { id: jobId },
//       include: { company: true },
//     });

//     console.log("Job trouvé:", job);

//     if (!job) {
//       console.error("Job non trouvé");
//       // throw new Error("Job not found");
//       return { success: false, error: "Job not found" };
//     }

//     if (job.company?.userId !== user.id) {
//       console.error("Utilisateur non autorisé");
//       //
//       return {
//         success: false,
//         error: "Forbidden - You don't have permission to update this job",
//       };
//     }

//     if (validatedData.success) {
//       const updateData = {
//         jobTitle: validatedData.data.jobTitle,
//         employmentType: validatedData.data.employmentType,
//         location: validatedData.data.location,
//         salaryFrom: validatedData.data.salaryFrom,
//         salaryTo: validatedData.data.salaryTo,
//         jobDescription: validatedData.data.jobDescription,
//         benefits: validatedData.data.benefits,
//         listingDuration: validatedData.data.listingDuration,
//       };

//       console.log("Données envoyées à Prisma:", updateData);

//       // Job update
//       await prisma.jobPost.update({
//         where: {
//           id: jobId,
//         },
//         data: updateData,
//       });
//     }
//     // return redirect("/my-jobs");
//     console.log("Job mis à jour avec succès:");
//     return { success: true };
//   } catch (error) {
//     console.error("Error updating job post:", error);
//     // throw new Error("Error updating job post");
//     return {
//       success: false,
//       error: error instanceof Error ? error.message : "Unknown error",
//     };
//   }
// }

export async function updateJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
): Promise<ActionUpdateJobPostResultTypes> {
  const DEBUG = process.env.DEBUG_MODE === "true";

  try {
    if (DEBUG) {
      console.log("Début de l'action updateJobPost");
      console.log("Données reçues:", data);
      console.log("jobId reçu:", jobId);
    }

    // Vérification de l'authentification
    const authResult = await checkAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    const user = authResult.user;

    if (!user || !user.id) {
      if (DEBUG) console.error("User ID is required");
      return { success: false, error: "User ID is required" };
    }

    // Vérification du jobId
    if (!jobId) {
      if (DEBUG) console.error("jobId is required");
      return { success: false, error: "jobId is required" };
    }

    // Protection Arcjet
    const securityResult = await checkSecurity();
    if (!securityResult.success) {
      return securityResult;
    }

    // Validation des données
    const validationResult = await validateJobData(data);
    if (!validationResult.success) {
      return validationResult;
    }
    const validatedData = validationResult.data;

    // Vérification des permissions
    const permissionResult = await checkJobOwnership(jobId, user.id);
    if (!permissionResult.success) {
      return permissionResult;
    }
    const job = permissionResult.data; // eslint-disable-line @typescript-eslint/no-unused-vars

    // Mise à jour du job
    const updateResult = await updateJobInDatabase(jobId, validatedData!);
    if (!updateResult.success) {
      return updateResult;
    }

    if (DEBUG) console.log("Job mis à jour avec succès");
    return {
      success: true,
      data: {
        job: updateResult.data,
      },
    };
  } catch (error) {
    if (DEBUG) console.error("Error updating job post:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function deleteJobPost(jobId: string) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  const req = await request();
  // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prisma.jobPost.delete({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
  });

  await inngest.send({
    name: "job/cancel.expiration",
    data: { jobId: jobId },
  });

  return redirect("/my-jobs");
}

export async function saveJobPost(jobId: string) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  const req = await request();
  // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  await prisma.savedJobPost.create({
    data: {
      jobId: jobId,
      userId: user.id as string,
    },
  });

  revalidatePath(`/job/${jobId}`);
}

export async function unsaveJobPost(savedJobPostId: string) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  const req = await request();
  // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  const data = await prisma.savedJobPost.delete({
    where: {
      id: savedJobPostId,
      userId: user.id as string,
    },
    select: {
      jobId: true,
    },
  });

  revalidatePath(`/job/${data.jobId}`);
}

export async function getJobSeekerProfile() {
  try {
    const DEBUG = true; // Active/Désactive les logs
    if (DEBUG) console.log("Début de l'action createJobSeeker");

    // Vérification de l'authentification
    const user = await requireUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    const jobSeeker = await prisma.user.findUnique({
      where: {
        id: user.id,
        JobSeeker: {
          userId: user.id,
        },
      },
      select: {
        id: true,

        JobSeeker: {
          select: {
            about: true,
            resume: true,
            userId: true,
            title: true,
            experience: true,
            languages: true,
            availability: true,
            preferredJobType: true,
            expectedSalary: true,
            email: true,
            firstName: true,
            lastName: true,
            skills: true,
            city: true,
            countryCode: true,
            phoneNumber: true,
            linkedinProfile: true,
            portfolioUrl: true,
          },
        },
      },
    });

    // Vérification de l'existence du JobSeeker
    if (!jobSeeker?.JobSeeker) {
      return { success: false, error: "Job seeker profile not found" };
    }

    return { success: true, data: jobSeeker };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error fetching job seeker profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const DEBUG = true; // Active/Désactive les logs
  try {
    // Vérification de l'authentification
    const user = await requireUser();
    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    //Access the request object so Arcjet can analyze it
    const req = await request();
    //Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = jobSeekerSchema.safeParse(data);

    if (!validatedData.success) {
      if (DEBUG)
        console.error("Validation error:", validatedData.error.format());
      return {
        success: false,
        error: `Invalid jobSeeker data: ${validatedData.error.message}`,
      };
    }

    const jobSeekerData = {
      firstName: validatedData.data.firstName,
      lastName: validatedData.data.lastName,
      email: validatedData.data.email,
      about: validatedData.data.about,
      title: validatedData.data.title,
      experience: validatedData.data.experience,
      skills: validatedData.data.skills,
      languages: validatedData.data.languages,
      city: validatedData.data.city,
      countryCode: validatedData.data.countryCode,
      phoneNumber: validatedData.data.phoneNumber,
      linkedinProfile: validatedData.data.linkedinProfile,
      portfolioUrl: validatedData.data.portfolioUrl,
      availability: validatedData.data
        .availability as (typeof Availability)[keyof typeof Availability],
      preferredJobType: validatedData.data.preferredJobType as Array<
        (typeof JobType)[keyof typeof JobType]
      >,
      expectedSalary: validatedData.data.expectedSalary,
      resume: validatedData.data.resume,
    };

    // Utiliser directement les données validées
    // const jobSeekerData = validatedData.data;

    // Utiliser une transaction pour assurer l'atomicité des opérations
    // Vérifier si le jobSeeker existe déjà
    return await prisma.$transaction(async (tx) => {
      const existingJobSeeker = await tx.jobSeeker.findUnique({
        where: {
          userId: user.id,
        },
      });

      let result;

      if (existingJobSeeker) {
        // Mise à jour du profil existant
        const updatedJobSeeker = await tx.jobSeeker.update({
          where: {
            userId: user.id,
          },
          data: jobSeekerData,
        });
        result = { jobSeekerDetails: updatedJobSeeker };
      } else {
        // Création d'un nouveau profil si aucun n'existe avec mise à jour de l'utilisateur
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
              create: jobSeekerData,
            },
          },
          include: { JobSeeker: true },
        });
        result = {
          userUpdated: true,
          jobSeekerDetails: updatedUser.JobSeeker,
        };
      }
      if (DEBUG) console.log("JobSeeker profile mis à jour avec succès");
      return { success: true, data: result };
    });
  } catch (error) {
    // Log the error for debugging (in a production environment)
    if (DEBUG) console.error("Error updating  job seeker profile:", error);
    // Gestion des erreurs
    // Retourner une réponse d'erreur standardisée
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getCompanyProfile() {
  try {
    const DEBUG = true; // Active/Désactive les logs
    // Vérification de l'authentification
    const user = await requireUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    const company = await prisma.user.findUnique({
      where: {
        id: user.id,
        Company: {
          userId: user.id,
        },
      },
      select: {
        id: true,

        Company: {
          select: {
            id: true,
            name: true,
            location: true,
            logo: true,
            about: true,
            website: true,
            userId: true,
            xAccount: true,
            industry: true,
            companySize: true,
            countryCode: true,
            city: true,
            phoneNumber: true,
            linkedinProfile: true,
            languages: true,
          },
        },
      },
    });

    // Vérification de l'existence de company
    if (!company?.Company) {
      return { success: false, error: "Company profile not found" };
    }

    return { success: true, data: company };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error fetching company profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateCompany(data: z.infer<typeof companySchema>) {
  const DEBUG = true; // Active/Désactive les logs
  try {
    // Vérification de l'authentification
    const user = await requireUser();
    if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    //Access the request object so Arcjet can analyze it
    const req = await request();
    //Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = companySchema.safeParse(data);

    if (!validatedData.success) {
      if (DEBUG)
        console.error("Validation error:", validatedData.error.format());
      return {
        success: false,
        error: `Invalid company data: ${validatedData.error.message}`,
      };
    }

    // const companyData = {
    //   name: validatedData.data.name,
    //   location: validatedData.data.location,
    //   logo: validatedData.data.logo,
    //   about: validatedData.data.about,
    //   website: validatedData.data.website,
    //   xAccount: validatedData.data.xAccount,
    //   industry: validatedData.data.industry,
    //   companySize: validatedData.data.companySize,
    //   languages: validatedData.data.languages,
    //   city: validatedData.data.city,
    //   countryCode: validatedData.data.countryCode,
    //   phoneNumber: validatedData.data.phoneNumber,
    //   linkedinProfile: validatedData.data.linkedinProfile,
    // };

    const companyData = validatedData.data;

    // Vérifier si company existe déjà et mettre à jour avec une transaction
    return await prisma.$transaction(async (tx) => {
      const existingCompany = await tx.company.findUnique({
        where: {
          userId: user.id,
        },
      });

      let result;

      if (existingCompany) {
        // Mise à jour de l'entreprise existante
        const updatedCompany = await tx.company.update({
          where: {
            userId: user.id,
          },
          data: companyData,
        });
        result = { companyDetails: updatedCompany };
      } else {
        // Création d'un nouveau profil si aucun n'existe avec mise à jour de l'utilisateur
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: { create: companyData },
          },
          include: { Company: true },
        });
        result = {
          userUpdated: true,
          companyDetails: updatedUser.Company,
        };
      }

      if (DEBUG) console.log("Company profile mis à jour avec succès:");
      return { success: true, data: result };
    });
  } catch (error) {
    // Log the error for debugging (in a production environment)
    if (DEBUG) console.error("Error updating company profile:", error);
    // Gestion des erreurs

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function submitJobApplication(formData: FormData) {
  try {
    // Vérification de l'authentification
    const user = await requireUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Vérifier que jobSeekerId est bien défini
    if (!user?.id) {
      throw new Error("userId is required");
    }

    // Vérifier que l'utilisateur est un JobSeeker
    const { type, data } = await getUserType(user.id);
    if (type !== "JOB_SEEKER") {
      throw new Error("Only job seekers can apply");
    }

    // Vérifier que jobSeekerId est bien défini
    if (!data?.id) {
      throw new Error("jobSeekerId is required");
    }

    // Protection Arcjet
    //Access the request object so Arcjet can analyze it
    const req = await request();
    //Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      throw new Error("Forbidden");
    }

    const jobPostId = formData.get("jobPostId") as string;
    const coverLetter = formData.get("coverLetter") as string;

    // Vérifier si une candidature existe déjà
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobPostId,
        jobSeekerId: data.id,
      },
    });

    if (existingApplication) {
      throw new Error("You have already applied for this offer");
    }

    // Créer la candidature
    await prisma.jobApplication.create({
      data: {
        jobPostId,
        jobSeekerId: data.id,
        coverLetter,
        status: "PENDING",
      },
    });

    return { success: true };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error creating job application:", error);
    // Gestion des erreurs
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to createjob application: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function deleteApplicationPost(applicationId: string) {
  try {
    if (DEBUG)
      console.log("Début de l'action deleteApplicationPost", { applicationId });

    // Vérification de l'authentification
    const authResult = await checkAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    const user = authResult.user!;

    // Protection Arcjet
    const securityResult = await checkSecurity();
    if (!securityResult.success) {
      return securityResult;
    }

    // Vérification que la candidature existe avant de la supprimer
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        id: applicationId,
        jobSeeker: {
          userId: user.id,
        },
      },
    });

    if (!existingApplication) {
      return {
        success: false,
        error:
          "Application not found or you do not have the rights to delete it",
        code: "NOT_FOUND",
      };
    }

    await prisma.jobApplication.delete({
      where: {
        id: applicationId,
        jobSeeker: {
          userId: user.id,
        },
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    if (DEBUG) console.error("Error deleting application post:", error);
    return formatError(error);
  }
}

// Définir un type pour les données d'entrée
interface RenewJobData {
  jobId: string;
  duration: number;
}

export async function renew(data: RenewJobData) {
  const DEBUG = process.env.DEBUG_MODE === "true"; // Active/Désactive les logs

  try {
    if (DEBUG) console.log("Début de l'action renew", { data });

    // Vérification de l'authentification
    const authResult = await checkAuthentication();
    if (!authResult.success) {
      return authResult;
    }
    const user = authResult.user!;

    // Protection Arcjet
    const securityResult = await checkSecurity();
    if (!securityResult.success) {
      return securityResult;
    }

    // extraire données
    const { jobId, duration } = data;

    // Validation des variables d'environnement
    const envCheckResult = checkRequiredEnvironmentVariables();
    if (!envCheckResult.success) {
      if (DEBUG) console.log("Missing environment variables");
      return envCheckResult;
    }

    // Vérifier que l'utilisateur est le propriétaire de l'annonce
    const permissionResult = await checkJobOwnership(jobId, user.id!);
    if (!permissionResult.success) {
      return permissionResult;
    }
    const job = permissionResult.data; // eslint-disable-line @typescript-eslint/no-unused-vars

    // Get price from pricing tiers based on duration
    const pricingTier = jobListingDurationPricing.find(
      (tier) => tier.days === duration
    );

    if (!pricingTier) {
      return { success: false, error: "Invalid listing duration selected" };
    }

    // Cas gratuit (mise à jour immédiate)
    if (pricingTier.price <= 0) {
      await prisma.jobPost.update({
        where: { id: jobId },
        data: {
          status: "ACTIVE",
          listingDuration: duration,
        },
      });
      revalidatePath("/my-jobs");
      return { success: true };
    }

    // Récupérer ou créer un stripeCustomerId
    // Cas payant
    const company = await prisma.company.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        user: {
          select: {
            stripeCustomerId: true,
          },
        },
      },
    });

    if (!company?.id) {
      return {
        success: false,
        error: "Company profile not found",
        redirect: "/",
      };
    }

    let stripeCustomerId = company.user.stripeCustomerId;

    // Si pas de stripeCustomerId, créer le customer
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        name: user.name || undefined,
      });

      stripeCustomerId = customer.id;

      // Mettre à jour l'utilisateur avec le Stripe customer ID
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
      });
    }

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: stripeCustomerId,

      line_items: [
        {
          price_data: {
            product_data: {
              name: `Job Renewal - ${pricingTier.days} Days`,
              description: `Renew your job listing "${job?.jobTitle}" for ${pricingTier.days} days.`,
              images: ["https://job-board-sass-nextjs.vercel.app/logo.png"],
            },
            currency: "USD",
            unit_amount: pricingTier.price * 100, // Convert to cents for Stripe
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        jobId: job?.id?.toString() ?? "unknown",
        paymentType: "job_renewal",
        duration: duration.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success?type=renewal`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    });
    return {
      success: true,
      data: { redirectUrl: session.url },
    };
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"], // Assure la compatibilité
    //   customer: stripeCustomerId,
    //   line_items: [
    //     {
    //       price_data: {
    //         product_data: {
    //           name: `Job Renewal - ${pricingTier.days} Days`,
    //           description: `Renew your job listing "${job?.jobTitle}" for ${pricingTier.days} days.`,
    //           images: ["https://job-board-sass-nextjs.vercel.app/logo.png"],
    //         },
    //         currency: "USD",
    //         unit_amount: pricingTier.price * 100, // Convertir en cents pour Stripe
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   mode: "payment",
    //   metadata: {
    //     jobId: job?.id?.toString() ?? "unknown",
    //     companyId: job?.company?.id?.toString() ?? "unknown",
    //     paymentType: "job_renewal",
    //     duration: duration.toString(),
    //   },

    //   success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    // });
    console.log("Session créée avec succès:", session);
  } catch (error) {
    console.error("Error renewing job:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: `Failed to renew job: ${errorMessage}`,
    };
  }
}

export async function getCompanyProfileById(companyId: string) {
  try {
    const DEBUG = true; // Active/Désactive les logs
    // Vérification de l'authentification
    // const user = await requireUser();

    // if (!user) return { success: false, error: "Unauthorized" };

    // Protection Arcjet
    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (DEBUG) console.error("Accès refusé par Arcjet");
      return { success: false, error: "Forbidden by security rules" };
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        id: true,
        name: true,
        location: true,
        logo: true,
        about: true,
        website: true,
        userId: true,
        xAccount: true,
        industry: true,
        companySize: true,
        countryCode: true,
        city: true,
        phoneNumber: true,
        linkedinProfile: true,
        languages: true,
      },
    });

    // Vérification de l'existence de company
    if (!company) {
      return { success: false, error: "Company profile not found" };
    }

    return { success: true, data: company };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error fetching company profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
