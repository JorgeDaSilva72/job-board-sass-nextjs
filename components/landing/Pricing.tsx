// // import { Button } from "@/components/ui/button";
// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Check } from "lucide-react";

// // enum PopularPlan {
// //   NO = 0,
// //   YES = 1,
// // }

// // interface PlanProps {
// //   title: string;
// //   popular: PopularPlan;
// //   price: number;
// //   description: string;
// //   buttonText: string;
// //   benefitList: string[];
// // }

// // const plans: PlanProps[] = [
// //   {
// //     title: "Basic",
// //     popular: 0,
// //     price: 0,
// //     description: "Perfect for job seekers who want to explore opportunities.",
// //     buttonText: "Get Started",
// //     benefitList: [
// //       "Access to job listings",
// //       "Apply to 5 jobs per month",
// //       "Basic search filters",
// //       "Email support",
// //     ],
// //   },
// //   {
// //     title: "Premium",
// //     popular: 1,
// //     price: 29,
// //     description:
// //       "Ideal for active job seekers who want more visibility and features.",
// //     buttonText: "Subscribe Now",
// //     benefitList: [
// //       "Unlimited job applications",
// //       "Advanced search filters",
// //       "Priority listing in recruiter searches",
// //       "Resume review and feedback",
// //       "24/7 email and chat support",
// //     ],
// //   },
// //   {
// //     title: "Recruiter Pro",
// //     popular: 0,
// //     price: 99,
// //     description:
// //       "For recruiters and employers looking to post jobs and find top talent.",
// //     buttonText: "Contact Us",
// //     benefitList: [
// //       "Post up to 10 job listings",
// //       "Access to candidate database",
// //       "Featured job listings",
// //       "Dedicated account manager",
// //       "Advanced analytics",
// //     ],
// //   },
// // ];

// // export const PricingSection = ({
// //   userTypeData,
// // }: {
// //   userTypeData?: {
// //     userType: "COMPANY" | "JOB_SEEKER" | null;
// //     onboardingCompleted?: boolean;
// //   } | null;
// // }) => {
// //   return (
// //     <section className="container py-24 sm:py-32">
// //       <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
// //         PRICING PLANS
// //       </h2>

// //       <h2 className="text-xl md:text-2xl text-center font-bold">
// //         Find the Right Plan for You
// //       </h2>

// //       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
// //         Whether you are a job seeker or an employer, we have a plan tailored to
// //         your needs.
// //       </h3>

// //       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
// //         {plans.map(
// //           ({ title, popular, price, description, buttonText, benefitList }) => (
// //             <Card
// //               key={title}
// //               className={
// //                 popular === PopularPlan?.YES
// //                   ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
// //                   : ""
// //               }
// //             >
// //               <CardHeader>
// //                 <CardTitle className="pb-2">{title}</CardTitle>

// //                 <CardDescription className="pb-4">
// //                   {description}
// //                 </CardDescription>

// //                 <div>
// //                   <span className="text-3xl font-bold">${price}</span>
// //                   <span className="text-muted-foreground"> /month</span>
// //                 </div>
// //               </CardHeader>

// //               <CardContent className="flex">
// //                 <div className="space-y-4">
// //                   {benefitList.map((benefit) => (
// //                     <span key={benefit} className="flex">
// //                       <Check className="text-primary mr-2" />
// //                       <h3>{benefit}</h3>
// //                     </span>
// //                   ))}
// //                 </div>
// //               </CardContent>

// //               <CardFooter>
// //                 <Button
// //                   variant={
// //                     popular === PopularPlan?.YES ? "default" : "secondary"
// //                   }
// //                   className="w-full"
// //                 >
// //                   {buttonText}
// //                 </Button>
// //               </CardFooter>
// //             </Card>
// //           )
// //         )}
// //       </div>
// //     </section>
// //   );
// // };

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Check } from "lucide-react";

// enum PopularPlan {
//   NO = 0,
//   YES = 1,
// }

// interface PlanProps {
//   title: string;
//   popular: PopularPlan;
//   price: number;
//   description: string;
//   buttonText: string;
//   benefitList: string[];
//   target: "JOB_SEEKER" | "COMPANY";
// }

// const plans: PlanProps[] = [
//   // {
//   //   title: "Basic",
//   //   popular: PopularPlan.NO,
//   //   price: 0,
//   //   description: "Perfect for job seekers who want to explore opportunities.",
//   //   buttonText: "Get Started",
//   //   benefitList: [
//   //     "Access to job listings",
//   //     "Apply to 5 jobs per month",
//   //     "Basic search filters",
//   //     "Email support",
//   //   ],
//   //   target: "JOB_SEEKER",
//   // },
//   {
//     title: "Premium",
//     popular: PopularPlan.YES,
//     price: 0,
//     description:
//       "Ideal for active job seekers who want more visibility and features.",
//     buttonText: "Subscribe Now",
//     benefitList: [
//       "Unlimited job applications",
//       "Advanced search filters",
//       "Priority listing in recruiter searches",
//       "Resume review and feedback",
//       // "24/7 email and chat support",
//     ],
//     target: "JOB_SEEKER",
//   },
//   // {
//   //   title: "Recruiter Pro",
//   //   popular: PopularPlan.NO,
//   //   price: 99,
//   //   description:
//   //     "For recruiters and employers looking to post jobs and find top talent.",
//   //   buttonText: "Contact Us",
//   //   benefitList: [
//   //     "Post up to 10 job listings",
//   //     "Access to candidate database",
//   //     "Featured job listings",
//   //     "Dedicated account manager",
//   //     "Advanced analytics",
//   //   ],
//   //   target: "COMPANY",
//   // },

