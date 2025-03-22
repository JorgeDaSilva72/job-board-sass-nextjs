// "use client";

// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Check,
//   X,
//   Clock,
//   ArrowLeft,
//   Calendar,
//   FileText,
//   User,
//   MapPin,
//   Briefcase,
//   Mail,
//   MoreVertical,
//   ListFilter,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";

// // Interface matching the JobApplication schema from the provided code
// interface JobApplication {
//   id: string;
//   createdAt: Date;
//   status:
//     | "PENDING"
//     | "REVIEWED"
//     | "SHORTLISTED"
//     | "INTERVIEWED"
//     | "ACCEPTED"
//     | "REJECTED";
//   coverLetter?: string;
//   jobPost: {
//     id: string;
//     jobTitle: string;
//     location: string;
//     employmentType: string;
//     description?: string;
//   };
//   jobSeeker: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     resume: string;
//     title: string;
//     experience: number;
//     skills?: string[];
//     education?: {
//       institution: string;
//       degree: string;
//       fieldOfStudy: string;
//       graduationYear: number;
//     }[];
//   };
// }

// export default function ApplicationDetailsPage() {
//   const [application, setApplication] = useState<JobApplication | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const params = useParams();
//   const router = useRouter();
//   const applicationId = params.id as string;

//   useEffect(() => {
//     fetchApplicationDetails();
//   }, [applicationId]);

//   const fetchApplicationDetails = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `/api/recruiter/applications/${applicationId}`
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch application details");
//       }
//       const data = await response.json();
//       setApplication(data.application);
//     } catch (error) {
//       console.error("Error fetching application details:", error);
//       toast.error("Failed to load application details");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const updateApplicationStatus = async (newStatus: string) => {
//     try {
//       const response = await fetch(
//         `/api/recruiter/applications/${applicationId}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update application status");
//       }

//       // Update application in state
//       setApplication((prev) =>
//         prev ? { ...prev, status: newStatus as any } : null
//       );

//       const statusMessages = {
//         PENDING: "Application marked as pending",
//         REVIEWED: "Application marked as reviewed",
//         SHORTLISTED: "Application shortlisted successfully",
//         INTERVIEWED: "Interview status updated",
//         ACCEPTED: "Candidate accepted successfully",
//         REJECTED: "Candidate rejected",
//       };

//       toast.success(
//         statusMessages[newStatus as keyof typeof statusMessages] ||
//           `Status updated to ${newStatus}`
//       );
//     } catch (error) {
//       console.error("Error updating application:", error);
//       toast.error("Failed to update application status");
//     }
//   };

//   const scheduleInterview = () => {
//     if (application) {
//       updateApplicationStatus("INTERVIEWED");
//       router.push(`/recruiter/applications/${applicationId}/schedule`);
//     }
//   };

//   const viewResume = (resumeUrl?: string) => {
//     if (resumeUrl) {
//       window.open(resumeUrl, "_blank");
//     } else {
//       toast.error("No resume available for this candidate");
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "PENDING":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-yellow-50 text-yellow-700 border-yellow-200"
//           >
//             <Clock className="h-3 w-3 mr-1" />
//             Pending
//           </Badge>
//         );
//       case "REVIEWED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-blue-50 text-blue-700 border-blue-200"
//           >
//             <Check className="h-3 w-3 mr-1" />
//             Reviewed
//           </Badge>
//         );
//       case "SHORTLISTED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-indigo-50 text-indigo-700 border-indigo-200"
//           >
//             <ListFilter className="h-3 w-3 mr-1" />
//             Shortlisted
//           </Badge>
//         );
//       case "INTERVIEWED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-purple-50 text-purple-700 border-purple-200"
//           >
//             <Calendar className="h-3 w-3 mr-1" />
//             Interviewed
//           </Badge>
//         );
//       case "ACCEPTED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-green-50 text-green-700 border-green-200"
//           >
//             <Check className="h-3 w-3 mr-1" />
//             Accepted
//           </Badge>
//         );
//       case "REJECTED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-red-50 text-red-700 border-red-200"
//           >
//             <X className="h-3 w-3 mr-1" />
//             Rejected
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-16 text-center">
//         <p>Loading application details...</p>
//       </div>
//     );
//   }

