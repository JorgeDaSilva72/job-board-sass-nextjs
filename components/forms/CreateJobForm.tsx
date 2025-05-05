// "use client";

// import { countryList } from "@/app/utils/countriesList";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { XIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import { toast } from "sonner";
// import { UploadDropzone } from "../general/UploadThingReExport";
// import { useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { jobSchema } from "@/app/utils/zodSchemas";
// import { SalaryRangeSelector } from "../general/SalaryRangeSelector";
// import JobDescriptionEditor from "../richTextEditor/JobDescriptionEditor";
// import BenefitsSelector from "../general/BenefitsSelector";
// import { JobListingDurationSelector } from "../general/JobListingDurationSelector";
// import { createJob } from "@/app/actions";
// // import {
// //   JobPostStatus,
// //   ExperienceLevel,
// //   EducationLevel,
// //   JobType,
// // } from "@prisma/client";
// // import { Checkbox } from "../ui/checkbox";
// // import { languagesList, skillsList } from "@/lib/data";
// // import MultiSelect from "../general/MultiSelect";
// // import DatePicker from "../general/DatePicker";

// interface CreateJobFormProps {
//   companyName: string;
//   companyLocation: string;
//   companyAbout: string;
//   companyLogo: string;
//   companyXAccount: string | null;
//   companyWebsite: string;
// }

// interface CreateJobActionResultProps {
//   success: boolean;
//   error?: string;
//   data?: {
//     redirectUrl: string;
//   };
// }

// export function CreateJobForm({
//   companyAbout,
//   companyLocation,
//   companyLogo,
//   companyXAccount,
//   companyName,
//   companyWebsite,
// }: CreateJobFormProps) {
//   const form = useForm<z.infer<typeof jobSchema>>({
//     resolver: zodResolver(jobSchema),
//     defaultValues: {
//       benefits: [],
//       companyDescription: companyAbout,
//       companyLocation: companyLocation,
//       companyName: companyName,
//       companyWebsite: companyWebsite,
//       companyXAccount: companyXAccount || "",
//       employmentType: "",
//       jobDescription: "",
//       jobTitle: "",
//       location: "",
//       salaryFrom: 0,
//       salaryTo: 0,
//       companyLogo: companyLogo,
//       listingDuration: 30,
//       // status: JobPostStatus.DRAFT,
//       // requiredSkills: [],
//       // requiredLanguages: [],
//       // experienceLevel: ExperienceLevel.ENTRY,
//       // educationLevel: EducationLevel.BACHELOR,
//       // jobType: [],
//       // remote: false,
//       // currency: "USD",
//       // deadline: undefined,
//     },
//   });

//   const [pending, setPending] = useState(false);
//   const readOnly = true;

//   async function onSubmit(values: z.infer<typeof jobSchema>) {
//     try {
//       setPending(true);
//       const result = (await createJob(values)) as CreateJobActionResultProps;
//       // if (result.success) {
//       //   toast.success("Job posting created successfully!");
//       // }
//       if (!result.success) {
//         toast.error(result.error || "An error occured");
//         return;
//       }

//       if (result.data?.redirectUrl) {
//         // Rediriger côté client

//         window.location.href = result.data.redirectUrl;
//       }
//     } catch (error) {
//       console.error("Error:", error);

//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setPending(false);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="col-span-1   lg:col-span-2  flex flex-col gap-8"
//       >
//         <Card>
//           <CardHeader>
//             <CardTitle>Job Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="jobTitle"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Job Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Job Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="employmentType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Employment Type</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Employment Type" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectLabel>Employment Type</SelectLabel>
//                           <SelectItem value="full-time">Full Time</SelectItem>
//                           <SelectItem value="part-time">Part Time</SelectItem>
//                           <SelectItem value="contract">Contract</SelectItem>
//                           <SelectItem value="internship">Internship</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
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

//               <FormItem>
//                 <FormLabel>Salary Range</FormLabel>
//                 <FormControl>
//                   <SalaryRangeSelector
//                     control={form.control}
//                     minSalary={10000}
//                     maxSalary={1000000}
//                   />
//                 </FormControl>
//                 <FormMessage>
//                   {form.formState.errors.salaryFrom?.message ||
//                     form.formState.errors.salaryTo?.message}
//                 </FormMessage>
//               </FormItem>
//             </div>

