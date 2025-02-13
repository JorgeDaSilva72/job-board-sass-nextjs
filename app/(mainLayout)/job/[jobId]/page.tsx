// import { prisma } from "@/app/utils/db";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// import { notFound } from "next/navigation";
// import React from "react";

// import { benefits } from "@/app/utils/listOfBenefits";
// import Image from "next/image";
// import { Heart } from "lucide-react";

// import Link from "next/link";
// import { auth } from "@/app/utils/auth";
// import {
//   GeneralSubmitButton,
//   SaveJobButton,
// } from "@/components/general/SubmitButtons";
// import { getFlagEmoji } from "@/app/utils/countriesList";
// import { JsonToHtml } from "@/components/general/JsonToHtml";
// import { saveJobPost, unsaveJobPost } from "@/app/actions";
// // import arcjet, { detectBot, fixedWindow } from "@/app/utils/arcjet";
// import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";

// import { request } from "@arcjet/next";

// const aj = arcjet.withRule(
//   detectBot({
//     mode: "LIVE",
//     allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
//   })
// );
// // .withRule(
// //   fixedWindow({
// //     mode: "LIVE",
// //     max: 10,
// //     window: "60s",
// //   })
// // );

// function getClient(session: boolean) {
//   if (session) {
//     return aj.withRule(
//       tokenBucket({
//         mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
//         refillRate: 30, // refill 30 tokens per interval
//         interval: 60, // 60 second interval
//         capacity: 100, // bucket maximum capacity of 100 tokens
//       })
//     );
//   } else {
//     return aj.withRule(
//       tokenBucket({
//         mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
//         refillRate: 10, // refill 10 tokens per interval
//         interval: 60, // 60 second interval
//         capacity: 100, // bucket maximum capacity of 100 tokens
//       })
//     );
//   }
// }

// async function getJob(jobId: string, userId?: string) {
//   const [jobData, savedJob] = await Promise.all([
//     prisma.jobPost.findUnique({
//       where: {
//         id: jobId,
//         status: "ACTIVE",
//       },
//       select: {
//         jobTitle: true,
//         jobDescription: true,

//         location: true,

//         employmentType: true,
//         benefits: true,

//         createdAt: true,
//         listingDuration: true,
//         company: {
//           select: {
//             name: true,
//             logo: true,
//             location: true,
//             about: true,
//           },
//         },
//       },
//     }),
//     userId
//       ? prisma.savedJobPost.findUnique({
//           where: {
//             userId_jobId: {
//               userId,
//               jobId,
//             },
//           },
//           select: {
//             id: true,
//           },
//         })
//       : null,
//   ]);

//   if (!jobData) {
//     return notFound();
//   }

//   return {
//     jobData,
//     savedJob,
//   };
// }

// type Params = Promise<{ jobId: string }>;

// const JobIdPage = async ({ params }: { params: Params }) => {
//   const { jobId } = await params;
//   const session = await auth();
//   const req = await request();
//   const decision = await getClient(!!session).protect(req, { requested: 10 });

//   if (decision.isDenied()) {
//     throw new Error("forbidden");
//   }

//   const { jobData, savedJob } = await getJob(jobId, session?.user?.id);
//   const locationFlag = getFlagEmoji(jobData.location);

//   return (
//     <div className="container mx-auto py-8">
//       <div className="grid lg:grid-cols-[1fr,400px] gap-8">
//         {/* Main Content */}
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="flex items-start justify-between">
//             <div>
//               <h1 className="text-3xl font-bold">{jobData.jobTitle}</h1>
//               <div className="flex items-center gap-2 mt-2">
//                 <span className="font-medium">{jobData.company.name}</span>
//                 <span className="hidden md:inline text-muted-foreground">
//                   •
//                 </span>
//                 <Badge className="rounded-full" variant="secondary">
//                   {jobData.employmentType}
//                 </Badge>
//                 <span className="hidden md:inline text-muted-foreground">
//                   •
//                 </span>
//                 <Badge className="rounded-full">
//                   {locationFlag && (
//                     // <span className="mr-1 text-lg inline-block">
//                     //   {locationFlag}
//                     // </span>
//                     // <Image
//                     //   src={locationFlag}
//                     //   alt={`Drapeau de ${jobData.location}`}
//                     //   width={40}
//                     //   height={30}
//                     // />
//                     <img
//                       src={locationFlag}
//                       alt={`Drapeau de ${jobData.location}`}
//                       className="mr-2 h-8 w-8"
//                     />
//                   )}

//                   {jobData.location}
//                 </Badge>
//               </div>
//             </div>