//   if (!application) {
//     return (
//       <div className="container mx-auto py-16 text-center">
//         <p>Application not found</p>
//         <Button onClick={() => router.back()} className="mt-4">
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Applications
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto py-8 space-y-6 max-w-4xl">
//       <div className="flex items-center justify-between">
//         <Button variant="ghost" onClick={() => router.back()}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Applications
//         </Button>
//         {getStatusBadge(application.status)}
//       </div>

//       <Card>
//         <CardHeader className="pb-4">
//           <div className="flex justify-between items-start">
//             <div>
//               <CardTitle className="text-xl">
//                 {application.jobPost.jobTitle}
//               </CardTitle>
//               <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-1">
//                 <Briefcase className="h-4 w-4 mr-1" />
//                 <span>{application.jobPost.employmentType}</span>
//                 <span className="mx-2">•</span>
//                 <MapPin className="h-4 w-4 mr-1" />
//                 <span>{application.jobPost.location}</span>
//               </div>
//             </div>
//             <div className="text-sm text-muted-foreground">
//               Applied {format(new Date(application.createdAt), "MMM d, yyyy")}
//             </div>
//           </div>
//         </CardHeader>

//         <Separator />

//         <CardContent className="space-y-6 pt-6">
//           <div>
//             <h3 className="text-lg font-medium mb-3">Candidate Information</h3>
//             <Card>
//               <CardContent className="p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <User className="h-5 w-5 text-muted-foreground" />
//                   <h4 className="text-md font-semibold">
//                     {application.jobSeeker.firstName}{" "}
//                     {application.jobSeeker.lastName}
//                   </h4>
//                 </div>
//                 <div className="space-y-2 text-sm">
//                   <p className="text-muted-foreground">
//                     <span className="font-medium">
//                       {application.jobSeeker.title}
//                     </span>{" "}
//                     • {application.jobSeeker.experience} years experience
//                   </p>
//                   <p className="flex items-center">
//                     <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
//                     {application.jobSeeker.email}
//                   </p>

