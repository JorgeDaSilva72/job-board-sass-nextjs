// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { XIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";
// import { Checkbox } from "../ui/checkbox";
// import { countryList } from "@/app/utils/countriesList";
// import { Separator } from "../ui/separator";
// import Image from "next/image";
// // import { Input } from "@/components/ui/input";

// export function JobFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const jobTypes = ["full-time", "part-time", "contract", "internship"];
//   const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
//   const currentLocation = searchParams.get("location") || "";
//   // const currentMinSalary = searchParams.get("minSalary") || "";
//   // const currentMaxSalary = searchParams.get("maxSalary") || "";

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (value) {
//         params.set(name, value);
//       } else {
//         params.delete(name);
//       }
//       return params.toString();
//     },
//     [searchParams]
//   );

//   const handleJobTypeChange = (type: string, checked: boolean) => {
//     const current = new Set(currentJobTypes);
//     if (checked) {
//       current.add(type);
//     } else {
//       current.delete(type);
//     }
//     const newValue = Array.from(current).join(",");
//     router.push(`?${createQueryString("jobTypes", newValue)}`);
//   };

//   const handleLocationChange = (location: string) => {
//     router.push(`?${createQueryString("location", location)}`);
//   };

//   // const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   router.push(`?${createQueryString("minSalary", e.target.value)}`);
//   // };

//   // const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   router.push(`?${createQueryString("maxSalary", e.target.value)}`);
//   // };

//   const clearFilters = () => {
//     router.push("/find-job");
//   };

//   return (
//     <Card className="col-span-1 h-fit w-full lg:w-auto">
//       <CardHeader className="space-y-4 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <CardTitle className="text-xl sm:text-2xl font-semibold">
//             Filters
//           </CardTitle>
//           <Button
//             variant="destructive"
//             size="sm"
//             className="h-8 w-full sm:w-auto"
//             onClick={clearFilters}
//           >
//             <span className="mr-2">Clear all</span>
//             <XIcon className="h-4 w-4" />
//           </Button>
//         </div>
//         <Separator />
//       </CardHeader>
//       <CardContent className="space-y-6 p-4 sm:p-6">
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">Job Type</Label>
//           <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//             {jobTypes.map((type) => (
//               <div key={type} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={type.toLowerCase()}
//                   checked={currentJobTypes.includes(type)}
//                   onCheckedChange={(checked) =>
//                     handleJobTypeChange(type, checked as boolean)
//                   }
//                 />
//                 <Label
//                   htmlFor={type.toLowerCase()}
//                   className="text-sm font-medium"
//                 >
//                   {type}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Separator />
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">Location</Label>
//           <Select value={currentLocation} onValueChange={handleLocationChange}>
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Select Location" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Worldwide</SelectLabel>
//                 <SelectItem value="worldwide">
//                   <div className="flex items-center">
//                     <span>🌍</span>
//                     <span className="pl-2">Worldwide / Remote</span>
//                   </div>
//                 </SelectItem>
//               </SelectGroup>
//               <SelectGroup>
//                 <SelectLabel>Location</SelectLabel>
//                 {countryList.map((country) => (
//                   <SelectItem value={country.name} key={country.code}>
//                     <div className="flex items-center space-x-2">
//                       <Image
//                         src={country.flagEmoji}
//                         width={32}
//                         height={32}
//                         alt={country.name}
//                       />
//                       <span>{country.name}</span>
//                     </div>
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//         {/* <Separator /> */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Salary Range
//           </Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="minSalary" className="text-sm">
//                 Min Salary
//               </Label>
//               <Input
//                 id="minSalary"
//                 type="number"
//                 placeholder="0"
//                 value={currentMinSalary}
//                 onChange={handleMinSalaryChange}
//                 className="w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="maxSalary" className="text-sm">
//                 Max Salary
//               </Label>
//               <Input
//                 id="maxSalary"
//                 type="number"
//                 placeholder="500,000"
//                 value={currentMaxSalary}
//                 onChange={handleMaxSalaryChange}
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div> */}
//       </CardContent>
//     </Card>
//   );
// }
// END ------------------------------

// BEGIN --------------------------------

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { XIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback } from "react";
// import { Checkbox } from "../ui/checkbox";
// import { countryList } from "@/app/utils/countriesList";
// import { Separator } from "../ui/separator";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";
// // import { Slider } from "../ui/slider";

// export function JobFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Filtres existants
//   const jobTypes = [
//     "full-time",
//     "part-time",
//     "contract",
//     "internship",
//     "freelance",
//   ];
//   const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
//   const currentLocation = searchParams.get("location") || "";

