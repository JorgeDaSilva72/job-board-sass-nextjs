// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
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
// import { jobSeekerSchema } from "@/app/utils/zodSchemas";
// import { useState } from "react";
// // import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react";

// import PDFImage from "@/public/pdf.png";
// import Image from "next/image";
// import { UploadDropzone } from "@/components/general/UploadThingReExport";
// import { createJobSeeker } from "@/app/actions";

// export default function JobSeekerForm() {
//   const form = useForm<z.infer<typeof jobSeekerSchema>>({
//     resolver: zodResolver(jobSeekerSchema),
//     defaultValues: {
//       about: "",
//       resume: "",
//       name: "",
//     },
//   });
//   const [pending, setPending] = useState(false);

//   async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
//     try {
//       setPending(true);
//       await createJobSeeker(values);
//     } catch (error) {
//       if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
//         // toast.error("Something went wrong. Please try again.");
//       }
//     } finally {
//       setPending(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your full name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="about"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Short Bio</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us about yourself..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="resume"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Resume (PDF)</FormLabel>
//               <FormControl>
//                 <div>
//                   {field.value ? (
//                     <div className="relative w-fit">
//                       <Image
//                         src={PDFImage}
//                         alt="Company Logo"
//                         width={100}
//                         height={100}
//                         className="rounded-lg"
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2 "
//                         onClick={() => field.onChange("")}
//                       >
//                         <XIcon className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <UploadDropzone
//                       endpoint="resumeUploader"
//                       onClientUploadComplete={(res) => {
//                         field.onChange(res[0].url);
//                         // toast.success("Resume uploaded successfully!");
//                       }}
//                       onUploadError={() => {
//                         // toast.error("Something went wrong. Please try again.");
//                       }}
//                       className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
//                     />
//                   )}
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={pending}>
//           {pending ? "Submitting..." : "Continue"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
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
// import { jobSeekerSchema } from "@/app/utils/zodSchemas";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { XIcon } from "lucide-react";
// import PDFImage from "@/public/pdf.png";
// import Image from "next/image";
// import { UploadDropzone } from "@/components/general/UploadThingReExport";
// import { createJobSeeker } from "@/app/actions";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// // import { MultiSelect } from "@/components/general/MultiSelect";

// export default function JobSeekerForm() {
//   const form = useForm<z.infer<typeof jobSeekerSchema>>({
//     resolver: zodResolver(jobSeekerSchema),
//     defaultValues: {
//       about: "",
//       resume: "",
//       name: "",
//       title: "",
//       experience: 0,
//       skills: [],
//       languages: [],
//       countryCode: "",
//       city: "",
//       phoneNumber: "",
//       linkedinProfile: "",
//       portfolioUrl: "",
//       availability: undefined,
//       preferredJobType: [],
//       expectedSalary: 0,
//     },
//   });

//   const [pending, setPending] = useState(false);