//                   {application.jobSeeker.skills &&
//                     application.jobSeeker.skills.length > 0 && (
//                       <div className="pt-2">
//                         <p className="font-medium mb-1">Skills</p>
//                         <div className="flex flex-wrap gap-1">
//                           {application.jobSeeker.skills.map((skill, index) => (
//                             <Badge
//                               key={index}
//                               variant="secondary"
//                               className="text-xs"
//                             >
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {application.jobSeeker.skills &&
//                     application.jobSeeker.skills.length > 0 && (
//                       <div className="pt-2">
//                         <p className="font-medium mb-1">Skills</p>
//                         <div className="flex flex-wrap gap-1">
//                           {application.jobSeeker.skills.map((skill, index) => (
//                             <Badge
//                               key={index}
//                               variant="secondary"
//                               className="text-xs"
//                             >
//                               {skill}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                   {application.jobSeeker.education &&
//                     application.jobSeeker.education.length > 0 && (
//                       <div className="pt-2">
//                         <p className="font-medium mb-1">Education</p>
//                         <div className="space-y-2">
//                           {application.jobSeeker.education.map((edu, index) => (
//                             <div key={index} className="text-sm">
//                               <p className="font-medium">
//                                 {edu.degree} in {edu.fieldOfStudy}
//                               </p>
//                               <p className="text-muted-foreground">
//                                 {edu.institution} • {edu.graduationYear}
//                               </p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {application.coverLetter && (
//             <div>
//               <h3 className="text-lg font-medium mb-3">Cover Letter</h3>
//               <Card>
//                 <CardContent className="p-4">
//                   <p className="text-sm whitespace-pre-line">
//                     {application.coverLetter}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}

//           {application.jobPost.description && (
//             <div>
//               <h3 className="text-lg font-medium mb-3">Job Description</h3>
//               <Card>
//                 <CardContent className="p-4">
//                   <p className="text-sm whitespace-pre-line">
//                     {application.jobPost.description}
//                   </p>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </CardContent>

//         <CardFooter className="flex justify-between pt-4 pb-6">
//           <div className="flex gap-2">
//             <Button
//               variant="outline"
//               onClick={() => viewResume(application.jobSeeker.resume)}
//             >
//               <FileText className="h-4 w-4 mr-2" />
//               View Resume
//             </Button>
//           </div>

//           <div className="flex gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline">
//                   Update Status
//                   <MoreVertical className="h-4 w-4 ml-2" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {application.status === "PENDING" && (
//                   <DropdownMenuItem
//                     onClick={() => updateApplicationStatus("REVIEWED")}
//                   >
//                     <Check className="h-4 w-4 mr-2 text-blue-600" />
//                     Mark as Reviewed
//                   </DropdownMenuItem>
//                 )}

//                 {(application.status === "PENDING" ||
//                   application.status === "REVIEWED") && (
//                   <DropdownMenuItem
//                     onClick={() => updateApplicationStatus("SHORTLISTED")}
//                   >
//                     <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
//                     Shortlist Candidate
//                   </DropdownMenuItem>
//                 )}

//                 {(application.status === "REVIEWED" ||
//                   application.status === "SHORTLISTED") && (
//                   <DropdownMenuItem onClick={scheduleInterview}>
//                     <Calendar className="h-4 w-4 mr-2 text-purple-600" />
//                     Schedule Interview
//                   </DropdownMenuItem>
//                 )}

//                 {(application.status === "INTERVIEWED" ||
//                   application.status === "SHORTLISTED") && (
//                   <>
//                     <DropdownMenuItem
//                       onClick={() => updateApplicationStatus("ACCEPTED")}
//                     >
//                       <Check className="h-4 w-4 mr-2 text-green-600" />
//                       Accept Candidate
//                     </DropdownMenuItem>

//                     <DropdownMenuItem
//                       onClick={() => updateApplicationStatus("REJECTED")}
//                     >
//                       <X className="h-4 w-4 mr-2 text-red-600" />
//                       Reject Candidate
//                     </DropdownMenuItem>
//                   </>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  X,
  Clock,
  ArrowLeft,
  Calendar,
  FileText,
  User,
  MapPin,
  Briefcase,
  Mail,
  MoreVertical,
  ListFilter,
  Phone,
  Globe,
  GraduationCap,
  Languages,
  Banknote,
  ExternalLink,
  Clock4,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Types based on the Prisma schema
type Availability =
  | "IMMEDIATE"
  | "ONE_WEEK"
  | "TWO_WEEKS"
  | "ONE_MONTH"
  | "MORE_THAN_ONE_MONTH";
type JobType =
  | "FULL_TIME"
  | "PART_TIME"
  | "CONTRACT"
  | "FREELANCE"
  | "INTERNSHIP";

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: Date;
  endDate?: Date;
  description?: string;
  jobSeekerId: string;
}

// Interface matching the JobSeeker schema provided
interface JobSeeker {
  id: string;
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
  education?: Education[];
  countryCode?: string;
  city?: string;
  phoneNumber?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  expectedSalary?: number;
  availability: Availability;
  preferredJobType: JobType[];
  createdAt: Date;
  updatedAt: Date;
}

interface JobApplication {
  id: string;
  createdAt: Date;
  status:
    | "PENDING"
    | "REVIEWED"
    | "SHORTLISTED"
    | "INTERVIEWED"
    | "ACCEPTED"
    | "REJECTED";
  coverLetter?: string;
  jobPost: {
    id: string;
    jobTitle: string;
    location: string;
    employmentType: string;
    description?: string;
  };
  jobSeeker: JobSeeker;
}

