"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Mail,
  MapPin,
  Phone,
  Download,
  Briefcase,
  Clock,
  Tag,
  Linkedin,
  Globe,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import { ApplicationStatus, Availability, JobType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Types
type JobSeeker = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  title: string;
  about: string;
  experience: number;
  skills: string[];
  languages: string[];
  education: Education[];
  countryCode?: string;
  city?: string;
  phoneNumber?: string;
  linkedinProfile?: string;
  portfolioUrl?: string;
  expectedSalary?: number;
  availability: Availability;
  preferredJobType: JobType[];
  resume: string;
  createdAt: string;
  updatedAt: string;
};

type Education = {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
};

type JobApplication = {
  id: string;
  jobPostId: string;
  status: ApplicationStatus;
  coverLetter?: string;
  createdAt: string;
  updatedAt: string;
  jobPost: {
    id: string;
    jobTitle: string;
    location: string;
    employmentType: string;
    status: string;
  };
};

const CandidateDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const candidateId = params.id as string;

  const [candidate, setCandidate] = useState<JobSeeker | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formater la disponibilité pour affichage
  const formatAvailability = (availability: Availability) => {
    switch (availability) {
      case "IMMEDIATE":
        return "Immédiate";
      case "ONE_WEEK":
        return "Une semaine";
      case "TWO_WEEKS":
        return "Deux semaines";
      case "ONE_MONTH":
        return "Un mois";
      case "MORE_THAN_ONE_MONTH":
        return "Plus d'un mois";
      default:
        // return availability.replace("_", " ");
        return availability;
    }
  };

  // Formater le type d'emploi pour affichage
  const formatJobType = (jobType: JobType) => {
    switch (jobType) {
      case "FULL_TIME":
        return "Temps plein";
      case "PART_TIME":
        return "Temps partiel";
      case "CONTRACT":
        return "Contrat";
      case "FREELANCE":
        return "Freelance";
      case "INTERNSHIP":
        return "Stage";
      default:
        // return jobType.replace("_", " ");
        return jobType;
    }
  };

  // Formater le statut de candidature pour affichage
  const formatApplicationStatus = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "En attente";
      case "REVIEWED":
        return "Examinée";
      case "SHORTLISTED":
        return "Présélectionné";
      case "INTERVIEWED":
        return "Entretien effectué";
      case "ACCEPTED":
        return "Acceptée";
      case "REJECTED":
        return "Refusée";
      default:
        // return status.replace("_", " ");
        return status;
    }
  };

  // Obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "REVIEWED":
        return "bg-blue-100 text-blue-800";
      case "SHORTLISTED":
        return "bg-purple-100 text-purple-800";
      case "INTERVIEWED":
        return "bg-indigo-100 text-indigo-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "REJECTED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Charger les données du candidat
  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/candidates/${candidateId}`);

        if (!response.ok) {
          throw new Error("Unable to retrieve candidate data");
        }

        const data = await response.json();
        setCandidate(data.candidate);
        setApplications(data.applications || []);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchCandidate();
    }
  }, [candidateId]);

  // Télécharger le CV
  const downloadResume = () => {
    if (candidate?.resume) {
      window.open(candidate.resume, "_blank");
    }
  };

  // Contacter le candidat
  const contactCandidate = () => {
    if (candidate?.email) {
      window.location.href = `mailto:${candidate.email}`;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading candidate information...</p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p>{error || "Candidate not found"}</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => router.push("/company/candidates")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to the list of candidates
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Button
        variant="outline"
        className="mb-6"
        onClick={() => router.push("/company/candidates")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to the list of candidates
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne de gauche - Informations de base */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {candidate.firstName} {candidate.lastName}
                  </CardTitle>
                  <p className="text-gray-500">{candidate.title}</p>
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {candidate.experience}{" "}
                  {candidate.experience > 1 ? "years" : "year"} of experience
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Informations de contact */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">
                    Contact
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-gray-500" />
                      <a
                        href={`mailto:${candidate.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {candidate.email}
                      </a>
                    </div>

                    {candidate.phoneNumber && (
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <a
                          href={`tel:${candidate.phoneNumber}`}
                          className="text-blue-600 hover:underline"
                        >
                          {candidate.phoneNumber}
                        </a>
                      </div>
                    )}

                    {(candidate.city || candidate.countryCode) && (
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          {candidate.city && candidate.countryCode
                            ? `${candidate.city}, ${candidate.countryCode}`
                            : candidate.city || candidate.countryCode}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Liens */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">
                    Links
                  </h3>
                  <div className="space-y-2">
                    {candidate.linkedinProfile && (
                      <div className="flex items-center text-sm">
                        <Linkedin className="h-4 w-4 mr-2 text-gray-500" />
                        <a
                          href={candidate.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn profile
                        </a>
                      </div>
                    )}

                    {candidate.portfolioUrl && (
                      <div className="flex items-center text-sm">
                        <Globe className="h-4 w-4 mr-2 text-gray-500" />
                        <a
                          href={candidate.portfolioUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Portfolio
                        </a>
                      </div>
                    )}

                    <div className="flex items-center text-sm">
                      <Download className="h-4 w-4 mr-2 text-gray-500" />
                      <button
                        onClick={downloadResume}
                        className="text-blue-600 hover:underline"
                      >
                        Download resume
                      </button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Disponibilité et préférences */}
                <div>
                  <h3 className="font-medium text-sm text-gray-500 mb-2">
                    Availability and preferences
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>
                        Availability:{" "}
                        {formatAvailability(candidate.availability)}
                      </span>
                    </div>

                    <div className="flex items-start text-sm">
                      <Briefcase className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <div>
                        <span className="block mb-1">
                          Types of employment sought:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {candidate.preferredJobType.map((jobType) => (
                            <span
                              key={jobType}
                              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
                            >
                              {formatJobType(jobType)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {candidate.expectedSalary && (
                      <div className="flex items-center text-sm">
                        <Tag className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          Expected salary:{" "}
                          {candidate.expectedSalary.toLocaleString()} €/an
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="space-y-2">
                  <Button className="w-full" onClick={contactCandidate}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact by email
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={downloadResume}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonnes de droite - Onglets de profil */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="applications">
                Applications ({applications.length})
              </TabsTrigger>
            </TabsList>

            {/* Onglet Profil */}
            <TabsContent value="profile">
              <div className="space-y-6">
                {/* À propos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-line">{candidate.about}</p>
                  </CardContent>
                </Card>

                {/* Compétences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-blue-50 hover:bg-blue-100 text-blue-700"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Langues */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Languages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {candidate.languages.map((language) => (
                        <Badge
                          key={language}
                          variant="secondary"
                          className="bg-green-50 hover:bg-green-100 text-green-700"
                        >
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Formation */}
                {candidate.education.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {candidate.education.map((education, index) => (
                          <div
                            key={education.id}
                            className={index !== 0 ? "pt-4 border-t" : ""}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">
                                  {education.degree} in {education.fieldOfStudy}
                                </h3>
                                <p className="text-gray-600">
                                  {education.institution}
                                </p>
                              </div>
                              <div className="text-sm text-gray-500">
                                {new Date(education.startDate).getFullYear()} -{" "}
                                {education.endDate
                                  ? new Date(education.endDate).getFullYear()
                                  : "Présent"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Onglet Candidatures */}
            <TabsContent value="applications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  {applications.length === 0 ? (
                    <p className="text-center text-gray-500 py-6">
                      This candidate has not yet applied to your job offers.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((application, index) => (
                        <div
                          key={application.id}
                          className={index !== 0 ? "pt-4 border-t" : ""}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">
                                {application.jobPost.jobTitle}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {application.jobPost.location} •{" "}
                                {application.jobPost.employmentType}
                              </p>
                            </div>
                            <div>
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  application.status
                                )}`}
                              >
                                {formatApplicationStatus(application.status)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                            <span>
                              Application sent on{" "}
                              {new Date(
                                application.createdAt
                              ).toLocaleDateString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/company/applications/${application.id}`
                                )
                              }
                            >
                              <MessageCircle className="mr-1 h-3 w-3" />
                              See details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailPage;
