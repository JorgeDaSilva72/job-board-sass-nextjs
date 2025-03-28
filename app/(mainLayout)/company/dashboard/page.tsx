// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// export default function RecruiterDashboard() {
//   const [stats, setStats] = useState({
//     totalJobs: 0,
//     totalApplications: 0,
//     totalViews: 0,
//   });

//   useEffect(() => {
//     async function fetchStats() {
//       const response = await fetch("/api/recruiter/stats");
//       const data = await response.json();
//       setStats(data);
//     }
//     fetchStats();
//   }, []);

//   return (
//     <div className="flex min-h-screen">
//       {/* <Sidebar /> */}
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4 text-center">
//           Recruiter Dashboard
//         </h1>

//         {/* Statistiques */}
//         <h2 className="text-xl font-semibold mb-4">Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardHeader>
//               <CardTitle>{stat.title}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-3xl font-bold">{stat.value}</p>
//             </CardContent>
//           </Card>
//         ))} */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Active offers</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.totalJobs}</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Applications received</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.totalApplications}</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Ad Views</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.totalViews}</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Graphique */}
//         {/* <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Vues des annonces</h2>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="views" fill="#4F46E5" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div> */}

//         {/* Gestion des annonces */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">Offer management</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Publication date</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               <TableRow>
//                 <TableCell>Développeur Full-Stack</TableCell>
//                 <TableCell>Active</TableCell>
//                 <TableCell>12/03/2025</TableCell>
//                 <TableCell>
//                   <Button variant="outline">Modify</Button>
//                 </TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell>Designer UX/UI</TableCell>
//                 <TableCell>Expired</TableCell>
//                 <TableCell>05/02/2025</TableCell>
//                 <TableCell>
//                   <Button variant="outline">Renew</Button>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// ------------------------------------------

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";

// // Define TypeScript interfaces based on Prisma models
// interface JobPost {
//   id: string;
//   jobTitle: string;
//   status: "DRAFT" | "ACTIVE" | "EXPIRED";
//   createdAt: Date;
//   applications: JobApplication[];
// }

// interface JobApplication {
//   id: string;
//   status:
//     | "PENDING"
//     | "REVIEWED"
//     | "SHORTLISTED"
//     | "INTERVIEWED"
//     | "ACCEPTED"
//     | "REJECTED";
// }

// interface DashboardStats {
//   totalJobs: number;
//   activeJobs: number;
//   totalApplications: number;
//   pendingApplications: number;
//   shortlistedApplications: number;
//   viewedCandidates: number;
// }

// interface SavedFilter {
//   id: string;
//   name: string;
// }

// export default function RecruiterDashboard() {
//   const [stats, setStats] = useState<DashboardStats>({
//     totalJobs: 0,
//     activeJobs: 0,
//     totalApplications: 0,
//     pendingApplications: 0,
//     shortlistedApplications: 0,
//     viewedCandidates: 0,
//   });

//   const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
//   const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
//   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchDashboardData() {
//       try {
//         // Fetch dashboard statistics
//         const statsResponse = await fetch("/api/recruiter/stats");
//         const statsData = await statsResponse.json();
//         setStats(statsData);

//         // Fetch job posts
//         const jobPostsResponse = await fetch("/api/recruiter/job-posts");
//         const jobPostsData = await jobPostsResponse.json();
//         setJobPosts(jobPostsData);

//         // Fetch saved filters
//         const filtersResponse = await fetch("/api/recruiter/saved-filters");
//         const filtersData = await filtersResponse.json();
//         setSavedFilters(filtersData);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//       }
//     }

//     fetchDashboardData();
//   }, []);

//   const handleApplyFilter = (filterId: string) => {
//     setSelectedFilter(filterId);
//     // Trigger API call to apply the selected filter
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "ACTIVE":
//         return "green";
//       case "DRAFT":
//         return "yellow";
//       case "EXPIRED":
//         return "red";
//       default:
//         return "gray";
//     }
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4 text-center">
//           Recruiter Dashboard
//         </h1>

