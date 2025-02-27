// "use client";
// import React, { useState, useEffect } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
// import { getJobSeekerProfile } from "@/app/actions";
// import { Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { Availability, JobType } from "@prisma/client";
// import { Button } from "@/components/ui/button";

// const JobSeekerProfilePage = () => {
//   const [profile, setProfile] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const profileData = await getJobSeekerProfile();
//         if (profileData) {
//           setProfile(profileData.JobSeeker);
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

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-center text-2xl">
//           Job Seeker Profile
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="space-y-6">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <Input value={profile.firstName} readOnly />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <Input value={profile.lastName} readOnly />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <Input
//               value={profile.email}
//               readOnly
//               className="bg-gray-100  dark:bg-gray-800"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               About
//             </label>
//             <Textarea value={profile.about} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Job Title
//             </label>
//             <Input value={profile.title} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Years of Experience
//             </label>
//             <Input value={profile.experience} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Skills
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {profile.skills.map((skill: string, index: number) => (
//                 <div
//                   key={index}
//                   className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-white"
//                 >
//                   {skill}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Languages
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {profile.languages.map((language: string, index: number) => (
//                 <div
//                   key={index}
//                   className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-white"
//                 >
//                   {language}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Country Code
//               </label>
//               <Input value={profile.countryCode} readOnly />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 City
//               </label>
//               <Input value={profile.city} readOnly />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Phone Number
//             </label>
//             <Input value={profile.phoneNumber} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               LinkedIn Profile
//             </label>
//             <Input value={profile.linkedinProfile} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Portfolio URL
//             </label>
//             <Input value={profile.portfolioUrl} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Availability
//             </label>
//             <Input value={profile.availability.replace("_", " ")} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Preferred Job Types
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               {profile.preferredJobType.map(
//                 (jobType: JobType, index: number) => (
//                   <div key={index}>
//                     <Input value={jobType.replace(/_/g, " ")} readOnly />
//                   </div>
//                 )
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Expected Salary
//             </label>
//             <Input value={profile.expectedSalary} readOnly />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Resume
//             </label>
//             {profile.resume && (
//               <a
//                 href={profile.resume}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 View Resume
//               </a>
//             )}
//           </div>
//         </div>
//         <div className="mt-4 flex gap-4">
//           <Button
//             type="button"
//             variant="destructive"
//             className="w-full"
//             onClick={() => router.push("/job-seeker/profile/delete")}
//           >
//             Delete
//           </Button>
//           <Button
//             type="submit"
//             className="w-full"
//             onClick={() => router.push("/job-seeker/profile/edit")}
//           >
//             Edit
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobSeekerProfilePage;

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getJobSeekerProfile } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import ViewJobSeekerForm from "@/components/forms/ViewJobSeekerForm";
import { JobSeekerProfileData } from "@/app/types/types";

const JobSeekerProfilePage = () => {
  const [profile, setProfile] = useState<JobSeekerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getJobSeekerProfile();
        if (profileData) {
          setProfile(profileData);
        } else {
          toast.error("Failed to load profile data");
          router.push("/find-job");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
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

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  return <ViewJobSeekerForm jobSeeker={profile} />;
};

export default JobSeekerProfilePage;