export default function ApplicationDetailsPage() {
  const [application, setApplication] = useState<JobApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const applicationId = params.id as string;

  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationId]);

  const fetchApplicationDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/recruiter/applications/${applicationId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch application details");
      }
      const data = await response.json();
      setApplication(data.application);
    } catch (error) {
      console.error("Error fetching application details:", error);
      toast.error("Failed to load application details");
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (newStatus: string) => {
    try {
      const response = await fetch(
        `/api/recruiter/applications/${applicationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      // Update application in state
      setApplication((prev) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prev ? { ...prev, status: newStatus as any } : null
      );

      const statusMessages = {
        PENDING: "Application marked as pending",
        REVIEWED: "Application marked as reviewed",
        SHORTLISTED: "Application shortlisted successfully",
        INTERVIEWED: "Interview status updated",
        ACCEPTED: "Candidate accepted successfully",
        REJECTED: "Candidate rejected",
      };

      toast.success(
        statusMessages[newStatus as keyof typeof statusMessages] ||
          `Status updated to ${newStatus}`
      );
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application status");
    }
  };

  const scheduleInterview = () => {
    if (application) {
      updateApplicationStatus("INTERVIEWED");
      router.push(`/recruiter/applications/${applicationId}/schedule`);
    }
  };

  const viewResume = (resumeUrl?: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      toast.error("No resume available for this candidate");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "REVIEWED":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            <Check className="h-3 w-3 mr-1" />
            Reviewed
          </Badge>
        );
      case "SHORTLISTED":
        return (
          <Badge
            variant="outline"
            className="bg-indigo-50 text-indigo-700 border-indigo-200"
          >
            <ListFilter className="h-3 w-3 mr-1" />
            Shortlisted
          </Badge>
        );
      case "INTERVIEWED":
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            <Calendar className="h-3 w-3 mr-1" />
            Interviewed
          </Badge>
        );
      case "ACCEPTED":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            <Check className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "REJECTED":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAvailabilityText = (availability: Availability) => {
    switch (availability) {
      case "IMMEDIATE":
        return "Immediately";
      case "ONE_WEEK":
        return "One week";
      case "TWO_WEEKS":
        return "Two weeks";
      case "ONE_MONTH":
        return "One month";
      case "MORE_THAN_ONE_MONTH":
        return "More than one month";
      default:
        return availability;
    }
  };

  const getJobTypeText = (jobType: JobType) => {
    switch (jobType) {
      case "FULL_TIME":
        return "Full time";
      case "PART_TIME":
        return "Part time";
      case "CONTRACT":
        return "Contrat";
      case "FREELANCE":
        return "Freelance";
      case "INTERNSHIP":
        return "Internship";
      default:
        return jobType;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Loading application details...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p>Application not found</p>
        <Button onClick={() => router.back()} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
      </div>
    );
  }

  const { jobSeeker } = application;

  return (
    <div className="container mx-auto py-8 space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Applications
        </Button>
        {getStatusBadge(application.status)}
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">
                {application.jobPost.jobTitle}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-1">
                <Briefcase className="h-4 w-4 mr-1" />
                <span>{application.jobPost.employmentType}</span>
                <span className="mx-2">•</span>
                <MapPin className="h-4 w-4 mr-1" />
                <span>{application.jobPost.location}</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Applied {format(new Date(application.createdAt), "MMM d, yyyy")}
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Candidate information</h3>
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <h4 className="text-md font-semibold">
                        {jobSeeker.firstName} {jobSeeker.lastName}
                      </h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">
                        <span className="font-medium">{jobSeeker.title}</span> •{" "}
                        {jobSeeker.experience} years of experience
                      </p>
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {jobSeeker.email}
                      </p>
                      {jobSeeker.phoneNumber && (
                        <p className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          {jobSeeker.phoneNumber}
                        </p>
                      )}
                      {(jobSeeker.countryCode || jobSeeker.city) && (
                        <p className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {jobSeeker.city && jobSeeker.countryCode
                            ? `${jobSeeker.city}, ${jobSeeker.countryCode}`
                            : jobSeeker.city || jobSeeker.countryCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock4 className="h-4 w-4 text-muted-foreground" />
                      <p>
                        <span className="font-medium">Availability: </span>
                        {getAvailabilityText(jobSeeker.availability)}
                      </p>
                    </div>

                    {jobSeeker.expectedSalary && (
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-muted-foreground" />
                        <p>
                          <span className="font-medium">Expected salary: </span>
                          {jobSeeker.expectedSalary.toLocaleString()} €
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-1">
                      {jobSeeker.preferredJobType.map((type, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {getJobTypeText(type)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h5 className="font-medium mb-2">About the candidate</h5>
                  <p className="text-sm whitespace-pre-line">
                    {jobSeeker.about}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobSeeker.skills && jobSeeker.skills.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Skills
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {jobSeeker.skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {jobSeeker.languages && jobSeeker.languages.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-2 flex items-center">
                        <Languages className="h-4 w-4 mr-2" />
                        Languages
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {jobSeeker.languages.map((language, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {(jobSeeker.linkedinProfile || jobSeeker.portfolioUrl) && (
                  <div>
                    <h5 className="font-medium mb-2">Links</h5>
                    <div className="flex flex-wrap gap-2">
                      {jobSeeker.linkedinProfile && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            window.open(jobSeeker.linkedinProfile, "_blank")
                          }
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          LinkedIn
                        </Button>
                      )}
                      {jobSeeker.portfolioUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() =>
                            window.open(jobSeeker.portfolioUrl, "_blank")
                          }
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          Portfolio
                        </Button>
                      )}
                    </div>
                  </div>
                )}

                {jobSeeker.education && jobSeeker.education.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2 flex items-center">
                      <GraduationCap className="h-4 w-4 mr-2" />
                      Education
                    </h5>
                    <div className="space-y-3">
                      {jobSeeker.education.map((edu, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">
                            {edu.degree} en {edu.fieldOfStudy}
                          </p>
                          <p className="text-muted-foreground">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(edu.startDate), "MMM yyyy")} -
                            {edu.endDate
                              ? format(new Date(edu.endDate), " MMM yyyy")
                              : " Présent"}
                          </p>
                          {edu.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {edu.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {application.coverLetter && (
            <div>
              <h3 className="text-lg font-medium mb-3">Cover letter</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">
                    {application.coverLetter}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {application.jobPost.description && (
            <div>
              <h3 className="text-lg font-medium mb-3">Job Description</h3>
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">
                    {application.jobPost.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between pt-4 pb-6">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => viewResume(jobSeeker.resume)}
            >
              <FileText className="h-4 w-4 mr-2" />
              View Resume
            </Button>
          </div>

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Update status
                  <MoreVertical className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {application.status === "PENDING" && (
                  <DropdownMenuItem
                    onClick={() => updateApplicationStatus("REVIEWED")}
                  >
                    <Check className="h-4 w-4 mr-2 text-blue-600" />
                    Mark as viewed
                  </DropdownMenuItem>
                )}

                {(application.status === "PENDING" ||
                  application.status === "REVIEWED") && (
                  <DropdownMenuItem
                    onClick={() => updateApplicationStatus("SHORTLISTED")}
                  >
                    <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
                    Pre-select the candidate
                  </DropdownMenuItem>
                )}

                {(application.status === "REVIEWED" ||
                  application.status === "SHORTLISTED") && (
                  <DropdownMenuItem onClick={scheduleInterview}>
                    <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                    Schedule an interview
                  </DropdownMenuItem>
                )}

                {(application.status === "INTERVIEWED" ||
                  application.status === "SHORTLISTED") && (
                  <>
                    <DropdownMenuItem
                      onClick={() => updateApplicationStatus("ACCEPTED")}
                    >
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Accept the candidate
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => updateApplicationStatus("REJECTED")}
                    >
                      <X className="h-4 w-4 mr-2 text-red-600" />
                      Reject the candidate
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
