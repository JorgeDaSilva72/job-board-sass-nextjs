import { z } from "zod";
// import {
//   JobPostStatus,
//   ExperienceLevel,
//   EducationLevel,
//   // JobType,
// } from "@prisma/client";

export const companySchema = z.object({
  // Champs obligatoires
  name: z.string().min(2, "Company name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  about: z
    .string()
    .min(10, "Please provide more information about your company"),
  logo: z.string().min(1, "Please upload a logo"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  // Champs optionnels
  website: z.string().optional(),
  xAccount: z.string().optional(),
  industry: z.string().optional(),
  companySize: z.string().optional(),
  countryCode: z.string().optional(),
  city: z.string().optional(),
  phoneNumber: z.string().optional(),
  linkedinProfile: z
    .string()

    .optional(),
});

export const Availability = {
  IMMEDIATE: "IMMEDIATE",
  ONE_WEEK: "ONE_WEEK",
  TWO_WEEKS: "TWO_WEEKS",
  ONE_MONTH: "ONE_MONTH",
  MORE_THAN_ONE_MONTH: "MORE_THAN_ONE_MONTH",
} as const;

export const JobType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERNSHIP: "INTERNSHIP",
  FREELANCE: "FREELANCE",
} as const;

export const jobSeekerSchema = z.object({
  // Champs obligatoires de base
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  about: z.string().min(10, "Bio must be at least 10 characters"),
  resume: z.string().min(1, "Resume is required"),

  // Champs obligatoires professionnels
  title: z.string().min(2, "Job title must be at least 2 characters"),
  experience: z.number().min(0, "Experience cannot be negative"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  languages: z.array(z.string()).min(1, "At least one language is required"),
  availability: z.enum(Object.values(Availability) as [string, ...string[]]),
  preferredJobType: z
    .array(z.enum(Object.values(JobType) as [string, ...string[]]))
    .min(1, "At least one preferred job type is required"),

  // Champs optionnels
  education: z
    .array(
      z.object({
        degree: z.string(),
        school: z.string(),
        endDate: z.date(),
        startDate: z.date(),
      })
    )
    .nullable()
    .optional(),
  countryCode: z.string().optional(),
  city: z.string().optional(),
  phoneNumber: z.string().optional(),
  linkedinProfile: z
    .string()
    // .url("Please enter a valid LinkedIn URL")
    .optional(),
  portfolioUrl: z
    .string()
    // .url("Please enter a valid portfolio URL")
    .optional(),

  expectedSalary: z.number().optional(),
});

export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  employmentType: z.string().min(1, "Please select an employment type"),
  location: z.string().min(1, "Please select a location"),
  salaryFrom: z.number().min(1, "Salary from is required"),
  salaryTo: z.number().min(1, "Salary to is required"),
  jobDescription: z.string().min(1, "Job description is required"),
  benefits: z.array(z.string()).min(1, "Please select at least one benefit"),
  companyName: z.string().min(1, "Company name is required"),
  companyLocation: z.string().min(1, "Company location is required"),
  companyLogo: z.string().min(1, "Company logo is required"),
  companyWebsite: z.string().optional(),
  companyXAccount: z.string().optional(),
  companyDescription: z.string().min(1, "Company description is required"),
  listingDuration: z.number().min(1, "Listing duration is required"),
  // status: z.nativeEnum(JobPostStatus).default(JobPostStatus.DRAFT),
  // requiredSkills: z.array(z.string()).optional(),
  // requiredLanguages: z.array(z.string()).optional(),
  // experienceLevel: z.nativeEnum(ExperienceLevel),
  // educationLevel: z.nativeEnum(EducationLevel),
  // jobType: z.array(z.nativeEnum(JobType)),
  // remote: z.boolean().default(false),
  // currency: z.string().optional(),
  // deadline: z.date().optional(),
  // companyId: z.string().uuid(),
});

// END ---------------------------------------

// BEGIN
// 10/05/2025 compatible next-intl