//             <FormField
//               control={form.control}
//               name="jobDescription"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Job Description</FormLabel>
//                   <FormControl>
//                     <JobDescriptionEditor field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="benefits"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Benefits</FormLabel>
//                   <FormControl>
//                     <BenefitsSelector field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         {/* <Card>
//           <CardHeader>
//             <CardTitle>Additional Job Details</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="experienceLevel"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Experience Level</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Experience Level" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {Object.values(ExperienceLevel).map((level) => (
//                           <SelectItem key={level} value={level}>
//                             {level.replace("_", " ")}
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
//                 name="educationLevel"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Education Level</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Education Level" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {Object.values(EducationLevel).map((level) => (
//                           <SelectItem key={level} value={level}>
//                             {level.replace("_", " ")}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="requiredSkills"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Required Skills</FormLabel>
//                     <FormControl>
//                       <MultiSelect
//                         values={field.value}
//                         onChange={field.onChange}
//                         options={skillsList} // Vous devrez définir cette liste
//                         placeholder="Select required skills"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="requiredLanguages"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Required Languages</FormLabel>
//                     <FormControl>
//                       <MultiSelect
//                         values={field.value}
//                         onChange={field.onChange}
//                         options={languagesList} // Vous devrez définir cette liste
//                         placeholder="Select required languages"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//                 control={form.control}
//                 name="jobType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Job Type</FormLabel>
//                     <FormControl>
//                       <MultiSelect
//                         values={field.value}
//                         onChange={field.onChange}
//                         options={Object.values(JobType).map((type) => ({
//                           label: type.replace("_", " "),
//                           value: type,
//                         }))}
//                         placeholder="Select job types"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//             <FormField
//               control={form.control}
//               name="currency"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Currency</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Currency" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="USD">USD</SelectItem>
//                       <SelectItem value="EUR">EUR</SelectItem>
//                       <SelectItem value="GBP">GBP</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <div className="flex gap-6">
//               <FormField
//                 control={form.control}
//                 name="remote"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-row items-center gap-2">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={field.onChange}
//                       />
//                     </FormControl>
//                     <FormLabel>Remote Position</FormLabel>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="deadline"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Application Deadline</FormLabel>
//                     <FormControl>
//                       <DatePicker
//                         selected={field.value}
//                         onChange={(date) => field.onChange(date)}
//                         minDate={new Date()}
//                         placeholderText="Select deadline (optional)"
//                         className="w-full p-2 border rounded"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="status"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Post Status</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select status" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {Object.values(JobPostStatus).map((status) => (
//                         <SelectItem key={status} value={status}>
//                           {status.replace("_", " ")}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card> */}

//         <Card>
//           <CardHeader>
//             <CardTitle>Company Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="companyName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Company Name"
//                         {...field}
//                         readOnly={readOnly}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="companyLocation"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={readOnly}
//                     >
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
//                             <span className="pl-2">Worldwide</span>
//                           </SelectItem>
//                         </SelectGroup>
//                         <SelectGroup>
//                           <SelectLabel>Location</SelectLabel>
//                           {countryList.map((country) => (
//                             <SelectItem value={country.name} key={country.name}>
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
//             </div>
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="companyWebsite"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Website</FormLabel>
//                     <FormControl>
//                       <div className="flex ">
//                         <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
//                           https://
//                         </span>
//                         <Input
//                           {...field}
//                           placeholder="Company Website"
//                           readOnly={readOnly}
//                           className="rounded-l-none"
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="companyXAccount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company X Account</FormLabel>
//                     <FormControl>
//                       <div className="flex ">
//                         <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
//                           @
//                         </span>
//                         <Input
//                           {...field}
//                           placeholder="Company X Account"
//                           readOnly={readOnly}
//                           className="rounded-l-none"
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="companyDescription"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Company Description"
//                       readOnly={readOnly}
//                       className="min-h-[120px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="companyLogo"
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
//                           {field.value && !readOnly && (
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="icon"
//                               className="absolute -top-2 -right-2 "
//                               onClick={() => field.onChange("")}
//                             >
//                               <XIcon className="h-4 w-4" />
//                             </Button>
//                           )}
//                         </div>
//                       ) : (
//                         <UploadDropzone
//                           endpoint="imageUploader"
//                           onClientUploadComplete={(res) => {
//                             field.onChange(res[0].url);
//                             // toast.success("Logo uploaded successfully!");
//                           }}
//                           onUploadError={() => {
//                             // toast.error(
//                             //   "Something went wrong. Please try again."
//                             // );
//                           }}
//                         />
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Job Listing Duration</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <FormField
//               control={form.control}
//               name="listingDuration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <JobListingDurationSelector field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Button type="submit" className="w-full" disabled={pending}>
//           {pending ? "Submitting..." : "Continue"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// BEGIN

