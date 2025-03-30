// import React from "react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Eye, MoreHorizontal, PenBoxIcon, User2, XCircle } from "lucide-react";
// import Link from "next/link";

// import { EmptyState } from "@/components/general/EmptyState";
// import { requireUser } from "@/app/utils/hooks";
// import { CopyLinkMenuItem } from "@/components/general/CopyLink";
// import { getJobs } from "@/lib/queries/jobs";

// const MyJobs = async () => {
//   const session = await requireUser();
//   const data = await getJobs(session.id as string);

//   return (
//     <>
//       {data.length === 0 ? (
//         <EmptyState
//           title="No job posts found"
//           description="You don't have any job posts yet."
//           buttonText="Create a job post"
//           href="/company/post-job"
//         />
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center text-2xl">My Jobs</CardTitle>
//             <CardDescription className="text-center ">
//               Manage your job listings here.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Logo</TableHead>
//                   <TableHead>Company</TableHead>
//                   <TableHead>Job Title</TableHead>
//                   <TableHead>Status</TableHead>
//                   {/* <TableHead>Applicants</TableHead> */}
//                   <TableHead>Created On</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data.map((listing) => (
//                   <TableRow key={listing.id}>
//                     <TableCell>
//                       {listing.company.logo ? (
//                         <Image
//                           src={listing.company.logo}
//                           alt={`${listing.company.name} logo`}
//                           width={40}
//                           height={40}
//                           className="rounded-md size-10"
//                         />
//                       ) : (
//                         <div className="bg-red-500 size-10 rounded-lg flex items-center justify-center">
//                           <User2 className="size-6 text-white" />
//                         </div>
//                       )}
//                     </TableCell>
//                     <TableCell className="font-medium">
//                       {listing.company.name}
//                     </TableCell>
//                     <TableCell>{listing.jobTitle}</TableCell>
//                     <TableCell>
//                       {listing.status.charAt(0).toUpperCase() +
//                         listing.status.slice(1).toLowerCase()}
//                     </TableCell>
//                     {/* <TableCell>5</TableCell> */}
//                     <TableCell>
//                       {listing.createdAt.toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="size-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link href={`/job/${listing.id}`} role="menuitem">
//                               <Eye className="size-4" />
//                               View Job
//                             </Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/my-jobs/${listing.id}/edit `}
//                               role="menuitem"
//                             >
//                               <PenBoxIcon className="size-4" />
//                               Edit Job
//                             </Link>
//                           </DropdownMenuItem>
//                           <CopyLinkMenuItem
//                             jobUrl={`${
//                               process.env.NEXT_PUBLIC_URL ??
//                               "https://job-board-sass-nextjs.vercel.app"
//                             }/job/${listing.id}`}
//                           />
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/my-jobs/${listing.id}/delete`}
//                               role="menuitem"
//                             >
//                               <XCircle className="h-4 w-4" />
//                               Delete Job
//                             </Link>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   );
// };

// export default MyJobs;

// import React from "react";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   Eye,
//   MoreHorizontal,
//   PenBoxIcon,
//   RefreshCw,
//   User2,
//   XCircle,
// } from "lucide-react";
// import Link from "next/link";

// import { EmptyState } from "@/components/general/EmptyState";
// import { requireUser } from "@/app/utils/hooks";
// import { CopyLinkMenuItem } from "@/components/general/CopyLink";
// import { getJobs } from "@/lib/queries/jobs";
// import { getStatusJobsBadgeStyle } from "@/app/utils/badgesStyles";

// const MyJobs = async () => {
//   const session = await requireUser();
//   const data = await getJobs(session.id as string);

//   return (
//     <>
//       {data.length === 0 ? (
//         <EmptyState
//           title="No job posts found"
//           description="You don't have any job posts yet."
//           buttonText="Create a job post"
//           href="/company/post-job"
//         />
//       ) : (
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center text-2xl">My Jobs</CardTitle>
//             <CardDescription className="text-center ">
//               Manage your job listings here.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Logo</TableHead>
//                   <TableHead>Company</TableHead>
//                   <TableHead>Job Title</TableHead>
//                   <TableHead>Status</TableHead>
//                   {/* <TableHead>Applicants</TableHead> */}
//                   <TableHead>Created On</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data.map((listing) => (
//                   <TableRow key={listing.id}>
//                     <TableCell>
//                       {listing.company.logo ? (
//                         <Image
//                           src={listing.company.logo}
//                           alt={`${listing.company.name} logo`}
//                           width={40}
//                           height={40}
//                           className="rounded-md size-10"
//                         />
//                       ) : (
//                         <div className="bg-red-500 size-10 rounded-lg flex items-center justify-center">
//                           <User2 className="size-6 text-white" />
//                         </div>
//                       )}
//                     </TableCell>
//                     <TableCell className="font-medium">
//                       {listing.company.name}
//                     </TableCell>
//                     <TableCell>{listing.jobTitle}</TableCell>
//                     <TableCell>
//                       <span className={getStatusJobsBadgeStyle(listing.status)}>
//                         {listing.status.charAt(0).toUpperCase() +
//                           listing.status.slice(1).toLowerCase()}
//                       </span>
//                     </TableCell>
//                     {/* <TableCell>5</TableCell> */}
//                     <TableCell>
//                       {listing.createdAt.toLocaleDateString("en-US", {
//                         month: "long",
//                         day: "numeric",
//                         year: "numeric",
//                       })}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" size="icon">
//                             <MoreHorizontal className="size-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem asChild>
//                             <Link href={`/job/${listing.id}`} role="menuitem">
//                               <Eye className="size-4 mr-2" />
//                               View Job
//                             </Link>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/my-jobs/${listing.id}/edit`}
//                               role="menuitem"
//                             >
//                               <PenBoxIcon className="size-4 mr-2" />
//                               Edit Job
//                             </Link>
//                           </DropdownMenuItem>
//                           {listing.status.toLowerCase() === "expired" && (
//                             <DropdownMenuItem asChild>
//                               <Link
//                                 href={`/my-jobs/${listing.id}/renew`}
//                                 role="menuitem"
//                               >
//                                 <RefreshCw className="size-4 mr-2" />
//                                 Renew Job
//                               </Link>
//                             </DropdownMenuItem>
//                           )}
//                           <CopyLinkMenuItem
//                             jobUrl={`${
//                               process.env.NEXT_PUBLIC_URL ??
//                               "https://job-board-sass-nextjs.vercel.app"
//                             }/job/${listing.id}`}
//                           />
//                           <DropdownMenuSeparator />
//                           <DropdownMenuItem asChild>
//                             <Link
//                               href={`/my-jobs/${listing.id}/delete`}
//                               role="menuitem"
//                             >
//                               <XCircle className="h-4 w-4 mr-2" />
//                               Delete Job
//                             </Link>
//                           </DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   );
// };