//         {/* Statistics Cards */}
//         <h2 className="text-xl font-semibold mb-4">Statistics</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Total Job Posts</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.totalJobs}</p>
//               <p className="text-sm text-muted-foreground">
//                 Active: {stats.activeJobs}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Applications</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.totalApplications}</p>
//               <div className="flex justify-between">
//                 <Badge variant="secondary">
//                   Pending: {stats.pendingApplications}
//                 </Badge>
//                 <Badge variant="outline">
//                   Shortlisted: {stats.shortlistedApplications}
//                 </Badge>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Candidate Insights</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-2xl font-bold">{stats.viewedCandidates}</p>
//               <p className="text-sm text-muted-foreground">Candidates Viewed</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Saved Filters */}
//         <div className="mt-6">
//           <h2 className="text-xl font-semibold mb-4">
//             Saved Candidate Filters
//           </h2>
//           <div className="flex gap-2 mb-4">
//             {savedFilters.map((filter) => (
//               <Button
//                 key={filter.id}
//                 variant={selectedFilter === filter.id ? "default" : "outline"}
//                 onClick={() => handleApplyFilter(filter.id)}
//               >
//                 {filter.name}
//               </Button>
//             ))}
//           </div>
//         </div>

//         {/* Job Posts Management */}
//         <div className="mt-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Job Offers Management</h2>
//             <Button>Create New Job Post</Button>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Title</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Publication Date</TableHead>
//                 <TableHead>Applications</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {jobPosts.map((job) => (
//                 <TableRow key={job.id}>
//                   <TableCell>{job.jobTitle}</TableCell>
//                   <TableCell>
//                     <Badge color={getStatusColor(job.status)} variant="outline">
//                       {job.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {new Date(job.createdAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell>{job.applications.length} Applications</TableCell>
//                   <TableCell>
//                     <Button variant="outline">
//                       {job.status === "EXPIRED" ? "Renew" : "Modify"}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>
//       </div>
//     </div>
//   );
// }

// --------------------------------------

// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// import { useRouter } from "next/navigation";

// // Define TypeScript interfaces
// interface JobPost {
//   id: string;
//   jobTitle: string;
//   status: "DRAFT" | "ACTIVE" | "EXPIRED";
//   createdAt: Date;
//   applications: JobApplication[];
// }

// interface JobApplication {
//   id: string;
//   status:
//     | "PENDING"
//     | "REVIEWED"
//     | "SHORTLISTED"
//     | "INTERVIEWED"
//     | "ACCEPTED"
//     | "REJECTED";
// }

// interface DashboardStats {
//   totalJobs: number;
//   activeJobs: number;
//   totalApplications: number;
//   pendingApplications: number;
//   shortlistedApplications: number;
//   viewedCandidates: number;
// }

// // interface SavedFilter {
// //   id: string;
// //   name: string;
// // }

