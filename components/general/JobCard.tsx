// "use client";

// import {Link} from '@/i18n/navigation';
// import { Card, CardHeader } from "../ui/card";
// import { MapPin, User2 } from "lucide-react";
// import { Badge } from "../ui/badge";
// import { formatCurrency } from "@/app/utils/formatCurrency";
// import Image from "next/image";
// import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

// interface iAppProps {
//   job: {
//     id: string;
//     jobTitle: string;
//     salaryFrom: number;
//     salaryTo: number;
//     employmentType: string;
//     location: string;
//     createdAt: Date;
//     company: {
//       logo: string | null;
//       name: string;
//       about: string;
//       location: string;
//     };
//   };
// }

// export function JobCard({ job }: iAppProps) {
//   return (
//     <Link href={`/job/${job.id}`}>
//       <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary relative">
//         <CardHeader>
//           <div className="flex flex-col md:flex-row gap-4">
//             {job.company.logo ? (
//               <Image
//                 src={job.company.logo}
//                 alt={job.company.name}
//                 width={48}
//                 height={48}
//                 className="size-12 rounded-lg"
//               />
//             ) : (
//               <div className="bg-red-500 size-12 rounded-lg flex items-center justify-center">
//                 <User2 className="size-6 text-white" />
//               </div>
//             )}
//             <div className="flex flex-col flex-grow">
//               <h1 className="text-xl md:text-2xl font-bold">{job.jobTitle}</h1>
//               <div className="flex flex-wrap items-center gap-2">
//                 <p className="text-sm text-muted-foreground">
//                   {job.company.name}
//                 </p>
//                 <span className="hidden md:inline text-muted-foreground">
//                   •
//                 </span>
//                 <Badge className="rounded-full" variant="secondary">
//                   {job.employmentType}
//                 </Badge>
//                 <span className="hidden md:inline text-muted-foreground">
//                   •
//                 </span>
//                 <Badge className="rounded-full">{job.location}</Badge>
//                 <span className="hidden md:inline text-muted-foreground">
//                   •
//                 </span>
//                 <p className="text-sm text-muted-foreground">
//                   {formatCurrency(job.salaryFrom)} -
//                   {formatCurrency(job.salaryTo)}
//                 </p>
//               </div>
//             </div>

//             <div className="md:ml-auto">
//               <div className="flex items-center gap-2">
//                 <MapPin className="size-4" />
//                 <h1 className="text-base md:text-lg font-semibold whitespace-nowrap">
//                   {job.location}
//                 </h1>
//               </div>
//               <p className="text-sm text-muted-foreground md:text-right">
//                 {formatRelativeTime(job.createdAt)}
//               </p>
//             </div>
//           </div>
//           <div className="!mt-5">
//             <p className="text-base text-muted-foreground line-clamp-2">
//               {job.company.about}
//             </p>
//           </div>
//         </CardHeader>
//       </Card>
//     </Link>
//   );
// }

"use client";

import { Link } from "@/i18n/navigation";
import { Card, CardHeader } from "../ui/card";
import { MapPin, Building, Clock, Briefcase, DollarSign } from "lucide-react";
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface iAppProps {
  job: {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    location: string;
    createdAt: Date;
    company: {
      logo: string | null;
      name: string;
      about: string;
      location: string;
    };
  };
}

export function JobCard({ job }: iAppProps) {
  return (
    <Link href={`/job/${job.id}`} className="block w-full">
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-primary border-2 overflow-hidden group">
        <CardHeader className="p-4 md:p-6">
          <div className="flex flex-col space-y-4">
            {/* Header section with logo and title */}
            <div className="flex items-start gap-4">
              {job.company.logo ? (
                <div className="rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={job.company.logo}
                    alt={job.company.name}
                    width={56}
                    height={56}
                    className="size-14 object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ) : (
                <div className="bg-blue-600 size-14 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="size-7 text-white" />
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors line-clamp-2">
                  {job.jobTitle}
                </h1>
                <p className="text-base text-muted-foreground font-medium mt-1">
                  {job.company.name}
                </p>
              </div>

              <div className="hidden md:flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-full">
                <Clock className="size-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground whitespace-nowrap">
                  {formatRelativeTime(job.createdAt)}
                </p>
              </div>
            </div>

            {/* Tags and info section */}
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50">
                <Briefcase className="size-3 mr-1" />
                {job.employmentType}
              </Badge>

              <Badge className="rounded-full bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50">
                <MapPin className="size-3 mr-1" />
                {job.location}
              </Badge>

              <Badge className="rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 dark:hover:bg-amber-900/50">
                <DollarSign className="size-3 mr-1" />
                {formatCurrency(job.salaryFrom)} -{" "}
                {formatCurrency(job.salaryTo)}
              </Badge>
            </div>

            {/* Company description */}
            <div className="border-t pt-4 mt-2">
              <p className="text-base text-muted-foreground line-clamp-2">
                {job.company.about}
              </p>
            </div>

            {/* Mobile time indicator */}
            <div className="md:hidden flex items-center space-x-1 text-muted-foreground">
              <Clock className="size-4" />
              <p className="text-sm">{formatRelativeTime(job.createdAt)}</p>
            </div>
          </div>
        </CardHeader>

        {/* Indicator strip at bottom */}
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
      </Card>
    </Link>
  );
}
