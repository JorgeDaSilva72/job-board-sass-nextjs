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

    // Server-side validation
    const validatedData = companySchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(`Validation failed: ${validatedData.error.message}`);
    }

    // console.log(validatedData);

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

    if (!result) {
      throw new Error("Failed to create company");
    }

    return { success: true };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error creating job seeker:", error);

    // Gestion des erreurs
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to create company: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
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
      throw new Error("Forbidden");
    }

    const validatedData = jobSeekerSchema.safeParse(data);

    if (!validatedData.success) {
      throw new Error(`Validation failed: ${validatedData.error.message}`);
    }

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

    if (!result) {
      throw new Error("Failed to create company");
    }
    // Revalidate the job seekers page to show updated data
    // revalidatePath("/job-seekers");

    // Redirect to a success page or dashboard
    // redirect("/job-seekers/success");
    // await new Promise((resolve) => setTimeout(resolve, 500)); //avant la redirection pour laisser le temps au toast d'apparaître.
    // return redirect("/find-job");
    return { success: true };
  } catch (error) {
    // Log the error for debugging (in a production environment)
    console.error("Error creating job seeker:", error);
    // Gestion des erreurs
    if (error instanceof z.ZodError) {
      throw new Error(`Validation error: ${error.message}`);
    }
    if (error instanceof Error) {
      throw new Error(`Failed to create company: ${error.message}`);
    }
    throw new Error("An unexpected error occurred");
  }
}

export async function createJob(data: z.infer<typeof jobSchema>) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  const req = await request();
  // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  // Server-side validation
  const validatedData = jobSchema.parse(data);

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
    return redirect("/");
  }

  let stripeCustomerId = company.user.stripeCustomerId;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name || undefined,
    });

    stripeCustomerId = customer.id;

    // Update user with Stripe customer ID
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customer.id },
    });
  }

  const jobPost = await prisma.jobPost.create({
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
    select: {
      id: true,
    },
  });

  // Trigger the job expiration function
  await inngest.send({
    name: "job/created",
    data: {
      jobId: jobPost.id,
      expirationDays: validatedData.listingDuration,
    },
  });

  //Get price from pricing tiers based on duration
  const pricingTier = jobListingDurationPricing.find(
    (tier) => tier.days === validatedData.listingDuration
  );

  if (!pricingTier) {
    throw new Error("Invalid listing duration selected");
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `Job Posting - ${pricingTier.days} Days`,
            description: pricingTier.description,
            images: [
              "https://ok4ti6421c.ufs.sh/f/CtVwROvCTE2owy4sD2rbepfB2G0Vq7uoNhHS5IxsLvt3YznF",
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

  return redirect(session.url as string);
}

export async function updateJobPost(
  data: z.infer<typeof jobSchema>,
  jobId: string
) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  const req = await request();
  // Call Arcjet protect
  const decision = await aj.protect(req);

  if (decision.isDenied()) {
    throw new Error("Forbidden");
  }

  // Server-side validation

  const validatedData = jobSchema.parse(data);

  await prisma.jobPost.update({
    where: {
      id: jobId,
      company: {
        userId: user.id,
      },
    },
    data: {
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

  return redirect("/my-jobs");
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
