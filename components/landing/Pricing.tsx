import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Basic",
    popular: 0,
    price: 0,
    description: "Perfect for job seekers who want to explore opportunities.",
    buttonText: "Get Started",
    benefitList: [
      "Access to job listings",
      "Apply to 5 jobs per month",
      "Basic search filters",
      "Email support",
    ],
  },
  {
    title: "Premium",
    popular: 1,
    price: 29,
    description:
      "Ideal for active job seekers who want more visibility and features.",
    buttonText: "Subscribe Now",
    benefitList: [
      "Unlimited job applications",
      "Advanced search filters",
      "Priority listing in recruiter searches",
      "Resume review and feedback",
      "24/7 email and chat support",
    ],
  },
  {
    title: "Recruiter Pro",
    popular: 0,
    price: 99,
    description:
      "For recruiters and employers looking to post jobs and find top talent.",
    buttonText: "Contact Us",
    benefitList: [
      "Post up to 10 job listings",
      "Access to candidate database",
      "Featured job listings",
      "Dedicated account manager",
      "Advanced analytics",
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
        PRICING PLANS
      </h2>

      <h2 className="text-xl md:text-2xl text-center font-bold">
        Find the Right Plan for You
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        Whether you are a job seeker or an employer, we have a plan tailored to
        your needs.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">${price}</span>
                  <span className="text-muted-foreground"> /month</span>
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