// "use client";

// import { countryList } from "@/app/utils/countriesList";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../ui/form";
// import { Input } from "../ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";
// import { Textarea } from "../ui/textarea";
// import { XIcon } from "lucide-react";
// import { Button } from "../ui/button";
// import Image from "next/image";
// import { toast } from "sonner";
// import { UploadDropzone } from "../general/UploadThingReExport";
// import { useState } from "react";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { jobSchema } from "@/app/utils/zodSchemas";
// import { SalaryRangeSelector } from "../general/SalaryRangeSelector";
// import JobDescriptionEditor from "../richTextEditor/JobDescriptionEditor";
// import BenefitsSelector from "../general/BenefitsSelector";
// import { JobListingDurationSelector } from "../general/JobListingDurationSelector";
// import { createJob } from "@/app/actions";
// // import {
// //   JobPostStatus,
// //   ExperienceLevel,
// //   EducationLevel,
// //   JobType,
// // } from "@prisma/client";
// // import { Checkbox } from "../ui/checkbox";
// // import { languagesList, skillsList } from "@/lib/data";
// // import MultiSelect from "../general/MultiSelect";
// // import DatePicker from "../general/DatePicker";

// interface CreateJobFormProps {
//   companyName: string;
//   companyLocation: string;
//   companyAbout: string;
//   companyLogo: string;
//   companyXAccount: string | null;
//   companyWebsite: string;
// }

// interface CreateJobActionResultProps {
//   success: boolean;
//   error?: string;
//   data?: {
//     redirectUrl: string;
//   };
// }

// export function CreateJobForm({
//   companyAbout,
//   companyLocation,
//   companyLogo,
//   companyXAccount,
//   companyName,
//   companyWebsite,
// }: CreateJobFormProps) {
//   const form = useForm<z.infer<typeof jobSchema>>({
//     resolver: zodResolver(jobSchema),
//     defaultValues: {
//       benefits: [],
//       companyDescription: companyAbout,
//       companyLocation: companyLocation,
//       companyName: companyName,
//       companyWebsite: companyWebsite,
//       companyXAccount: companyXAccount || "",
//       employmentType: "",
//       jobDescription: "",
//       jobTitle: "",
//       location: "",
//       salaryFrom: 0,
//       salaryTo: 0,
//       companyLogo: companyLogo,
//       listingDuration: 30,
//       // status: JobPostStatus.DRAFT,
//       // requiredSkills: [],
//       // requiredLanguages: [],
//       // experienceLevel: ExperienceLevel.ENTRY,
//       // educationLevel: EducationLevel.BACHELOR,
//       // jobType: [],
//       // remote: false,
//       // currency: "USD",
//       // deadline: undefined,
//     },
//   });

//   const [pending, setPending] = useState(false);
//   const readOnly = true;

//   async function onSubmit(values: z.infer<typeof jobSchema>) {
//     try {
//       setPending(true);
//       const result = (await createJob(values)) as CreateJobActionResultProps;
//       // if (result.success) {
//       //   toast.success("Job posting created successfully!");
//       // }
//       if (!result.success) {
//         toast.error(result.error || "An error occured");
//         return;
//       }

//       if (result.data?.redirectUrl) {
//         // Rediriger côté client

//         window.location.href = result.data.redirectUrl;
//       }
//     } catch (error) {
//       console.error("Error:", error);

//       toast.error("Something went wrong. Please try again.");
//     } finally {
//       setPending(false);
//     }
//   }
//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="col-span-1   lg:col-span-2  flex flex-col gap-8"
//       >
//         <Card>
//           <CardHeader>
//             <CardTitle>Job Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="jobTitle"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Job Title</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Job Title" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="employmentType"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Employment Type</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select Employment Type" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         <SelectGroup>
//                           <SelectLabel>Employment Type</SelectLabel>
//                           <SelectItem value="full-time">Full Time</SelectItem>
//                           <SelectItem value="part-time">Part Time</SelectItem>
//                           <SelectItem value="contract">Contract</SelectItem>
//                           <SelectItem value="internship">Internship</SelectItem>
//                         </SelectGroup>
//                       </SelectContent>
//                     </Select>

