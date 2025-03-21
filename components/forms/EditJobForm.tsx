"use client";

import { countryList } from "@/app/utils/countriesList";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { UploadDropzone } from "../general/UploadThingReExport";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "@/app/utils/zodSchemas";
import { SalaryRangeSelector } from "../general/SalaryRangeSelector";
import JobDescriptionEditor from "../richTextEditor/JobDescriptionEditor";
import BenefitsSelector from "../general/BenefitsSelector";
import { useRouter } from "next/navigation";

interface iAppProps {
  jobPost: {
    jobTitle: string;
    id: string;
    employmentType: string;
    location: string;
    salaryFrom: number;
    salaryTo: number;
    jobDescription: string;
    benefits: string[];
    listingDuration: number;
    company: {
      location: string;
      name: string;
      logo: string;
      website: string;
      xAccount: string | null;
      about: string;
    };
  };
}

const DEBUG = process.env.DEBUG_MODE === "true";

export function EditJobForm({ jobPost }: iAppProps) {
  if (DEBUG) console.log("EditJobForm component rendered");
  // const [pending, setPending] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: jobPost.benefits,
      companyDescription: jobPost.company.about,
      companyLocation: jobPost.company.location,
      companyLogo: jobPost.company.logo,
      companyName: jobPost.company.name,
      companyWebsite: jobPost.company.website,
      companyXAccount: jobPost.company.xAccount || "",
      employmentType: jobPost.employmentType,
      jobDescription: jobPost.jobDescription,
      jobTitle: jobPost.jobTitle,
      location: jobPost.location,
      salaryFrom: jobPost.salaryFrom,
      salaryTo: jobPost.salaryTo,
      listingDuration: jobPost.listingDuration,
    },
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    if (DEBUG) console.log("onSubmit called", values);
    try {
      // Réinitialiser les états d'erreur
      setSubmitError(null);
      setIsSubmitting(true);

      // Log les données avant envoi (utile pour le débogage)
      if (DEBUG) console.log("Envoi des données au serveur:", values);

      // Import dynamique de l'action serveur
      // Cela permet d'éviter les problèmes de "server component importing client component"
      const { updateJobPost } = await import("@/app/actions");

      // Appel de l'action serveur
      const result = await updateJobPost(values, jobPost.id);
      if (DEBUG) console.log("Résultat de l'action serveur:", result);

      // Traitement du résultat
      if (result.success) {
        toast.success("Job Post updated successfully!");

        // Wait for toast to display before redirecting
        setTimeout(() => {
          router.push("/my-jobs");
        }, 1500);
      } else {
        if (result?.error) {
          // Afficher l'erreur retournée par le serveur
          const errorMessage = result.error || "Failed to update job post";
          setSubmitError(errorMessage);
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      // Capturer toute erreur inattendue
      if (DEBUG) console.error("Erreur lors de la soumission:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (DEBUG) console.log("Form errors:", form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (DEBUG) console.log("Form submitted");
          if (DEBUG) console.log("Form is valid:", form.formState.isValid);
          if (DEBUG) console.log("Form errors:", form.formState.errors);
          form.handleSubmit(onSubmit)();
        }}
        // onSubmit={form.handleSubmit(onSubmit)}
        // onSubmit={form.handleSubmit((values) => {
        //   console.log("Form validation passed, submitting...");
        //   onSubmit(values);
        // })}
        className="col-span-1   lg:col-span-2  flex flex-col gap-8"
      >
        {/* Afficher les erreurs de soumission en haut du formulaire */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
            <p className="font-medium">Error submitting form</p>
            <p>{submitError}</p>
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Job Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Employment Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Employment Type</SelectLabel>
                          <SelectItem value="full-time">Full Time</SelectItem>
                          <SelectItem value="part-time">Part Time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">Worldwide / Remote</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.code}>
                              <div className="flex flex-row justify-between items-center w-full">
                                <Image
                                  src={country.flagEmoji}
                                  width={32}
                                  height={32}
                                  alt={country.name}
                                />
                                <span className="pl-2">{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={30000}
                    maxSalary={1000000}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.salaryFrom?.message ||
                    form.formState.errors.salaryTo?.message}
                </FormMessage>
              </FormItem>
            </div>

            <FormField
              control={form.control}
              name="jobDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <JobDescriptionEditor field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="benefits"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Benefits</FormLabel>
                  <FormControl>
                    <BenefitsSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Company Name" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Worldwide</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">Worldwide</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Location</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.code}>
                              <div className="flex flex-row justify-between items-center w-full">
                                <img
                                  src={country.flagEmoji}
                                  className="h-8 w-8"
                                />

                                <span className="pl-2">{country.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <div className="flex ">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          https://
                        </span>
                        <Input
                          {...field}
                          placeholder="Company Website"
                          className="rounded-l-none"
                          disabled
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyXAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company X Account</FormLabel>
                    <FormControl>
                      <div className="flex ">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          @
                        </span>
                        <Input
                          {...field}
                          disabled
                          placeholder="Company X Account"
                          className="rounded-l-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="companyDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Company Description"
                      className="min-h-[120px]"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt="Company Logo"
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 "
                            disabled
                            onClick={() => field.onChange("")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            toast.success("Logo uploaded successfully!");
                          }}
                          onUploadError={() => {
                            toast.error(
                              "Something went wrong. Please try again."
                            );
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button
          type="submit"
          className="w-full"
          // disabled={isSubmitting || !form.formState.isValid}
          // disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
