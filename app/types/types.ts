import { Availability, JobType } from "@prisma/client";

// Définition du type pour représenter les données retournées par getJobSeekerProfile
export type JobSeekerProfileData = {
  id: string;
  JobSeeker: {
    firstName: string;
    lastName: string;
    email: string;
    about: string;
    resume: string;
    userId: string;
    title: string;
    experience: number;
    skills: string[];
    languages: string[];
    countryCode?: string | null;
    city?: string | null;
    phoneNumber?: string | null;
    linkedinProfile?: string | null;
    portfolioUrl?: string | null;
    expectedSalary?: number | null;
    availability: Availability;
    preferredJobType: JobType[];
  } | null;
};

// Définition du type pour les props du composant
export type EditJobSeekerFormProps = {
  jobSeeker: JobSeekerProfileData;
};
