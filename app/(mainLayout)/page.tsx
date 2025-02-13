// import CTA from "@/components/landing/CTA";
// import Features from "@/components/landing/Features";
import { FAQSection } from "@/components/landing/Faq";
import { HeroSection } from "@/components/landing/Hero";
import { SponsorsSection } from "@/components/landing/sponsors";
import { TeamSection } from "@/components/landing/Team";
import { TestimonialSection } from "@/components/landing/Testimonial";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <HeroSection />
        {/* <Features /> */}
        <SponsorsSection />
        <TestimonialSection />
        <TeamSection />

        <FAQSection />
        {/* <CTA /> */}
      </div>
      {/* <Hero /> */}
      {/* <Features />
      <CTA />
      <Testimonials /> */}
    </div>
  );
}