//             {session?.user ? (
//               <form
//                 action={
//                   savedJob
//                     ? unsaveJobPost.bind(null, savedJob.id)
//                     : saveJobPost.bind(null, jobId)
//                 }
//               >
//                 <SaveJobButton savedJob={!!savedJob} />
//               </form>
//             ) : (
//               <Button variant="outline" asChild>
//                 <Link href="/login">
//                   <Heart className="size-4 mr-2" />
//                   Save Job
//                 </Link>
//               </Button>
//             )}
//           </div>

//           <section>
//             <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
//           </section>

//           <section>
//             <h3 className="font-semibold mb-4">
//               Benefits{" "}
//               <span className="text-sm text-muted-foreground font-normal">
//                 (orange is offered)
//               </span>
//             </h3>
//             <div className="flex flex-wrap gap-3">
//               {benefits.map((benefit) => {
//                 const isOffered = jobData.benefits.includes(benefit.id);
//                 return (
//                   <Badge
//                     key={benefit.id}
//                     variant={isOffered ? "default" : "outline"}
//                     className={`text-sm px-4 py-1.5 rounded-full ${
//                       !isOffered && " opacity-75 cursor-not-allowed"
//                     }`}
//                   >
//                     <span className="flex items-center gap-2">
//                       {benefit.icon}
//                       {benefit.label}
//                     </span>
//                   </Badge>
//                 );
//               })}
//             </div>
//           </section>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           {/* Apply Now Card */}
//           <Card className="p-6">
//             <div className="space-y-4">
//               <div>
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">Apply now</h3>
//                 </div>
//                 <p className="text-sm text-muted-foreground mt-1">
//                   Please let {jobData.company.name} know you found this job on
//                   Afrique Avenir. This helps us grow!
//                 </p>
//               </div>
//               <form>
//                 <input type="hidden" name="jobId" value={jobId} />
//                 <GeneralSubmitButton text="Apply now" />
//               </form>
//             </div>
//           </Card>

//           {/* Job Details Card */}
//           <Card className="p-6">
//             <div className="space-y-4">
//               <h3 className="font-semibold">About the job</h3>

//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Apply before
//                   </span>
//                   <span className="text-sm">
//                     {new Date(
//                       jobData.createdAt.getTime() +
//                         jobData.listingDuration * 24 * 60 * 60 * 1000
//                     ).toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Posted on
//                   </span>
//                   <span className="text-sm">
//                     {jobData.createdAt.toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "numeric",
//                       year: "numeric",
//                     })}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Employment type
//                   </span>
//                   <span className="text-sm">{jobData.employmentType}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">
//                     Location
//                   </span>
//                   <Badge variant="secondary">{jobData.location}</Badge>
//                 </div>
//               </div>
//             </div>
//           </Card>

//           {/* Company Card */}
//           <Card className="p-6">
//             <div className="space-y-4">
//               <div className="flex items-center gap-3">
//                 <Image
//                   src={
//                     jobData.company.logo ??
//                     `https://avatar.vercel.sh/${jobData.company.name}`
//                   }
//                   alt={jobData.company.name}
//                   width={48}
//                   height={48}
//                   className="rounded-full size-12"
//                 />
//                 <div>
//                   <h3 className="font-semibold">{jobData.company.name}</h3>
//                   <p className="text-sm text-muted-foreground line-clamp-3">
//                     {jobData.company.about}
//                   </p>
//                 </div>
//               </div>
//               {/*  <Button variant="outline" className="w-full">
//                 View company profile
//               </Button> */}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobIdPage;

import React from "react";
import { prisma } from "@/app/utils/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Building2,
  Clock,
  BriefcaseIcon,
  Share2,
} from "lucide-react";
import { notFound } from "next/navigation";
import { benefits } from "@/app/utils/listOfBenefits";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
import { auth } from "@/app/utils/auth";
import {
  GeneralSubmitButton,
  SaveJobButton,
} from "@/components/general/SubmitButtons";
import { getFlagEmoji } from "@/app/utils/countriesList";
import { JsonToHtml } from "@/components/general/JsonToHtml";
import { saveJobPost, unsaveJobPost } from "@/app/actions";
import arcjet, { detectBot, tokenBucket } from "@/app/utils/arcjet";
import { request } from "@arcjet/next";

const aj = arcjet.withRule(
  detectBot({
    mode: "LIVE",
    allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
  })
);
// .withRule(
//   fixedWindow({
//     mode: "LIVE",
//     max: 10,
//     window: "60s",
//   })
// );

function getClient(session: boolean) {
  if (session) {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        refillRate: 30, // refill 30 tokens per interval
        interval: 60, // 60 second interval
        capacity: 100, // bucket maximum capacity of 100 tokens
      })
    );
  } else {
    return aj.withRule(
      tokenBucket({
        mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
        refillRate: 10, // refill 10 tokens per interval
        interval: 60, // 60 second interval
        capacity: 100, // bucket maximum capacity of 100 tokens
      })
    );
  }
}

