// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import {Link} from '@/i18n/navigation';

// // export const HeroSection = ({
// //   userTypeData,
// // }: {
// //   userTypeData?: {
// //     userType: "COMPANY" | "JOB_SEEKER" | null;
// //     onboardingCompleted?: boolean;
// //   } | null;
// // })
// export const CTASection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   console.log(userTypeData);
//   if (userTypeData) return null;
//   return (
//     <section className="container py-24 sm:py-32">
//       <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">
//           Ready to Take the Next Step?
//         </h2>
//         <p className="text-xl text-muted-foreground mb-8">
//           Whether you are a job seeker or an employer, we are here to help you
//           achieve your goals. Join us today and unlock new opportunities!
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//           {/* <Button className="gap-2 w-48 h-12" size="default">
//             Get Started <ArrowRight className="w-4 h-4" />
//           </Button> */}
//           <Button asChild className="gap-2 w-48 h-12 group" size="default">
//             <Link href="/find-job" className="flex items-center">
//               Get Started
//               <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </Button>
//           {/* <Button variant="outline" className="gap-2" size="lg">
//             Contact Us <Mail className="w-4 h-4" />
//           </Button> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// import { Button } from "@/components/ui/button";
// import { ArrowRight } from "lucide-react";
// import { Link } from "@/i18n/navigation";

// export const CTASection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   if (!userTypeData || userTypeData.userType === null) {
//     return (
//       <section className="container py-24 sm:py-32">
//         <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Take the Next Step?
//           </h2>
//           <p className="text-xl text-muted-foreground mb-8">
//             Whether you are a job seeker or an employer, we are here to help you
//             achieve your goals. Join us today and unlock new opportunities!
//           </p>
//           <CTAButton href="/find-job" label="Get Started" />
//         </div>
//       </section>
//     );
//   }

//   if (userTypeData.userType === "JOB_SEEKER") {
//     return (
//       <section className="container py-24 sm:py-32">
//         <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Looking for Your Dream Job?
//           </h2>
//           <p className="text-xl text-muted-foreground mb-8">
//             Explore thousands of job opportunities tailored just for you. Start
//             applying today!
//           </p>
//           <CTAButton href="/find-job" label="Browse Jobs" />
//         </div>
//       </section>
//     );
//   }

//   if (userTypeData.userType === "COMPANY") {
//     return (
//       <section className="container py-24 sm:py-32">
//         <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4">
//             Ready to Hire Top Talent?
//           </h2>
//           <p className="text-xl text-muted-foreground mb-8">
//             Find the perfect candidates to grow your business. Post a job and
//             connect with talent today.
//           </p>
//           <CTAButton href="/company/post-job" label="Post a Job" />
//         </div>
//       </section>
//     );
//   }

//   return null;
// };

// const CTAButton = ({ href, label }: { href: string; label: string }) => (
//   <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//     <Button asChild className="gap-2 w-48 h-12 group" size="default">
//       <Link href={href} className="flex items-center">
//         {label}
//         <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
//       </Link>
//     </Button>
//   </div>
// );

//  BEGIN 27/04/2025 compatible next-intl

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const CTASection = ({
  userTypeData,
}: {
  userTypeData?: {
    userType: "COMPANY" | "JOB_SEEKER" | null;
    onboardingCompleted?: boolean;
  } | null;
}) => {
  const t = useTranslations("CTASection");

  if (!userTypeData || userTypeData.userType === null) {
    return (
      <section className="container py-24 sm:py-32">
        <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("default.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("default.description")}
          </p>
          <CTAButton href="/find-job" label={t("default.buttonText")} />
        </div>
      </section>
    );
  }

  if (userTypeData.userType === "JOB_SEEKER") {
    return (
      <section className="container py-24 sm:py-32">
        <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("jobSeeker.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("jobSeeker.description")}
          </p>
          <CTAButton href="/find-job" label={t("jobSeeker.buttonText")} />
        </div>
      </section>
    );
  }

  if (userTypeData.userType === "COMPANY") {
    return (
      <section className="container py-24 sm:py-32">
        <div className="bg-muted/50 dark:bg-card rounded-lg px-8 py-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("company.title")}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("company.description")}
          </p>
          <CTAButton href="/company/post-job" label={t("company.buttonText")} />
        </div>
      </section>
    );
  }

  return null;
};

const CTAButton = ({ href, label }: { href: string; label: string }) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <Button asChild className="gap-2 w-48 h-12 group" size="default">
      <Link href={href} className="flex items-center">
        {label}
        <ArrowRight className="size-5 ml-2 transition-transform group-hover:translate-x-1" />
      </Link>
    </Button>
  </div>
);
