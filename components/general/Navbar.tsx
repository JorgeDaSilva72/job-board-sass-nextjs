// import {Link} from '@/i18n/navigation';

// import { Button, buttonVariants } from "../ui/button";
// import Image from "next/image";
// import Logo from "@/public/logo.png";

// import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { auth } from "@/app/utils/auth";
// import { ThemeToggle } from "./ThemeToggle";
// import { UserDropdown } from "./UserDropdown";

// export async function Navbar() {
//   const session = await auth();

//   return (
//     <nav className="flex justify-between items-center py-5">
//       <Link href="/" className="flex items-center gap-2">
//         <Image src={Logo} alt="Afrique Avenir Logo" width={40} height={40} />
//         <h1 className="text-2xl font-bold">
//           Afrique Avenir<span className="text-primary"> Emploi</span>
//         </h1>
//       </Link>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-5">
//         <ThemeToggle />
//         <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
//           Post Job
//         </Link>
//         {session?.user ? (
//           <UserDropdown
//             email={session.user.email as string}
//             name={session.user.name as string}
//             image={session.user.image as string}
//           />
//         ) : (
//           <Link
//             href="/login"
//             className={buttonVariants({ variant: "outline", size: "lg" })}
//           >
//             Login
//           </Link>
//         )}
//       </div>

//       {/* Mobile Navigation */}
//       <div className="md:hidden flex items-center gap-4">
//         <ThemeToggle />
//         {session?.user ? (
//           <UserDropdown
//             email={session.user.email as string}
//             name={session.user.name as string}
//             image={session.user.image as string}
//           />
//         ) : (
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline" size="icon">
//                 <Menu className="h-6 w-6" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent>
//               <SheetHeader className="text-left">
//                 <SheetTitle>
//                   Afrique Avenir<span className="text-primary">Emploi</span>
//                 </SheetTitle>
//                 <SheetDescription>
//                   Find or post your next job opportunity
//                 </SheetDescription>
//               </SheetHeader>

//               <div className="flex flex-col gap-4 mt-6">
//                 <Link
//                   href="/"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Find New Job
//                 </Link>
//                 <Link
//                   href="/post-job"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Post a Job
//                 </Link>
//                 <Link
//                   href="/login"
//                   className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
//                 >
//                   Login
//                 </Link>
//               </div>
//             </SheetContent>
//           </Sheet>
//         )}
//       </div>
//     </nav>
//   );
// }

// import {Link} from '@/i18n/navigation';
// import { Button, buttonVariants } from "../ui/button";
// import Image from "next/image";
// import Logo from "@/public/logo.png";
// import { Menu } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { auth } from "@/app/utils/auth";
// import { ThemeToggle } from "./ThemeToggle";
// import { UserDropdown } from "./UserDropdown";
// import { cn } from "@/lib/utils";
// import { getUserType } from "@/lib/userUtils";

// const NavigationLinks = ({ className }: { className?: string }) => (
//   <div className={cn("flex flex-col gap-2", className)}>
//     <Link
//       href="/find-job"
//       className="text-lg font-medium hover:text-primary transition-colors"
//     >
//       Find Jobs
//     </Link>
//     <Link
//       href="/post-job"
//       className="text-lg font-medium hover:text-primary transition-colors"
//     >
//       Post a Job
//     </Link>
//   </div>
// );

// export async function Navbar() {
//   const session = await auth();

//   let userType: "COMPANY" | "JOB_SEEKER" | null = null;

//   try {
//     userType = await getUserType(session?.user?.id ?? "");
//     console.log("User type:", userType);
//   } catch (error) {
//     console.error(
//       "Erreur lors de la récupération du type d'utilisateur :",
//       error
//     );
//     userType = null;
//   }

//   return (
//     <header className="border-b mb-4">
//       <nav className="container mx-auto flex justify-between items-center h-16 px-4">
//         <Link href="/" className="flex items-center gap-2 shrink-0">
//           <Image
//             src={Logo}
//             alt="Afrique Avenir Logo"
//             width={32}
//             height={32}
//             className="object-contain"
//           />
//           <h1 className="text-xl font-bold whitespace-nowrap">
//             Afrique Avenir <span className="text-primary">Jobs</span>
//           </h1>
//         </Link>

//         {/* Navigation Links - Desktop only */}
//         <div className="hidden md:flex items-center gap-8 mx-8">
//           <NavigationLinks className="flex-row gap-8" />
//         </div>

