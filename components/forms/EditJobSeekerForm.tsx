"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { jobSeekerSchema } from "@/app/utils/zodSchemas";

import * as z from "zod";
import { UploadDropzone } from "@/components/general/UploadThingReExport";
import { toast } from "sonner";
import { XIcon, Loader2 } from "lucide-react";

import PDFImage from "@/public/pdf.png";
import Image from "next/image";

// import { updateJobSeeker, getJobSeekerProfile } from "@/app/actions";
import { getJobSeekerProfile, updateJobSeeker } from "@/app/actions";

import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Availability, JobType } from "@prisma/client";
import { EditJobSeekerFormProps } from "@/app/types/types";

const EditJobSeekerForm = ({ jobSeeker }: EditJobSeekerFormProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const router = useRouter();

  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: jobSeeker?.JobSeeker
      ? {
          ...jobSeeker.JobSeeker,
          countryCode: jobSeeker.JobSeeker.countryCode ?? undefined,
          city: jobSeeker.JobSeeker.city ?? undefined,
          phoneNumber: jobSeeker.JobSeeker.phoneNumber ?? undefined,
          linkedinProfile: jobSeeker.JobSeeker.linkedinProfile ?? undefined,
          portfolioUrl: jobSeeker.JobSeeker.portfolioUrl ?? undefined,
          expectedSalary: jobSeeker.JobSeeker.expectedSalary ?? undefined,
        }
      : undefined,
  });

  useEffect(() => {
    if (!jobSeeker || !jobSeeker.JobSeeker) return;

    const fetchJobSeekerData = async () => {
      try {
        setIsLoading(true);
        const profile = await getJobSeekerProfile();

        if (profile) {
          // Update form with existing data
          form.reset({
            firstName: profile.JobSeeker?.firstName,
            lastName: profile.JobSeeker?.lastName,
            email: profile.JobSeeker?.email,
            about: profile.JobSeeker?.about || "",
            title: profile.JobSeeker?.title || "",
            experience: profile.JobSeeker?.experience || 0,
            skills: profile.JobSeeker?.skills || [],
            languages: profile.JobSeeker?.languages || [],
            city: profile.JobSeeker?.city || "",
            countryCode: profile.JobSeeker?.countryCode || "",
            phoneNumber: profile.JobSeeker?.phoneNumber || "",
            linkedinProfile: profile.JobSeeker?.linkedinProfile || "",
            portfolioUrl: profile.JobSeeker?.portfolioUrl || "",
            availability:
              profile.JobSeeker?.availability || Availability.IMMEDIATE,
            preferredJobType: profile.JobSeeker?.preferredJobType || [
              JobType.FULL_TIME,
            ],
            expectedSalary: profile.JobSeeker?.expectedSalary || 0,
            resume: profile.JobSeeker?.resume || "",
          });
        } else {
          toast.error("Failed to load profile data");
          router.push("/find-job");
        }
      } catch (error) {
        console.error("Error fetching job seeker profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobSeekerData();
  }, [jobSeeker, form, router]);

  async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      const result = await updateJobSeeker(values);

      if (result.success) {
        toast.success("Profile updated successfully!");
        router.refresh(); // Efface le cache et recharge les nouvelles données
        // Wait for toast to display before redirecting
        setTimeout(() => {
          router.push("/job-seeker/profile");
        }, 1000);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  const addSkill = () => {
    if (newSkill && !form.getValues("skills").includes(newSkill)) {
      form.setValue("skills", [...form.getValues("skills"), newSkill]);
      setNewSkill("");
    }
  };

  const addLanguage = () => {
    if (newLanguage && !form.getValues("languages").includes(newLanguage)) {
      form.setValue("languages", [...form.getValues("languages"), newLanguage]);
      setNewLanguage("");
    }
  };

  const handleJobTypeChange = (checked: boolean, value: string) => {
    const currentValues = form.getValues("preferredJobType");
    let newValues;

    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter((type) => type !== value);
    }

    form.setValue("preferredJobType", newValues, { shouldValidate: true });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading profile data...</span>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center uppercase">
          Edit JobSeeker Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      readOnly
                      className="bg-gray-100 dark:bg-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Skills</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                />
                <Button type="button" onClick={addSkill}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("skills").map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-white"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => {
                        const skills = form.getValues("skills");
                        form.setValue(
                          "skills",
                          skills.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage>{form.formState.errors.skills?.message}</FormMessage>
            </div>

            <div className="space-y-2">
              <FormLabel>Languages</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language"
                />
                <Button type="button" onClick={addLanguage}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("languages").map((language, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full dark:bg-gray-700 dark:text-white"
                  >
                    {language}
                    <button
                      type="button"
                      className="ml-2 text-red-800"
                      onClick={() => {
                        const languages = form.getValues("languages");
                        form.setValue(
                          "languages",
                          languages.filter((_, i) => i !== index)
                        );
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage>
                {form.formState.errors.languages?.message}
              </FormMessage>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input maxLength={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn Profile</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="portfolioUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio URL</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(Availability).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {key.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredJobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Job Types</FormLabel>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(JobType).map(([key, value]) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox
                          id={value}
                          checked={field.value?.includes(value)}
                          onCheckedChange={(checked: boolean) => {
                            handleJobTypeChange(checked, value);
                          }}
                        />
                        <label
                          htmlFor={value}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {key.replace(/_/g, " ")}
                        </label>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedSalary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume (PDF)</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <a
                            href={field.value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={PDFImage}
                              alt="Resume PDF"
                              width={100}
                              height={100}
                              className="rounded-lg"
                            />
                          </a>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2"
                            onClick={() => field.onChange("")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="resumeUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            toast.success("Resume uploaded successfully!");
                          }}
                          onUploadError={() => {
                            toast.error(
                              "Something went wrong. Please try again."
                            );
                          }}
                          className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => router.push("/job-seeker/profile/")}
                disabled={pending}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditJobSeekerForm;
