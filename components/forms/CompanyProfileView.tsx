"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Twitter,
  Linkedin,
  Phone,
  MapPin,
  Users,
  Building,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { CompanyProfileData } from "@/app/types/types";

interface CompanyProfileViewProps {
  company: CompanyProfileData | null;
}

export default function CompanyProfileView({
  company,
}: CompanyProfileViewProps) {
  const router = useRouter();

  // Si aucune entreprise n'est fournie, afficher un message
  if (!company) {
    return (
      <Card className="w-full max-w-5xl mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <h3 className="text-xl font-medium">Company not found</h3>
          <p className="text-muted-foreground mt-2">
            The requested company profile does not exist.
          </p>
          <Button className="mt-6" onClick={() => router.push("/find-job")}>
            Return to Jobs
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between border-b pb-6">
        <div className="flex items-center gap-6">
          {company?.Company?.logo ? (
            <div className="relative h-24 w-24 rounded-lg overflow-hidden">
              <Image
                src={company.Company.logo}
                alt={`${company.Company.name} logo`}
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Building
                size={40}
                className="text-gray-400 dark:text-gray-500"
              />
            </div>
          )}
          <div>
            <CardTitle className="text-2xl">{company?.Company?.name}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {company?.Company?.city}
                {company?.Company?.city && company?.Company?.location
                  ? ", "
                  : ""}
                {company?.Company?.location}
                {company?.Company?.countryCode &&
                  ` (${company?.Company?.countryCode})`}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {company?.Company?.website && (
            <Button variant="outline" size="icon" asChild>
              <a
                href={company.Company.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit website"
              >
                <Globe size={18} />
              </a>
            </Button>
          )}
          {company?.Company?.xAccount && (
            <Button variant="outline" size="icon" asChild>
              <a
                href={`https://twitter.com/${company?.Company?.xAccount.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X/Twitter profile"
              >
                <Twitter size={18} />
              </a>
            </Button>
          )}
          {company?.Company?.linkedinProfile && (
            <Button variant="outline" size="icon" asChild>
              <a
                href={company?.Company?.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <Linkedin size={18} />
              </a>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-8">
        {/* About Section */}
        <section>
          <h3 className="text-lg font-medium mb-3">About</h3>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {company?.Company?.about || "No company description available."}
          </p>
        </section>

        {/* Company Details Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Company Details</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Industry:</span>
                <span className="text-sm text-muted-foreground">
                  {company?.Company?.industry || "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm font-medium">Company Size:</span>
                <span className="text-sm text-muted-foreground">
                  {company?.Company?.companySize
                    ? `${company?.Company?.companySize} employees`
                    : "Not specified"}
                </span>
              </div>
              {company?.Company?.languages &&
                company?.Company?.languages.length > 0 && (
                  <div className="flex gap-2">
                    <span className="text-sm font-medium mt-0.5">
                      Languages:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {company.Company.languages.map((language, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full text-xs"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Information</h3>
            <div className="space-y-3">
              {company?.Company?.phoneNumber && (
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone:</span>
                  <a
                    href={`tel:${company?.Company?.phoneNumber}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {company.Company.phoneNumber}
                  </a>
                </div>
              )}
              {company?.Company?.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Website:</span>
                  <a
                    href={company.Company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary truncate max-w-xs"
                  >
                    {company.Company.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
              {company?.Company?.xAccount && (
                <div className="flex items-center gap-2">
                  <Twitter className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">X (Twitter):</span>
                  <a
                    href={`https://twitter.com/${company?.Company?.xAccount.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {company.Company.xAccount}
                  </a>
                </div>
              )}
              {company?.Company?.linkedinProfile && (
                <div className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">LinkedIn:</span>
                  <a
                    href={company.Company.linkedinProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary truncate max-w-xs"
                  >
                    {company.Company.linkedinProfile.replace(
                      /^https?:\/\/(www\.)?linkedin\.com\//,
                      "linkedin.com/"
                    )}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-center gap-4 pt-4">
          <Button variant="outline" onClick={() => router.push("/find-job")}>
            Back to Jobs
          </Button>
          <Button onClick={() => router.push("/company/profile/edit")}>
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
