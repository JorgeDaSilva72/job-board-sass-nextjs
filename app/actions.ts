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
  try {
    const DEBUG = true; // Active/Désactive les logs
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

export async function createJob(data: z.infer<typeof jobSchema>) {
  try {
    // Vérification de l'authentification
    const user = await requireUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Protection Arcjet

    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      throw new Error("Forbidden");
    }

    // sanitization
    const sanitizedData = {
      ...data,
      jobTitle: data.jobTitle?.trim(),
      jobDescription: data.jobDescription?.trim(),
      location: data.location?.trim(),
      benefits: data.benefits?.map((benefit) => benefit.trim()),
      // Les champs numériques n'ont pas besoin d'être sanitized car ils seront validés par Zod
    };

    // Server-side validation
    const validatedFields = jobSchema.safeParse(sanitizedData);
    if (!validatedFields.success) {
      throw new Error(`Validation failed: ${validatedFields.error.message}`);
    }

    // Utiliser les données validées
    const validatedData = validatedFields.data;

    // Vérification que salaryFrom est inférieur à salaryTo
    if (validatedData.salaryFrom >= validatedData.salaryTo) {
      throw new Error("Minimum salary must be less than maximum salary");
    }

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
      // return redirect("/");

      // return Response.redirect(new URL("/", process.env.NEXT_PUBLIC_URL!), 303);

      // Pour les redirections internes, utiliser redirect de next/navigation
      redirect("/");
    }

    let stripeCustomerId = company.user.stripeCustomerId;

    // validation for required environment variables
    if (!process.env.NEXT_PUBLIC_URL) {
      throw new Error("Missing NEXT_PUBLIC_URL environment variable");
    }

    // Wrapper les opérations de base de données dans une transaction
    const [jobPost] = await prisma.$transaction(async (tx) => {
      let userUpdate = null;

      // Si pas de stripeCustomerId, créer le customer et mettre à jour l'utilisateur
      if (!stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email!,
          name: user.name || undefined,
        });

        stripeCustomerId = customer.id;

        userUpdate = await tx.user.update({
          where: { id: user.id },
          data: { stripeCustomerId: customer.id },
        });
        console.log("userUpdate:", userUpdate);
      }

      // Créer le job post
      const job = await tx.jobPost.create({
        data: {
          companyId: company.id,
          jobDescription: validatedData.jobDescription,
          jobTitle: validatedData.jobTitle,
          employmentType: validatedData.employmentType,
          location: validatedData.location,
          salaryFrom: validatedData.salaryFrom,
          salaryTo: validatedData.salaryTo,
          listingDuration: validatedData.listingDuration,
          benefits: validatedData.benefits,
        },
      });

      if (!job) {
        throw new Error("Failed to create job post");
      }

      return [job];
    });

    // let stripeCustomerId = company.user.stripeCustomerId;

    // if (!stripeCustomerId) {
    //   const customer = await stripe.customers.create({
    //     email: user.email!,
    //     name: user.name || undefined,
    //   });

    //   stripeCustomerId = customer.id;

    //   // Update user with Stripe customer ID
    //   await prisma.user.update({
    //     where: { id: user.id },
    //     data: { stripeCustomerId: customer.id },
    //   });
    // }

    // const jobPost = await prisma.jobPost.create({
    //   data: {
    //     companyId: company.id,
    //     jobDescription: validatedData.jobDescription,
    //     jobTitle: validatedData.jobTitle,
    //     employmentType: validatedData.employmentType,
    //     location: validatedData.location,
    //     salaryFrom: validatedData.salaryFrom,
    //     salaryTo: validatedData.salaryTo,
    //     listingDuration: validatedData.listingDuration,
    //     benefits: validatedData.benefits,
    //   },
    // });

    // if (!jobPost) {
    //   throw new Error("Failed to create job post");
    // }

    // MISE EN PAUSE POUR LE DEVELOPPEMENT
    // Trigger the job expiration function
    // await inngest.send({
    //   name: "job/created",
    //   data: {
    //     jobId: jobPost.id,
    //     expirationDays: validatedData.listingDuration,
    //   },
    // });

    // Get price from pricing tiers based on duration
    const pricingTier = jobListingDurationPricing.find(
      (tier) => tier.days === validatedData.listingDuration
    );

    if (!pricingTier) {
      throw new Error("Invalid listing duration selected");
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId!,
      line_items: [
        {
          price_data: {
            product_data: {
              name: `Job Posting - ${pricingTier.days} Days`,
              description: pricingTier.description,
              images: [
                "https://pve1u6tfz1.ufs.sh/f/Ae8VfpRqE7c0gFltIEOxhiBIFftvV4DTM8a13LU5EyzGb2SQ",
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
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/payment/cancel`,
    });

    // if (!session?.url) {
    //   throw new Error("Failed to create Stripe checkout session");
    // }

    // return redirect(session.url as string);
    // Pour les redirections externes (comme Stripe), utiliser temporaryRedirect
    // return temporaryRedirect(session.url);
    // Retourner juste l'URL en tant que string
    return { redirectUrl: session.url };
  } catch (error) {
    // Gestion des erreurs
    //   if (error instanceof Error) {
    //     throw error; // Relancer l'erreur pour qu'elle soit gérée par le gestionnaire d'erreurs de Next.js
    //   }
    //   throw new Error("An unexpected error occurred");
    //
    if (error instanceof z.ZodError) {
      return { error: "Invalid input data", details: error.errors };
    }
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unexpected error occurred" };
  }
}

export async function updateJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
) {
  try {
    console.log("Début de l'action updateJobPost");
    console.log("Données reçues:", data);
    console.log("jobId reçu:", jobId);

    // Vérification de l'authentification
    const user = await requireUser();

    if (!user) return { success: false, error: "Unauthorized" };

    // Vérification du jobId

    if (!jobId) {
      console.error("jobId is required");
      // throw new Error("jobId is required");
      return { success: false, error: "jobId is required" };
    }

    // Access the request object so Arcjet can analyze it
    const req = await request();
    // Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      console.error("Accès refusé par Arcjet");
      // throw new Error("Forbidden");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = jobSchema.safeParse(data);

    if (!validatedData.success) {
      console.error("Validation error:", validatedData.error.format());
      // throw new Error(`Invalid job data: ${validatedData.error.message}`);
      return {
        success: false,
        error: `Invalid job data: ${validatedData.error.message}`,
      };
    }

    console.log(
      "Structure du validatedData:",
      validatedData.success ? validatedData.data : "validatedData error"
    );
    // Check if the user has this job offer
    const job = await prisma.jobPost.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    console.log("Job trouvé:", job);

    if (!job) {
      console.error("Job non trouvé");
      // throw new Error("Job not found");
      return { success: false, error: "Job not found" };
    }

    if (job.company?.userId !== user.id) {
      console.error("Utilisateur non autorisé");
      //
      return {
        success: false,
        error: "Forbidden - You don't have permission to update this job",
      };
    }

    if (validatedData.success) {
      const updateData = {
        jobTitle: validatedData.data.jobTitle,
        employmentType: validatedData.data.employmentType,
        location: validatedData.data.location,
        salaryFrom: validatedData.data.salaryFrom,
        salaryTo: validatedData.data.salaryTo,
        jobDescription: validatedData.data.jobDescription,
        benefits: validatedData.data.benefits,
        listingDuration: validatedData.data.listingDuration,
      };

      console.log("Données envoyées à Prisma:", updateData);

      // Job update
      await prisma.jobPost.update({
        where: {
          id: jobId,
        },
        data: updateData,
      });
    }
    // return redirect("/my-jobs");
    console.log("Job mis à jour avec succès:");
    return { success: true };
  } catch (error) {
    console.error("Error updating job post:", error);
    // throw new Error("Error updating job post");
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
  try {
    // Vérification de l'authentification
    const user = await requireUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    // Protection Arcjet
    //Access the request object so Arcjet can analyze it
    const req = await request();
    //Call Arcjet protect
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      console.error("Accès refusé par Arcjet");
      // throw new Error("Forbidden");
      return { success: false, error: "Forbidden by security rules" };
    }

    // Server-side validation
    const validatedData = jobSeekerSchema.safeParse(data);

    if (!validatedData.success) {
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

    // Vérifier si le jobSeeker existe déjà
    const existingJobSeeker = await prisma.jobSeeker.findUnique({
      where: {
        userId: user.id,
      },
    });

    let result;

    if (existingJobSeeker) {
      result = await prisma.jobSeeker.update({
        where: {
          userId: user.id,
        },
        data: jobSeekerData,
      });
    } else {
      // Création d'un nouveau profil si aucun n'existe
      result = await prisma.user.update({
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
      });
    }
    if (!result) {
      console.error("Failed to update jobSeeker profile");
      return {
        success: false,
        error: "Failed to update jobSeeker profile",
      };
    }
    console.log("jobSeeker profile mis à jour avec succès:");
    return { success: true, jobSeeker: result };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error updating  job seeker profile:", error);
    // Gestion des erreurs
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: `Validation error: ${error.message}`,
      };
    }
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
