import { JobFilters } from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import JobListingsLoading from "@/components/general/JobListingsLoading";
import { Suspense } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
    experience?: string;
    // education?: string;
    remote?: boolean;
    minSalary?: number;
    maxSalary?: number;
    skills?: string;
    companySize?: string;
  }>;
};

const JobPage = async ({ searchParams }: SearchParamsProps) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";
  const experience = params.experience?.split(",") || [];
  // const education=params.education?.split(",") || [];
  // const remote = params.remote || false;
  // Conversion explicite en nombres
  const minSalary = params.minSalary ? Number(params.minSalary) : 0;
  const maxSalary = params.maxSalary ? Number(params.maxSalary) : 1000000;
  const skills = params.skills || "";
  const companySize = params.companySize || "";

  // const filterKey = `page=${currentPage};types=${jobTypes.join(
  //   ","
  // )};location=${location}`;

  const filterKey = JSON.stringify({ currentPage, jobTypes, location });

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <JobFilters />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop and Mobile Layout */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Desktop Filters - Hidden on mobile */}
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <JobFilters />
          </div>
        </div>

        {/* Job Listings - Full width on mobile, 3 columns on desktop */}
        <div className="lg:col-span-3">
          <Suspense key={filterKey} fallback={<JobListingsLoading />}>
            <JobListings
              currentPage={currentPage}
              jobTypes={jobTypes}
              location={location}
              experience={experience}
              // education={education}
              // remote={remote}
              minSalary={minSalary}
              maxSalary={maxSalary}
              skills={skills}
              companySize={companySize}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