//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="location"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                     >
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

//               <FormItem>
//                 <FormLabel>Salary Range</FormLabel>
//                 <FormControl>
//                   <SalaryRangeSelector
//                     control={form.control}
//                     minSalary={10000}
//                     maxSalary={1000000}
//                   />
//                 </FormControl>
//                 <FormMessage>
//                   {form.formState.errors.salaryFrom?.message ||
//                     form.formState.errors.salaryTo?.message}
//                 </FormMessage>
//               </FormItem>
//             </div>

//             <FormField
//               control={form.control}
//               name="jobDescription"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Job Description</FormLabel>
//                   <FormControl>
//                     <JobDescriptionEditor field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="benefits"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Benefits</FormLabel>
//                   <FormControl>
//                     <BenefitsSelector field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Company Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="companyName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Company Name"
//                         {...field}
//                         readOnly={readOnly}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="companyLocation"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Location</FormLabel>
//                     <Select
//                       onValueChange={field.onChange}
//                       defaultValue={field.value}
//                       disabled={readOnly}
//                     >
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
//                             <span className="pl-2">Worldwide</span>
//                           </SelectItem>
//                         </SelectGroup>
//                         <SelectGroup>
//                           <SelectLabel>Location</SelectLabel>
//                           {countryList.map((country) => (
//                             <SelectItem value={country.name} key={country.name}>
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
//             </div>
//             <div className="grid md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="companyWebsite"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company Website</FormLabel>
//                     <FormControl>
//                       <div className="flex ">
//                         <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
//                           https://
//                         </span>
//                         <Input
//                           {...field}
//                           placeholder="Company Website"
//                           readOnly={readOnly}
//                           className="rounded-l-none"
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="companyXAccount"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Company X Account</FormLabel>
//                     <FormControl>
//                       <div className="flex ">
//                         <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
//                           @
//                         </span>
//                         <Input
//                           {...field}
//                           placeholder="Company X Account"
//                           readOnly={readOnly}
//                           className="rounded-l-none"
//                         />
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <FormField
//               control={form.control}
//               name="companyDescription"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Company Description"
//                       readOnly={readOnly}
//                       className="min-h-[120px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="companyLogo"
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
//                           {field.value && !readOnly && (
//                             <Button
//                               type="button"
//                               variant="destructive"
//                               size="icon"
//                               className="absolute -top-2 -right-2 "
//                               onClick={() => field.onChange("")}
//                             >
//                               <XIcon className="h-4 w-4" />
//                             </Button>
//                           )}
//                         </div>
//                       ) : (
//                         <UploadDropzone
//                           endpoint="imageUploader"
//                           onClientUploadComplete={(res) => {
//                             field.onChange(res[0].url);
//                             // toast.success("Logo uploaded successfully!");
//                           }}
//                           onUploadError={() => {
//                             // toast.error(
//                             //   "Something went wrong. Please try again."
//                             // );
//                           }}
//                         />
//                       )}
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Job Listing Duration</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <FormField
//               control={form.control}
//               name="listingDuration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <JobListingDurationSelector field={field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <Button type="submit" className="w-full" disabled={pending}>
//           {pending ? "Submitting..." : "Continue"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// BEGIN 05/05/2025 compatible next-intl

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
import { JobListingDurationSelector } from "../general/JobListingDurationSelector";
import { createJob } from "@/app/actions";
import { useTranslations } from "next-intl";

interface CreateJobFormProps {
  companyName: string;
  companyLocation: string;
  companyAbout: string;
  companyLogo: string;
  companyXAccount: string | null;
  companyWebsite: string;
}

interface CreateJobActionResultProps {
  success: boolean;
  error?: string;
  data?: {
    redirectUrl: string;
  };
}

