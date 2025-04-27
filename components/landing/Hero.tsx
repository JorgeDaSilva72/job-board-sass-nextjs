// "use client";
// // import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// // import { ArrowRight } from "lucide-react";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import {Link} from '@/i18n/navigation';

// export const HeroSection = () => {
//   const { theme } = useTheme();
//   return (
//     <section className="container w-full">
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
//         <div className="text-center space-y-8">
//           {/* <Badge variant="outline" className="text-sm py-2">
//             <span className="mr-2 text-primary">
//               <Badge>New</Badge>
//             </span>
//             <span> Design is out now! </span>
//           </Badge> */}

//           <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//             <h1>
//               Find Your
//               <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                 Dream Job
//               </span>
//               Today
//             </h1>
//           </div>

//           <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//             {`Discover thousands of job opportunities and connect with top recruiters across Africa. Your next career move starts here!`}
//           </p>

//           <div className="space-y-4 md:space-y-0 md:space-x-4">
//             <Button asChild className="w-5/6 md:w-1/4 font-bold group/arrow">
//               <Link href="/find-job">Find Jobs</Link>

//               {/* <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" /> */}
//             </Button>

//             <Button asChild className="w-5/6 md:w-1/4 font-bold">
//               <Link href="/company/post-job">Post a Job</Link>
//             </Button>
//           </div>
//         </div>

//         <div className="relative group mt-14">
//           <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
//           <Image
//             width={1200}
//             height={1200}
//             className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
//             src={
//               theme === "light"
//                 ? "/hero-image-light.jpg"
//                 : "/hero-image-dark.jpg"
//             }
//             alt="dashboard"
//           />

//           <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// ------- chatgpt

// "use client";
// // import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// // import { ArrowRight } from "lucide-react";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import {Link} from '@/i18n/navigation';

// export const HeroSection = () => {
//   const { theme } = useTheme();
//   return (
//     <section className="container w-full">
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
//         <div className="text-center space-y-8">
//           {/* <Badge variant="outline" className="text-sm py-2">
//             <span className="mr-2 text-primary">
//               <Badge>New</Badge>
//             </span>
//             <span> Design is out now! </span>
//           </Badge> */}

//           <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//             <h1>
//               Find Your
//               <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                 Dream Job
//               </span>
//               Today
//             </h1>
//           </div>

//           <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//             {`Discover thousands of job opportunities and connect with top recruiters across Africa. Your next career move starts here!`}
//           </p>

//           {/* Divisez en deux colonnes */}
//           <div className="grid md:grid-cols-2 gap-8 mt-10">
//             {/* Section Chercheur d'Emploi */}
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold">Looking for a Job?</h2>
//               <p className="text-lg text-muted-foreground mt-4">
//                 Explore job openings that match your skills and start your new
//                 career journey today.
//               </p>
//               <Button
//                 asChild
//                 className="mt-6 w-full md:w-2/3 font-bold group/arrow"
//               >
//                 <Link href="/find-job">Find Jobs</Link>
//               </Button>
//             </div>

//             {/* Section Recruteur */}
//             <div className="text-center">
//               <h2 className="text-2xl font-semibold">Are You Hiring?</h2>
//               <p className="text-lg text-muted-foreground mt-4">
//                 Post your job openings and connect with top talent across
//                 Africa.
//               </p>
//               <Button asChild className="mt-6 w-full md:w-2/3 font-bold">
//                 <Link href="/company/post-job">Post a Job</Link>
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Image de fond */}
//         <div className="relative group mt-14">
//           <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
//           <Image
//             width={1200}
//             height={1200}
//             className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
//             src={
//               theme === "light"
//                 ? "/hero-image-light.jpg"
//                 : "/hero-image-dark.jpg"
//             }
//             alt="dashboard"
//           />
//           <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// deppseek -------------------

// "use client";
// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import {Link} from '@/i18n/navigation';

// export const HeroSection = () => {
//   const { theme } = useTheme();
//   return (
//     <section className="container w-full">
//       {/* Section pour les chercheurs d'emploi */}
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-16">
//         <div className="text-center space-y-8">
//           <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//             <h1>
//               Trouvez votre
//               <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                 emploi idéal
//               </span>
//               aujourd'hui
//             </h1>
//           </div>

