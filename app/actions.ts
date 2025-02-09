"use server";

import { z } from "zod";
import { requireUser } from "./utils/hooks";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/zodSchemas";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
// import { stripe } from "./utils/stripe";
// import { jobListingDurationPricing } from "./utils/pricingTiers";
import { revalidatePath } from "next/cache";
// import arcjet, { detectBot, shield } from "./utils/arcjet";
// import { request } from "@arcjet/next";
// import { inngest } from "./utils/inngest/client";

// const aj = arcjet
//   .withRule(
//     shield({
//       mode: "LIVE",
//     })
//   )
//   .withRule(
//     detectBot({
//       mode: "LIVE",
//       allow: [],
//     })
//   );

export async function createCompany(data: z.infer<typeof companySchema>) {
  const user = await requireUser();

  // // Access the request object so Arcjet can analyze it
  // const req = await request();
  // // Call Arcjet protect
  // const decision = await aj.protect(req);

  // if (decision.isDenied()) {
  //   throw new Error("Forbidden");
  // }

  // Server-side validation
  const validatedData = companySchema.parse(data);

  console.log(validatedData);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "COMPANY",
      Company: {
        create: {
          ...validatedData, // works only if zod schema naming is the same than prisma schema naming
        },
      },
    },
  });

  return redirect("/");
}

export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
  const user = await requireUser();

  // Access the request object so Arcjet can analyze it
  // const req = await request();
  // Call Arcjet protect
  // const decision = await aj.protect(req);

  // if (decision.isDenied()) {
  //   throw new Error("Forbidden");
  // }

  const validatedData = jobSeekerSchema.parse(data);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingCompleted: true,
      userType: "JOB_SEEKER",
      JobSeeker: {
        create: {
          ...validatedData,
        },
      },
    },
  });

  return redirect("/");
}
