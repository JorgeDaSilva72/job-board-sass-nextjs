import { FAQSection } from "@/components/landing/Faq";
import { FeaturesSection } from "@/components/landing/Features";
import { HeroSection } from "@/components/landing/Hero";
import { SponsorsSection } from "@/components/landing/sponsors";
import { TeamSection } from "@/components/landing/Team";
import { TestimonialSection } from "@/components/landing/Testimonial";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <HeroSection />
        <FeaturesSection />
        <SponsorsSection />
        <TestimonialSection />
        <TeamSection />
        <FAQSection />
      </div>
    </div>
  );
}