//   async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
//     try {
//       setPending(true);
//       await createJobSeeker(values);
//     } catch (error) {
//       if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
//         // toast.error("Something went wrong. Please try again.");
//       }
//     } finally {
//       setPending(false);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//         {/* Nom complet */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your full name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Bio */}
//         <FormField
//           control={form.control}
//           name="about"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Short Bio</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Tell us about yourself..."
//                   className="resize-none"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* CV */}
//         <FormField
//           control={form.control}
//           name="resume"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Resume (PDF)</FormLabel>
//               <FormControl>
//                 <div>
//                   {field.value ? (
//                     <div className="relative w-fit">
//                       <Image
//                         src={PDFImage}
//                         alt="Resume"
//                         width={100}
//                         height={100}
//                         className="rounded-lg"
//                       />
//                       <Button
//                         type="button"
//                         variant="destructive"
//                         size="icon"
//                         className="absolute -top-2 -right-2"
//                         onClick={() => field.onChange("")}
//                       >
//                         <XIcon className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <UploadDropzone
//                       endpoint="resumeUploader"
//                       onClientUploadComplete={(res) => {
//                         field.onChange(res[0].url);
//                       }}
//                       onUploadError={() => {
//                         // toast.error("Something went wrong. Please try again.");
//                       }}
//                       className="ut-button:bg-primary ut-button:text-white ut-button:hover:bg-primary/90 ut-label:text-muted-foreground ut-allowed-content:text-muted-foreground border-primary"
//                     />
//                   )}
//                 </div>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Titre du poste */}
//         <FormField
//           control={form.control}
//           name="title"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Job Title</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your job title" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Années d'expérience */}
//         <FormField
//           control={form.control}
//           name="experience"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Years of Experience</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="Enter years of experience"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Compétences */}
//         {/* <FormField
//           control={form.control}
//           name="skills"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Skills</FormLabel>
//               <FormControl>
//                 <MultiSelect
//                   options={[
//                     { value: "React", label: "React" },
//                     { value: "Node.js", label: "Node.js" },
//                     // Ajoutez d'autres compétences ici
//                   ]}
//                   selected={field.value || []}
//                   onChange={field.onChange}
//                   placeholder="Select skills"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}

//         {/* languages  */}

//         {/* <FormField
//   control={form.control}
//   name="languages"
//   render={({ field }) => (
//     <FormItem>
//       <FormLabel>Languages</FormLabel>
//       <FormControl>
//         <MultiSelect
//           options={[
//             { value: "French", label: "French" },
//             { value: "English", label: "English" },
//             // Ajoutez d'autres langues ici
//           ]}
//           selected={field.value || []}
//           onChange={field.onChange}
//           placeholder="Select languages"
//         />
//       </FormControl>
//       <FormMessage />
//     </FormItem>
//   )}
// /> */}

//         {/* countryCode (Code pays)  */}
//         <FormField
//           control={form.control}
//           name="countryCode"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Country Code</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter country code (e.g., FR)" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* city (Ville) */}
//         <FormField
//           control={form.control}
//           name="city"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>City</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your city" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* phoneNumber (Numéro de téléphone) */}
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your phone number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* linkedinProfile (Profil LinkedIn) */}

//         <FormField
//           control={form.control}
//           name="linkedinProfile"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>LinkedIn Profile</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="Enter your LinkedIn profile URL"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* portfolioUrl (URL du portfolio) */}

//         <FormField
//           control={form.control}
//           name="portfolioUrl"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Portfolio URL</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter your portfolio URL" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Disponibilité */}
//         <FormField
//           control={form.control}
//           name="availability"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Availability</FormLabel>
//               <FormControl>
//                 <Select onValueChange={field.onChange} value={field.value}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select availability" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="IMMEDIATE">Immediate</SelectItem>
//                     <SelectItem value="ONE_WEEK">1 Week</SelectItem>
//                     <SelectItem value="TWO_WEEKS">2 Weeks</SelectItem>
//                     <SelectItem value="ONE_MONTH">1 Month</SelectItem>
//                     <SelectItem value="MORE_THAN_MONTH">
//                       More than 1 Month
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* preferredJobType (Type de poste préféré) */}

//         {/* <FormField
//           control={form.control}
//           name="preferredJobType"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Preferred Job Type</FormLabel>
//               <FormControl>
//                 <MultiSelect
//                   options={[
//                     { value: "FULL_TIME", label: "Full Time" },
//                     { value: "PART_TIME", label: "Part Time" },
//                     { value: "CONTRACT", label: "Contract" },
//                     { value: "INTERNSHIP", label: "Internship" },
//                     { value: "REMOTE", label: "Remote" },
//                   ]}
//                   selected={field.value || []}
//                   onChange={field.onChange}
//                   placeholder="Select preferred job types"
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         /> */}

//         {/* expectedSalary (Salaire attendu)
// tsx */}