//         {/* Right side menu (Theme + Auth) */}
//         <div className="flex items-center gap-4">
//           <ThemeToggle />
//           {session?.user ? (
//             <UserDropdown
//               email={session.user.email as string}
//               name={session.user.name as string}
//               image={session.user.image as string}
//               userType={userType}
//             />
//           ) : (
//             <>
//               {/* Desktop Auth Buttons */}
//               <div className="hidden md:flex gap-2">
//                 <Link
//                   href="/login"
//                   className={buttonVariants({ variant: "outline", size: "sm" })}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   href="/post-job"
//                   className={buttonVariants({ size: "sm" })}
//                 >
//                   Post Job
//                 </Link>
//               </div>

//               {/* Mobile Menu Button */}
//               <div className="md:hidden">
//                 <Sheet>
//                   <SheetTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="hover:bg-secondary"
//                     >
//                       <Menu className="h-5 w-5" />
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent>
//                     <SheetHeader className="text-left">
//                       <SheetTitle>
//                         <span className="flex items-center gap-2">
//                           <Image
//                             src={Logo}
//                             alt="Logo"
//                             width={24}
//                             height={24}
//                             className="object-contain"
//                           />
//                           Afrique Avenir{" "}
//                           <span className="text-primary">Jobs</span>
//                         </span>
//                       </SheetTitle>
//                       <SheetDescription>
//                         Discover or post your next opportunity
//                       </SheetDescription>
//                     </SheetHeader>

//                     <div className="flex flex-col gap-6 mt-8">
//                       <NavigationLinks />
//                       <div className="flex flex-col gap-2">
//                         <SheetClose asChild>
//                           <Link
//                             href="/login"
//                             className={buttonVariants({
//                               variant: "outline",
//                               size: "lg",
//                               className: "w-full",
//                             })}
//                           >
//                             Login
//                           </Link>
//                         </SheetClose>
//                         <SheetClose asChild>
//                           <Link
//                             href="/post-job"
//                             className={buttonVariants({
//                               size: "lg",
//                               className: "w-full",
//                             })}
//                           >
//                             Post a job
//                           </Link>
//                         </SheetClose>
//                       </div>
//                     </div>
//                   </SheetContent>
//                 </Sheet>
//               </div>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// import { Link } from "@/i18n/navigation";
// import { Button, buttonVariants } from "../ui/button";
// import Image from "next/image";
// import Logo from "@/public/logo.png";
// import { Menu, Briefcase, Search, User } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet";
// import { auth } from "@/app/utils/auth";
// import { ThemeToggle } from "./ThemeToggle";
// import { UserDropdown } from "./UserDropdown";
// import { cn } from "@/lib/utils";
// import { getUserType } from "@/lib/userUtils";
// import { LanguageSwitcher } from "./LanguageSwitcher";

// // Navigation links component based on user type
// const NavigationLinks = ({
//   className,
//   userType,
// }: {
//   className?: string;
//   userType: string;
// }) => {
//   // Common links for all user types
//   const commonLinks = (
//     <>
//       <Link
//         href="/find-job"
//         className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//       >
//         <Search className="h-4 w-4" />
//         Find Jobs
//       </Link>
//       <LanguageSwitcher />
//     </>
//   );

//   // Company-specific links
//   if (userType === "COMPANY") {
//     return (
//       <div className={cn("flex flex-col gap-2", className)}>
//         {commonLinks}
//         <Link
//           href="/company/post-job"
//           className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//         >
//           <Briefcase className="h-4 w-4" />
//           Post a Job
//         </Link>
//         {/* <Link
//           href="/company/dashboard"
//           className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//         >
//           <Building className="h-4 w-4" />
//           Company Dashboard
//         </Link> */}
//       </div>
//     );
//   }

//   // Job seeker-specific links
//   if (userType === "JOB_SEEKER") {
//     return (
//       <div className={cn("flex flex-col gap-2", className)}>
//         {commonLinks}
//         <Link
//           href="/job-seeker/applications"
//           className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//         >
//           <Briefcase className="h-4 w-4" />
//           My Applications
//         </Link>
//         <Link
//           href="/job-seeker/profile"
//           className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//         >
//           <User className="h-4 w-4" />
//           My Profile
//         </Link>
//       </div>
//     );
//   }

//   // Links for unauthenticated users
//   return (
//     <div className={cn("flex flex-col gap-2", className)}>
//       {commonLinks}
//       <Link
//         href="/company/post-job"
//         className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
//       >
//         <Briefcase className="h-4 w-4" />
//         Post a Job
//       </Link>
//     </div>
//   );
// };

// export async function Navbar() {
//   const session = await auth();
//   // let userType: "COMPANY" | "JOB_SEEKER" | "UNDEFINED" = "UNDEFINED";

