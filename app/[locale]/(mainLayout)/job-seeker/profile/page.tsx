// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getJobSeekerProfile } from "@/app/actions";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import ViewJobSeekerForm from "@/components/forms/ViewJobSeekerForm";
// import { JobSeekerProfileData } from "@/app/types/types";

// // 🚀 Force Next.js à utiliser le rendu dynamique
// export const dynamic = "force-dynamic";

// const JobSeekerProfilePage = () => {
//   const [profile, setProfile] = useState<JobSeekerProfileData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await getJobSeekerProfile();
//         if (response.success && response.data) {
//           setProfile(response.data);
//         } else {
//           toast.error(response.error || "Failed to load profile data");
//           router.push("/find-job");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         toast.error("Failed to load profile data");
//         router.push("/find-job");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-2">Loading profile data...</span>
//       </div>
//     );
//   }

//   if (!profile) {
//     return <div>No profile data found.</div>;
//   }

//   return <ViewJobSeekerForm jobSeeker={profile} />;
// };

// export default JobSeekerProfilePage;

// 08/06/2025 integration de next-intl
// BEGIN

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation"; // Modifié pour utiliser le router i18n
import { getJobSeekerProfile } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ViewJobSeekerForm from "@/components/forms/ViewJobSeekerForm";
import { JobSeekerProfileData } from "@/app/types/types";
import { useTranslations } from "next-intl"; // Ajouté pour les traductions

export const dynamic = "force-dynamic";

const JobSeekerProfilePage = () => {
  const [profile, setProfile] = useState<JobSeekerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const t = useTranslations("JobSeekerProfilePage"); // Initialisation des traductions

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getJobSeekerProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          toast.error(response.error || t("errors.loadFailed"));
          router.push("/find-job");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error(t("errors.loadFailed"));
        router.push("/find-job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router, t]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">{t("loading")}</span>
      </div>
    );
  }

  if (!profile) {
    return <div>{t("noProfile")}</div>;
  }

  return <ViewJobSeekerForm jobSeeker={profile} />;
};

export default JobSeekerProfilePage;