//         <FormField
//           control={form.control}
//           name="expectedSalary"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Expected Salary</FormLabel>
//               <FormControl>
//                 <Input
//                   type="number"
//                   placeholder="Enter expected salary"
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Bouton de soumission */}
//         <Button type="submit" className="w-full" disabled={pending}>
//           {pending ? "Submitting..." : "Continue"}
//         </Button>
//       </form>
//     </Form>
//   );
// }

// import React, { useState } from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { X, Upload } from "lucide-react";

// const JobSeekerForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     about: "",
//     title: "",
//     experience: "",
//     countryCode: "",
//     city: "",
//     phoneNumber: "",
//     linkedinProfile: "",
//     portfolioUrl: "",
//     availability: "",
//     expectedSalary: "",
//     resume: null,
//   });

//   const [pending, setPending] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setPending(true);
//     try {
//       // Simulated API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log("Form submitted:", formData);
//     } catch (error) {
//       console.error("Submission error:", error);
//     } finally {
//       setPending(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-2xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">Job Seeker Profile</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             {/* Personal Information */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Full Name
//               </label>
//               <Input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name"
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">About</label>
//               <textarea
//                 name="about"
//                 value={formData.about}
//                 onChange={handleInputChange}
//                 placeholder="Tell us about yourself..."
//                 className="w-full min-h-[100px] p-2 border rounded-md"
//               />
//             </div>

//             {/* Professional Information */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Job Title
//               </label>
//               <Input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Senior Software Engineer"
//                 className="w-full"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Years of Experience
//               </label>
//               <Input
//                 type="number"
//                 name="experience"
//                 value={formData.experience}
//                 onChange={handleInputChange}
//                 placeholder="0"
//                 className="w-full"
//               />
//             </div>

//             {/* Location Information */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Country Code
//                 </label>
//                 <Input
//                   name="countryCode"
//                   value={formData.countryCode}
//                   onChange={handleInputChange}
//                   placeholder="e.g. US"
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">City</label>
//                 <Input
//                   name="city"
//                   value={formData.city}
//                   onChange={handleInputChange}
//                   placeholder="Enter your city"
//                   className="w-full"
//                 />
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Phone Number
//               </label>
//               <Input
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 placeholder="+1 234 567 8900"
//                 className="w-full"
//               />
//             </div>

//             {/* Online Presence */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   LinkedIn Profile
//                 </label>
//                 <Input
//                   name="linkedinProfile"
//                   value={formData.linkedinProfile}
//                   onChange={handleInputChange}
//                   placeholder="https://linkedin.com/in/username"
//                   className="w-full"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Portfolio URL
//                 </label>
//                 <Input
//                   name="portfolioUrl"
//                   value={formData.portfolioUrl}
//                   onChange={handleInputChange}
//                   placeholder="https://portfolio.com"
//                   className="w-full"
//                 />
//               </div>
//             </div>

//             {/* Availability and Expectations */}
//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Availability
//               </label>
//               <Select
//                 value={formData.availability}
//                 onValueChange={(value) =>
//                   handleInputChange({ target: { name: "availability", value } })
//                 }
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select availability" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="IMMEDIATE">Immediate</SelectItem>
//                   <SelectItem value="ONE_WEEK">1 Week</SelectItem>
//                   <SelectItem value="TWO_WEEKS">2 Weeks</SelectItem>
//                   <SelectItem value="ONE_MONTH">1 Month</SelectItem>
//                   <SelectItem value="MORE_THAN_MONTH">
//                     More than 1 Month
//                   </SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">
//                 Expected Salary
//               </label>
//               <Input
//                 type="number"
//                 name="expectedSalary"
//                 value={formData.expectedSalary}
//                 onChange={handleInputChange}
//                 placeholder="Enter expected salary"
//                 className="w-full"
//               />
//             </div>