//   // Nouveaux filtres
//   // const experienceLevels = ["ENTRY", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"];
//   // const currentExperience = searchParams.get("experience")?.split(",") || [];

//   // const educationLevels = ["HIGH_SCHOOL", "BACHELOR", "MASTER", "PHD", "OTHER"];
//   // const currentEducation = searchParams.get("education")?.split(",") || [];

//   const currentRemote = searchParams.get("remote") === "true";
//   const currentMinSalary = searchParams.get("minSalary") || "0";
//   const currentMaxSalary = searchParams.get("maxSalary") || "1000000";
//   // const currentSkills = searchParams.get("skills") || "";
//   // const currentCompanySize = searchParams.get("companySize") || "";

//   const createQueryString = useCallback(
//     (name: string, value: string) => {
//       const params = new URLSearchParams(searchParams.toString());
//       if (value) {
//         params.set(name, value);
//       } else {
//         params.delete(name);
//       }
//       return params.toString();
//     },
//     [searchParams]
//   );

//   // Handlers pour les filtres
//   const handleJobTypeChange = (type: string, checked: boolean) => {
//     const current = new Set(currentJobTypes);
//     if (checked) {
//       current.add(type);
//     } else {
//       current.delete(type);
//     }
//     router.push(
//       `?${createQueryString("jobTypes", Array.from(current).join(","))}`
//     );
//   };

//   // const handleExperienceChange = (level: string, checked: boolean) => {
//   //   const current = new Set(currentExperience);
//   //   if (checked) {
//   //     current.add(level);
//   //   } else {
//   //     current.delete(level);
//   //   }
//   //   router.push(
//   //     `?${createQueryString("experience", Array.from(current).join(","))}`
//   //   );
//   // };

//   // const handleEducationChange = (level: string, checked: boolean) => {
//   //   const current = new Set(currentEducation);
//   //   if (checked) {
//   //     current.add(level);
//   //   } else {
//   //     current.delete(level);
//   //   }
//   //   router.push(
//   //     `?${createQueryString("education", Array.from(current).join(","))}`
//   //   );
//   // };

//   const handleLocationChange = (location: string) => {
//     router.push(`?${createQueryString("location", location)}`);
//   };

//   // const handleRemoteChange = (checked: boolean) => {
//   //   router.push(`?${createQueryString("remote", checked.toString())}`);
//   // };

//   const handleMinSalaryChange = (value: number) => {
//     router.push(`?${createQueryString("minSalary", value.toString())}`);
//   };

//   const handleMaxSalaryChange = (value: number) => {
//     router.push(`?${createQueryString("maxSalary", value.toString())}`);
//   };

//   // const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   router.push(`?${createQueryString("skills", e.target.value)}`);
//   // };

//   // const handleCompanySizeChange = (size: string) => {
//   //   router.push(`?${createQueryString("companySize", size)}`);
//   // };

//   const clearFilters = () => {
//     router.push("/find-job");
//   };

//   return (
//     <Card className="col-span-1 h-fit w-full lg:w-auto">
//       <CardHeader className="space-y-4 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <CardTitle className="text-xl sm:text-2xl font-semibold">
//             Filters
//           </CardTitle>
//           <Button
//             variant="destructive"
//             size="sm"
//             className="h-8 w-full sm:w-auto"
//             onClick={clearFilters}
//           >
//             <span className="mr-2">Clear all</span>
//             <XIcon className="h-4 w-4" />
//           </Button>
//         </div>
//         <Separator />
//       </CardHeader>
//       <CardContent className="space-y-6 p-4 sm:p-6">
//         {/* Job Type Filter */}
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">Job Type</Label>
//           <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//             {jobTypes.map((type) => (
//               <div key={type} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`type-${type}`}
//                   checked={currentJobTypes.includes(type)}
//                   onCheckedChange={(checked) =>
//                     handleJobTypeChange(type, checked as boolean)
//                   }
//                 />
//                 <Label
//                   htmlFor={`type-${type}`}
//                   className="text-sm font-medium capitalize"
//                 >
//                   {type.toLowerCase().replace("_", " ")}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Separator />

//         {/* Remote Work Filter */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Work Location
//           </Label>
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="remote"
//               checked={currentRemote}
//               onCheckedChange={handleRemoteChange}
//             />
//             <Label htmlFor="remote" className="text-sm font-medium">
//               Remote Only
//             </Label>
//           </div>
//         </div> */}
//         {/* <Separator /> */}

