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

// Définition du type pour représenter les données retournées par getCompanyProfile
export type CompanyProfileData = {
  id: string;
  Company: {
    name: string;
    location: string;
    logo: string;
    about: string;

    userId: string;
    website?: string | null;
    xAccount?: string | null;
    industry?: string | null;
    companySize?: string | null;
    countryCode?: string | null;
    phoneNumber?: string | null;
    linkedinProfile?: string | null;
    languages: string[];
    city?: string | null;
  } | null;
};

// Définition du type pour les props du composant
export type EditCompanyFormProps = {
  company: CompanyProfileData;
};

// type explicite pour tous les retours possibles du server action updateJobPost
// export type ActionUpdateJobPostResultTypes =
//   | {
//       success: true;
//       data: { job: any };
//       user?: undefined;
//       error?: undefined;
//       details?: undefined;
//     }
//   | {
//       success: true;
//       data: any;
//       user?: undefined;
//       error?: undefined;
//       details?: undefined;
//     }
//   | {
//       success: true;
//       user: any;
//       data?: undefined;
//       error?: undefined;
//       details?: undefined;
//     }
//   | {
//       success: false;
//       error: string;
//       user?: undefined;
//       data?: undefined;
//       details?: undefined;
//     }
//   | {
//       success: false;
//       error: string;
//       details?: any;
//       user?: undefined;
//       data?: undefined;
//     };

export type ActionUpdateJobPostResultTypes = {
  success: boolean;
  error?: string;
  details?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  user?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
  data?: any; //eslint-disable-line @typescript-eslint/no-explicit-any
};
