import { ContactSection } from "@/components/landing/Contact";
import { CTASection } from "@/components/landing/CTASection";
import { FAQSection } from "@/components/landing/Faq";
import { FeaturesSection } from "@/components/landing/Features";
import { HeroSection } from "@/components/landing/Hero";
import { PricingSection } from "@/components/landing/Pricing";
import { SponsorsSection } from "@/components/landing/sponsors";
import { TeamSection } from "@/components/landing/Team";
import { TestimonialSection } from "@/components/landing/Testimonial";
import { auth } from "../utils/auth";
import { prisma } from "../utils/db";

export default async function LandingPage() {
  const session = await auth();
  let userTypeData = null;

  // Si l'utilisateur est connecté, récupérer son type depuis la base de données
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { userType: true, onboardingCompleted: true },
    });

    userTypeData = user;
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <HeroSection userTypeData={userTypeData} />
        <FeaturesSection userTypeData={userTypeData} />
        <SponsorsSection />
        <TestimonialSection />
        <TeamSection />
        <PricingSection />
        <ContactSection />
        <FAQSection />
        <CTASection userTypeData={userTypeData} />
      </div>
    </div>
  );
}