//   let userType: string = "UNDEFINED";

//   try {
//     if (session?.user?.id) {
//       const userTypeResult = await getUserType(session.user.id);
//       // Vérification que userTypeResult a bien un champ type
//       if (
//         userTypeResult &&
//         typeof userTypeResult === "object" &&
//         "type" in userTypeResult
//       ) {
//         userType = userTypeResult.type;
//         console.log("User type assigned:", userType);
//       } else {
//         console.error(
//           "User type result is not in expected format:",
//           userTypeResult
//         );
//       }
//     }
//   } catch (error) {
//     console.error("Error retrieving user type:", error);
//     userType = "UNDEFINED";
//   }

//   // Custom actions based on user type
//   const getPrimaryActionButton = () => {
//     if (!session?.user) {
//       return (
//         // <Link href="/register" className={buttonVariants({ size: "sm" })}>
//         //   Sign Up
//         // </Link>
//         null
//       );
//     }

//     if (userType === "COMPANY") {
//       return (
//         <Link
//           href="/company/post-job"
//           className={buttonVariants({ size: "sm" })}
//         >
//           Post New Job
//         </Link>
//       );
//     }

//     if (userType === "JOB_SEEKER") {
//       return (
//         <Link href="/job-alerts" className={buttonVariants({ size: "sm" })}>
//           Job Alerts
//         </Link>
//       );
//     }

//     return null;
//   };

//   return (
//     <header className="border-b mb-4 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 sticky top-0 z-50">
//       <nav className="container mx-auto flex justify-between items-center h-16 px-4">
//         <Link href="/" className="flex items-center gap-2 shrink-0">
//           <Image
//             src={Logo}
//             alt="Afrique Avenir Logo"
//             width={32}
//             height={32}
//             className="object-contain"
//           />
//           <h1 className="text-xl font-bold whitespace-nowrap">
//             Afrique Avenir <span className="text-primary">Jobs</span>
//           </h1>
//         </Link>

//         {/* Navigation Links - Desktop only */}
//         <div className="hidden md:flex items-center gap-8 mx-8">
//           <NavigationLinks className="flex-row gap-8" userType={userType} />
//         </div>

//         {/* Right side menu (Theme + Auth) */}
//         <div className="flex items-center gap-4">
//           <ThemeToggle />

//           {session?.user ? (
//             <UserDropdown
//               email={session.user.email as string}
//               name={session.user.name as string}
//               image={session.user.image as string}
//               userType={userType}
//             />
//           ) : (
//             <>
//               {/* Desktop Auth Buttons */}
//               <div className="hidden md:flex gap-2">
//                 <Link href="/login" className={buttonVariants({ size: "sm" })}>
//                   Login
//                 </Link>
//                 {getPrimaryActionButton()}
//               </div>

//               {/* Mobile Menu Button */}
//               <div className="md:hidden">
//                 <Sheet>
//                   <SheetTrigger asChild>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       className="hover:bg-secondary"
//                     >
//                       <Menu className="h-5 w-5" />
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent>
//                     <SheetHeader className="text-left">
//                       <SheetTitle>
//                         <span className="flex items-center gap-2">
//                           <Image
//                             src={Logo}
//                             alt="Logo"
//                             width={24}
//                             height={24}
//                             className="object-contain"
//                           />
//                           Afrique Avenir{" "}
//                           <span className="text-primary">Jobs</span>
//                         </span>
//                       </SheetTitle>
//                       <SheetDescription>
//                         {userType === "COMPANY"
//                           ? "Manage your job listings"
//                           : userType === "JOB_SEEKER"
//                           ? "Find your next opportunity"
//                           : "Discover your next opportunity or post a new job "}
//                       </SheetDescription>
//                     </SheetHeader>

//                     <div className="flex flex-col gap-6 mt-8">
//                       <NavigationLinks userType={userType} />

//                       {!session?.user && (
//                         <div className="flex flex-col gap-2">
//                           <SheetClose asChild>
//                             <Link
//                               href="/login"
//                               className={buttonVariants({
//                                 // variant: "outline",
//                                 size: "lg",
//                                 className: "w-full",
//                               })}
//                             >
//                               Login
//                             </Link>
//                           </SheetClose>
//                           {/* <SheetClose asChild>
//                             <Link
//                               href="/register"
//                               className={buttonVariants({
//                                 size: "lg",
//                                 className: "w-full",
//                               })}
//                             >
//                               Sign Up
//                             </Link>
//                           </SheetClose> */}
//                         </div>
//                       )}
//                     </div>
//                   </SheetContent>
//                 </Sheet>
//               </div>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

// BEGIN 27/04/2025 compatible next-intl