// type JobStatus =
//   | "DRAFT"
//   | "ACTIVE"
//   | "EXPIRED"
//   | "PENDING"
//   | "REVIEWED"
//   | "SHORTLISTED"
//   | "INTERVIEWED"
//   | "ACCEPTED"
//   | "REJECTED"
//   | null;
// export default function RecruiterDashboard() {
//   const router = useRouter();
//   const [stats, setStats] = useState<DashboardStats | null>(null);
//   const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
//   //   const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
//   //   const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
//   const [loading, setLoading] = useState({
//     stats: true,
//     jobs: true,
//     filters: true,
//   });
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchDashboardData() {
//       try {
//         setError(null);

//         // Fetch all data in parallel
//         // const [statsResponse, jobPostsResponse, filtersResponse] =
//         // const [statsResponse, jobPostsResponse] = await Promise.all([
//         const [statsResponse] = await Promise.all([
//           fetch("/api/recruiter/stats"),
//           //   fetch("/api/recruiter/job-posts"),
//           // fetch("/api/recruiter/saved-filters"),
//         ]);

//         // if (!statsResponse.ok || !jobPostsResponse.ok || !filtersResponse.ok) {
//         // if (!statsResponse.ok || !jobPostsResponse.ok) {

//         if (!statsResponse.ok) {
//           throw new Error("Failed to fetch dashboard data");
//         }

//         // const [statsData, jobPostsData, filtersData] = await Promise.all([
//         // const [statsData, jobPostsData] = await Promise.all([
//         const [statsData] = await Promise.all([
//           statsResponse.json(),
//           //   jobPostsResponse.json(),
//           //   filtersResponse.json(),
//         ]);

//         setStats(statsData);
//         // setJobPosts(jobPostsData);
//         // setSavedFilters(filtersData);
//       } catch (error) {
//         console.error("Error fetching dashboard data:", error);
//         setError("Failed to load dashboard data. Please try again later.");
//       } finally {
//         setLoading({
//           stats: false,
//           jobs: false,
//           filters: false,
//         });
//       }
//     }

//     fetchDashboardData();
//   }, []);

//   //   const handleApplyFilter = (filterId: string) => {
//   //     setSelectedFilter(filterId);
//   //     // TODO: Implement filter application logic
//   //   };

//   const handleCreateNewJob = () => {
//     router.push("/recruiter/jobs/create");
//   };

//   const handleJobAction = (jobId: string, action: "edit" | "renew") => {
//     if (action === "edit") {
//       router.push(`/recruiter/jobs/${jobId}/edit`);
//     } else {
//       // TODO: Implement renew logic
//     }
//   };

//   const getStatusColor = (status: JobStatus) => {
//     const statusColors = {
//       ACTIVE: "bg-green-100 text-green-800",
//       DRAFT: "bg-yellow-100 text-yellow-800",
//       EXPIRED: "bg-red-100 text-red-800",
//       PENDING: "bg-blue-100 text-blue-800",
//       REVIEWED: "bg-green-100 text-green-800",
//       SHORTLISTED: "bg-purple-100 text-purple-800",
//       INTERVIEWED: "bg-yellow-100 text-yellow-800",
//       ACCEPTED: "bg-green-100 text-green-800",
//       REJECTED: "bg-red-100 text-red-800",

//       default: "bg-gray-100 text-gray-800",
//     };
//     if (!status) return statusColors.default;
//     return (
//       statusColors[status as keyof typeof statusColors] || statusColors.default
//     );
//   };

//   const countApplicationsByStatus = (
//     applications: JobApplication[],
//     status: string
//   ) => {
//     return applications.filter((app) => app.status === status).length;
//   };

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Card className="w-full max-w-md">
//           <CardHeader>
//             <CardTitle>Error Loading Dashboard</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-red-500 mb-4">{error}</p>
//             <Button onClick={() => window.location.reload()}>Retry</Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

//       {/* Statistics Cards */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-6">Overview</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {loading.stats ? (
//             Array.from({ length: 3 }).map((_, i) => (
//               <Card key={`stats-skeleton-${i}`}>
//                 <CardHeader>
//                   <Skeleton className="h-6 w-3/4" />
//                 </CardHeader>
//                 <CardContent>
//                   <Skeleton className="h-8 w-1/2 mb-2" />
//                   <Skeleton className="h-4 w-full" />
//                 </CardContent>
//               </Card>
//             ))
//           ) : (
//             <>
//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg">Job Posts</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-3xl font-bold mb-2">{stats?.totalJobs}</p>
//                   <div className="flex gap-2">
//                     <Badge className={getStatusColor("ACTIVE")}>
//                       Active: {stats?.activeJobs}
//                     </Badge>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg">Applications</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-3xl font-bold mb-2">
//                     {stats?.totalApplications}
//                   </p>
//                   <div className="flex gap-2 flex-wrap">
//                     <Badge className={getStatusColor("PENDING")}>
//                       Pending: {stats?.pendingApplications}
//                     </Badge>
//                     <Badge className={getStatusColor("SHORTLISTED")}>
//                       Shortlisted: {stats?.shortlistedApplications}
//                     </Badge>
//                   </div>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg">
//                     Candidate Engagement
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-3xl font-bold mb-2">
//                     {stats?.viewedCandidates}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     Candidates viewed in last 30 days
//                   </p>
//                 </CardContent>
//               </Card>
//             </>
//           )}
//         </div>
//       </section>

//       {/* Saved Filters */}
//       {/* <section className="mb-10">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Saved Filters</h2>
//           <Select
//             onValueChange={handleApplyFilter}
//             value={selectedFilter || undefined}
//           >
//             <SelectTrigger className="w-[250px]">
//               <SelectValue placeholder="Select a filter..." />
//             </SelectTrigger>
//             <SelectContent>
//               {loading.filters ? (
//                 <SelectItem value="loading" disabled>
//                   Loading filters...
//                 </SelectItem>
//               ) : (
//                 savedFilters.map((filter) => (
//                   <SelectItem key={filter.id} value={filter.id}>
//                     {filter.name}
//                   </SelectItem>
//                 ))
//               )}
//             </SelectContent>
//           </Select>
//         </div>

//         {savedFilters.length > 0 && (
//           <div className="flex gap-2 flex-wrap">
//             {savedFilters.map((filter) => (
//               <Button
//                 key={filter.id}
//                 variant={selectedFilter === filter.id ? "default" : "outline"}
//                 onClick={() => handleApplyFilter(filter.id)}
//                 className="rounded-full"
//               >
//                 {filter.name}
//               </Button>
//             ))}
//           </div>
//         )}
//       </section> */}

//       {/* Job Posts Management */}
//       {/* <section>
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold">Job Posts</h2>
//           <Button onClick={handleCreateNewJob} className="gap-2">
//             <span>+</span> Create New Job Post
//           </Button>
//         </div>

//         {loading.jobs ? (
//           <div className="space-y-4">
//             {Array.from({ length: 3 }).map((_, i) => (
//               <Skeleton key={`job-skeleton-${i}`} className="h-16 w-full" />
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[30%]">Title</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Applications</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {jobPosts.length > 0 ? (
//                   jobPosts.map((job) => (
//                     <TableRow key={job.id}>
//                       <TableCell className="font-medium">
//                         {job.jobTitle}
//                       </TableCell>
//                       <TableCell>
//                         <Badge className={getStatusColor(job.status || null)}>
//                           {job.status
//                             ? job.status.charAt(0) +
//                               job.status.slice(1).toLowerCase()
//                             : "Unknown"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         {new Date(job.createdAt).toLocaleDateString("en-US", {
//                           year: "numeric",
//                           month: "short",
//                           day: "numeric",
//                         })}
//                       </TableCell>
//                       <TableCell>
//                         <div className="flex gap-2 flex-wrap">
//                           <Badge variant="outline">
//                             Total: {job.applications.length}
//                           </Badge>
//                           <Badge className={getStatusColor("PENDING")}>
//                             Pending:{" "}
//                             {countApplicationsByStatus(
//                               job.applications,
//                               "PENDING"
//                             )}
//                           </Badge>
//                         </div>
//                       </TableCell>
//                       <TableCell className="text-right">
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() =>
//                             handleJobAction(
//                               job.id,
//                               job?.status === "EXPIRED" ? "renew" : "edit"
//                             )
//                           }
//                           className="mr-2"
//                         >
//                           {job?.status === "EXPIRED" ? "Renew" : "Edit"}
//                         </Button>
//                         <Button variant="outline" size="sm">
//                           View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} className="text-center py-8">
//                       <div className="text-muted-foreground">
//                         No job posts found. Create your first job post to get
//                         started.
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </section> */}
//     </div>
//   );
// }

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Updated interfaces to match new API response
interface DashboardStats {
  totalJobs: number;
  jobStatusCounts: {
    DRAFT: number;
    ACTIVE: number;
    EXPIRED: number;
  };
  totalApplications: number;
  applicationStatusCounts: {
    PENDING: number;
    REVIEWED: number;
    SHORTLISTED: number;
    INTERVIEWED: number;
    ACCEPTED: number;
    REJECTED: number;
  };
  viewedCandidates: number;
}

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setError(null);
        const statsResponse = await fetch("/api/recruiter/stats");

        if (!statsResponse.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const statsData = await statsResponse.json();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    const statusColors = {
      ACTIVE: "bg-green-100 text-green-800",
      DRAFT: "bg-yellow-100 text-yellow-800",
      EXPIRED: "bg-red-100 text-red-800",
      PENDING: "bg-blue-100 text-blue-800",
      REVIEWED: "bg-green-100 text-green-800",
      SHORTLISTED: "bg-purple-100 text-purple-800",
      INTERVIEWED: "bg-yellow-100 text-yellow-800",
      ACCEPTED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
      default: "bg-gray-100 text-gray-800",
    };
    return (
      statusColors[status as keyof typeof statusColors] || statusColors.default
    );
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Error Loading Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recruiter Dashboard</h1>

      {/* Job Posts Statistics */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Job Posts Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={`stats-skeleton-${i}`}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-1/2 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Job Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">{stats?.totalJobs}</p>
                  <div className="flex flex-col gap-1">
                    <Badge className={getStatusColor("ACTIVE")}>
                      Active: {stats?.jobStatusCounts.ACTIVE}
                    </Badge>
                    <Badge className={getStatusColor("DRAFT")}>
                      Draft: {stats?.jobStatusCounts.DRAFT}
                    </Badge>
                    <Badge className={getStatusColor("EXPIRED")}>
                      Expired: {stats?.jobStatusCounts.EXPIRED}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">
                    {stats?.totalApplications}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={getStatusColor("PENDING")}>
                      Pending: {stats?.applicationStatusCounts.PENDING}
                    </Badge>
                    <Badge className={getStatusColor("REVIEWED")}>
                      Reviewed: {stats?.applicationStatusCounts.REVIEWED}
                    </Badge>
                    <Badge className={getStatusColor("SHORTLISTED")}>
                      Shortlisted: {stats?.applicationStatusCounts.SHORTLISTED}
                    </Badge>
                    <Badge className={getStatusColor("INTERVIEWED")}>
                      Interviewed: {stats?.applicationStatusCounts.INTERVIEWED}
                    </Badge>
                    <Badge className={getStatusColor("ACCEPTED")}>
                      Accepted: {stats?.applicationStatusCounts.ACCEPTED}
                    </Badge>
                    <Badge className={getStatusColor("REJECTED")}>
                      Rejected: {stats?.applicationStatusCounts.REJECTED}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Candidate Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold mb-2">
                    {stats?.viewedCandidates}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Candidates viewed
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Jobs Status Breakdown */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Job Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={`app-status-skeleton-${i}`}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-8 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : Object.entries(stats?.jobStatusCounts || {}).map(
                ([status, count]) => (
                  <Card key={status}>
                    <CardContent className="pt-6">
                      <Badge className={`mb-2 ${getStatusColor(status)}`}>
                        {status}
                      </Badge>
                      <p className="text-2xl font-bold">{count}</p>
                    </CardContent>
                  </Card>
                )
              )}
        </div>
      </section>

      {/* Application Status Breakdown */}
      <section className="mt-2">
        <h2 className="text-2xl font-semibold mb-6">Application Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={`app-status-skeleton-${i}`}>
                  <CardContent className="pt-6">
                    <Skeleton className="h-6 w-full mb-2" />
                    <Skeleton className="h-8 w-3/4" />
                  </CardContent>
                </Card>
              ))
            : Object.entries(stats?.applicationStatusCounts || {}).map(
                ([status, count]) => (
                  <Card key={status}>
                    <CardContent className="pt-6">
                      <Badge className={`mb-2 ${getStatusColor(status)}`}>
                        {status}
                      </Badge>
                      <p className="text-2xl font-bold">{count}</p>
                    </CardContent>
                  </Card>
                )
              )}
        </div>
      </section>
    </div>
  );
}