//   {
//     title: "1 Month Access",
//     popular: PopularPlan.NO,
//     price: 49,
//     description:
//       "For recruiters and employers looking to post jobs and find top talent.",
//     buttonText: "Contact Us",
//     benefitList: ["Full access to candidate database"],
//     target: "COMPANY",
//   },
//   {
//     title: "3 Months Access",
//     popular: PopularPlan.YES,
//     price: 99,
//     description: "For recruiters and employers to find top talent.",
//     buttonText: "Contact Us",
//     benefitList: ["Full access to candidate database"],
//     target: "COMPANY",
//   },

//   {
//     title: "6 Months Access",
//     popular: PopularPlan.NO,
//     price: 149,
//     description: "For recruiters and employers to find top talent.",
//     buttonText: "Contact Us",
//     benefitList: ["Full access to candidate database"],
//     target: "COMPANY",
//   },
// ];

// export const PricingSection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   const userType = userTypeData?.userType ?? "JOB_SEEKER";

//   const filteredPlans = plans.filter((plan) => plan.target === userType);

//   return (
//     <section className="container py-24 sm:py-32">
//       <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
//         PRICING PLANS
//       </h2>

//       <h2 className="text-xl md:text-2xl text-center font-bold">
//         {userType === "COMPANY"
//           ? "Plans designed for recruiters and companies"
//           : "Find the Right Plan for Your Job Search"}
//       </h2>

//       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
//         {userType === "COMPANY"
//           ? "Choose a plan to efficiently hire top talent across Africa."
//           : "Whether you are a beginner or an expert, we have the right plan to help you land your next job in Africa."}
//       </h3>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
//         {filteredPlans.map(
//           ({ title, popular, price, description, buttonText, benefitList }) => (
//             <Card
//               key={title}
//               className={
//                 popular === PopularPlan.YES
//                   ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
//                   : ""
//               }
//             >
//               <CardHeader>
//                 <CardTitle className="pb-2">{title}</CardTitle>

//                 <CardDescription className="pb-4">
//                   {description}
//                 </CardDescription>

//                 <div>
//                   <span className="text-3xl font-bold">${price}</span>
//                   {/* <span className="text-muted-foreground"> /month</span> */}
//                   <span className="text-muted-foreground">
//                     {" "}
//                     /one-time payment
//                   </span>
//                 </div>
//               </CardHeader>

//               <CardContent className="flex">
//                 <div className="space-y-4">
//                   {benefitList.map((benefit) => (
//                     <span key={benefit} className="flex">
//                       <Check className="text-primary mr-2" />
//                       <h3>{benefit}</h3>
//                     </span>
//                   ))}
//                 </div>
//               </CardContent>

//               <CardFooter>
//                 <Button
//                   variant={
//                     popular === PopularPlan.YES ? "default" : "secondary"
//                   }
//                   className="w-full"
//                 >
//                   {buttonText}
//                 </Button>
//               </CardFooter>
//             </Card>
//           )
//         )}
//       </div>
//     </section>
//   );
// };

// BEGIN 27/04/2025 compatible next-intl

"use client";

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
import { useTranslations } from "next-intl";

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
  target: "JOB_SEEKER" | "COMPANY";
}

export const PricingSection = ({
  userTypeData,
}: {
  userTypeData?: {
    userType: "COMPANY" | "JOB_SEEKER" | null;
    onboardingCompleted?: boolean;
  } | null;
}) => {
  const t = useTranslations("Pricing");
  const userType = userTypeData?.userType ?? "JOB_SEEKER";

  const plans: PlanProps[] = [
    {
      title: t("plans.premium.title"),
      popular: PopularPlan.YES,
      price: 0,
      description: t("plans.premium.description"),
      buttonText: t("plans.premium.buttonText"),
      benefitList: [
        t("plans.premium.benefits.unlimitedApplications"),
        t("plans.premium.benefits.advancedFilters"),
        t("plans.premium.benefits.priorityListing"),
        t("plans.premium.benefits.resumeReview"),
      ],
      target: "JOB_SEEKER",
    },
    {
      title: t("plans.oneMonth.title"),
      popular: PopularPlan.NO,
      price: 49,
      description: t("plans.oneMonth.description"),
      buttonText: t("plans.oneMonth.buttonText"),
      benefitList: [t("plans.oneMonth.benefits.fullAccess")],
      target: "COMPANY",
    },
    {
      title: t("plans.threeMonths.title"),
      popular: PopularPlan.YES,
      price: 99,
      description: t("plans.threeMonths.description"),
      buttonText: t("plans.threeMonths.buttonText"),
      benefitList: [t("plans.threeMonths.benefits.fullAccess")],
      target: "COMPANY",
    },
    {
      title: t("plans.sixMonths.title"),
      popular: PopularPlan.NO,
      price: 149,
      description: t("plans.sixMonths.description"),
      buttonText: t("plans.sixMonths.buttonText"),
      benefitList: [t("plans.sixMonths.benefits.fullAccess")],
      target: "COMPANY",
    },
  ];

  const filteredPlans = plans.filter((plan) => plan.target === userType);

  return (
    <section className="container py-24 sm:py-32">
      <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
        {t("title")}
      </h2>

      <h2 className="text-xl md:text-2xl text-center font-bold">
        {userType === "COMPANY" ? t("subtitleCompany") : t("subtitleJobSeeker")}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {userType === "COMPANY"
          ? t("descriptionCompany")
          : t("descriptionJobSeeker")}
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {filteredPlans.map(
          ({ title, popular, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan.YES
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
                  <span className="text-muted-foreground">
                    {t("priceSuffix")}
                  </span>
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
                    popular === PopularPlan.YES ? "default" : "secondary"
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