//             {/* Resume Upload */}
//             <div>
//               <label className="block text-sm font-medium mb-2">Resume</label>
//               <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                 {formData.resume ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="text-sm">resume.pdf</div>
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       onClick={() =>
//                         setFormData((prev) => ({ ...prev, resume: null }))
//                       }
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ) : (
//                   <div className="space-y-2">
//                     <Upload className="mx-auto h-8 w-8 text-gray-400" />
//                     <div className="text-sm text-gray-500">
//                       Drag and drop your resume or click to browse
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <Button type="submit" className="w-full" disabled={pending}>
//             {pending ? "Submitting..." : "Submit Application"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default JobSeekerForm;

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { X, Upload } from "lucide-react";
// import { jobSeekerSchema } from "@/app/utils/zodSchemas";
// import { z } from "zod";
// import { createJobSeeker } from "@/app/actions";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const JobSeekerForm = () => {
//   const form = useForm<z.infer<typeof jobSeekerSchema>>({
//     resolver: zodResolver(jobSeekerSchema),
//     defaultValues: {
//       firstName: "",
//       lastName: "",
//       email: "",
//       about: "",
//       title: "",
//       experience: 0,
//       skills: [],
//       languages: [],
//       countryCode: "",
//       city: "",
//       phoneNumber: "",
//       linkedinProfile: "",
//       portfolioUrl: "",
//       availability: undefined,
//       preferredJobType: [],
//       expectedSalary: 0,
//       resume: "",
//     },
//   });

//   const [pending, setPending] = useState(false);

//   const onSubmit = async (data: z.infer<typeof jobSeekerSchema>) => {
//     setPending(true);
//     try {
//       console.log("Form submitted:", data);
//       // Add your submission logic here
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       // await createJobSeeker(values);
//     } catch (error) {
//       console.error("Submission error:", error);
//       if (error instanceof Error && error.message !== "NEXT_REDIRECT") {
//         // toast.error("Something went wrong. Please try again.");
//       }
//     } finally {
//       setPending(false);
//     }
//   };

//   return (
//     <Form {...form}>
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">
//             Job Seeker Profile
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             {/* Personal Information */}

//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 {/* firstName */}
//                 <FormField
//                   control={form.control}
//                   name="firstName"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>First Name</FormLabel>
//                       <FormControl>
//                         <Input placeholder="Enter your full name" {...field} />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Last Name
//                   </label>
//                   <Input
//                     {...register("lastName")}
//                     placeholder="Enter your last name"
//                     className="w-full"
//                   />
//                   {errors.lastName && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.lastName.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Email</label>
//                 <Input
//                   {...register("email")}
//                   type="email"
//                   placeholder="Enter your email"
//                   className="w-full"
//                 />
//                 {errors.email && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">About</label>
//                 <textarea
//                   {...register("about")}
//                   placeholder="Tell us about yourself..."
//                   className="w-full min-h-[100px] p-2 border rounded-md"
//                 />
//                 {errors.about && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.about.message}
//                   </p>
//                 )}
//               </div>

//               {/* Professional Information */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Job Title
//                 </label>
//                 <Input
//                   {...register("title")}
//                   placeholder="e.g. Senior Software Engineer"
//                   className="w-full"
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.title.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Years of Experience
//                 </label>
//                 <Input
//                   type="number"
//                   {...register("experience", { valueAsNumber: true })}
//                   placeholder="0"
//                   className="w-full"
//                 />
//                 {errors.experience && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.experience.message}
//                   </p>
//                 )}
//               </div>

//               {/* Location Information */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Country Code
//                   </label>
//                   <Input
//                     {...register("countryCode")}
//                     placeholder="e.g. US"
//                     className="w-full"
//                   />
//                   {errors.countryCode && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.countryCode.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">City</label>
//                   <Input
//                     {...register("city")}
//                     placeholder="Enter your city"
//                     className="w-full"
//                   />
//                   {errors.city && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.city.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Contact Information */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">
//                   Phone Number
//                 </label>
//                 <Input
//                   {...register("phoneNumber")}
//                   placeholder="+1 234 567 8900"
//                   className="w-full"
//                 />
//                 {errors.phoneNumber && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.phoneNumber.message}
//                   </p>
//                 )}
//               </div>

//               {/* Online Presence */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     LinkedIn Profile
//                   </label>
//                   <Input
//                     {...register("linkedinProfile")}
//                     placeholder="https://linkedin.com/in/username"
//                     className="w-full"
//                   />
//                   {errors.linkedinProfile && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.linkedinProfile.message}
//                     </p>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Portfolio URL
//                   </label>
//                   <Input
//                     {...register("portfolioUrl")}
//                     placeholder="https://portfolio.com"
//                     className="w-full"
//                   />
//                   {errors.portfolioUrl && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.portfolioUrl.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Availability and Job Type */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Availability
//                   </label>
//                   <Select
//                     onValueChange={(value) => setValue("availability", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select availability" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {Object.entries(Availability).map(([key, value]) => (
//                         <SelectItem key={value} value={value}>
//                           {key.replace(/_/g, " ")}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.availability && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.availability.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Expected Salary
//                   </label>
//                   <Input
//                     type="number"
//                     {...register("expectedSalary", { valueAsNumber: true })}
//                     placeholder="Enter expected salary"
//                     className="w-full"
//                   />
//                   {errors.expectedSalary && (
//                     <p className="text-sm text-red-500 mt-1">
//                       {errors.expectedSalary.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Resume Upload */}
//               <div>
//                 <label className="block text-sm font-medium mb-2">Resume</label>
//                 <div className="border-2 border-dashed rounded-lg p-6 text-center">
//                   {watch("resume") ? (
//                     <div className="flex items-center justify-center space-x-2">
//                       <div className="text-sm">resume.pdf</div>
//                       <Button
//                         type="button"
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => setValue("resume", "")}
//                       >
//                         <X className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="space-y-2">
//                       <Upload className="mx-auto h-8 w-8 text-gray-400" />
//                       <div className="text-sm text-gray-500">
//                         Drag and drop your resume or click to browse
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 {errors.resume && (
//                   <p className="text-sm text-red-500 mt-1">
//                     {errors.resume.message}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <Button type="submit" className="w-full" disabled={pending}>
//               {pending ? "Submitting..." : "Submit Application"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Form>
//   );
// };

// export default JobSeekerForm;

"use client";
import React, { useState } from "react";
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
import { Availability } from "@/app/utils/zodSchemas";
import { JobType } from "@/app/utils/zodSchemas";
import * as z from "zod";
import { UploadDropzone } from "@/components/general/UploadThingReExport";
import { toast } from "sonner";
import { XIcon } from "lucide-react";

import PDFImage from "@/public/pdf.png";
import Image from "next/image";
import { createJobSeeker } from "@/app/actions";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

const JobSeekerForm = () => {
  const form = useForm<z.infer<typeof jobSeekerSchema>>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      about: "",
      title: "",
      experience: 0,
      skills: [],
      languages: [],
      city: "",
      countryCode: "",
      phoneNumber: "",
      linkedinProfile: "",
      portfolioUrl: "",
      availability: Availability.IMMEDIATE,
      preferredJobType: [JobType.FULL_TIME],
      expectedSalary: 0,
      resume: "",
    },
  });

  const [pending, setPending] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof jobSeekerSchema>) {
    try {
      setPending(true);
      const result = await createJobSeeker(values);
      if (result.success) {
        toast.success("Profile created successfully!");

        // Attendre un peu pour laisser le toast s'afficher
        setTimeout(() => {
          router.push("/find-job");
        }, 1000);
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Job Seeker Profile</CardTitle>
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
                    <Input type="email" {...field} />
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
                    className="bg-gray-100 px-3 py-1 rounded-full  dark:bg-gray-700 dark:text-white" // Ajoutez des styles pour le mode sombre
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
                    className="bg-gray-100 px-3 py-1 rounded-full   dark:bg-gray-700 dark:text-white" // Ajoutez des styles pour le mode sombre
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
                          <Image
                            src={PDFImage}
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

            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Submitting..." : "Continue"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default JobSeekerForm;
