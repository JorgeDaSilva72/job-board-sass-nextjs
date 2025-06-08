// "use client";

// import React, { useEffect, useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { JobType } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { EditJobSeekerFormProps } from "@/app/types/types";

// const ViewJobSeekerForm = ({ jobSeeker }: EditJobSeekerFormProps) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (jobSeeker) setLoading(false);
//   }, [jobSeeker]);

//   if (loading) {
//     return <p className="text-center text-lg">Chargement du profil...</p>;
//   }

//   if (!jobSeeker?.JobSeeker) {
//     return <p className="text-center text-red-500">Aucun profil trouvé.</p>;
//   }

//   const {
//     firstName,
//     lastName,
//     email,
//     about,
//     title,
//     experience,
//     skills = [],
//     languages = [],
//     countryCode,
//     city,
//     phoneNumber,
//     linkedinProfile,
//     portfolioUrl,
//     availability,
//     preferredJobType = [],
//     expectedSalary,
//     resume,
//   } = jobSeeker.JobSeeker;

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
//               <Input value={firstName} readOnly />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <Input value={lastName} readOnly />
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <Input
//               value={email}
//               readOnly
//               className="bg-gray-100 dark:bg-gray-800"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               About
//             </label>
//             <Textarea value={about} readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Job Title
//             </label>
//             <Input value={title} readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Years of Experience
//             </label>
//             <Input value={experience} readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Skills
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {skills.length > 0 ? (
//                 skills.map((skill, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
//                   >
//                     {skill}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No skills entered.</p>
//               )}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Languages
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {languages.length > 0 ? (
//                 languages.map((language, index) => (
//                   <span
//                     key={index}
//                     className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
//                   >
//                     {language}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No language specified.</p>
//               )}
//             </div>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Country Code
//               </label>
//               {countryCode ? (
//                 <Input value={countryCode} readOnly />
//               ) : (
//                 <Input value={""} readOnly />
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 City
//               </label>
//               {city ? (
//                 <Input value={city} readOnly />
//               ) : (
//                 <Input value={""} readOnly />
//               )}
//             </div>
//           </div>

//           <div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Phone Number
//               </label>
//               {phoneNumber ? (
//                 <Input value={phoneNumber} readOnly />
//               ) : (
//                 <Input value={""} readOnly />
//               )}
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               LinkedIn Profile
//             </label>
//             {linkedinProfile ? (
//               <a
//                 href={linkedinProfile}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500"
//               >
//                 {linkedinProfile}
//               </a>
//             ) : (
//               <p className="text-gray-500">Not specified.</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Portfolio URL
//             </label>
//             {portfolioUrl ? (
//               <a
//                 href={portfolioUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500"
//               >
//                 {portfolioUrl}
//               </a>
//             ) : (
//               <p className="text-gray-500">Not specified.</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Availability
//             </label>
//             <Input value={availability.replace("_", " ")} readOnly />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Preferred Job Types
//             </label>
//             <div className="grid grid-cols-2 gap-4">
//               {preferredJobType.length > 0 ? (
//                 preferredJobType.map((jobType: JobType, index: number) => (
//                   <span
//                     key={index}
//                     className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
//                   >
//                     {jobType.replace(/_/g, " ")}
//                   </span>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No type specified.</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Expected Salary
//               </label>
//               {expectedSalary ? (
//                 <Input value={expectedSalary} readOnly />
//               ) : (
//                 <Input value={""} readOnly />
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Resume
//               </label>
//               {resume && (
//                 <a
//                   href={resume}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-500 hover:underline"
//                 >
//                   View Resume
//                 </a>
//               )}
//             </div>
//           </div>
//           <div className="mt-4 flex gap-4">
//             <Button
//               type="button"
//               variant="destructive"
//               className="w-full"
//               onClick={() => router.push("/job-seeker/profile/delete")}
//             >
//               Delete
//             </Button>
//             <Button
//               type="submit"
//               className="w-full"
//               onClick={() => router.push("/job-seeker/profile/edit")}
//             >
//               Edit
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ViewJobSeekerForm;

// 08/06/2025 integration de next-intl
// BEGIN

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JobType } from "@prisma/client";
import { useRouter } from "@/i18n/navigation";
import { EditJobSeekerFormProps } from "@/app/types/types";
import { useTranslations } from "next-intl";

const ViewJobSeekerForm = ({ jobSeeker }: EditJobSeekerFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const t = useTranslations("ViewJobSeekerForm");

  useEffect(() => {
    if (jobSeeker) setLoading(false);
  }, [jobSeeker]);

  if (loading) {
    return <p className="text-center text-lg">{t("loading")}</p>;
  }

  if (!jobSeeker?.JobSeeker) {
    return <p className="text-center text-red-500">{t("noProfile")}</p>;
  }

  const {
    firstName,
    lastName,
    email,
    about,
    title,
    experience,
    skills = [],
    languages = [],
    countryCode,
    city,
    phoneNumber,
    linkedinProfile,
    portfolioUrl,
    availability,
    preferredJobType = [],
    expectedSalary,
    resume,
  } = jobSeeker.JobSeeker;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl">{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.firstName")}
              </label>
              <Input value={firstName} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.lastName")}
              </label>
              <Input value={lastName} readOnly />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.email")}
            </label>
            <Input
              value={email}
              readOnly
              className="bg-gray-100 dark:bg-gray-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.about")}
            </label>
            <Textarea value={about} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.jobTitle")}
            </label>
            <Input value={title} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.experience")}
            </label>
            <Input value={experience} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.skills")}
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">{t("form.noSkills")}</p>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.languages")}
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.length > 0 ? (
                languages.map((language, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
                  >
                    {language}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">{t("form.noLanguages")}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.countryCode")}
              </label>
              <Input value={countryCode || ""} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.city")}
              </label>
              <Input value={city || ""} readOnly />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.phoneNumber")}
              </label>
              <Input value={phoneNumber || ""} readOnly />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.linkedin")}
            </label>
            {linkedinProfile ? (
              <a
                href={linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {linkedinProfile}
              </a>
            ) : (
              <p className="text-gray-500">{t("form.notSpecified")}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.portfolio")}
            </label>
            {portfolioUrl ? (
              <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {portfolioUrl}
              </a>
            ) : (
              <p className="text-gray-500">{t("form.notSpecified")}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.availability")}
            </label>
            <Input value={t(`availabilityOptions.${availability}`)} readOnly />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              {t("form.preferredJobTypes")}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {preferredJobType.length > 0 ? (
                preferredJobType.map((jobType: JobType, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700"
                  >
                    {t(`jobTypeOptions.${jobType}`)}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">{t("form.noJobTypes")}</p>
              )}
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.expectedSalary")}
              </label>
              <Input value={expectedSalary || ""} readOnly />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {t("form.resume")}
              </label>
              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {t("form.viewResume")}
                </a>
              )}
            </div>
          </div>
          <div className="mt-4 flex gap-4">
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={() => router.push("/job-seeker/profile/delete")}
            >
              {t("buttons.delete")}
            </Button>
            <Button
              type="submit"
              className="w-full"
              onClick={() => router.push("/job-seeker/profile/edit")}
            >
              {t("buttons.edit")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewJobSeekerForm;