// export default MyJobs;

// -----------------------------------------------------

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Eye,
  MoreHorizontal,
  PenBoxIcon,
  RefreshCw,
  User2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { EmptyState } from "@/components/general/EmptyState";
import { requireUser } from "@/app/utils/hooks";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { getJobs } from "@/lib/queries/jobs";
import { getStatusJobsBadgeStyle } from "@/app/utils/badgesStyles";

const MyJobs = async () => {
  const session = await requireUser();
  const data = await getJobs(session.id as string);

  if (data.length === 0) {
    return (
      <EmptyState
        title="No job posts found"
        description="You don't have any job posts yet."
        buttonText="Create a job post"
        href="/company/post-job"
      />
    );
  }

  const company = data.length > 0 ? data[0].company : null;

  return (
    <Card>
      <CardHeader className="text-center">
        {company?.logo ? (
          <Image
            src={company.logo}
            alt={`${company.name} logo`}
            width={60}
            height={60}
            className="rounded-md mx-auto"
          />
        ) : (
          <div className="bg-red-500 size-14 rounded-lg flex items-center justify-center mx-auto">
            <User2 className="size-8 text-white" />
          </div>
        )}
        <CardTitle className="text-2xl mt-2">{company?.name}</CardTitle>
        <CardDescription>Manage your job listings here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created On</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>{listing.jobTitle}</TableCell>
                <TableCell>
                  <span className={getStatusJobsBadgeStyle(listing.status)}>
                    {listing.status.charAt(0).toUpperCase() +
                      listing.status.slice(1).toLowerCase()}
                  </span>
                </TableCell>
                <TableCell>
                  {listing.createdAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {listing.expiresAt
                    ? listing.expiresAt.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "No expiration date"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/job/${listing.id}`} role="menuitem">
                          <Eye className="size-4 mr-2" />
                          View Job
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/my-jobs/${listing.id}/edit`}
                          role="menuitem"
                        >
                          <PenBoxIcon className="size-4 mr-2" />
                          Edit Job
                        </Link>
                      </DropdownMenuItem>
                      {listing.status.toLowerCase() === "expired" && (
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/my-jobs/${listing.id}/renew`}
                            role="menuitem"
                          >
                            <RefreshCw className="size-4 mr-2" />
                            Renew Job
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <CopyLinkMenuItem
                        jobUrl={`${
                          process.env.NEXT_PUBLIC_URL ??
                          "https://job-board-sass-nextjs.vercel.app"
                        }/job/${listing.id}`}
                      />
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/my-jobs/${listing.id}/delete`}
                          role="menuitem"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Delete Job
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MyJobs;
