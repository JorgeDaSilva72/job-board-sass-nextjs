// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { icons } from "lucide-react";
// import { Icon } from "../general/Icon";

// interface FeaturesProps {
//   icon: string;
//   title: string;
//   description: string;
// }

// const featureList: FeaturesProps[] = [
//   {
//     icon: "Search",
//     title: "Smart Search",
//     description:
//       "Find relevant job opportunities quickly with our advanced search engine that understands your skills and needs.",
//   },
//   {
//     icon: "Building2",
//     title: "African Companies",
//     description:
//       "Connect with the best African companies actively looking for talents like you.",
//   },
//   {
//     icon: "Briefcase",
//     title: "Exclusive Jobs",
//     description:
//       "Access unique and exclusive job opportunities across Africa, carefully selected for you.",
//   },
//   {
//     icon: "Rocket",
//     title: "Career Growth",
//     description:
//       "Develop your career with opportunities tailored to your profile and professional ambitions in Africa.",
//   },
//   {
//     icon: "GraduationCap",
//     title: "All Levels",
//     description:
//       "Whether you're a beginner or expert, find jobs matching your experience level and qualifications.",
//   },
//   {
//     icon: "Globe",
//     title: "Pan-African",
//     description:
//       "Explore opportunities in different African countries and contribute to the continent's development.",
//   },
// ];

// export const FeaturesSection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   return (
//     <section id="features" className="container py-24 sm:py-32">
//       <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider ">
//         OUR BENEFITS
//       </h2>

//       <h2 className="text-xl md:text-2xl text-center font-bold">
//         Why Choose Afrique Avenir Jobs ?
//       </h2>

//       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
//         Discover how our platform makes your job search easier and connects you
//         with the best professional opportunities in Africa.
//       </h3>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {featureList.map(({ icon, title, description }) => (
//           <div key={title}>
//             <Card className="h-full bg-background border-0 shadow-none">
//               <CardHeader className="flex justify-center items-center">
//                 <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
//                   <Icon
//                     name={icon as keyof typeof icons}
//                     size={24}
//                     color="hsl(var(--primary))"
//                     className="text-primary"
//                   />
//                 </div>

//                 <CardTitle>{title}</CardTitle>
//               </CardHeader>

//               <CardContent className="text-muted-foreground text-center">
//                 {description}
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// BEGIN

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { icons } from "lucide-react";
// import { Icon } from "../general/Icon";

// interface FeaturesProps {
//   icon: string;
//   title: string;
//   description: string;
// }

// const commonFeatures: FeaturesProps[] = [
//   {
//     icon: "Globe",
//     title: "Pan-African",
//     description:
//       "Explore opportunities in different African countries and contribute to the continent's development.",
//   },
// ];

// const jobSeekerFeatures: FeaturesProps[] = [
//   {
//     icon: "Search",
//     title: "Smart Search",
//     description:
//       "Find relevant job opportunities quickly with our advanced search engine that understands your skills and needs.",
//   },
//   {
//     icon: "Building2",
//     title: "African Companies",
//     description:
//       "Connect with the best African companies actively looking for talents like you.",
//   },
//   {
//     icon: "Briefcase",
//     title: "Exclusive Jobs",
//     description:
//       "Access unique and exclusive job opportunities across Africa, carefully selected for you.",
//   },
//   {
//     icon: "Rocket",
//     title: "Career Growth",
//     description:
//       "Develop your career with opportunities tailored to your profile and professional ambitions in Africa.",
//   },
//   {
//     icon: "GraduationCap",
//     title: "All Levels",
//     description:
//       "Whether you're a beginner or expert, find jobs matching your experience level and qualifications.",
//   },
// ];

// const companyFeatures: FeaturesProps[] = [
//   {
//     icon: "Users",
//     title: "Qualified Candidates",
//     description:
//       "Easily find candidates who match your job requirements across various industries.",
//   },
//   {
//     icon: "SearchCheck",
//     title: "Smart Filtering",
//     description:
//       "Use advanced filters and AI suggestions to identify the right talents faster.",
//   },
//   {
//     icon: "Handshake",
//     title: "Trusted Network",
//     description:
//       "Join a growing network of verified African companies hiring top talents.",
//   },
//   {
//     icon: "TrendingUp",
//     title: "Boost Hiring Efficiency",
//     description:
//       "Optimize your hiring process and reduce time-to-hire with our all-in-one platform.",
//   },
// ];

// export const FeaturesSection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   const userType = userTypeData?.userType;

