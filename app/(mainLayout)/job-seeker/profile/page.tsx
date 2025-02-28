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
