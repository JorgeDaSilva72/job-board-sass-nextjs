// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   Check,
//   X,
//   Clock,
//   MoreVertical,
//   Calendar,
//   FileText,
//   User,
//   ListFilter,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";

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
//   };
//   jobSeeker: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     resume: string;
//     title: string;
//     experience: number;
//   };
// }

// export default function ReceivedApplicationsPage() {
//   const [applications, setApplications] = useState<JobApplication[]>([]);
//   const [filteredApplications, setFilteredApplications] = useState<
//     JobApplication[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const router = useRouter();

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     filterApplications();
//   }, [searchQuery, activeTab, applications]);

//   const fetchApplications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/recruiter/applications");
//       if (!response.ok) {
//         throw new Error("Failed to fetch applications");
//       }
//       const data = await response.json();
//       setApplications(data.applications);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       toast.error("Failed to load applications");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterApplications = () => {
//     let filtered = [...applications];

//     // Filter by status
//     if (activeTab !== "all") {
//       filtered = filtered.filter(
//         (app) => app.status.toLowerCase() === activeTab.toLowerCase()
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.jobPost.jobTitle.toLowerCase().includes(query) ||
//           `${app.jobSeeker.firstName} ${app.jobSeeker.lastName}`
//             .toLowerCase()
//             .includes(query) ||
//           app.jobSeeker.email.toLowerCase().includes(query) ||
//           app.jobSeeker.title.toLowerCase().includes(query)
//       );
//     }

//     setFilteredApplications(filtered);
//   };

//   const updateApplicationStatus = async (
//     applicationId: string,
//     newStatus: string
//   ) => {
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
//       setApplications((prev) =>
//         prev.map((app) =>
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           app.id === applicationId ? { ...app, status: newStatus as any } : app
//         )
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

//   const scheduleInterview = (applicationId: string) => {
//     updateApplicationStatus(applicationId, "INTERVIEWED");
//     //router.push(`/recruiter/applications/${applicationId}/schedule`);
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

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="text-center ">
//         <h1 className="text-2xl font-bold ">Applications Received</h1>
//       </div>

//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <CardTitle>Manage Applications</CardTitle>
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search applications..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </CardHeader>

//         <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//           <div className="px-6">
//             <TabsList className="grid grid-cols-6 mb-4">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
//               <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
//               <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
//               <TabsTrigger value="accepted">Accepted</TabsTrigger>
//             </TabsList>
//           </div>

//           <Separator />

//           <TabsContent value={activeTab} className="m-0">
//             <CardContent className="pt-6">
//               {isLoading ? (
//                 <div className="text-center py-10">
//                   <p>Loading applications...</p>
//                 </div>
//               ) : filteredApplications.length === 0 ? (
//                 <div className="text-center py-10">
//                   <p className="text-muted-foreground">No applications found</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {filteredApplications.map((application) => (
//                     <Card key={application.id} className="overflow-hidden">
//                       <div className="p-6">
//                         <div className="flex justify-between flex-wrap gap-4 mb-4">
//                           <div>
//                             <h3 className="font-medium text-lg">
//                               {application.jobPost.jobTitle}
//                             </h3>
//                             <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-1">
//                               <span>{application.jobPost.employmentType}</span>
//                               <span className="mx-1">•</span>
//                               <span>{application.jobPost.location}</span>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             {getStatusBadge(application.status)}
//                             <span className="text-xs text-muted-foreground">
//                               Applied{" "}
//                               {format(
//                                 new Date(application.createdAt),
//                                 "MMM d, yyyy"
//                               )}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="bg-muted/30 p-4 rounded-md mb-4">
//                           <div className="flex items-center gap-1 mb-2">
//                             <User className="h-4 w-4 text-muted-foreground" />
//                             <p className="text-sm font-medium">
//                               {application.jobSeeker.firstName}{" "}
//                               {application.jobSeeker.lastName}
//                             </p>
//                           </div>
//                           <p className="text-sm text-muted-foreground mb-1">
//                             {application.jobSeeker.title} •{" "}
//                             {application.jobSeeker.experience} years experience
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {application.jobSeeker.email}
//                           </p>
//                         </div>

