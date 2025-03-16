"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { companySchema } from "@/app/utils/zodSchemas";
import { useState } from "react";
import { createCompany } from "@/app/actions";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countryList } from "@/app/utils/countriesList";
import { UploadDropzone } from "@/components/general/UploadThingReExport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { COMPANY_SIZES, INDUSTRIES } from "@/lib/companyUtils";

export default function CompanyForm() {
  const [newLanguage, setNewLanguage] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      about: "",
      location: "",
      website: "",
      xAccount: "",
      logo: "",
      name: "",
      industry: "",
      companySize: "",
      countryCode: "",
      city: "",
      phoneNumber: "",
      linkedinProfile: "",
      languages: [],
    },
  });

  const addLanguage = () => {
    if (newLanguage && !form.getValues("languages").includes(newLanguage)) {
      form.setValue("languages", [...form.getValues("languages"), newLanguage]);
      setNewLanguage("");
    }
  };

  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      const result = await createCompany(values);
      if (result.success) {
        toast.success("Profile created successfully!");

        // Attendre un peu pour laisser le toast s'afficher
        setTimeout(() => {
          router.push("/find-job");
        }, 1000);
      } else {
        toast.error("Failed to create profile");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center uppercase">
          Create Company Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Industry and Company Size   */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
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
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} employees
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Full width for about section */}
            <div className="grid grid-cols-1 ">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your company..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Location and Country Code  */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                {/* <span>{country.flagEmoji}</span> */}
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

              {/* <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., FR, US"
                        maxLength={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* City and phone Number*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Two column layout for website and X account */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://your-company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="xAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>X (Twitter) Account</FormLabel>
                    <FormControl>
                      <Input placeholder="@yourcompany" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* linkedin Profile*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://linkedin.com/company/..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Languages */}
            <div className="space-y-2">
              <FormLabel>Working Languages</FormLabel>
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
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center dark:bg-gray-700 dark:text-white" // Ajoutez des styles pour le mode sombre"
                  >
                    {language}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
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

            {/* Full width for logo upload */}
            <FormField
              control={form.control}
              name="logo"
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
                            onClick={() => field.onChange("")}
                            aria-label="Supprimer le logo"
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
                          className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