//   const featureList: FeaturesProps[] =
//     userType === "COMPANY"
//       ? [...companyFeatures, ...commonFeatures]
//       : userType === "JOB_SEEKER"
//       ? [...jobSeekerFeatures, ...commonFeatures]
//       : [...jobSeekerFeatures, ...commonFeatures]; // contenu par défaut

//   const title =
//     userType === "COMPANY"
//       ? "Why Post Jobs on Afrique Avenir ?"
//       : "Why Choose Afrique Avenir Jobs ?";

//   const subtitle =
//     userType === "COMPANY"
//       ? "Discover how our platform simplifies recruitment and connects you with the best talents in Africa."
//       : "Discover how our platform makes your job search easier and connects you with the best professional opportunities in Africa.";

//   return (
//     <section id="features" className="container py-24 sm:py-32">
//       <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
//         OUR BENEFITS
//       </h2>

//       <h2 className="text-xl md:text-2xl text-center font-bold">{title}</h2>

//       <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
//         {subtitle}
//       </h3>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {featureList.map(({ icon, title, description }) => (
//           <div key={title}>
//             <Card className="h-full bg-background border-0 shadow-none">
//               <CardHeader className="flex justify-center items-center">
//                 <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
//                   <Icon
//                     name={icon as keyof typeof icons}
//                     size={24}
//                     color="hsl(var(--primary))"
//                     className="text-primary"
//                   />
//                 </div>
//                 <CardTitle>{title}</CardTitle>
//               </CardHeader>
//               <CardContent className="text-muted-foreground text-center">
//                 {description}
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// BEGIN 27/04/2025 compatible next-intl

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { icons } from "lucide-react";
import { Icon } from "../general/Icon";
import { useTranslations } from "next-intl";

interface FeaturesProps {
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

const commonFeatures: FeaturesProps[] = [
  {
    icon: "Globe",
    titleKey: "common.panAfrican.title",
    descriptionKey: "common.panAfrican.description",
  },
];

const jobSeekerFeatures: FeaturesProps[] = [
  {
    icon: "Search",
    titleKey: "jobSeeker.smartSearch.title",
    descriptionKey: "jobSeeker.smartSearch.description",
  },
  {
    icon: "Building2",
    titleKey: "jobSeeker.africanCompanies.title",
    descriptionKey: "jobSeeker.africanCompanies.description",
  },
  {
    icon: "Briefcase",
    titleKey: "jobSeeker.exclusiveJobs.title",
    descriptionKey: "jobSeeker.exclusiveJobs.description",
  },
  {
    icon: "Rocket",
    titleKey: "jobSeeker.careerGrowth.title",
    descriptionKey: "jobSeeker.careerGrowth.description",
  },
  {
    icon: "GraduationCap",
    titleKey: "jobSeeker.allLevels.title",
    descriptionKey: "jobSeeker.allLevels.description",
  },
];

const companyFeatures: FeaturesProps[] = [
  {
    icon: "Users",
    titleKey: "company.qualifiedCandidates.title",
    descriptionKey: "company.qualifiedCandidates.description",
  },
  {
    icon: "SearchCheck",
    titleKey: "company.smartFiltering.title",
    descriptionKey: "company.smartFiltering.description",
  },
  {
    icon: "Handshake",
    titleKey: "company.trustedNetwork.title",
    descriptionKey: "company.trustedNetwork.description",
  },
  {
    icon: "TrendingUp",
    titleKey: "company.boostHiringEfficiency.title",
    descriptionKey: "company.boostHiringEfficiency.description",
  },
];

export const FeaturesSection = ({
  userTypeData,
}: {
  userTypeData?: {
    userType: "COMPANY" | "JOB_SEEKER" | null;
    onboardingCompleted?: boolean;
  } | null;
}) => {
  const t = useTranslations("FeaturesSection");

  const userType = userTypeData?.userType;

  const featureList: FeaturesProps[] =
    userType === "COMPANY"
      ? [...companyFeatures, ...commonFeatures]
      : [...jobSeekerFeatures, ...commonFeatures];

  const title =
    userType === "COMPANY" ? t("title.company") : t("title.jobSeeker");
  const subtitle =
    userType === "COMPANY" ? t("subtitle.company") : t("subtitle.jobSeeker");

  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="mt-2 text-3xl md:text-4xl text-primary text-center mb-2 tracking-wider">
        {t("ourBenefits")}
      </h2>

      <h2 className="text-xl md:text-2xl text-center font-bold">{title}</h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {subtitle}
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, titleKey, descriptionKey }) => (
          <div key={titleKey}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>
                <CardTitle>{t(titleKey)}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                {t(descriptionKey)}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