// import { z } from "zod";

// export const Availability = {
//   IMMEDIATE: "IMMEDIATE",
//   ONE_WEEK: "ONE_WEEK",
//   TWO_WEEKS: "TWO_WEEKS",
//   ONE_MONTH: "ONE_MONTH",
//   MORE_THAN_MONTH: "MORE_THAN_MONTH",
// } as const;

// export const JobType = {
//   FULL_TIME: "FULL_TIME",
//   PART_TIME: "PART_TIME",
//   CONTRACT: "CONTRACT",
//   INTERNSHIP: "INTERNSHIP",
//   REMOTE: "REMOTE",
// } as const;

// export const createSchemas = (t: (key: string) => string) => ({
//   companySchema: z.object({
//     name: z.string().min(2, t("company.nameError")),
//     location: z.string().min(2, t("company.locationError")),
//     about: z.string().min(10, t("company.aboutError")),
//     logo: z.string().min(1, t("company.logoError")),
//     languages: z.array(z.string()).min(1, t("company.languagesError")),
//     website: z.string().optional(),
//     xAccount: z.string().optional(),
//     industry: z.string().optional(),
//     companySize: z.string().optional(),
//     countryCode: z.string().optional(),
//     city: z.string().optional(),
//     phoneNumber: z.string().optional(),
//     linkedinProfile: z.string().optional(),
//   }),

//   jobSeekerSchema: z.object({
//     firstName: z.string().min(2, t("jobSeeker.firstNameError")),
//     lastName: z.string().min(2, t("jobSeeker.lastNameError")),
//     email: z.string().email(t("jobSeeker.emailError")),
//     about: z.string().min(10, t("jobSeeker.aboutError")),
//     resume: z.string().min(1, t("jobSeeker.resumeError")),
//     title: z.string().min(2, t("jobSeeker.titleError")),
//     experience: z.number().min(0, t("jobSeeker.experienceError")),
//     skills: z.array(z.string()).min(1, t("jobSeeker.skillsError")),
//     languages: z.array(z.string()).min(1, t("jobSeeker.languagesError")),
//     availability: z.enum(Object.values(Availability) as [string, ...string[]]),
//     preferredJobType: z
//       .array(z.enum(Object.values(JobType) as [string, ...string[]]))
//       .min(1, t("jobSeeker.preferredJobTypeError")),
//     education: z
//       .array(
//         z.object({
//           degree: z.string(),
//           school: z.string(),
//           endDate: z.date(),
//           startDate: z.date(),
//         })
//       )
//       .nullable()
//       .optional(),
//     countryCode: z.string().optional(),
//     city: z.string().optional(),
//     phoneNumber: z.string().optional(),
//     linkedinProfile: z.string().optional(),
//     portfolioUrl: z.string().optional(),
//     expectedSalary: z.number().optional(),
//   }),

//   jobSchema: z.object({
//     jobTitle: z.string().min(2, t("job.jobTitleError")),
//     employmentType: z.string().min(1, t("job.employmentTypeError")),
//     location: z.string().min(1, t("job.locationError")),
//     salaryFrom: z.number().min(1, t("job.salaryFromError")),
//     salaryTo: z.number().min(1, t("job.salaryToError")),
//     jobDescription: z.string().min(1, t("job.jobDescriptionError")),
//     benefits: z.array(z.string()).min(1, t("job.benefitsError")),
//     companyName: z.string().min(1, t("job.companyNameError")),
//     companyLocation: z.string().min(1, t("job.companyLocationError")),
//     companyLogo: z.string().min(1, t("job.companyLogoError")),
//     companyWebsite: z.string().optional(),
//     companyXAccount: z.string().optional(),
//     companyDescription: z.string().min(1, t("job.companyDescriptionError")),
//     listingDuration: z.number().min(1, t("job.listingDurationError")),
//   }),
// });

// export type SchemaType = ReturnType<typeof createSchemas>;

// ---------------------------------------------------------
// END