//           <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//             Découvrez des milliers d'opportunités d'emploi à travers l'Afrique.
//             Votre prochaine étape de carrière commence ici !
//           </p>

//           <div className="space-y-4 md:space-y-0 md:space-x-4">
//             <Button asChild className="w-5/6 md:w-1/4 font-bold">
//               <Link href="/find-job">Trouver un emploi</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Section pour les recruteurs */}
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-10 md:py-16 bg-secondary/30 rounded-lg">
//         <div className="text-center space-y-8">
//           <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//             <h1>
//               Recrutez les
//               <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                 meilleurs talents
//               </span>
//               pour votre entreprise
//             </h1>
//           </div>

//           <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//             Connectez-vous avec des milliers de candidats qualifiés à travers
//             l'Afrique et trouvez la perle rare pour votre équipe.
//           </p>

//           <div className="space-y-4 md:space-y-0 md:space-x-4">
//             <Button asChild className="w-5/6 md:w-1/4 font-bold">
//               <Link href="/company/post-job">Publier une offre</Link>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Image commune */}
//       <div className="relative group mt-14">
//         <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
//         <Image
//           width={1200}
//           height={1200}
//           className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
//           src={
//             theme === "light" ? "/hero-image-light.jpg" : "/hero-image-dark.jpg"
//           }
//           alt="dashboard"
//         />
//         <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
//       </div>
//     </section>
//   );
// };

// claude --------------------------

// "use client";

// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import {Link} from '@/i18n/navigation';
// import { useState } from "react";

// export const HeroSection = () => {
//   const { theme } = useTheme();
//   const [userType, setUserType] = useState("jobseeker"); // 'jobseeker' ou 'recruiter'

//   return (
//     <section className="container w-full">
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
//         {/* Boutons de sélection du type d'utilisateur */}
//         <div className="flex space-x-4 mb-6">
//           <Button
//             variant={userType === "jobseeker" ? "default" : "outline"}
//             onClick={() => setUserType("jobseeker")}
//             className="font-bold"
//           >
//             Je cherche un emploi
//           </Button>
//           <Button
//             variant={userType === "recruiter" ? "default" : "outline"}
//             onClick={() => setUserType("recruiter")}
//             className="font-bold"
//           >
//             Je suis recruteur
//           </Button>
//         </div>

//         <div className="text-center space-y-8">
//           {/* Contenu pour chercheurs d'emploi */}
//           {userType === "jobseeker" && (
//             <>
//               <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//                 <h1>
//                   Find your{" "}
//                   <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                     Dream Job
//                   </span>{" "}
//                   from today.
//                 </h1>
//               </div>
//               <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//                 Discover thousands of job opportunities and connect with top
//                 recruiters across Africa. Your next career move starts here!
//               </p>
//               <div className="space-y-4 md:space-y-0 md:space-x-4">
//                 <Button asChild className="w-5/6 md:w-1/3 font-bold">
//                   <Link href="/find-job">Chercher des emplois</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   className="w-5/6 md:w-1/3 font-bold"
//                 >
//                   <Link href="/profile">Créer mon profil</Link>
//                 </Button>
//               </div>
//             </>
//           )}

//           {/* Contenu pour recruteurs */}
//           {userType === "recruiter" && (
//             <>
//               <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//                 <h1>
//                   Recrutez les{" "}
//                   <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                     meilleurs talents
//                   </span>{" "}
//                   d'Afrique
//                 </h1>
//               </div>
//               <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//                 Publiez vos offres d'emploi et accédez à une base de candidats
//                 qualifiés. Simplifiez votre processus de recrutement et trouvez
//                 les talents parfaits pour votre entreprise.
//               </p>
//               <div className="space-y-4 md:space-y-0 md:space-x-4">
//                 <Button asChild className="w-5/6 md:w-1/3 font-bold">
//                   <Link href="/company/post-job">Publier une offre</Link>
//                 </Button>
//                 <Button
//                   asChild
//                   variant="outline"
//                   className="w-5/6 md:w-1/3 font-bold"
//                 >
//                   <Link href="/company/register">
//                     Créer un compte entreprise
//                   </Link>
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>

