// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
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
// } from "lucide-react";
// import { format } from "date-fns";
// import { toast } from "sonner";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// interface JobApplication {
//   id: string;
//   createdAt: Date;
//   status: "PENDING" | "APPROVED" | "REJECTED" | "SCHEDULED";
//   coverLetter?: string;
//   jobPost: {
//     id: string;
//     title: string;
//   };
//   jobSeeker: {
//     id: string;
//     user: {
//       name: string;
//       email: string;
//     };
//     resumeUrl?: string;
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
//         (app) => app.status.toLowerCase() === activeTab
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (app) =>
//           app.jobPost.title.toLowerCase().includes(query) ||
//           app.jobSeeker.user.name.toLowerCase().includes(query) ||
//           app.jobSeeker.user.email.toLowerCase().includes(query)
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
//           app.id === applicationId
//             ? {
//                 ...app,
//                 status: newStatus as
//                   | "PENDING"
//                   | "APPROVED"
//                   | "REJECTED"
//                   | "SCHEDULED",
//               }
//             : app
//         )
//       );

//       toast.success(`Application ${newStatus.toLowerCase()} successfully`);
//     } catch (error) {
//       console.error("Error updating application:", error);
//       toast.error("Failed to update application status");
//     }
//   };

//   const scheduleInterview = (applicationId: string) => {
//     router.push(`/recruiter/applications/${applicationId}/schedule`);
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
//       case "APPROVED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-green-50 text-green-700 border-green-200"
//           >
//             <Check className="h-3 w-3 mr-1" />
//             Approved
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
//       case "SCHEDULED":
//         return (
//           <Badge
//             variant="outline"
//             className="bg-blue-50 text-blue-700 border-blue-200"
//           >
//             <Calendar className="h-3 w-3 mr-1" />
//             Scheduled
//           </Badge>
//         );
//       default:
//         return <Badge variant="outline">{status}</Badge>;
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Applications Received</h1>
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
//             <TabsList className="grid grid-cols-4 mb-4">
//               <TabsTrigger value="all">All</TabsTrigger>
//               <TabsTrigger value="pending">Pending</TabsTrigger>
//               <TabsTrigger value="approved">Approved</TabsTrigger>
//               <TabsTrigger value="rejected">Rejected</TabsTrigger>
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
//                               {application.jobPost.title}
//                             </h3>
//                             <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
//                               <User className="h-3 w-3" />
//                               <span>{application.jobSeeker.user.name}</span>
//                               <span className="mx-1">•</span>
//                               <span>{application.jobSeeker.user.email}</span>
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

//                         {application.coverLetter && (
//                           <div className="bg-muted/40 p-4 rounded-md mb-4">
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
//                                 viewResume(application.jobSeeker.resumeUrl)
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
//                                   `/recruiter/applications/${application.id}`
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
//                                 <>
//                                   <DropdownMenuItem
//                                     onClick={() =>
//                                       updateApplicationStatus(
//                                         application.id,
//                                         "APPROVED"
//                                       )
//                                     }
//                                   >
//                                     <Check className="h-4 w-4 mr-2 text-green-600" />
//                                     Approve
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
//                                     Reject
//                                   </DropdownMenuItem>
//                                 </>
//                               )}
//                               {(application.status === "APPROVED" ||
//                                 application.status === "PENDING") && (
//                                 <DropdownMenuItem
//                                   onClick={() =>
//                                     scheduleInterview(application.id)
//                                   }
//                                 >
//                                   <Calendar className="h-4 w-4 mr-2 text-blue-600" />
//                                   Schedule Interview
//                                 </DropdownMenuItem>
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

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

// Mise à jour pour correspondre au schéma Prisma
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
        throw new Error("Failed to fetch applications");
      }
      const data = await response.json();
      setApplications(data.applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Filter by search query
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
        throw new Error("Failed to update application status");
      }

      // Update application in state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: newStatus as any } : app
        )
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

  const scheduleInterview = (applicationId: string) => {
    updateApplicationStatus(applicationId, "INTERVIEWED");
    router.push(`/recruiter/applications/${applicationId}/schedule`);
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

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center ">
        <h1 className="text-2xl font-bold ">Applications Received</h1>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <CardTitle>Manage Applications</CardTitle>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applications..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-6">
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
            </TabsList>
          </div>

          <Separator />

          <TabsContent value={activeTab} className="m-0">
            <CardContent className="pt-6">
              {isLoading ? (
                <div className="text-center py-10">
                  <p>Loading applications...</p>
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No applications found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex justify-between flex-wrap gap-4 mb-4">
                          <div>
                            <h3 className="font-medium text-lg">
                              {application.jobPost.jobTitle}
                            </h3>
                            <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap gap-1">
                              <span>{application.jobPost.employmentType}</span>
                              <span className="mx-1">•</span>
                              <span>{application.jobPost.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(application.status)}
                            <span className="text-xs text-muted-foreground">
                              Applied{" "}
                              {format(
                                new Date(application.createdAt),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-md mb-4">
                          <div className="flex items-center gap-1 mb-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <p className="text-sm font-medium">
                              {application.jobSeeker.firstName}{" "}
                              {application.jobSeeker.lastName}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {application.jobSeeker.title} •{" "}
                            {application.jobSeeker.experience} years experience
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {application.jobSeeker.email}
                          </p>
                        </div>

                        {application.coverLetter && (
                          <div className="p-4 rounded-md mb-4 border">
                            <p className="text-sm font-medium mb-1">
                              Cover Letter
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {application.coverLetter.length > 150
                                ? `${application.coverLetter.substring(
                                    0,
                                    150
                                  )}...`
                                : application.coverLetter}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                viewResume(application.jobSeeker.resume)
                              }
                            >
                              <FileText className="h-4 w-4 mr-1" />
                              View Resume
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/company/applications/${application.id}`
                                )
                              }
                            >
                              View Details
                            </Button>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
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
                                  Mark as Reviewed
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
                                  Shortlist Candidate
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
                                  Schedule Interview
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
                                    Accept Candidate
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
                                    Reject Candidate
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
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
