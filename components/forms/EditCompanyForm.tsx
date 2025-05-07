// "use client";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";
// import { XIcon } from "lucide-react";
// import { toast } from "sonner";
// import { companySchema } from "@/app/utils/zodSchemas";
// import { useState, useEffect } from "react";
// import { updateCompany, getCompanyProfile } from "@/app/actions";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { countryList } from "@/app/utils/countriesList";
// import { UploadDropzone } from "@/components/general/UploadThingReExport";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import { COMPANY_SIZES, INDUSTRIES } from "@/lib/companyUtils";
// import { EditCompanyFormProps } from "@/app/types/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Skeleton } from "../ui/skeleton";

// export default function EditCompanyForm({ company }: EditCompanyFormProps) {
//   const [loading, setLoading] = useState(true);
//   const [newLanguage, setNewLanguage] = useState("");
//   const [pending, setPending] = useState(false);

//   const router = useRouter();

//   const form = useForm<z.infer<typeof companySchema>>({
//     resolver: zodResolver(companySchema),
//     defaultValues: company?.Company
//       ? {
//           ...company.Company,
//           website: company.Company.website ?? "",
//           xAccount: company.Company.xAccount ?? "",
//           industry: company.Company.industry ?? "",
//           companySize: company.Company.companySize ?? undefined,
//           countryCode: company.Company.countryCode ?? "",
//           city: company.Company.city ?? "",
//           phoneNumber: company.Company.phoneNumber ?? "",
//           linkedinProfile: company.Company.linkedinProfile ?? "",
//         }
//       : undefined,
//   });

//   // Fetch company data when component mounts
//   useEffect(() => {
//     if (!company || !company.Company) return;

//     async function fetchCompanyData() {
//       try {
//         setLoading(true);
//         const companyData = await getCompanyProfile();

//         if (companyData) {
//           // Populate form with existing data
//           form.reset({
//             name: company.Company?.name,
//             location: company.Company?.location,
//             logo: company.Company?.logo,
//             about: company.Company?.about,
//             website: company.Company?.website || "",
//             xAccount: company.Company?.xAccount || "",
//             industry: company.Company?.industry || "",
//             companySize: company.Company?.companySize || "",
//             countryCode: company.Company?.countryCode || "",
//             city: company.Company?.city || "",
//             phoneNumber: company.Company?.phoneNumber || "",
//             linkedinProfile: company.Company?.linkedinProfile || "",
//             languages: company.Company?.languages || [],
//           });
//         } else {
//           toast.error("Failed to load company data.");
//           router.push("/find-job");
//         }
//       } catch (error) {
//         console.error("Error fetching company data:", error);
//         toast.error("Failed to load company data.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCompanyData();
//   }, [company, form, router]);

//   // const addLanguage = () => {
//   //   if (newLanguage && !form.getValues("languages").includes(newLanguage)) {
//   //     form.setValue("languages", [...form.getValues("languages"), newLanguage]);
//   //     setNewLanguage("");
//   //   }
//   // };

//   const addLanguage = () => {
//     const currentLanguages = form.getValues("languages") || [];
//     if (newLanguage && !currentLanguages.includes(newLanguage)) {
//       form.setValue("languages", [...currentLanguages, newLanguage], {
//         shouldValidate: true,
//       });
//       setNewLanguage("");
//     }
//   };

//   async function onSubmit(values: z.infer<typeof companySchema>) {
//     try {
//       setPending(true);
//       const result = await updateCompany(values);

//       if (result.success) {
//         toast.success("Company profile updated successfully!");
//         router.refresh(); // Efface le cache et recharge les nouvelles données
//         setTimeout(() => {
//           router.push("/company/profile/");
//         }, 1000);
//       } else {
//         toast.error("Failed to update company profile.");
//       }
//     } catch (error) {
//       console.error(error);
//       if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } finally {
//       setPending(false);
//     }
//   }

