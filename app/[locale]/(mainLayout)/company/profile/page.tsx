// "use client";
// import React, { useEffect, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Globe,
//   Twitter,
//   Linkedin,
//   Phone,
//   Mail,
//   MapPin,
//   Users,
//   Building,
//   Loader2,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { getCompanyProfile } from "@/app/actions";
// import { toast } from "sonner";
// import CompanyProfileView from "@/components/forms/CompanyProfileView";

// export function CompanyProfilePage() {
//   const [profile, setProfile] = useState<JobSeekerProfileData | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function fetchCompanyData() {
//       try {
//         const profileData = await getCompanyProfile();
//         if (profileData) {
//           setProfile(profileData);
//         } else {
//           toast.error("Failed to load profile data");
//           router.push("/find-job");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         toast.error("Failed to load profile data");
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchCompanyData();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//         <span className="ml-2">Loading profile data...</span>
//       </div>
//     );
//   }

//   return <CompanyProfileView company={profile} />;
// }

// app/company-profile/page.js - Server Component

"use client";

import { getCompanyProfile } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import CompanyProfileView from "@/components/forms/CompanyProfileView";
import { CompanyProfileData } from "@/app/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// 🚀 Force Next.js à utiliser le rendu dynamique
export const dynamic = "force-dynamic";

const CompanyProfilePage = () => {
  const [profile, setProfile] = useState<CompanyProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // const userData: CompanyProfileData | null = await getCompanyProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getCompanyProfile();
        if (response.success && response.data) {
          setProfile(response.data);
        } else {
          toast.error(response.error || "Failed to load profile data");
          router.push("/find-job");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
        router.push("/find-job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile data...</span>
      </div>
    );
  }

  // Si l'utilisateur n'a pas de profil d'entreprise
  if (!profile) {
    return (
      <Card className="w-full max-w-5xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <h3 className="text-xl font-medium">Company Profile Not Found</h3>
          <p className="text-muted-foreground mt-2">
            You don&apos;t have a company profile yet.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/create-company">Create Company Profile</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <CompanyProfileView company={profile} />;
};

export default CompanyProfilePage;
