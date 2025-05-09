import React from "react";

import { redirect } from "next/navigation";
import OnboardingForm from "@/components/forms/onboarding/OnboardingForm";
import { prisma } from "@/app/utils/db";
import { requireUser } from "@/app/utils/hooks";

async function checkIfOnboardingCompleted(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      onboardingCompleted: true,
    },
  });

  if (user?.onboardingCompleted === true) {
    redirect("/");
  }
}

const OnboardingPage = async () => {
  const session = await requireUser();

  await checkIfOnboardingCompleted(session.id as string);
  return (
    <div className="min-h-screen w-screen py-10 flex flex-col items-center justify-center">
      <OnboardingForm />
    </div>
  );
};

export default OnboardingPage;