//         {/* Location Filter */}
//         {!currentRemote && (
//           <>
//             <div className="space-y-4">
//               <Label className="text-base sm:text-lg font-semibold">
//                 Location
//               </Label>
//               <Select
//                 value={currentLocation}
//                 onValueChange={handleLocationChange}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Worldwide</SelectLabel>
//                     <SelectItem value="worldwide">
//                       <div className="flex items-center">
//                         <span>🌍</span>
//                         <span className="pl-2">Worldwide</span>
//                       </div>
//                     </SelectItem>
//                   </SelectGroup>
//                   <SelectGroup>
//                     <SelectLabel>Countries</SelectLabel>
//                     {countryList.map((country) => (
//                       <SelectItem value={country.name} key={country.code}>
//                         <div className="flex items-center space-x-2">
//                           <Image
//                             src={country.flagEmoji}
//                             width={32}
//                             height={32}
//                             alt={country.name}
//                           />
//                           <span>{country.name}</span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <Separator />
//           </>
//         )}

//         {/* Experience Level Filter */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Experience Level
//           </Label>
//           <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//             {experienceLevels.map((level) => (
//               <div key={level} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`exp-${level}`}
//                   checked={currentExperience.includes(level)}
//                   onCheckedChange={(checked) =>
//                     handleExperienceChange(level, checked as boolean)
//                   }
//                 />
//                 <Label
//                   htmlFor={`exp-${level}`}
//                   className="text-sm font-medium capitalize"
//                 >
//                   {level.toLowerCase()}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div> */}
//         {/* <Separator /> */}

//         {/* Education Level Filter */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Education Level
//           </Label>
//           <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//             {educationLevels.map((level) => (
//               <div key={level} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`edu-${level}`}
//                   checked={currentEducation.includes(level)}
//                   onCheckedChange={(checked) =>
//                     handleEducationChange(level, checked as boolean)
//                   }
//                 />
//                 <Label
//                   htmlFor={`edu-${level}`}
//                   className="text-sm font-medium capitalize"
//                 >
//                   {level.toLowerCase().replace("_", " ")}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div> */}
//         {/* <Separator /> */}

//         {/* Salary Range Filter */}
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Salary Range ($)
//           </Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="minSalary" className="text-sm">
//                 Min Salary
//               </Label>
//               <Input
//                 id="minSalary"
//                 type="number"
//                 placeholder="0"
//                 value={currentMinSalary}
//                 onChange={(e) => handleMinSalaryChange(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="maxSalary" className="text-sm">
//                 Max Salary
//               </Label>
//               <Input
//                 id="maxSalary"
//                 type="number"
//                 placeholder="500,000"
//                 value={currentMaxSalary}
//                 onChange={(e) => handleMaxSalaryChange(Number(e.target.value))}
//                 className="w-full"
//               />
//             </div>
//           </div>
//         </div>
//         <Separator />

//         {/* Skills Filter */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">Skills</Label>
//           <Input
//             placeholder="React, Node.js, Python..."
//             value={currentSkills}
//             onChange={handleSkillsChange}
//           />
//           <p className="text-xs text-muted-foreground">
//             Separate skills with commas
//           </p>
//         </div>
//         <Separator /> */}

//         {/* Company Size Filter */}
//         {/* <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Company Size
//           </Label>
//           <Select
//             value={currentCompanySize}
//             onValueChange={handleCompanySizeChange}
//           >
//             <SelectTrigger className="w-full">
//               <SelectValue placeholder="Any size" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="1-10">1-10 employees</SelectItem>
//               <SelectItem value="11-50">11-50 employees</SelectItem>
//               <SelectItem value="51-200">51-200 employees</SelectItem>
//               <SelectItem value="201-500">201-500 employees</SelectItem>
//               <SelectItem value="501-1000">501-1000 employees</SelectItem>
//               <SelectItem value="1001+">1001+ employees</SelectItem>
//             </SelectContent>
//           </Select>
//         </div> */}
//       </CardContent>
//     </Card>
//   );
// }

// BEGIN 12/04/2025-------------------------

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { XIcon } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useCallback, useState, useEffect } from "react";
// import { Checkbox } from "../ui/checkbox";
// import { countryList } from "@/app/utils/countriesList";
// import { Separator } from "../ui/separator";
// import Image from "next/image";
// import { Input } from "@/components/ui/input";

// export function JobFilters() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Filtres existants
//   const jobTypes = [
//     "full-time",
//     "part-time",
//     "contract",
//     "internship",
//     "freelance",
//   ];
//   const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
//   const currentLocation = searchParams.get("location") || "";
//   const currentRemote = searchParams.get("remote") === "true";