import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { Menu, Briefcase, Search } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { auth } from "@/app/utils/auth";
import { ThemeToggle } from "./ThemeToggle";
import { UserDropdown } from "./UserDropdown";
import { cn } from "@/lib/utils";
import { getUserType } from "@/lib/userUtils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

const NavigationLinks = ({
  className,
  userType,
}: {
  className?: string;
  userType: string;
}) => {
  const t = useTranslations("Navbar");

  const commonLinks = (
    <>
      <Link
        href="/find-job"
        className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
      >
        <Search className="h-4 w-4" />
        {t("links.findJobs")}
      </Link>
    </>
  );

  if (userType === "COMPANY") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {commonLinks}
        <Link
          href="/company/post-job"
          className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
        >
          <Briefcase className="h-4 w-4" />
          {t("links.postJob")}
        </Link>
      </div>
    );
  }

  if (userType === "JOB_SEEKER") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        {commonLinks}
        <Link
          href="/job-seeker/applications"
          className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
        >
          <Briefcase className="h-4 w-4" />
          {t("links.myApplications")}
        </Link>
        {/* <Link
          href="/job-seeker/profile"
          className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
        >
          <User className="h-4 w-4" />
          {t("links.myProfile")}
        </Link> */}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {commonLinks}
      <Link
        href="/company/post-job"
        className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
      >
        <Briefcase className="h-4 w-4" />
        {t("links.postJob")}
      </Link>
    </div>
  );
};

export async function Navbar() {
  const t = await getTranslations("Navbar");
  const session = await auth();
  let userType: string = "UNDEFINED";

  try {
    if (session?.user?.id) {
      const userTypeResult = await getUserType(session.user.id);
      if (
        userTypeResult &&
        typeof userTypeResult === "object" &&
        "type" in userTypeResult
      ) {
        userType = userTypeResult.type;
      }
    }
  } catch (error) {
    console.error("Error retrieving user type:", error);
  }

  const getPrimaryActionButton = () => {
    if (!session?.user) {
      return null;
    }

    if (userType === "COMPANY") {
      return (
        <Link
          href="/company/post-job"
          className={buttonVariants({ size: "sm" })}
        >
          {t("buttons.postNewJob")}
        </Link>
      );
    }

    if (userType === "JOB_SEEKER") {
      return (
        <Link href="/job-alerts" className={buttonVariants({ size: "sm" })}>
          {t("buttons.jobAlerts")}
        </Link>
      );
    }

    return null;
  };

  const getSheetDescription = () => {
    switch (userType) {
      case "COMPANY":
        return t("mobileMenu.companyDescription");
      case "JOB_SEEKER":
        return t("mobileMenu.jobSeekerDescription");
      default:
        return t("mobileMenu.defaultDescription");
    }
  };

  return (
    <header className="border-b mb-4 bg-background/95 backdrop-blur supports-backdrop-blur:bg-background/60 sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={Logo}
            alt={t("logoAlt")}
            width={32}
            height={32}
            className="object-contain"
          />
          <h1 className="text-xl font-bold whitespace-nowrap">
            {t("brandName")}{" "}
            <span className="text-primary">{t("brandSuffix")}</span>
          </h1>
        </Link>

        <div className="hidden lg:flex items-center gap-8 mx-8">
          <NavigationLinks className="flex-row gap-8" userType={userType} />
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageSwitcher />

          {session?.user ? (
            <UserDropdown
              email={session.user.email as string}
              name={session.user.name as string}
              image={session.user.image as string}
              userType={userType}
            />
          ) : (
            <>
              <div className="hidden md:flex gap-2">
                <Link href="/login" className={buttonVariants({ size: "sm" })}>
                  {t("buttons.login")}
                </Link>
                {getPrimaryActionButton()}
              </div>

              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-secondary"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader className="text-left">
                      <SheetTitle>
                        <span className="flex items-center gap-2">
                          <Image
                            src={Logo}
                            alt={t("logoAlt")}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                          {t("brandName")}{" "}
                          <span className="text-primary">
                            {t("brandSuffix")}
                          </span>
                        </span>
                      </SheetTitle>
                      <SheetDescription>
                        {getSheetDescription()}
                      </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-col gap-6 mt-8">
                      <NavigationLinks userType={userType} />

                      {!session?.user && (
                        <div className="flex flex-col gap-2">
                          <SheetClose asChild>
                            <Link
                              href="/login"
                              className={buttonVariants({
                                size: "lg",
                                className: "w-full",
                              })}
                            >
                              {t("buttons.login")}
                            </Link>
                          </SheetClose>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