//   // if (loading) {
//   //   return (
//   //     <div className="flex justify-center items-center h-64">
//   //       <div className="text-center">Loading company data...</div>
//   //     </div>
//   //   );
//   // }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Skeleton className="w-full h-full" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-5xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-xl text-center uppercase">
//           Edit Company Profile
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Basic Info Section */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter company name" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {/* Industry and Company Size */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="industry"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Industry</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select industry" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {INDUSTRIES.map((industry) => (
//                           <SelectItem key={industry} value={industry}>
//                             {industry}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="companySize"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Size</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select company size" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {COMPANY_SIZES.map((size) => (
//                           <SelectItem key={size} value={size}>
//                             {size} employees
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Full width for about section */}
//             <div className="grid grid-cols-1">
//               <FormField
//                 control={form.control}
//                 name="about"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>About</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Tell us about your company..."
//                         className="resize-none"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {/* Location and Country Code */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Location" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectLabel>Worldwide</SelectLabel>
//                           <SelectItem value="worldwide">
//                             <span>🌍</span>
//                             <span className="pl-2">Worldwide / Remote</span>
//                           </SelectItem>
//                         </SelectGroup>
//                         <SelectGroup>
//                           <SelectLabel>Location</SelectLabel>
//                           {countryList.map((country) => (
//                             <SelectItem value={country.name} key={country.code}>
//                               <div className="flex flex-row justify-between items-center w-full">
//                                 <Image
//                                   src={country.flagEmoji}
//                                   width={32}
//                                   height={32}
//                                   alt={country.name}
//                                 />
//                                 <span className="pl-2">{country.name}</span>
//                               </div>
//                             </SelectItem>
//                           ))}
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               {/* <FormField
//                 control={form.control}
//                 name="countryCode"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Country Code</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="e.g., FR, US"
//                         maxLength={2}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               /> */}

//               <FormField
//                 control={form.control}
//                 name="city"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>City</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Enter city" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* City and Phone Number */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

//             {/* Two column layout for website and X account */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="website"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Website</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="https://your-company.com"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="xAccount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>X (Twitter) Account</FormLabel>
//                     <FormControl>
//                       <Input placeholder="@yourcompany" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* LinkedIn Profile */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="linkedinProfile"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>LinkedIn Profile</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="https://linkedin.com/company/..."
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="phoneNumber"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone Number</FormLabel>
//                     <FormControl>
//                       <Input type="tel" placeholder="+1234567890" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Languages */}
//             <div className="space-y-2">
//               <FormLabel>Working Languages</FormLabel>
//               <div className="flex gap-2">
//                 <Input
//                   value={newLanguage}
//                   onChange={(e) => setNewLanguage(e.target.value)}
//                   placeholder="Add a language"
//                 />
//                 <Button type="button" onClick={addLanguage}>
//                   Add
//                 </Button>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {form.watch("languages").map((language, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-100 px-3 py-1 rounded-full flex items-center dark:bg-gray-700 dark:text-white"
//                   >
//                     {language}
//                     <button
//                       type="button"
//                       className="ml-2 text-red-500"
//                       onClick={() => {
//                         const languages = form.getValues("languages");
//                         form.setValue(
//                           "languages",
//                           languages.filter((_, i) => i !== index)
//                         );
//                       }}
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//               <FormMessage>
//                 {form.formState.errors.languages?.message}
//               </FormMessage>
//             </div>

//             {/* Company Logo */}
//             <FormField
//               control={form.control}
//               name="logo"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company Logo</FormLabel>
//                   <FormControl>
//                     <div>
//                       {field.value ? (
//                         <div className="relative w-fit">
//                           <Image
//                             src={field.value}
//                             alt="Company Logo"
//                             width={100}
//                             height={100}
//                             className="rounded-lg"
//                           />
//                           <Button
//                             type="button"
//                             variant="destructive"
//                             size="icon"
//                             className="absolute -top-2 -right-2"
//                             onClick={() => field.onChange("")}
//                             aria-label="Supprimer le logo"
//                           >
//                             <XIcon className="h-4 w-4" />
//                           </Button>
//                         </div>
//                       ) : (
//                         <UploadDropzone
//                           endpoint="imageUploader"
//                           onClientUploadComplete={(res) => {
//                             field.onChange(res[0].url);
//                             toast.success("Logo uploaded successfully!");
//                           }}
//                           onUploadError={() => {
//                             toast.error(
//                               "Something went wrong. Please try again."
//                             );
//                           }}
//                           className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
//                         />
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex gap-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => router.push("/company/profile")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" className="w-full" disabled={pending}>
//                 {pending ? "Saving..." : "Save Changes"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }

// --------------------------------------------------------
// 07/05/2025 compatible next-intl

"use client";
import { useTranslations } from "next-intl";
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
import { useState, useEffect } from "react";
import { updateCompany, getCompanyProfile } from "@/app/actions";
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
import { EditCompanyFormProps } from "@/app/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Skeleton } from "../ui/skeleton";

export default function EditCompanyForm({ company }: EditCompanyFormProps) {
  // Initialize translations
  const t = useTranslations("company.editProfile");
  const tCommon = useTranslations("common");
  const tCountries = useTranslations("countries");
  const tIndustries = useTranslations("industries");

  const [loading, setLoading] = useState(true);
  const [newLanguage, setNewLanguage] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof companySchema>>({
    resolver: zodResolver(companySchema),
    defaultValues: company?.Company
      ? {
          ...company.Company,
          website: company.Company.website ?? "",
          xAccount: company.Company.xAccount ?? "",
          industry: company.Company.industry ?? "",
          companySize: company.Company.companySize ?? undefined,
          countryCode: company.Company.countryCode ?? "",
          city: company.Company.city ?? "",
          phoneNumber: company.Company.phoneNumber ?? "",
          linkedinProfile: company.Company.linkedinProfile ?? "",
        }
      : undefined,
  });

  // Fetch company data when component mounts
  useEffect(() => {
    if (!company || !company.Company) return;

    async function fetchCompanyData() {
      try {
        setLoading(true);
        const companyData = await getCompanyProfile();

        if (companyData) {
          // Populate form with existing data
          form.reset({
            name: company.Company?.name,
            location: company.Company?.location,
            logo: company.Company?.logo,
            about: company.Company?.about,
            website: company.Company?.website || "",
            xAccount: company.Company?.xAccount || "",
            industry: company.Company?.industry || "",
            companySize: company.Company?.companySize || "",
            countryCode: company.Company?.countryCode || "",
            city: company.Company?.city || "",
            phoneNumber: company.Company?.phoneNumber || "",
            linkedinProfile: company.Company?.linkedinProfile || "",
            languages: company.Company?.languages || [],
          });
        } else {
          toast.error(t("failedToLoad"));
          router.push("/find-job");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        toast.error(t("failedToLoad"));
      } finally {
        setLoading(false);
      }
    }

    fetchCompanyData();
  }, [company, form, router, t]);

  const addLanguage = () => {
    const currentLanguages = form.getValues("languages") || [];
    if (newLanguage && !currentLanguages.includes(newLanguage)) {
      form.setValue("languages", [...currentLanguages, newLanguage], {
        shouldValidate: true,
      });
      setNewLanguage("");
    }
  };

  async function onSubmit(values: z.infer<typeof companySchema>) {
    try {
      setPending(true);
      const result = await updateCompany(values);

      if (result.success) {
        toast.success(t("updateSuccess"));
        router.refresh(); // Efface le cache et recharge les nouvelles données
        setTimeout(() => {
          router.push("/company/profile/");
        }, 1000);
      } else {
        toast.error(t("updateFailed"));
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
        toast.error(t("somethingWentWrong"));
      }
    } finally {
      setPending(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl text-center uppercase">
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("companyName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterCompanyName")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Industry and Company Size */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("industry")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectIndustry")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {INDUSTRIES.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {tIndustries(industry)}
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
                    <FormLabel>{t("companySize")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectCompanySize")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {COMPANY_SIZES.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size} {t("employees")}
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
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="about"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("about")}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("aboutPlaceholder")}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Location and Country Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("location")}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectLocation")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("worldwide")}</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">{t("worldwideRemote")}</span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>{t("location")}</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.code}>
                              <div className="flex flex-row justify-between items-center w-full">
                                <Image
                                  src={country.flagEmoji}
                                  width={32}
                                  height={32}
                                  alt={tCountries(country.name)}
                                />
                                <span className="pl-2">
                                  {tCountries(country.name)}
                                </span>
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

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("city")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("enterCity")} {...field} />
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
                    <FormLabel>{t("website")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("websitePlaceholder")} {...field} />
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
                    <FormLabel>{t("xAccount")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("xAccountPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* LinkedIn Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="linkedinProfile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("linkedinProfile")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("linkedinPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phoneNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder={t("phoneNumberPlaceholder")}
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
              <FormLabel>{t("workingLanguages")}</FormLabel>
              <div className="flex gap-2">
                <Input
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder={t("addLanguagePlaceholder")}
                />
                <Button type="button" onClick={addLanguage}>
                  {t("addButton")}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.watch("languages").map((language, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full flex items-center dark:bg-gray-700 dark:text-white"
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
                      aria-label={t("removeLanguage", { language })}
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

            {/* Company Logo */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("companyLogo")}</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt={t("companyLogoAlt")}
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2"
                            onClick={() => field.onChange("")}
                            aria-label={t("removeLogo")}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            toast.success(t("logoUploadSuccess"));
                          }}
                          onUploadError={() => {
                            toast.error(t("uploadError"));
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
                onClick={() => router.push("/company/profile")}
              >
                {tCommon("cancel")}
              </Button>
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? t("saving") : t("saveChanges")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
