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

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// Define TypeScript interfaces based on Prisma models
interface JobPost {
  id: string;
  jobTitle: string;
  status: "DRAFT" | "ACTIVE" | "EXPIRED";
  createdAt: Date;
  applications: JobApplication[];
}

interface JobApplication {
  id: string;
  status:
    | "PENDING"
    | "REVIEWED"
    | "SHORTLISTED"
    | "INTERVIEWED"
    | "ACCEPTED"
    | "REJECTED";
}

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
  viewedCandidates: number;
}

interface SavedFilter {
  id: string;
  name: string;
}

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    shortlistedApplications: 0,
    viewedCandidates: 0,
  });

  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch dashboard statistics
        const statsResponse = await fetch("/api/recruiter/stats");
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch job posts
        const jobPostsResponse = await fetch("/api/recruiter/job-posts");
        const jobPostsData = await jobPostsResponse.json();
        setJobPosts(jobPostsData);

        // Fetch saved filters
        const filtersResponse = await fetch("/api/recruiter/saved-filters");
        const filtersData = await filtersResponse.json();
        setSavedFilters(filtersData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchDashboardData();
  }, []);

  const handleApplyFilter = (filterId: string) => {
    setSelectedFilter(filterId);
    // Trigger API call to apply the selected filter
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "DRAFT":
        return "yellow";
      case "EXPIRED":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Recruiter Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Job Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalJobs}</p>
              <p className="text-sm text-muted-foreground">
                Active: {stats.activeJobs}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.totalApplications}</p>
              <div className="flex justify-between">
                <Badge variant="secondary">
                  Pending: {stats.pendingApplications}
                </Badge>
                <Badge variant="outline">
                  Shortlisted: {stats.shortlistedApplications}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{stats.viewedCandidates}</p>
              <p className="text-sm text-muted-foreground">Candidates Viewed</p>
            </CardContent>
          </Card>
        </div>

        {/* Saved Filters */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">
            Saved Candidate Filters
          </h2>
          <div className="flex gap-2 mb-4">
            {savedFilters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                onClick={() => handleApplyFilter(filter.id)}
              >
                {filter.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Job Posts Management */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Job Offers Management</h2>
            <Button>Create New Job Post</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publication Date</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobPosts.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>
                    <Badge color={getStatusColor(job.status)} variant="outline">
                      {job.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(job.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{job.applications.length} Applications</TableCell>
                  <TableCell>
                    <Button variant="outline">
                      {job.status === "EXPIRED" ? "Renew" : "Modify"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