//         <div className="relative group mt-14">
//           <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
//           <Image
//             width={1200}
//             height={1200}
//             className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
//             src={
//               userType === "jobseeker"
//                 ? theme === "light"
//                   ? "/hero-image-light.jpg"
//                   : "/hero-image-dark.jpg"
//                 : theme === "light"
//                 ? "/recruiter-image-light.jpg"
//                 : "/recruiter-image-dark.jpg"
//             }
//             alt={userType === "jobseeker" ? "Chercheur d'emploi" : "Recruteur"}
//           />
//           <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// "use client";

// import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import { Link } from "@/i18n/navigation";

// export const HeroSection = ({
//   userTypeData,
// }: {
//   userTypeData?: {
//     userType: "COMPANY" | "JOB_SEEKER" | null;
//     onboardingCompleted?: boolean;
//   } | null;
// }) => {
//   const { theme } = useTheme();
//   // const { data: session, status } = useSession();

//   // Déterminer le type d'utilisateur
//   // userTypeData viendrait d'une requête au serveur
//   // qui contient l'information sur le type d'utilisateur (COMPANY ou JOB_SEEKER)
//   // const isAuthenticated = status === "authenticated";
//   const userType = userTypeData?.userType || null;

//   // Contenu par défaut pour les utilisateurs non connectés
//   let heading = "Find Your Dream Job Today";
//   let description =
//     "Discover thousands of job opportunities and connect with top recruiters across Africa. Your next career move starts here!";
//   let primaryButtonText = "Find Jobs";
//   let primaryButtonLink = "/find-job";
//   let secondaryButtonText = "Post a Job";
//   let secondaryButtonLink = "/company/post-job";
//   let imageSrc =
//     theme === "light" ? "/hero-image-light.jpg" : "/hero-image-dark.jpg";
//   let imageAlt = "dashboard";

//   // Adapter le contenu selon le type d'utilisateur

//   // if (isAuthenticated && userType) {
//   if (userType) {
//     if (userType === "JOB_SEEKER") {
//       heading = "Discover Your Next Career Opportunity";
//       description =
//         "Browse the latest job postings tailored to your skills and experience. Your dream job is just a click away!";
//       primaryButtonText = "Browse Jobs";
//       primaryButtonLink = "/find-job";
//       secondaryButtonText = "Update Profile";
//       secondaryButtonLink = "/job-seeker/profile/edit";
//       imageSrc =
//         theme === "light"
//           ? "/job-seeker-image-light.jpg"
//           : "/job-seeker-image-dark.jpg";
//       imageAlt = "job-seeker dashboard";
//     } else if (userType === "COMPANY") {
//       heading = "Find The Best Talent In Africa";
//       description =
//         "Post your job openings and connect with qualified candidates. Streamline your recruitment process and build your dream team.";
//       primaryButtonText = "Post a Job";
//       primaryButtonLink = "/company/post-job";
//       secondaryButtonText = "Browse Candidates";
//       secondaryButtonLink = "/company/candidates";
//       imageSrc =
//         theme === "light"
//           ? "/recruiter-image-light.jpg"
//           : "/recruiter-image-dark.jpg";
//       imageAlt = "recruitment dashboard";
//     }
//   }

//   return (
//     <section className="container w-full">
//       <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
//         <div className="text-center space-y-8">
//           <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
//             <h1>
//               {heading.split("Dream Job").length > 1 ? (
//                 <>
//                   Find Your{" "}
//                   <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
//                     Dream Job
//                   </span>{" "}
//                   Today
//                 </>
//               ) : (
//                 <>
//                   {heading.split(" ").map((word, index) =>
//                     index === 1 || index === 2 ? (
//                       <span
//                         key={index}
//                         className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
//                       >
//                         {word}{" "}
//                       </span>
//                     ) : (
//                       <span key={index}>{word} </span>
//                     )
//                   )}
//                 </>
//               )}
//             </h1>
//           </div>
//           <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
//             {description}
//           </p>
//           <div className="space-y-4 md:space-y-0 md:space-x-4">
//             <Button asChild className="w-5/6 md:w-1/4 font-bold">
//               <Link href={primaryButtonLink}>{primaryButtonText}</Link>
//             </Button>
//             <Button
//               asChild
//               // variant={isAuthenticated ? "outline" : "default"}
//               variant={userType ? "outline" : "default"}
//               className="w-5/6 md:w-1/4 font-bold"
//             >
//               <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
//             </Button>
//           </div>
//         </div>

