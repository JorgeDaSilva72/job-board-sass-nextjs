import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ads } from "@/lib/data";
import AdBanner from "./AdBanner";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "How can I find job listings in Africa?",
    answer:
      "Our platform is designed to connect job seekers with opportunities across Africa. You can browse job listings by category, location, or keyword to find the perfect match for your skills and experience.",
    value: "item-1",
  },
  {
    question: "Do you provide career advice or CV reviews?",
    answer:
      "Yes, we offer resources and tips to help you improve your CV and prepare for interviews. Check out our blog and resources section for helpful guides, or contact us for personalized assistance.",
    value: "item-2",
  },
  {
    question: "Can employers post job listings on your platform?",
    answer:
      "Absolutely! Employers can create an account and post job listings to reach qualified candidates. We also offer premium options to highlight your job postings for greater visibility.",
    value: "item-3",
  },
  {
    question: "How do I contact the support team?",
    answer:
      "You can reach out to us through the contact form on our website, and our team will respond as soon as possible.",
    value: "item-4",
  },
];
export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="container mx-auto px-4 lg:flex lg:space-x-4 py-24 sm:py-32"
    >
      {/* Left Sidebar for Ads */}
      <div className="hidden lg:block lg:w-1/5">
        {ads.slice(0, 2).map((ad, index) => (
          <AdBanner
            key={index}
            imageUrl={ad.imageUrl}
            linkUrl={ad.linkUrl}
            altText={ad.altText}
          />
        ))}
      </div>
      {/* Main Content */}
      <div className="container md:w-[700px] lg:w-3/5">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
            FREQUENTLY ASKED QUESTIONS
          </h2>

          <h2 className="text-xl md:text-2xl text-center font-bold">
            Find answers to the most frequently asked questions.
          </h2>
        </div>

        <Accordion type="single" collapsible className="AccordionRoot">
          {FAQList.map(({ question, answer, value }) => (
            <AccordionItem key={value} value={value}>
              <AccordionTrigger className="text-left">
                {question}
              </AccordionTrigger>

              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      {/* Right Sidebar for Ads */}
      <div className="hidden lg:block lg:w-1/5">
        {ads.slice(2, 4).map((ad, index) => (
          <AdBanner
            key={index}
            imageUrl={ad.imageUrl}
            linkUrl={ad.linkUrl}
            altText={ad.altText}
          />
        ))}
      </div>
    </section>
  );
};