//                         {application.coverLetter && (
//                           <div className="p-4 rounded-md mb-4 border">
//                             <p className="text-sm font-medium mb-1">
//                               Cover Letter
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               {application.coverLetter.length > 150
//                                 ? `${application.coverLetter.substring(
//                                     0,
//                                     150
//                                   )}...`
//                                 : application.coverLetter}
//                             </p>
//                           </div>
//                         )}

//                         <div className="flex justify-between items-center mt-4">
//                           <div className="flex gap-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 viewResume(application.jobSeeker.resume)
//                               }
//                             >
//                               <FileText className="h-4 w-4 mr-1" />
//                               View Resume
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 router.push(
//                                   `/company/applications/${application.id}`
//                                 )
//                               }
//                             >
//                               View Details
//                             </Button>
//                           </div>

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               {application.status === "PENDING" && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "REVIEWED"
//                                     )
//                                   }
//                                 >
//                                   <Check className="h-4 w-4 mr-2 text-blue-600" />
//                                   Mark as Reviewed
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "PENDING" ||
//                                 application.status === "REVIEWED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "SHORTLISTED"
//                                     )
//                                   }
//                                 >
//                                   <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
//                                   Shortlist Candidate
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "REVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     scheduleInterview(application.id)
//                                   }
//                                 >
//                                   <Calendar className="h-4 w-4 mr-2 text-purple-600" />
//                                   Schedule Interview
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "INTERVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <>
//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "ACCEPTED"
//                                       )
//                                     }
//                                   >
//                                     <Check className="h-4 w-4 mr-2 text-green-600" />
//                                     Accept Candidate
//                                   </DropdownMenuItem>

//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "REJECTED"
//                                       )
//                                     }
//                                   >
//                                     <X className="h-4 w-4 mr-2 text-red-600" />
//                                     Reject Candidate
//                                   </DropdownMenuItem>
//                                 </>
//                               )}
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   Check,
//   X,
//   Clock,
//   MoreVertical,
//   Calendar,
//   FileText,
//   User,
//   ListFilter,
//   ExternalLink,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";

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
//   };
//   jobSeeker: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     resume: string;
//     title: string;
//     experience: number;
//   };
// }

// export default function ReceivedApplicationsPage() {
//   const [applications, setApplications] = useState<JobApplication[]>([]);
//   const [filteredApplications, setFilteredApplications] = useState<
//     JobApplication[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const router = useRouter();

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     filterApplications();
//   }, [searchQuery, activeTab, applications]);

//   const fetchApplications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/recruiter/applications");
//       if (!response.ok) {
//         throw new Error("Failed to fetch applications");
//       }
//       const data = await response.json();
//       setApplications(data.applications);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       toast.error("Failed to load applications");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterApplications = () => {
//     let filtered = [...applications];

//     // Filter by status
//     if (activeTab !== "all") {
//       filtered = filtered.filter(
//         (app) => app.status.toLowerCase() === activeTab.toLowerCase()
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.jobPost.jobTitle.toLowerCase().includes(query) ||
//           `${app.jobSeeker.firstName} ${app.jobSeeker.lastName}`
//             .toLowerCase()
//             .includes(query) ||
//           app.jobSeeker.email.toLowerCase().includes(query) ||
//           app.jobSeeker.title.toLowerCase().includes(query)
//       );
//     }

//     setFilteredApplications(filtered);
//   };

//   const updateApplicationStatus = async (
//     applicationId: string,
//     newStatus: string
//   ) => {
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
//       setApplications((prev) =>
//         prev.map((app) =>
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           app.id === applicationId ? { ...app, status: newStatus as any } : app
//         )
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

//   const scheduleInterview = (applicationId: string) => {
//     updateApplicationStatus(applicationId, "INTERVIEWED");
//     //router.push(`/recruiter/applications/${applicationId}/schedule`);
//   };

//   const viewResume = (resumeUrl?: string) => {
//     if (resumeUrl) {
//       window.open(resumeUrl, "_blank");
//     } else {
//       toast.error("No resume available for this candidate");
//     }
//   };

//   const viewJobDetails = (jobId: string) => {
//     router.push(`/job/${jobId}`);
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

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="text-center ">
//         <h1 className="text-2xl font-bold ">Applications Received</h1>
//       </div>

//       <Card>
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <CardTitle>Manage Applications</CardTitle>
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search applications..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </CardHeader>

//         <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//           <div className="px-6">
//             <TabsList className="grid grid-cols-6 mb-4">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
//               <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
//               <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
//               <TabsTrigger value="accepted">Accepted</TabsTrigger>
//             </TabsList>
//           </div>

//           <Separator />

//           <TabsContent value={activeTab} className="m-0">
//             <CardContent className="pt-6">
//               {isLoading ? (
//                 <div className="text-center py-10">
//                   <p>Loading applications...</p>
//                 </div>
//               ) : filteredApplications.length === 0 ? (
//                 <div className="text-center py-10">
//                   <p className="text-muted-foreground">No applications found</p>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   {filteredApplications.map((application) => (
//                     <Card key={application.id} className="overflow-hidden">
//                       <div className="p-6">
//                         <div className="flex justify-between flex-wrap gap-4 mb-4">
//                           <div className="flex items-start gap-2">
//                             <div>
//                               <h3 className="font-medium text-lg">
//                                 {application.jobPost.jobTitle}
//                               </h3>
//                               <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-1">
//                                 <span>
//                                   {application.jobPost.employmentType}
//                                 </span>
//                                 <span className="mx-1">•</span>
//                                 <span>{application.jobPost.location}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               className="ml-2"
//                               onClick={() =>
//                                 viewJobDetails(application.jobPost.id)
//                               }
//                             >
//                               <ExternalLink className="h-4 w-4 mr-1" />
//                               See the job
//                             </Button>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             {getStatusBadge(application.status)}
//                             <span className="text-xs text-muted-foreground">
//                               Applied{" "}
//                               {format(
//                                 new Date(application.createdAt),
//                                 "MMM d, yyyy"
//                               )}
//                             </span>
//                           </div>
//                         </div>

//                         <div className="bg-muted/30 p-4 rounded-md mb-4">
//                           <div className="flex items-center gap-1 mb-2">
//                             <User className="h-4 w-4 text-muted-foreground" />
//                             <p className="text-sm font-medium">
//                               {application.jobSeeker.firstName}{" "}
//                               {application.jobSeeker.lastName}
//                             </p>
//                           </div>
//                           <p className="text-sm text-muted-foreground mb-1">
//                             {application.jobSeeker.title} •{" "}
//                             {application.jobSeeker.experience} years experience
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {application.jobSeeker.email}
//                           </p>
//                         </div>

//                         {application.coverLetter && (
//                           <div className="p-4 rounded-md mb-4 border">
//                             <p className="text-sm font-medium mb-1">
//                               Cover Letter
//                             </p>
//                             <p className="text-sm text-muted-foreground">
//                               {application.coverLetter.length > 150
//                                 ? `${application.coverLetter.substring(
//                                     0,
//                                     150
//                                   )}...`
//                                 : application.coverLetter}
//                             </p>
//                           </div>
//                         )}

//                         <div className="flex justify-between items-center mt-4">
//                           <div className="flex gap-2">
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 viewResume(application.jobSeeker.resume)
//                               }
//                             >
//                               <FileText className="h-4 w-4 mr-1" />
//                               View Resume
//                             </Button>
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               onClick={() =>
//                                 router.push(
//                                   `/company/applications/${application.id}`
//                                 )
//                               }
//                             >
//                               View Details
//                             </Button>
//                           </div>

//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button variant="ghost" size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               {application.status === "PENDING" && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "REVIEWED"
//                                     )
//                                   }
//                                 >
//                                   <Check className="h-4 w-4 mr-2 text-blue-600" />
//                                   Mark as Reviewed
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "PENDING" ||
//                                 application.status === "REVIEWED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "SHORTLISTED"
//                                     )
//                                   }
//                                 >
//                                   <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
//                                   Shortlist Candidate
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "REVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     scheduleInterview(application.id)
//                                   }
//                                 >
//                                   <Calendar className="h-4 w-4 mr-2 text-purple-600" />
//                                   Schedule Interview
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "INTERVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <>
//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "ACCEPTED"
//                                       )
//                                     }
//                                   >
//                                     <Check className="h-4 w-4 mr-2 text-green-600" />
//                                     Accept Candidate
//                                   </DropdownMenuItem>

//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "REJECTED"
//                                       )
//                                     }
//                                   >
//                                     <X className="h-4 w-4 mr-2 text-red-600" />
//                                     Reject Candidate
//                                   </DropdownMenuItem>
//                                 </>
//                               )}
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   Check,
//   X,
//   Clock,
//   MoreVertical,
//   Calendar,
//   FileText,
//   User,
//   ListFilter,
//   ExternalLink,
//   Briefcase,
//   MapPin,
//   Mail,
//   Award,
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";

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
//   };
//   jobSeeker: {
//     id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     resume: string;
//     title: string;
//     experience: number;
//   };
// }

// export default function ReceivedApplicationsPage() {
//   const [applications, setApplications] = useState<JobApplication[]>([]);
//   const [filteredApplications, setFilteredApplications] = useState<
//     JobApplication[]
//   >([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const router = useRouter();

//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   useEffect(() => {
//     filterApplications();
//   }, [searchQuery, activeTab, applications]);

//   const fetchApplications = async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch("/api/recruiter/applications");
//       if (!response.ok) {
//         throw new Error("Failed to fetch applications");
//       }
//       const data = await response.json();
//       setApplications(data.applications);
//     } catch (error) {
//       console.error("Error fetching applications:", error);
//       toast.error("Failed to load applications");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const filterApplications = () => {
//     let filtered = [...applications];

//     // Filter by status
//     if (activeTab !== "all") {
//       filtered = filtered.filter(
//         (app) => app.status.toLowerCase() === activeTab.toLowerCase()
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.jobPost.jobTitle.toLowerCase().includes(query) ||
//           `${app.jobSeeker.firstName} ${app.jobSeeker.lastName}`
//             .toLowerCase()
//             .includes(query) ||
//           app.jobSeeker.email.toLowerCase().includes(query) ||
//           app.jobSeeker.title.toLowerCase().includes(query)
//       );
//     }

//     setFilteredApplications(filtered);
//   };

//   const updateApplicationStatus = async (
//     applicationId: string,
//     newStatus: string
//   ) => {
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
//       setApplications((prev) =>
//         prev.map((app) =>
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           app.id === applicationId ? { ...app, status: newStatus as any } : app
//         )
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

//   const scheduleInterview = (applicationId: string) => {
//     updateApplicationStatus(applicationId, "INTERVIEWED");
//     //router.push(`/recruiter/applications/${applicationId}/schedule`);
//   };

//   const viewResume = (resumeUrl?: string) => {
//     if (resumeUrl) {
//       window.open(resumeUrl, "_blank");
//     } else {
//       toast.error("No resume available for this candidate");
//     }
//   };

//   const viewJobDetails = (jobId: string) => {
//     router.push(`/job/${jobId}`);
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

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="text-center">
//         <h1 className="text-2xl font-bold">Applications Received</h1>
//       </div>

//       <Card className="shadow-sm">
//         <CardHeader className="pb-3">
//           <div className="flex justify-between items-center flex-wrap gap-4">
//             <CardTitle>Manage Applications</CardTitle>
//             <div className="relative w-full md:w-64">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search applications..."
//                 className="pl-8"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//         </CardHeader>

//         <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//           {/* <div className="px-6">
//             <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 mb-4">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
//               <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
//               <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
//               <TabsTrigger value="accepted">Accepted</TabsTrigger>
//             </TabsList>
//           </div> */}

//           {/* <div className="px-4 sm:px-6">
//             <TabsList className="flex overflow-x-auto  pb-2 mb-4 gap-1 md:grid md:grid-cols-6">
//               <TabsTrigger
//                 value="all"
//                 className="text-xs px-2 py-1 min-w-[60px] md:text-sm md:px-3 md:py-2"
//               >
//                 All
//               </TabsTrigger>
//               <TabsTrigger
//                 value="pending"
//                 className="text-xs px-2 py-1 min-w-[70px] md:text-sm md:px-3 md:py-2"
//               >
//                 Pending
//               </TabsTrigger>
//               <TabsTrigger
//                 value="reviewed"
//                 className="text-xs px-2 py-1 min-w-[75px] md:text-sm md:px-3 md:py-2"
//               >
//                 Reviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="shortlisted"
//                 className="text-xs px-2 py-1 min-w-[85px] md:text-sm md:px-3 md:py-2"
//               >
//                 Shortlisted
//               </TabsTrigger>
//               <TabsTrigger
//                 value="interviewed"
//                 className="text-xs px-2 py-1 min-w-[90px] md:text-sm md:px-3 md:py-2"
//               >
//                 Interviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="accepted"
//                 className="text-xs px-2 py-1 min-w-[75px] md:text-sm md:px-3 md:py-2"
//               >
//                 Accepted
//               </TabsTrigger>
//             </TabsList>
//           </div> */}

//           {/* <div className="px-4 sm:px-6">
//             <TabsList className="grid grid-cols-2 gap-1 mb-4 sm:grid-cols-6 sm:gap-2">
//               <TabsTrigger
//                 value="all"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 All
//               </TabsTrigger>
//               <TabsTrigger
//                 value="pending"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 Pending
//               </TabsTrigger>
//               <TabsTrigger
//                 value="reviewed"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 Reviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="shortlisted"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 Shortlisted
//               </TabsTrigger>
//               <TabsTrigger
//                 value="interviewed"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 Interviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="accepted"
//                 className="text-xs py-1 truncate sm:text-sm"
//               >
//                 Accepted
//               </TabsTrigger>
//             </TabsList>
//           </div> */}

//           {/* <div className="px-4 sm:px-6">
//             <TabsList className="flex flex-col space-y-2 mb-4 sm:flex-row sm:space-y-0 sm:space-x-2 sm:grid sm:grid-cols-6">
//               <TabsTrigger
//                 value="all"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 All
//               </TabsTrigger>
//               <TabsTrigger
//                 value="pending"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 Pending
//               </TabsTrigger>
//               <TabsTrigger
//                 value="reviewed"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 Reviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="shortlisted"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 Shortlisted
//               </TabsTrigger>
//               <TabsTrigger
//                 value="interviewed"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 Interviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="accepted"
//                 className="justify-start text-left py-2 sm:justify-center sm:text-center"
//               >
//                 Accepted
//               </TabsTrigger>
//             </TabsList>
//           </div> */}

//           {/* <TabsList className="grid grid-cols-1 md:grid-cols-6 mb-4 gap-2">
//             <TabsTrigger value="all">All</TabsTrigger>
//             <TabsTrigger value="pending">Pending</TabsTrigger>
//             <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
//             <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
//             <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
//             <TabsTrigger value="accepted">Accepted</TabsTrigger>
//           </TabsList> */}

//           <TabsList className="w-full overflow-x-auto">
//             <div className="flex w-full">
//               <TabsTrigger
//                 value="all"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 All
//               </TabsTrigger>
//               <TabsTrigger
//                 value="pending"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 Pending
//               </TabsTrigger>
//               <TabsTrigger
//                 value="reviewed"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 Reviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="shortlisted"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 Shortlisted
//               </TabsTrigger>
//               <TabsTrigger
//                 value="interviewed"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 Interviewed
//               </TabsTrigger>
//               <TabsTrigger
//                 value="accepted"
//                 className="flex-1 min-w-[80px] md:min-w-0 text-center"
//               >
//                 Accepted
//               </TabsTrigger>
//             </div>
//           </TabsList>

//           <Separator />

//           <TabsContent value={activeTab} className="m-0">
//             <CardContent className="pt-6">
//               {isLoading ? (
//                 <div className="text-center py-10">
//                   <p>Loading applications...</p>
//                 </div>
//               ) : filteredApplications.length === 0 ? (
//                 <div className="text-center py-10">
//                   <p className="text-muted-foreground">No applications found</p>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {filteredApplications.map((application) => (
//                     <Card
//                       key={application.id}
//                       className="overflow-hidden border-l-4"
//                       style={{
//                         borderLeftColor:
//                           application.status === "PENDING"
//                             ? "#FBBF24"
//                             : application.status === "REVIEWED"
//                             ? "#3B82F6"
//                             : application.status === "SHORTLISTED"
//                             ? "#6366F1"
//                             : application.status === "INTERVIEWED"
//                             ? "#8B5CF6"
//                             : application.status === "ACCEPTED"
//                             ? "#10B981"
//                             : application.status === "REJECTED"
//                             ? "#EF4444"
//                             : "#CBD5E1",
//                       }}
//                     >
//                       <div className="p-6">
//                         {/* Header with Status and Date */}
//                         <div className="flex justify-between items-center mb-4 pb-2 border-b">
//                           <div className="flex items-center gap-2">
//                             {getStatusBadge(application.status)}
//                             <span className="text-sm text-muted-foreground">
//                               Applied{" "}
//                               {format(
//                                 new Date(application.createdAt),
//                                 "MMM d, yyyy"
//                               )}
//                             </span>
//                           </div>
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <Button size="icon">
//                                 <MoreVertical className="h-4 w-4" />
//                               </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                               {application.status === "PENDING" && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "REVIEWED"
//                                     )
//                                   }
//                                 >
//                                   <Check className="h-4 w-4 mr-2 text-blue-600" />
//                                   Mark as Reviewed
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "PENDING" ||
//                                 application.status === "REVIEWED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     updateApplicationStatus(
//                                       application.id,
//                                       "SHORTLISTED"
//                                     )
//                                   }
//                                 >
//                                   <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
//                                   Shortlist Candidate
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "REVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     scheduleInterview(application.id)
//                                   }
//                                 >
//                                   <Calendar className="h-4 w-4 mr-2 text-purple-600" />
//                                   Schedule Interview
//                                 </DropdownMenuItem>
//                               )}

//                               {(application.status === "INTERVIEWED" ||
//                                 application.status === "SHORTLISTED") && (
//                                 <>
//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "ACCEPTED"
//                                       )
//                                     }
//                                   >
//                                     <Check className="h-4 w-4 mr-2 text-green-600" />
//                                     Accept Candidate
//                                   </DropdownMenuItem>

//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "REJECTED"
//                                       )
//                                     }
//                                   >
//                                     <X className="h-4 w-4 mr-2 text-red-600" />
//                                     Reject Candidate
//                                   </DropdownMenuItem>
//                                 </>
//                               )}
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>

//                         {/* Two-column layout for job and candidate info */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                           {/* Job Information */}
//                           <div className=" p-4 rounded-md border">
//                             <div className="flex items-center gap-2 mb-3">
//                               <Briefcase className="h-4 w-4" />
//                               <h3 className="font-medium">
//                                 Position Information
//                               </h3>
//                             </div>

//                             <h4 className="font-medium text-lg mb-2">
//                               {application.jobPost.jobTitle}
//                             </h4>

//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <Briefcase className="h-4 w-4" />
//                                 <span>
//                                   {application.jobPost.employmentType}
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-2">
//                                 <MapPin className="h-4 w-4" />
//                                 <span>{application.jobPost.location}</span>
//                               </div>
//                             </div>

//                             <div className="mt-4">
//                               <Button
//                                 size="sm"
//                                 className="w-full"
//                                 onClick={() =>
//                                   viewJobDetails(application.jobPost.id)
//                                 }
//                               >
//                                 <ExternalLink className="h-4 w-4 mr-2" />
//                                 View Complete Offer
//                               </Button>
//                             </div>
//                           </div>

//                           {/* Candidate Information */}
//                           <div className=" p-4 rounded-md border">
//                             <div className="flex items-center gap-2 mb-3">
//                               <User className="h-4 w-4" />
//                               <h3 className="font-medium">
//                                 Candidate Information
//                               </h3>
//                             </div>

//                             <h4 className="font-medium text-lg mb-2">
//                               {application.jobSeeker.firstName}{" "}
//                               {application.jobSeeker.lastName}
//                             </h4>

//                             <div className="space-y-2 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <Award className="h-4 w-4" />
//                                 <span>{application.jobSeeker.title}</span>
//                               </div>

//                               <div className="flex items-center gap-2 ">
//                                 <Calendar className="h-4 w-4 " />
//                                 <span>
//                                   {application.jobSeeker.experience} years
//                                   experience
//                                 </span>
//                               </div>

//                               <div className="flex items-center gap-2">
//                                 <Mail className="h-4 w-4" />
//                                 <span>{application.jobSeeker.email}</span>
//                               </div>
//                             </div>

//                             <div className="mt-4">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 className="w-full"
//                                 onClick={() =>
//                                   viewResume(application.jobSeeker.resume)
//                                 }
//                               >
//                                 <FileText className="h-4 w-4 mr-2" />
//                                 View Resume
//                               </Button>
//                             </div>

//                             <div className="mt-4">
//                               <Button
//                                 size="sm"
//                                 className="w-full"
//                                 onClick={() =>
//                                   router.push(
//                                     `/company/candidates/${application.jobSeeker.id}`
//                                   )
//                                 }
//                               >
//                                 <ExternalLink className="h-4 w-4 mr-2" />
//                                 View Complete Candidate Information.
//                               </Button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Cover Letter Section (Conditional) */}
//                         {application.coverLetter && (
//                           <div className="p-4 rounded-md mb-4 border">
//                             <div className="flex items-center gap-2 mb-2">
//                               <FileText className="h-4 w-4 " />
//                               <h3 className="font-medium">Cover Letter</h3>
//                             </div>
//                             <p className="text-sm italic">
//                               {application.coverLetter.length > 150
//                                 ? `${application.coverLetter.substring(
//                                     0,
//                                     150
//                                   )}...`
//                                 : application.coverLetter}
//                             </p>
//                             {application.coverLetter.length > 150 && (
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 className="mt-2 text-xs"
//                               >
//                                 Show more
//                               </Button>
//                             )}
//                           </div>
//                         )}

//                         {/* Actions Footer */}
//                         <div className="flex justify-end items-center mt-4">
//                           <Button
//                             variant="default"
//                             size="sm"
//                             onClick={() =>
//                               router.push(
//                                 `/company/applications/${application.id}`
//                               )
//                             }
//                           >
//                             View Complete Application
//                           </Button>
//                         </div>
//                       </div>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </TabsContent>
//         </Tabs>
//       </Card>
//     </div>
//   );
// }

// --------------------------------------------------------------
// BEGIN 05/05/2025 compatible next-intl

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Check,
  X,
  Clock,
  MoreVertical,
  Calendar,
  FileText,
  User,
  ListFilter,
  ExternalLink,
  Briefcase,
  MapPin,
  Mail,
  Award,
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

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
  };
  jobSeeker: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    resume: string;
    title: string;
    experience: number;
  };
}

export default function ReceivedApplicationsPage() {
  const t = useTranslations("ReceivedApplications");
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    JobApplication[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const router = useRouter();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchQuery, activeTab, applications]);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/recruiter/applications");
      if (!response.ok) {
        throw new Error(t("errors.fetchFailed"));
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error(t("errors.loadFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (activeTab !== "all") {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.jobPost.jobTitle.toLowerCase().includes(query) ||
          `${app.jobSeeker.firstName} ${app.jobSeeker.lastName}`
            .toLowerCase()
            .includes(query) ||
          app.jobSeeker.email.toLowerCase().includes(query) ||
          app.jobSeeker.title.toLowerCase().includes(query)
      );
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (
    applicationId: string,
    newStatus: string
  ) => {
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
        throw new Error(t("errors.updateFailed"));
      }

      setApplications((prev) =>
        prev.map((app) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          app.id === applicationId ? { ...app, status: newStatus as any } : app
        )
      );

      toast.success(t(`statusMessages.${newStatus.toLowerCase()}`));
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error(t("errors.updateFailed"));
    }
  };

  const scheduleInterview = (applicationId: string) => {
    updateApplicationStatus(applicationId, "INTERVIEWED");
  };

  const viewResume = (resumeUrl?: string) => {
    if (resumeUrl) {
      window.open(resumeUrl, "_blank");
    } else {
      toast.error(t("errors.noResume"));
    }
  };

  const viewJobDetails = (jobId: string) => {
    router.push(`/job/${jobId}`);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { icon: Clock, text: t("status.pending") },
      REVIEWED: { icon: Check, text: t("status.reviewed") },
      SHORTLISTED: { icon: ListFilter, text: t("status.shortlisted") },
      INTERVIEWED: { icon: Calendar, text: t("status.interviewed") },
      ACCEPTED: { icon: Check, text: t("status.accepted") },
      REJECTED: { icon: X, text: t("status.rejected") },
    };

    const { icon: Icon, text } = statusConfig[
      status as keyof typeof statusConfig
    ] || { icon: null, text: status };

    const badgeColors = {
      PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
      REVIEWED: "bg-blue-50 text-blue-700 border-blue-200",
      SHORTLISTED: "bg-indigo-50 text-indigo-700 border-indigo-200",
      INTERVIEWED: "bg-purple-50 text-purple-700 border-purple-200",
      ACCEPTED: "bg-green-50 text-green-700 border-green-200",
      REJECTED: "bg-red-50 text-red-700 border-red-200",
    };

    return (
      <Badge
        variant="outline"
        className={badgeColors[status as keyof typeof badgeColors]}
      >
        {Icon && <Icon className="h-3 w-3 mr-1" />}
        {text}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>{t("manageTitle")}</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("searchPlaceholder")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto">
            <div className="flex w-full">
              {[
                "all",
                "pending",
                "reviewed",
                "shortlisted",
                "interviewed",
                "accepted",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 min-w-[80px] md:min-w-0 text-center"
                >
                  {t(`tabs.${tab}`)}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>

          <Separator />

          <TabsContent value={activeTab} className="m-0">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="text-center py-10">
                  <p>{t("loading")}</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">{t("noApplications")}</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredApplications.map((application) => (
                    <Card
                      key={application.id}
                      className="overflow-hidden border-l-4"
                      style={{
                        borderLeftColor:
                          application.status === "PENDING"
                            ? "#FBBF24"
                            : application.status === "REVIEWED"
                            ? "#3B82F6"
                            : application.status === "SHORTLISTED"
                            ? "#6366F1"
                            : application.status === "INTERVIEWED"
                            ? "#8B5CF6"
                            : application.status === "ACCEPTED"
                            ? "#10B981"
                            : application.status === "REJECTED"
                            ? "#EF4444"
                            : "#CBD5E1",
                      }}
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <span className="text-sm text-muted-foreground">
                              {t("appliedOn", {
                                date: format(
                                  new Date(application.createdAt),
                                  "MMM d, yyyy"
                                ),
                              })}
                            </span>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {application.status === "PENDING" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    updateApplicationStatus(
                                      application.id,
                                      "REVIEWED"
                                    )
                                  }
                                >
                                  <Check className="h-4 w-4 mr-2 text-blue-600" />
                                  {t("actions.markReviewed")}
                                </DropdownMenuItem>
                              )}

                              {(application.status === "PENDING" ||
                                application.status === "REVIEWED") && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    updateApplicationStatus(
                                      application.id,
                                      "SHORTLISTED"
                                    )
                                  }
                                >
                                  <ListFilter className="h-4 w-4 mr-2 text-indigo-600" />
                                  {t("actions.shortlist")}
                                </DropdownMenuItem>
                              )}

                              {(application.status === "REVIEWED" ||
                                application.status === "SHORTLISTED") && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    scheduleInterview(application.id)
                                  }
                                >
                                  <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                                  {t("actions.scheduleInterview")}
                                </DropdownMenuItem>
                              )}

                              {(application.status === "INTERVIEWED" ||
                                application.status === "SHORTLISTED") && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "ACCEPTED"
                                      )
                                    }
                                  >
                                    <Check className="h-4 w-4 mr-2 text-green-600" />
                                    {t("actions.accept")}
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onClick={() =>
                                      updateApplicationStatus(
                                        application.id,
                                        "REJECTED"
                                      )
                                    }
                                  >
                                    <X className="h-4 w-4 mr-2 text-red-600" />
                                    {t("actions.reject")}
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                          <div className="p-4 rounded-md border">
                            <div className="flex items-center gap-2 mb-3">
                              <Briefcase className="h-4 w-4" />
                              <h3 className="font-medium">
                                {t("positionInfo")}
                              </h3>
                            </div>

                            <h4 className="font-medium text-lg mb-2">
                              {application.jobPost.jobTitle}
                            </h4>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>
                                  {application.jobPost.employmentType}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{application.jobPost.location}</span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                  viewJobDetails(application.jobPost.id)
                                }
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("viewCompleteOffer")}
                              </Button>
                            </div>
                          </div>

                          <div className="p-4 rounded-md border">
                            <div className="flex items-center gap-2 mb-3">
                              <User className="h-4 w-4" />
                              <h3 className="font-medium">
                                {t("candidateInfo")}
                              </h3>
                            </div>

                            <h4 className="font-medium text-lg mb-2">
                              {application.jobSeeker.firstName}{" "}
                              {application.jobSeeker.lastName}
                            </h4>

                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Award className="h-4 w-4" />
                                <span>{application.jobSeeker.title}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {application.jobSeeker.experience}{" "}
                                  {t("yearsExperience")}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{application.jobSeeker.email}</span>
                              </div>
                            </div>

                            <div className="mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                  viewResume(application.jobSeeker.resume)
                                }
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                {t("viewResume")}
                              </Button>
                            </div>

                            <div className="mt-4">
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={() =>
                                  router.push(
                                    `/company/candidates/${application.jobSeeker.id}`
                                  )
                                }
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                {t("viewCompleteCandidate")}
                              </Button>
                            </div>
                          </div>
                        </div>

                        {application.coverLetter && (
                          <div className="p-4 rounded-md mb-4 border">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              <h3 className="font-medium">
                                {t("coverLetter")}
                              </h3>
                            </div>
                            <p className="text-sm italic">
                              {application.coverLetter.length > 150
                                ? `${application.coverLetter.substring(
                                    0,
                                    150
                                  )}...`
                                : application.coverLetter}
                            </p>
                            {application.coverLetter.length > 150 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 text-xs"
                              >
                                {t("showMore")}
                              </Button>
                            )}
                          </div>
                        )}

                        <div className="flex justify-end items-center mt-4">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/company/applications/${application.id}`
                              )
                            }
                          >
                            {t("viewCompleteApplication")}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