export function CreateJobForm({
  companyAbout,
  companyLocation,
  companyLogo,
  companyXAccount,
  companyName,
  companyWebsite,
}: CreateJobFormProps) {
  const t = useTranslations("CreateJobForm");
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      benefits: [],
      companyDescription: companyAbout,
      companyLocation: companyLocation,
      companyName: companyName,
      companyWebsite: companyWebsite,
      companyXAccount: companyXAccount || "",
      employmentType: "",
      jobDescription: "",
      jobTitle: "",
      location: "",
      salaryFrom: 0,
      salaryTo: 0,
      companyLogo: companyLogo,
      listingDuration: 30,
    },
  });

  const [pending, setPending] = useState(false);
  const readOnly = true;

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      setPending(true);
      const result = (await createJob(values)) as CreateJobActionResultProps;

      if (!result.success) {
        toast.error(result.error || t("errors.submissionError"));
        return;
      }

      if (result.data?.redirectUrl) {
        window.location.href = result.data.redirectUrl;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t("errors.generalError"));
    } finally {
      setPending(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1 lg:col-span-2 flex flex-col gap-8"
      >
        <Card>
          <CardHeader>
            <CardTitle>{t("jobInfo.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("jobInfo.jobTitle")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("jobInfo.jobTitlePlaceholder")}
                        {...field}
                      />
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
                    <FormLabel>{t("jobInfo.employmentType")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("jobInfo.selectEmploymentType")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {t("jobInfo.employmentType")}
                          </SelectLabel>
                          <SelectItem value="full-time">
                            {t("employmentTypes.fullTime")}
                          </SelectItem>
                          <SelectItem value="part-time">
                            {t("employmentTypes.partTime")}
                          </SelectItem>
                          <SelectItem value="contract">
                            {t("employmentTypes.contract")}
                          </SelectItem>
                          <SelectItem value="internship">
                            {t("employmentTypes.internship")}
                          </SelectItem>
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
                    <FormLabel>{t("jobInfo.location")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("jobInfo.selectLocation")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{t("jobInfo.worldwide")}</SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">
                              {t("jobInfo.worldwideRemote")}
                            </span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>{t("jobInfo.location")}</SelectLabel>
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
                <FormLabel>{t("jobInfo.salaryRange")}</FormLabel>
                <FormControl>
                  <SalaryRangeSelector
                    control={form.control}
                    minSalary={10000}
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
                  <FormLabel>{t("jobInfo.jobDescription")}</FormLabel>
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
                  <FormLabel>{t("jobInfo.benefits")}</FormLabel>
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
            <CardTitle>{t("companyInfo.title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("companyInfo.companyName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("companyInfo.companyNamePlaceholder")}
                        {...field}
                        readOnly={readOnly}
                      />
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
                    <FormLabel>{t("companyInfo.location")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={readOnly}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("companyInfo.selectLocation")}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {t("companyInfo.worldwide")}
                          </SelectLabel>
                          <SelectItem value="worldwide">
                            <span>🌍</span>
                            <span className="pl-2">
                              {t("companyInfo.worldwide")}
                            </span>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>{t("companyInfo.location")}</SelectLabel>
                          {countryList.map((country) => (
                            <SelectItem value={country.name} key={country.name}>
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
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("companyInfo.website")}</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          https://
                        </span>
                        <Input
                          {...field}
                          placeholder={t("companyInfo.websitePlaceholder")}
                          readOnly={readOnly}
                          className="rounded-l-none"
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
                    <FormLabel>{t("companyInfo.xAccount")}</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="flex items-center justify-center px-3 border border-r-0 border-input rounded-l-md bg-muted text-muted-foreground text-sm">
                          @
                        </span>
                        <Input
                          {...field}
                          placeholder={t("companyInfo.xAccountPlaceholder")}
                          readOnly={readOnly}
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
                  <FormLabel>{t("companyInfo.description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("companyInfo.descriptionPlaceholder")}
                      readOnly={readOnly}
                      className="min-h-[120px]"
                      {...field}
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
                  <FormLabel>{t("companyInfo.logo")}</FormLabel>
                  <FormControl>
                    <div>
                      {field.value ? (
                        <div className="relative w-fit">
                          <Image
                            src={field.value}
                            alt={t("companyInfo.logoAlt")}
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          {field.value && !readOnly && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute -top-2 -right-2"
                              onClick={() => field.onChange("")}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                          }}
                          onUploadError={() => {
                            toast.error(t("errors.uploadError"));
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

        <Card>
          <CardHeader>
            <CardTitle>{t("listingDuration.title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <JobListingDurationSelector field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? t("buttons.submitting") : t("buttons.continue")}
        </Button>
      </form>
    </Form>
  );
}
