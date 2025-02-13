// import CTA from "@/components/landing/CTA";
// import Features from "@/components/landing/Features";
import { HeroSection } from "@/components/landing/Hero";
import { TestimonialSection } from "@/components/landing/Testimonial";

export default function LandingPage() {
  return (
    <div>
      <div className="flex flex-col items-center">
        <HeroSection />
        {/* <Features /> */}
        <TestimonialSection />
        {/* <CTA /> */}
      </div>
      {/* <Hero /> */}
      {/* <Features />
      <CTA />
      <Testimonials /> */}
    </div>
  );
}