//   // États locaux pour les valeurs de salaire
//   const [minSalary, setMinSalary] = useState(
//     searchParams.get("minSalary") || "0"
//   );
//   const [maxSalary, setMaxSalary] = useState(
//     searchParams.get("maxSalary") || "1000000"
//   );

//   // Mise à jour des états locaux quand les paramètres d'URL changent
//   useEffect(() => {
//     setMinSalary(searchParams.get("minSalary") || "0");
//     setMaxSalary(searchParams.get("maxSalary") || "1000000");
//   }, [searchParams]);

//   const createQueryString = useCallback(
//     (updates: Record<string, string | null>) => {
//       const params = new URLSearchParams(searchParams.toString());

//       // Appliquer toutes les mises à jour
//       Object.entries(updates).forEach(([name, value]) => {
//         if (value === null) {
//           params.delete(name);
//         } else {
//           params.set(name, value);
//         }
//       });

//       return params.toString();
//     },
//     [searchParams]
//   );

//   // Handlers pour les filtres
//   const handleJobTypeChange = (type: string, checked: boolean) => {
//     const current = new Set(currentJobTypes);
//     if (checked) {
//       current.add(type);
//     } else {
//       current.delete(type);
//     }

//     const typeString = Array.from(current).join(",");
//     router.push(
//       `?${createQueryString({
//         jobTypes: typeString.length ? typeString : null,
//       })}`
//     );
//   };

//   const handleLocationChange = (location: string) => {
//     router.push(`?${createQueryString({ location })}`);
//   };

//   // Appliquer les changements de salaire
//   const applySalaryFilter = () => {
//     router.push(
//       `?${createQueryString({
//         minSalary,
//         maxSalary,
//       })}`
//     );
//   };

//   const clearFilters = () => {
//     router.push("/find-job");
//   };

//   return (
//     <Card className="col-span-1 h-fit w-full lg:w-auto">
//       <CardHeader className="space-y-4 p-4 sm:p-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <CardTitle className="text-xl sm:text-2xl font-semibold">
//             Filters
//           </CardTitle>
//           <Button
//             variant="destructive"
//             size="sm"
//             className="h-8 w-full sm:w-auto"
//             onClick={clearFilters}
//           >
//             <span className="mr-2">Clear all</span>
//             <XIcon className="h-4 w-4" />
//           </Button>
//         </div>
//         <Separator />
//       </CardHeader>
//       <CardContent className="space-y-6 p-4 sm:p-6">
//         {/* Job Type Filter */}
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">Job Type</Label>
//           <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
//             {jobTypes.map((type) => (
//               <div key={type} className="flex items-center space-x-2">
//                 <Checkbox
//                   id={`type-${type}`}
//                   checked={currentJobTypes.includes(type)}
//                   onCheckedChange={(checked) =>
//                     handleJobTypeChange(type, checked as boolean)
//                   }
//                 />
//                 <Label
//                   htmlFor={`type-${type}`}
//                   className="text-sm font-medium capitalize"
//                 >
//                   {type.toLowerCase().replace("_", " ")}
//                 </Label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Separator />

//         {/* Location Filter */}
//         {!currentRemote && (
//           <>
//             <div className="space-y-4">
//               <Label className="text-base sm:text-lg font-semibold">
//                 Location
//               </Label>
//               <Select
//                 value={currentLocation}
//                 onValueChange={handleLocationChange}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select Location" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Worldwide</SelectLabel>
//                     <SelectItem value="worldwide">
//                       <div className="flex items-center">
//                         <span>🌍</span>
//                         <span className="pl-2">Worldwide</span>
//                       </div>
//                     </SelectItem>
//                   </SelectGroup>
//                   <SelectGroup>
//                     <SelectLabel>Countries</SelectLabel>
//                     {countryList.map((country) => (
//                       <SelectItem value={country.name} key={country.code}>
//                         <div className="flex items-center space-x-2">
//                           <Image
//                             src={country.flagEmoji}
//                             width={32}
//                             height={32}
//                             alt={country.name}
//                           />
//                           <span>{country.name}</span>
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <Separator />
//           </>
//         )}

//         {/* Salary Range Filter */}
//         <div className="space-y-4">
//           <Label className="text-base sm:text-lg font-semibold">
//             Salary Range ($)
//           </Label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="minSalary" className="text-sm">
//                 Min Salary
//               </Label>
//               <Input
//                 id="minSalary"
//                 type="number"
//                 placeholder="0"
//                 value={minSalary}
//                 onChange={(e) => setMinSalary(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="maxSalary" className="text-sm">
//                 Max Salary
//               </Label>
//               <Input
//                 id="maxSalary"
//                 type="number"
//                 placeholder="500,000"
//                 value={maxSalary}
//                 onChange={(e) => setMaxSalary(e.target.value)}
//                 className="w-full"
//               />
//             </div>
//           </div>
//           <Button
//             variant="outline"
//             className="w-full mt-2"
//             onClick={applySalaryFilter}
//           >
//             Apply Salary Filter
//           </Button>
//         </div>
//         <Separator />
//       </CardContent>
//     </Card>
//   );
// }