//         <div className="relative group mt-14">
//           <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
//           <Image
//             width={1200}
//             height={1200}
//             className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
//             src={imageSrc}
//             alt={imageAlt}
//           />
//           <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// BEGIN 25/04/2025

"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export const HeroSection = ({
  userTypeData,
}: {
  userTypeData?: {
    userType: "COMPANY" | "JOB_SEEKER" | null;
    onboardingCompleted?: boolean;
  } | null;
}) => {
  const { theme } = useTheme();
  const t = useTranslations("HeroSection");

  // Déterminer le type d'utilisateur
  const userType = userTypeData?.userType || null;

  // Contenu par défaut pour les utilisateurs non connectés
  let heading = t("defaultHeading");
  let description = t("defaultDescription");
  let primaryButtonText = t("defaultPrimaryButton");
  let primaryButtonLink = "/find-job";
  let secondaryButtonText = t("defaultSecondaryButton");
  let secondaryButtonLink = "/company/post-job";
  let imageSrc =
    theme === "light" ? "/hero-image-light.jpg" : "/hero-image-dark.jpg";
  let imageAlt = t("defaultImageAlt");
  console.log("Test translation:", t("defaultHeading"));

  // Adapter le contenu selon le type d'utilisateur
  if (userType) {
    if (userType === "JOB_SEEKER") {
      heading = t("jobSeekerHeading");
      description = t("jobSeekerDescription");
      primaryButtonText = t("jobSeekerPrimaryButton");
      primaryButtonLink = "/find-job";
      secondaryButtonText = t("jobSeekerSecondaryButton");
      secondaryButtonLink = "/job-seeker/profile/edit";
      imageSrc =
        theme === "light"
          ? "/job-seeker-image-light.jpg"
          : "/job-seeker-image-dark.jpg";
      imageAlt = t("jobSeekerImageAlt");
    } else if (userType === "COMPANY") {
      heading = t("companyHeading");
      description = t("companyDescription");
      primaryButtonText = t("companyPrimaryButton");
      primaryButtonLink = "/company/post-job";
      secondaryButtonText = t("companySecondaryButton");
      secondaryButtonLink = "/company/candidates";
      imageSrc =
        theme === "light"
          ? "/recruiter-image-light.jpg"
          : "/recruiter-image-dark.jpg";
      imageAlt = t("companyImageAlt");
    }
  }

  // Vérifier si le titre contient "Dream Job" pour le style spécial
  const hasDreamJob = t("defaultHeading").includes("Dream Job");

  return (
    <section className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              {hasDreamJob && heading === t("defaultHeading") ? (
                <>
                  {t("dreamJobPrefix")}{" "}
                  <span className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                    {t("dreamJobHighlight")}
                  </span>{" "}
                  {t("dreamJobSuffix")}
                </>
              ) : (
                <>
                  {heading.split(" ").map((word, index) =>
                    index === 1 || index === 2 ? (
                      <span
                        key={index}
                        className="text-transparent px-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text"
                      >
                        {word}{" "}
                      </span>
                    ) : (
                      <span key={index}>{word} </span>
                    )
                  )}
                </>
              )}
            </h1>
          </div>
          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {description}
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button asChild className="w-5/6 md:w-1/4 font-bold">
              <Link href={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            <Button
              asChild
              variant={userType ? "outline" : "default"}
              className="w-5/6 md:w-1/4 font-bold"
            >
              <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
            </Button>
          </div>
        </div>

        <div className="relative group mt-14">
          <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
          <Image
            width={1200}
            height={1200}
            className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary border-t-primary/30"
            src={imageSrc}
            alt={imageAlt}
          />
          <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
        </div>
      </div>
    </section>
  );
};
