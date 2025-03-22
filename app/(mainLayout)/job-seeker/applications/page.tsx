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
import { Eye, MoreHorizontal, PenBoxIcon, User2, XCircle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/general/EmptyState";
import { requireUser } from "@/app/utils/hooks";
import { CopyLinkMenuItem } from "@/components/general/CopyLink";
import { getApplications } from "@/lib/queries/application";

const ApplicationsPage = async () => {
  const session = await requireUser();
  const applications = await getApplications(session.id as string);

  return (
    <>
      {applications.length === 0 ? (
        <EmptyState
          title="No applications found"
          description="You haven't applied for any jobs yet."
          buttonText="Find a job"
          href="/find-job"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              My Applications
            </CardTitle>
            <CardDescription className="text-center ">
              Manage your job applications here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      {application.jobPost.company.logo ? (
                        <Image
                          src={application.jobPost.company.logo}
                          alt={`${application.jobPost.company.name} logo`}
                          width={40}
                          height={40}
                          className="rounded-md size-10"
                        />
                      ) : (
                        <div className="bg-gray-300 size-10 rounded-lg flex items-center justify-center">
                          <User2 className="size-6 text-gray-500" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {application.jobPost.company.name}
                    </TableCell>
                    <TableCell>{application.jobPost.jobTitle}</TableCell>
                    <TableCell>
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1).toLowerCase()}
                    </TableCell>
                    <TableCell>
                      {new Date(application.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
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
                            <Link
                              href={`/job/${application.jobPost.id}`}
                              role="menuitem"
                            >
                              <Eye className="size-4" />
                              View Job
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/job-seeker/applications/${application.id}/edit`}
                              role="menuitem"
                            >
                              <PenBoxIcon className="size-4" />
                              Edit Application
                            </Link>
                          </DropdownMenuItem>
                          <CopyLinkMenuItem
                            jobUrl={`${process.env.NEXT_PUBLIC_URL}/job/${application.jobPost.id}`}
                          />
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/job-seeker/applications/${application.id}/delete`}
                              role="menuitem"
                            >
                              <XCircle className="h-4 w-4" />
                              Delete Application
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
      )}
    </>
  );
};

export default ApplicationsPage;
