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
import { getCompanyProfile } from "@/app/actions";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CompanyProfileView from "@/components/forms/CompanyProfileView";
import { CompanyProfileData } from "@/app/types/types";

export default async function CompanyProfilePage() {
  const userData: CompanyProfileData | null = await getCompanyProfile();

  // Si l'utilisateur n'a pas de profil d'entreprise
  if (!userData || !userData.Company) {
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

  return <CompanyProfileView company={userData} />;
}