// BEGIN 25/04/2025
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { countryList } from "@/app/utils/countriesList";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filtres existants
  const jobTypes = [
    "full-time",
    "part-time",
    "contract",
    "internship",
    "freelance",
  ];
  const currentJobTypes = searchParams.get("jobTypes")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";
  const currentRemote = searchParams.get("remote") === "true";

  // États locaux pour les valeurs de salaire
  const [minSalary, setMinSalary] = useState(
    searchParams.get("minSalary") || "0"
  );
  const [maxSalary, setMaxSalary] = useState(
    searchParams.get("maxSalary") || "1000000"
  );

  // Mise à jour des états locaux quand les paramètres d'URL changent
  useEffect(() => {
    setMinSalary(searchParams.get("minSalary") || "0");
    setMaxSalary(searchParams.get("maxSalary") || "1000000");
  }, [searchParams]);

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Appliquer toutes les mises à jour
      Object.entries(updates).forEach(([name, value]) => {
        if (value === null) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  // Handlers pour les filtres
  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(type);
    } else {
      current.delete(type);
    }

    const typeString = Array.from(current).join(",");
    router.push(
      `?${createQueryString({
        jobTypes: typeString.length ? typeString : null,
      })}`
    );
  };

  const handleLocationChange = (location: string) => {
    router.push(`?${createQueryString({ location })}`);
  };

  // Appliquer les changements de salaire
  const applySalaryFilter = () => {
    router.push(
      `?${createQueryString({
        minSalary,
        maxSalary,
      })}`
    );
  };

  const clearFilters = () => {
    router.push("/find-job");
  };

  return (
    <Card className="col-span-1 h-fit w-full max-h-screen overflow-y-auto">
      <CardHeader className="space-y-2 p-3 sm:p-6">
        <div className="flex flex-row justify-between items-center gap-2">
          <CardTitle className="text-lg sm:text-2xl font-semibold">
            Filters
          </CardTitle>
          <Button
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={clearFilters}
          >
            <span className="sr-only sm:not-sr-only sm:mr-2">Clear all</span>
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-4 p-3 sm:p-6">
        {/* Job Type Filter */}
        <div className="space-y-2 sm:space-y-4">
          <Label className="text-sm sm:text-lg font-semibold">Job Type</Label>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={currentJobTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(type, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="text-xs sm:text-sm font-medium capitalize"
                >
                  {type.toLowerCase().replace("_", " ")}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />

        {/* Location Filter */}
        {!currentRemote && (
          <>
            <div className="space-y-2 sm:space-y-4">
              <Label className="text-sm sm:text-lg font-semibold">
                Location
              </Label>
              <Select
                value={currentLocation}
                onValueChange={handleLocationChange}
              >
                <SelectTrigger className="w-full text-xs sm:text-sm">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Worldwide</SelectLabel>
                    <SelectItem value="worldwide">
                      <div className="flex items-center">
                        <span>🌍</span>
                        <span className="pl-2">Worldwide</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {countryList.map((country) => (
                      <SelectItem value={country.name} key={country.code}>
                        <div className="flex items-center space-x-2">
                          <Image
                            src={country.flagEmoji}
                            width={24}
                            height={24}
                            alt={country.name}
                          />
                          <span className="text-xs sm:text-sm">
                            {country.name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Separator />
          </>
        )}

        {/* Salary Range Filter */}
        <div className="space-y-2 sm:space-y-4">
          <Label className="text-sm sm:text-lg font-semibold">
            Salary Range ($)
          </Label>
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="minSalary" className="text-xs sm:text-sm">
                Min
              </Label>
              <Input
                id="minSalary"
                type="number"
                placeholder="0"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="w-full text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="maxSalary" className="text-xs sm:text-sm">
                Max
              </Label>
              <Input
                id="maxSalary"
                type="number"
                placeholder="500k"
                value={maxSalary}
                onChange={(e) => setMaxSalary(e.target.value)}
                className="w-full text-xs sm:text-sm h-8 sm:h-10"
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-1 sm:mt-2 text-xs sm:text-sm"
            onClick={applySalaryFilter}
          >
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