async function getJob(jobId: string, userId?: string) {
  const [jobData, savedJob] = await Promise.all([
    prisma.jobPost.findUnique({
      where: {
        id: jobId,
        status: "ACTIVE",
      },
      select: {
        jobTitle: true,
        jobDescription: true,

        location: true,

        employmentType: true,
        benefits: true,

        createdAt: true,
        listingDuration: true,
        company: {
          select: {
            name: true,
            logo: true,
            location: true,
            about: true,
          },
        },
      },
    }),
    userId
      ? prisma.savedJobPost.findUnique({
          where: {
            userId_jobId: {
              userId,
              jobId,
            },
          },
          select: {
            id: true,
          },
        })
      : null,
  ]);

  if (!jobData) {
    return notFound();
  }

  return {
    jobData,
    savedJob,
  };
}

const JobIdPage = async ({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) => {
  const { jobId } = await params;
  const session = await auth();
  const req = await request();
  const decision = await getClient(!!session).protect(req, { requested: 10 });

  if (decision.isDenied()) {
    throw new Error("forbidden");
  }

  const { jobData, savedJob } = await getJob(jobId, session?.user?.id);
  const locationFlag = getFlagEmoji(jobData.location);

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 md:p-8 mb-8">
        <div className="flex flex-col gap-6">
          {/* Company Logo and Job Title Section */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Image
              src={
                jobData.company.logo ??
                `https://avatar.vercel.sh/${jobData.company.name}`
              }
              alt={jobData.company.name}
              width={80}
              height={80}
              className="rounded-xl shadow-lg self-start"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 break-words">
                {jobData.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3">
                <span className="flex items-center gap-2">
                  <Building2 className="size-4 text-muted-foreground shrink-0" />
                  <span className="font-medium truncate">
                    {jobData.company.name}
                  </span>
                </span>
                <span className="hidden sm:inline text-muted-foreground">
                  •
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-muted-foreground shrink-0" />
                  <Badge className="rounded-full" variant="secondary">
                    {locationFlag && (
                      <img
                        src={locationFlag}
                        alt={`Flag of ${jobData.location}`}
                        className="mr-2 h-5 w-5 inline-block"
                      />
                    )}
                    {jobData.location}
                  </Badge>
                </span>
                <span className="hidden sm:inline text-muted-foreground">
                  •
                </span>
                <Badge className="rounded-full bg-primary/10 text-primary">
                  {jobData.employmentType}
                </Badge>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex gap-3">
            {session?.user ? (
              <form
                className="flex-1 sm:flex-none"
                action={
                  savedJob
                    ? unsaveJobPost.bind(null, savedJob.id)
                    : saveJobPost.bind(null, jobId)
                }
              >
                <SaveJobButton savedJob={!!savedJob} />
              </form>
            ) : (
              <Button variant="outline" asChild className="flex-1 sm:flex-none">
                <Link href="/login">
                  <Heart className="size-4 mr-2" />
                  Save
                </Link>
              </Button>
            )}
            <Button variant="outline" className="flex-1 sm:flex-none">
              <Share2 className="size-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <JsonToHtml json={JSON.parse(jobData.jobDescription)} />
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit) => {
                const isOffered = jobData.benefits.includes(benefit.id);
                return (
                  <div
                    key={benefit.id}
                    className={`flex items-center p-4 rounded-lg border ${
                      isOffered
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/5 border-muted/20"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-3 ${
                        isOffered ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {benefit.icon}
                      {benefit.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Apply Now</h3>
              <p className="text-sm text-muted-foreground">
                Please let {jobData.company.name} know you found this job on
                Afrique Avenir. This helps us grow!
              </p>
              <form className="mt-6">
                <input type="hidden" name="jobId" value={jobId} />
                <GeneralSubmitButton text="Apply Now" />
              </form>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Job Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Apply Before</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(
                      jobData.createdAt.getTime() +
                        jobData.listingDuration * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <Clock className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Posted On</p>
                  <p className="text-sm text-muted-foreground">
                    {jobData.createdAt.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <BriefcaseIcon className="size-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Employment Type</p>
                  <p className="text-sm text-muted-foreground">
                    {jobData.employmentType}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">About the Company</h3>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={
                  jobData.company.logo ??
                  `https://avatar.vercel.sh/${jobData.company.name}`
                }
                alt={jobData.company.name}
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-semibold">{jobData.company.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {jobData.company.location}
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {jobData.company.about}
            </p>
            <Button variant="outline" className="w-full mt-4">
              View Company Profile
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobIdPage;
