// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Filter, RefreshCw, Save, X } from "lucide-react";
// import { Availability, JobType } from "@prisma/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@radix-ui/react-checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";

// // Types
// type Candidate = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   title: string;
//   experience: number;
//   skills: string[];
//   languages: string[];
//   availability: Availability;
//   preferredJobType: JobType[];
//   countryCode?: string;
//   city?: string;
// };

// type Pagination = {
//   total: number;
//   pages: number;
//   current: number;
//   limit: number;
// };

// type FilterState = {
//   skills: string[];
//   languages: string[];
//   experienceMin?: number;
//   experienceMax?: number;
//   availability: Availability[];
//   jobTypes: JobType[];
//   location?: string;
// };

// export default function CandidatesPage() {
//   const router = useRouter();
//   //   const searchParams = useSearchParams();

//   // État pour les filtres
//   const [filters, setFilters] = useState<FilterState>({
//     skills: [],
//     languages: [],
//     experienceMin: undefined,
//     experienceMax: undefined,
//     availability: [],
//     jobTypes: [],
//     location: undefined,
//   });

//   // État pour la liste des candidats
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [pagination, setPagination] = useState<Pagination>({
//     total: 0,
//     pages: 0,
//     current: 1,
//     limit: 10,
//   });

//   // État pour les filtres sauvegardés
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [savedFilters, setSavedFilters] = useState<any[]>([]);
//   const [newFilterName, setNewFilterName] = useState("");
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

//   // État pour l'input de compétence et langue
//   const [skillInput, setSkillInput] = useState("");
//   const [languageInput, setLanguageInput] = useState("");

//   // Fonction pour réinitialiser tous les filtres
//   const clearAllFilters = () => {
//     setFilters({
//       skills: [],
//       languages: [],
//       experienceMin: undefined,
//       experienceMax: undefined,
//       availability: [],
//       jobTypes: [],
//       location: undefined,
//     });
//     toast.success("All filters cleared");
//   };

//   // Charger les candidats
//   const loadCandidates = async () => {
//     try {
//       // Construire l'URL avec les filtres
//       let url = `/api/candidates?page=${pagination.current}&limit=${pagination.limit}`;

//       if (filters.skills.length > 0)
//         url += `&skills=${filters.skills.join(",")}`;
//       if (filters.languages.length > 0)
//         url += `&languages=${filters.languages.join(",")}`;
//       if (filters.experienceMin !== undefined)
//         url += `&experienceMin=${filters.experienceMin}`;
//       if (filters.experienceMax !== undefined)
//         url += `&experienceMax=${filters.experienceMax}`;
//       if (filters.availability.length > 0)
//         url += `&availability=${filters.availability.join(",")}`;
//       if (filters.jobTypes.length > 0)
//         url += `&jobTypes=${filters.jobTypes.join(",")}`;
//       if (filters.location) url += `&location=${filters.location}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {
//         setCandidates(data.candidates);
//         setPagination(data.pagination);
//       } else {
//         console.error("Error loading candidates:", data.error);
//         toast.error("Error loading candidates", data.error);
//       }
//     } catch (error) {
//       console.error("Error loading candidates:", error);
//       toast.error("Error loading candidates");
//     }
//   };

//   // Charger les filtres sauvegardés
//   const loadSavedFilters = async () => {
//     try {
//       const response = await fetch("/api/candidates/filters");
//       const data = await response.json();

//       if (response.ok) {
//         setSavedFilters(data);
//       } else {
//         console.error("Error loading filters :", data.error);
//         toast.error("Error loading filters :", data.error);
//       }
//     } catch (error) {
//       console.error("Error loading filters :", error);
//       toast.error("Error loading filters. ");
//     }
//   };

//   // Sauvegarder un filtre
//   const saveFilter = async () => {
//     try {
//       if (!newFilterName.trim()) {
//         toast("Please enter a name for the filter");
//         return;
//       }

//       const response = await fetch("/api/candidates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newFilterName,
//           ...filters,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setNewFilterName("");
//         loadSavedFilters();
//       } else {
//         console.error("Error saving filter:", data.error);
//         toast.error("Error saving filter:", data.error);
//       }
//     } catch (error) {
//       console.error("Error saving filter:", error);
//       toast.error("Error saving filter");
//     }
//   };

//   // Appliquer un filtre sauvegardé
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const applyFilter = (filter: any) => {
//     setFilters({
//       skills: filter.skills || [],
//       languages: filter.languages || [],
//       experienceMin: filter.experienceMin,
//       experienceMax: filter.experienceMax,
//       availability: filter.availability || [],
//       jobTypes: filter.jobTypes || [],
//       location: filter.location,
//     });
//   };

//   // Ajouter une compétence
//   const addSkill = () => {
//     if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
//       setFilters({
//         ...filters,
//         skills: [...filters.skills, skillInput.trim()],
//       });
//       setSkillInput("");
//     }
//   };

//   // Ajouter une langue
//   const addLanguage = () => {
//     if (
//       languageInput.trim() &&
//       !filters.languages.includes(languageInput.trim())
//     ) {
//       setFilters({
//         ...filters,
//         languages: [...filters.languages, languageInput.trim()],
//       });
//       setLanguageInput("");
//     }
//   };

//   // Supprimer une compétence
//   const removeSkill = (skill: string) => {
//     setFilters({
//       ...filters,
//       skills: filters.skills.filter((s) => s !== skill),
//     });
//   };

//   // Supprimer une langue
//   const removeLanguage = (language: string) => {
//     setFilters({
//       ...filters,
//       languages: filters.languages.filter((l) => l !== language),
//     });
//   };

//   // Voir un profil de candidat
//   const viewCandidateProfile = async (candidateId: string) => {
//     try {
//       // Enregistrer la vue
//       await fetch("/api/candidates", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           jobSeekerId: candidateId,
//         }),
//       });

//       // Rediriger vers le profil du candidat
//       router.push(`/company/candidates/${candidateId}`);
//     } catch (error) {
//       console.error("Error saving view:", error);
//       toast.error("Error saving view");
//     }
//   };

//   // Charger les candidats quand les filtres ou la pagination changent
//   useEffect(() => {
//     loadCandidates();
//   }, [filters, pagination.current, pagination.limit]);

//   // Charger les filtres sauvegardés au chargement de la page
//   useEffect(() => {
//     loadSavedFilters();
//   }, []);

//   return (
//     <div className="container mx-auto py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Search for candidates</h1>
//         <Button
//           variant="outline"
//           onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//         >
//           <Filter className="mr-2 h-4 w-4" />
//           Filters
//         </Button>
//       </div>

//       {isFiltersOpen && (
//         <Card className="mb-6">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle>Filter candidates</CardTitle>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={clearAllFilters}
//               className="flex items-center"
//             >
//               <RefreshCw className="mr-2 h-4 w-4" />
//               Clear all filters
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {/* Filtrage par compétences */}
//               <div className="space-y-2">
//                 <label className="font-medium">Skills</label>
//                 <div className="flex">
//                   <Input
//                     value={skillInput}
//                     onChange={(e) => setSkillInput(e.target.value)}
//                     placeholder="Add a skill"
//                     className="mr-2"
//                   />
//                   <Button onClick={addSkill} size="sm">
//                     +
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {filters.skills.map((skill) => (
//                     <span
//                       key={skill}
//                       className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
//                     >
//                       {skill}
//                       <X
//                         className="ml-1 h-3 w-3 cursor-pointer"
//                         onClick={() => removeSkill(skill)}
//                       />
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Filtrage par langues */}
//               <div className="space-y-2">
//                 <label className="font-medium">Languages</label>
//                 <div className="flex">
//                   <Input
//                     value={languageInput}
//                     onChange={(e) => setLanguageInput(e.target.value)}
//                     placeholder="Add a language"
//                     className="mr-2"
//                   />
//                   <Button onClick={addLanguage} size="sm">
//                     +
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {filters.languages.map((language) => (
//                     <span
//                       key={language}
//                       className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center"
//                     >
//                       {language}
//                       <X
//                         className="ml-1 h-3 w-3 cursor-pointer"
//                         onClick={() => removeLanguage(language)}
//                       />
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Filtrage par expérience */}
//               <div className="space-y-2">
//                 <label className="font-medium">Experience (years)</label>
//                 <div className="flex items-center space-x-2">
//                   <Input
//                     type="number"
//                     value={filters.experienceMin || ""}
//                     onChange={(e) =>
//                       setFilters({
//                         ...filters,
//                         experienceMin: e.target.value
//                           ? parseInt(e.target.value)
//                           : undefined,
//                       })
//                     }
//                     placeholder="Min"
//                   />
//                   <span>à</span>
//                   <Input
//                     type="number"
//                     value={filters.experienceMax || ""}
//                     onChange={(e) =>
//                       setFilters({
//                         ...filters,
//                         experienceMax: e.target.value
//                           ? parseInt(e.target.value)
//                           : undefined,
//                       })
//                     }
//                     placeholder="Max"
//                   />
//                 </div>
//               </div>

//               {/* Filtrage par disponibilité */}
//               <div className="space-y-2">
//                 <label className="font-medium">Availability</label>
//                 <div className="space-y-1">
//                   {Object.values(Availability).map((availability) => (
//                     <div key={availability} className="flex items-center">
//                       <Checkbox
//                         id={`availability-${availability}`}
//                         checked={filters.availability.includes(availability)}
//                         onCheckedChange={(checked) => {
//                           if (checked) {
//                             setFilters({
//                               ...filters,
//                               availability: [
//                                 ...filters.availability,
//                                 availability,
//                               ],
//                             });
//                           } else {
//                             setFilters({
//                               ...filters,
//                               availability: filters.availability.filter(
//                                 (a) => a !== availability
//                               ),
//                             });
//                           }
//                         }}
//                       />
//                       <label
//                         htmlFor={`availability-${availability}`}
//                         className="ml-2 text-sm"
//                       >
//                         {availability.replace("_", " ")}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Filtrage par type d'emploi */}
//               <div className="space-y-2">
//                 <label className="font-medium">Type of employment</label>
//                 <div className="space-y-1">
//                   {Object.values(JobType).map((jobType) => (
//                     <div key={jobType} className="flex items-center">
//                       <Checkbox
//                         id={`jobType-${jobType}`}
//                         checked={filters.jobTypes.includes(jobType)}
//                         onCheckedChange={(checked) => {
//                           if (checked) {
//                             setFilters({
//                               ...filters,
//                               jobTypes: [...filters.jobTypes, jobType],
//                             });
//                           } else {
//                             setFilters({
//                               ...filters,
//                               jobTypes: filters.jobTypes.filter(
//                                 (jt) => jt !== jobType
//                               ),
//                             });
//                           }
//                         }}
//                       />
//                       <label
//                         htmlFor={`jobType-${jobType}`}
//                         className="ml-2 text-sm"
//                       >
//                         {jobType.replace("_", " ")}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Filtrage par localisation */}
//               <div className="space-y-2">
//                 <label className="font-medium">Location</label>
//                 <Input
//                   value={filters.location || ""}
//                   onChange={(e) =>
//                     setFilters({
//                       ...filters,
//                       location: e.target.value || undefined,
//                     })
//                   }
//                   placeholder="City or country"
//                 />
//               </div>
//             </div>

//             {/* Sauvegarder le filtre */}
//             <div className="mt-6 border-t pt-4">
//               <div className="flex items-center">
//                 <Input
//                   value={newFilterName}
//                   onChange={(e) => setNewFilterName(e.target.value)}
//                   placeholder="Filter name"
//                   className="mr-2"
//                 />
//                 <Button onClick={saveFilter}>
//                   <Save className="mr-2 h-4 w-4" />
//                   Save this filter
//                 </Button>
//               </div>

//               {/* Filtres sauvegardés */}
//               {savedFilters.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="font-medium mb-2">Filtres sauvegardés</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {savedFilters.map((filter) => (
//                       <Button
//                         key={filter.id}
//                         variant="outline"
//                         size="sm"
//                         onClick={() => applyFilter(filter)}
//                       >
//                         {filter.name}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Liste des candidats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {candidates.map((candidate) => (
//           <Card
//             key={candidate.id}
//             className="cursor-pointer hover:shadow-md transition-shadow duration-200"
//             onClick={() => viewCandidateProfile(candidate.id)}
//           >
//             <CardHeader className="pb-2">
//               <CardTitle className="text-lg">
//                 {candidate.firstName} {candidate.lastName}
//               </CardTitle>
//               <p className="text-sm text-gray-500">{candidate.title}</p>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm mb-2">
//                 {candidate.experience}{" "}
//                 {candidate.experience > 1 ? "years" : "year"} of experience
//               </p>

//               {candidate.skills.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs font-medium text-gray-500 mb-1">
//                     Skills
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {candidate.skills.slice(0, 3).map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
//                       >
//                         {skill}
//                       </span>
//                     ))}
//                     {candidate.skills.length > 3 && (
//                       <span className="text-xs text-gray-500">
//                         +{candidate.skills.length - 3}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {candidate.languages.length > 0 && (
//                 <div className="mb-2">
//                   <p className="text-xs font-medium text-gray-500 mb-1">
//                     Languages
//                   </p>
//                   <div className="flex flex-wrap gap-1">
//                     {candidate.languages.map((language) => (
//                       <span
//                         key={language}
//                         className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
//                       >
//                         {language}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <div className="flex justify-between text-xs text-gray-500 mt-4">
//                 <span>{candidate.availability.replace("_", " ")}</span>
//                 {candidate.city && candidate.countryCode && (
//                   <span>
//                     {candidate.city}, {candidate.countryCode}
//                   </span>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       {pagination.pages > 1 && (
//         <div className="flex justify-center mt-6">
//           <div className="flex space-x-1">
//             <Button
//               variant="outline"
//               size="sm"
//               disabled={pagination.current === 1}
//               onClick={() =>
//                 setPagination({
//                   ...pagination,
//                   current: pagination.current - 1,
//                 })
//               }
//             >
//               Previous
//             </Button>

//             {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
//               (page) => (
//                 <Button
//                   key={page}
//                   variant={pagination.current === page ? "default" : "outline"}
//                   size="sm"
//                   onClick={() =>
//                     setPagination({ ...pagination, current: page })
//                   }
//                 >
//                   {page}
//                 </Button>
//               )
//             )}

//             <Button
//               variant="outline"
//               size="sm"
//               disabled={pagination.current === pagination.pages}
//               onClick={() =>
//                 setPagination({
//                   ...pagination,
//                   current: pagination.current + 1,
//                 })
//               }
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// ------------------------------------------------------------------

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Filter, Save, X, RefreshCw, HelpCircle } from "lucide-react";
// import { Availability, JobType } from "@prisma/client";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// // import { SubscriptionStatus } from "@prisma/client";
// import { LoadingSpinner } from "@/components/general/loading-spinner";

// // Types
// type Candidate = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   title: string;
//   experience: number;
//   skills: string[];
//   languages: string[];
//   availability: Availability;
//   preferredJobType: JobType[];
//   countryCode?: string;
//   city?: string;
// };

// type Pagination = {
//   total: number;
//   pages: number;
//   current: number;
//   limit: number;
// };

// type FilterState = {
//   skills: string[];
//   languages: string[];
//   experienceMin?: number;
//   experienceMax?: number;
//   availability: Availability[];
//   jobTypes: JobType[];
//   location?: string;
// };

// export default function CandidatesPage() {
//   const router = useRouter();
//   const [hasValidSubscription, setHasValidSubscription] = useState<
//     boolean | null
//   >(null);
//   const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

//   //   const searchParams = useSearchParams();

//   // État pour les filtres
//   const [filters, setFilters] = useState<FilterState>({
//     skills: [],
//     languages: [],
//     experienceMin: 0,
//     experienceMax: 40,
//     availability: [],
//     jobTypes: [],
//     location: undefined,
//   });

//   // État pour la liste des candidats
//   const [candidates, setCandidates] = useState<Candidate[]>([]);
//   const [pagination, setPagination] = useState<Pagination>({
//     total: 0,
//     pages: 0,
//     current: 1,
//     limit: 10,
//   });

//   // État pour les filtres sauvegardés
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [savedFilters, setSavedFilters] = useState<any[]>([]);
//   const [newFilterName, setNewFilterName] = useState("");
//   const [isFiltersOpen, setIsFiltersOpen] = useState(false);

//   // État pour l'input de compétence et langue
//   const [skillInput, setSkillInput] = useState("");
//   const [languageInput, setLanguageInput] = useState("");

//   const [isLoading, setIsLoading] = useState(false);

//   // Fonction pour réinitialiser tous les filtres
//   const clearAllFilters = () => {
//     setFilters({
//       skills: [],
//       languages: [],
//       experienceMin: 0,
//       experienceMax: 40,
//       availability: [],
//       jobTypes: [],
//       location: undefined,
//     });
//     toast.success("All filters cleared");
//   };

//   // Charger les candidats
//   const loadCandidates = async () => {
//     setIsLoading(true);
//     try {
//       console.log("Loading candidates with filters:", filters);
//       // Construire l'URL avec les filtres
//       let url = `/api/candidates?page=${pagination.current}&limit=${pagination.limit}`;

//       if (filters.skills && filters.skills.length > 0)
//         url += `&skills=${filters.skills.join(",")}`;
//       if (filters.languages && filters.languages.length > 0)
//         url += `&languages=${filters.languages.join(",")}`;

//       // Only add experience filters if they have valid values
//       if (filters.experienceMin !== undefined && filters.experienceMin !== null)
//         url += `&experienceMin=${filters.experienceMin}`;
//       if (filters.experienceMax !== undefined && filters.experienceMax !== null)
//         url += `&experienceMax=${filters.experienceMax}`;

//       if (filters.availability && filters.availability.length > 0)
//         url += `&availability=${filters.availability.join(",")}`;
//       if (filters.jobTypes && filters.jobTypes.length > 0)
//         url += `&jobTypes=${filters.jobTypes.join(",")}`;
//       if (filters.location) url += `&location=${filters.location}`;

//       console.log("Request URL:", url);

//       const response = await fetch(url);
//       const data = await response.json();

//       if (response.ok) {
//         console.log("Received candidates:", data.candidates);
//         setCandidates(data.candidates);
//         setPagination(data.pagination);
//       } else {
//         console.error("Error loading candidates:", data.error);
//         toast.error("Error loading candidates", data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(
//         error instanceof Error ? error.message : "An unexpected error occurred"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Charger les filtres sauvegardés
//   const loadSavedFilters = async () => {
//     try {
//       setIsLoading(true);
//       console.log("Fetching saved filters...");
//       const response = await fetch("/api/candidates/filters");
//       const data = await response.json();
//       console.log("API response:", data);

//       if (response.ok) {
//         console.log("Setting saved filters:", data);
//         setSavedFilters(data);
//       } else {
//         console.error("Error loading filters :", data.error);
//         toast.error("Error loading filters :", data.error);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error(
//         error instanceof Error ? error.message : "An unexpected error occurred"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Sauvegarder un filtre
//   const saveFilter = async () => {
//     try {
//       if (!newFilterName.trim()) {
//         toast("Please enter a name for the filter");
//         return;
//       }

//       const response = await fetch("/api/candidates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name: newFilterName,
//           ...filters,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setNewFilterName("");
//         loadSavedFilters();
//       } else {
//         console.error("Error saving filter:", data.error);
//         toast.error("Error saving filter:", data.error);
//       }
//     } catch (error) {
//       console.error("Error saving filter:", error);
//       toast.error("Error saving filter");
//     }
//   };

//   // Appliquer un filtre sauvegardé
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const applyFilter = (filter: any) => {
//     console.log("Applying filter:", filter);

//     // Ensure arrays are properly handled
//     const processedFilter = {
//       skills: Array.isArray(filter.skills)
//         ? filter.skills
//         : filter.skills
//         ? filter.skills.split(",")
//         : [],
//       languages: Array.isArray(filter.languages)
//         ? filter.languages
//         : filter.languages
//         ? filter.languages.split(",")
//         : [],
//       experienceMin:
//         filter.experienceMin !== undefined
//           ? Number(filter.experienceMin)
//           : undefined,
//       experienceMax:
//         filter.experienceMax !== undefined
//           ? Number(filter.experienceMax)
//           : undefined,
//       availability: Array.isArray(filter.availability)
//         ? filter.availability
//         : filter.availability
//         ? filter.availability.split(",")
//         : [],
//       jobTypes: Array.isArray(filter.jobTypes)
//         ? filter.jobTypes
//         : filter.jobTypes
//         ? filter.jobTypes.split(",")
//         : [],
//       location: filter.location || undefined,
//     };
//     console.log("Processed filter data:", processedFilter);
//     //
//     setFilters(processedFilter);
//   };

//   // Ajouter une compétence
//   const addSkill = () => {
//     if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
//       setFilters({
//         ...filters,
//         skills: [...filters.skills, skillInput.trim()],
//       });
//       setSkillInput("");
//     }
//   };

//   // Ajouter une langue
//   const addLanguage = () => {
//     if (
//       languageInput.trim() &&
//       !filters.languages.includes(languageInput.trim())
//     ) {
//       setFilters({
//         ...filters,
//         languages: [...filters.languages, languageInput.trim()],
//       });
//       setLanguageInput("");
//     }
//   };

//   // Supprimer une compétence
//   const removeSkill = (skill: string) => {
//     setFilters({
//       ...filters,
//       skills: filters.skills.filter((s) => s !== skill),
//     });
//   };

//   // Supprimer une langue
//   const removeLanguage = (language: string) => {
//     setFilters({
//       ...filters,
//       languages: filters.languages.filter((l) => l !== language),
//     });
//   };

//   // Voir un profil de candidat
//   const viewCandidateProfile = async (candidateId: string) => {
//     try {
//       // Enregistrer la vue
//       await fetch("/api/candidates", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           jobSeekerId: candidateId,
//         }),
//       });

//       // Rediriger vers le profil du candidat
//       router.push(`/company/candidates/${candidateId}`);
//     } catch (error) {
//       console.error("Error saving view:", error);
//       toast.error("Error saving view");
//     }
//   };

//   // Vérifier l'abonnement au chargement de la page
//   // useEffect(() => {
//   //   const checkSubscription = async () => {
//   //     try {
//   //       const response = await fetch("/api/recruiter/database-access");
//   //       const data = await response.json();

//   //       if (
//   //         response.ok &&
//   //         (data.status === "ACTIVE" || data.status === "EXPIRING_SOON")
//   //       ) {
//   //         setHasValidSubscription(true);
//   //       } else {
//   //         setHasValidSubscription(false);
//   //         toast.error("You need an active subscription to access this feature");
//   //         router.push("/company/subscription");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error checking subscription:", error);
//   //       toast.error("Error checking subscription status");
//   //       setHasValidSubscription(false);
//   //     } finally {
//   //       setIsLoadingSubscription(false);
//   //     }
//   //   };

//   //   checkSubscription();
//   // }, [router]);

//   // avec le changement du code de la route
//   // Vérifier l'abonnement au chargement de la page
//   useEffect(() => {
//     const checkDatabaseAccess = async () => {
//       setIsLoadingSubscription(true);
//       try {
//         const response = await fetch("/api/recruiter/database-access/status");
//         const data = await response.json();

//         if (response.ok) {
//           // Vérification avec les valeurs exactes retournées par l'API (en lowercase)
//           const hasAccess =
//             data.active &&
//             (data.status === "active" || data.status === "expiring_soon");

//           setHasValidSubscription(hasAccess);

//           if (!hasAccess) {
//             toast.error(
//               "You need an active subscription to access candidate database"
//             );
//             router.push("/company/subscription");
//           }
//         } else {
//           throw new Error(data.error || "Failed to check subscription");
//         }
//       } catch (error) {
//         console.error("Error checking database access:", error);
//         toast.error("Error verifying your subscription status");
//         setHasValidSubscription(false);
//       } finally {
//         setIsLoadingSubscription(false);
//       }
//     };

//     checkDatabaseAccess();
//   }, [router]);

//   // Charger les candidats quand les filtres ou la pagination changent avec un debounce
//   useEffect(() => {
//     const handler = setTimeout(() => {
//       loadCandidates();
//     }, 500); // 500ms de délai
//     return () => clearTimeout(handler);
//   }, [filters, pagination.current, pagination.limit]);

//   // Validation des filtres d'expérience
//   const setExperienceFilter = (type: "min" | "max", value: string) => {
//     // Convertir en nombre et gérer les valeurs négatives
//     // const numValue = value ? Math.max(0, parseInt(value)) : undefined;
//     const numValue = Math.max(0, Math.min(40, parseInt(value)));
//     setFilters((prev) => {
//       const newMin = type === "min" ? numValue : prev.experienceMin || 0;
//       const newMax = type === "max" ? numValue : prev.experienceMax || 40;

//       // Validation: min ne doit pas être supérieur à max
//       //
//       if (newMin > newMax) {
//         toast.error(
//           "Minimum experience cannot be greater than maximum experience"
//         );
//         return prev;
//       }

//       return {
//         ...prev,
//         experienceMin: newMin ?? 0,
//         experienceMax: newMax ?? 40,
//       };
//     });
//   };

//   // Charger les filtres sauvegardés au chargement de la page
//   useEffect(() => {
//     loadSavedFilters();
//   }, []);

//   if (isLoadingSubscription) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (!hasValidSubscription) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Card className="w-full max-w-md text-center">
//           <CardHeader>
//             <CardTitle>Subscription Required</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="mb-4">
//               You need an active subscription to access candidate search.
//             </p>
//             <Button onClick={() => router.push("/company/subscription")}>
//               View Subscription Plans
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }
//   return (
//     <div className="container mx-auto py-8">
//       <TooltipProvider
//         delayDuration={300}
//         skipDelayDuration={0}
//         disableHoverableContent
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Search for candidates</h1>
//           <Button
//             // variant="outline"
//             disabled={isLoading}
//             onClick={() => setIsFiltersOpen(!isFiltersOpen)}
//           >
//             <Filter className="mr-2 h-4 w-4" />
//             Filters
//             {isLoading && (
//               <span className="ml-2 h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></span>
//             )}
//           </Button>
//         </div>

//         {isFiltersOpen && (
//           <Card className="mb-6">
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle>Filter candidates</CardTitle>
//               <Button
//                 variant="destructive"
//                 disabled={isLoading}
//                 size="sm"
//                 onClick={clearAllFilters}
//                 className="flex items-center"
//               >
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Clear all filters
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {/* Filtrage par compétences */}
//                 <div className="space-y-2">
//                   <label className="font-medium">Skills</label>
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <button>
//                         <HelpCircle className="h-4 w-4 text-gray-500" />
//                       </button>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>
//                         Add skills relevant to the job. Multiple skills can be
//                         added.
//                       </p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <div className="flex">
//                     <Input
//                       value={skillInput}
//                       onChange={(e) => setSkillInput(e.target.value)}
//                       placeholder="Add a skill"
//                       className="mr-2"
//                       disabled={isLoading}
//                     />
//                     <Button onClick={addSkill} size="sm" disabled={isLoading}>
//                       +
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {filters.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
//                       >
//                         {skill}
//                         <X
//                           className="ml-1 h-3 w-3 cursor-pointer"
//                           onClick={() => !isLoading && removeSkill(skill)}
//                         />
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Filtrage par langues */}
//                 <div className="space-y-2">
//                   <label className="font-medium">Languages</label>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <HelpCircle className="h-4 w-4 text-gray-500" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>
//                         Add languages relevant to the job. Multiple languages
//                         can be added.
//                       </p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <div className="flex">
//                     <Input
//                       value={languageInput}
//                       onChange={(e) => setLanguageInput(e.target.value)}
//                       placeholder="Add a language"
//                       className="mr-2"
//                       disabled={isLoading}
//                     />
//                     <Button
//                       onClick={addLanguage}
//                       size="sm"
//                       disabled={isLoading}
//                     >
//                       +
//                     </Button>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     {filters.languages.map((language) => (
//                       <span
//                         key={language}
//                         className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center"
//                       >
//                         {language}
//                         <X
//                           className="ml-1 h-3 w-3 cursor-pointer"
//                           onClick={() => !isLoading && removeLanguage(language)}
//                         />
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Filtrage par expérience */}
//                 {/* <div className="space-y-2">
//                   <label className="font-medium">Experience (years)</label>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <HelpCircle className="h-4 w-4 text-gray-500" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Filter candidates by their total work experience.</p>
//                       <p>Minimum: 0 years (entry-level)</p>
//                       <p>Maximum: No upper limit by default</p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <div className="flex items-center space-x-2">
//                     <Input
//                       type="number"
//                       min={0}
//                       value={filters.experienceMin || 0}
//                       //
//                       onChange={(e) =>
//                         setExperienceFilter("min", e.target.value)
//                       }
//                       placeholder="Min"
//                     />
//                     <span>à</span>
//                     <Input
//                       type="number"
//                       min={1}
//                       value={filters.experienceMax || 99}
//                       //
//                       onChange={(e) =>
//                         setExperienceFilter("max", e.target.value)
//                       }
//                       placeholder="Max"
//                     />
//                   </div>
//                 </div> */}

//                 <div className="space-y-2">
//                   <div className="flex items-center">
//                     <label className="font-medium mr-2">
//                       Experience (years)
//                     </label>
//                     <Tooltip>
//                       <TooltipTrigger>
//                         <HelpCircle className="h-4 w-4 text-gray-500" />
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Filter candidates by their total work experience.</p>
//                         <p>Use sliders to select experience range.</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </div>
//                   <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
//                     <div className="w-full md:w-1/2">
//                       <label className="text-sm mb-1 block">
//                         Minimum Experience
//                       </label>
//                       <Input
//                         type="range"
//                         min={0}
//                         max={40}
//                         value={filters.experienceMin || 0}
//                         onChange={(e) =>
//                           setExperienceFilter("min", e.target.value)
//                         }
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                         disabled={isLoading}
//                       />
//                       <div className="text-center text-sm mt-1">
//                         {filters.experienceMin || 0} years
//                       </div>
//                     </div>

//                     <div className="w-full md:w-1/2">
//                       <label className="text-sm mb-1 block">
//                         Maximum Experience
//                       </label>
//                       <Input
//                         type="range"
//                         min={0}
//                         max={40}
//                         value={filters.experienceMax || 40}
//                         onChange={(e) =>
//                           setExperienceFilter("max", e.target.value)
//                         }
//                         className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                         disabled={isLoading}
//                       />
//                       <div className="text-center text-sm mt-1">
//                         {filters.experienceMax === 40
//                           ? "40+ years"
//                           : `${filters.experienceMax} years`}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Filtrage par disponibilité */}
//                 <div className="space-y-2">
//                   <label className="font-medium">Availability</label>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <HelpCircle className="h-4 w-4 text-gray-500" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Select the availability status of candidates.</p>
//                       <p>Choose one or multiple options.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <div className="space-y-2 p-2 border rounded-md">
//                     {Object.values(Availability).map((availability) => (
//                       <div key={availability} className="flex items-center">
//                         <Checkbox
//                           id={`availability-${availability}`}
//                           checked={filters.availability.includes(availability)}
//                           onCheckedChange={(checked) => {
//                             if (!isLoading) {
//                               if (checked) {
//                                 setFilters({
//                                   ...filters,
//                                   availability: [
//                                     ...filters.availability,
//                                     availability,
//                                   ],
//                                 });
//                               } else {
//                                 setFilters({
//                                   ...filters,
//                                   availability: filters.availability.filter(
//                                     (a) => a !== availability
//                                   ),
//                                 });
//                               }
//                             }
//                           }}
//                           className="h-4 w-4 text-blue-600"
//                           disabled={isLoading}
//                         />
//                         <label
//                           htmlFor={`availability-${availability}`}
//                           className="ml-2 text-sm font-medium"
//                         >
//                           {availability.replace("_", " ")}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Filtrage par type d'emploi */}
//                 <div className="space-y-2">
//                   <label className="font-medium">Type of employment</label>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <HelpCircle className="h-4 w-4 text-gray-500" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Filter candidates by their preferred job types.</p>
//                       <p>Select one or multiple employment types.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <div className="space-y-2 p-2 border rounded-md">
//                     {Object.values(JobType).map((jobType) => (
//                       <div key={jobType} className="flex items-center">
//                         <Checkbox
//                           id={`jobType-${jobType}`}
//                           checked={filters.jobTypes.includes(jobType)}
//                           onCheckedChange={(checked) => {
//                             if (!isLoading) {
//                               if (checked) {
//                                 setFilters({
//                                   ...filters,
//                                   jobTypes: [...filters.jobTypes, jobType],
//                                 });
//                               } else {
//                                 setFilters({
//                                   ...filters,
//                                   jobTypes: filters.jobTypes.filter(
//                                     (jt) => jt !== jobType
//                                   ),
//                                 });
//                               }
//                             }
//                           }}
//                           className="h-4 w-4 text-blue-600"
//                           disabled={isLoading}
//                         />
//                         <label
//                           htmlFor={`jobType-${jobType}`}
//                           className="ml-2 text-sm font-medium"
//                         >
//                           {jobType.replace("_", " ")}
//                         </label>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Filtrage par localisation */}
//                 <div className="space-y-2">
//                   <label className="font-medium">Location</label>
//                   <Tooltip>
//                     <TooltipTrigger>
//                       <HelpCircle className="h-4 w-4 text-gray-500" />
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>Search candidates by city or country.</p>
//                       <p>Partial matches are supported.</p>
//                     </TooltipContent>
//                   </Tooltip>
//                   <Input
//                     value={filters.location || ""}
//                     onChange={(e) =>
//                       setFilters({
//                         ...filters,
//                         location: e.target.value || undefined,
//                       })
//                     }
//                     placeholder="City or country"
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               {/* Sauvegarder le filtre */}
//               <div className="mt-6 border-t pt-4">
//                 <div className="flex items-center">
//                   <Input
//                     value={newFilterName}
//                     onChange={(e) => setNewFilterName(e.target.value)}
//                     placeholder="Filter name"
//                     className="mr-2"
//                     disabled={isLoading}
//                   />
//                   <Button disabled={isLoading} onClick={saveFilter}>
//                     <Save className="mr-2 h-4 w-4" />
//                     {isLoading ? "Saving..." : "Save this filter"}
//                     {isLoading && (
//                       <span className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                     )}
//                   </Button>
//                 </div>

//                 {/* Filtres sauvegardés */}
//                 {savedFilters.length > 0 && (
//                   <div className="mt-4">
//                     <h3 className="font-medium mb-2">Saved filters</h3>
//                     <div className="flex flex-wrap gap-2">
//                       {savedFilters.map((filter) => (
//                         <Button
//                           key={filter.id}
//                           variant="outline"
//                           size="sm"
//                           onClick={() => applyFilter(filter)}
//                           disabled={isLoading}
//                         >
//                           {filter.name}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Liste des candidats */}
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {candidates.map((candidate) => (
//             <Card
//               key={candidate.id}
//               className="cursor-pointer hover:shadow-md transition-shadow duration-200"
//               onClick={() => viewCandidateProfile(candidate.id)}
//             >
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-lg">
//                   {candidate.firstName} {candidate.lastName}
//                 </CardTitle>
//                 <p className="text-sm text-gray-500">{candidate.title}</p>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm mb-2">
//                   {candidate.experience}{" "}
//                   {candidate.experience > 1 ? "years" : "year"} of experience
//                 </p>

//                 {candidate.skills.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-xs font-medium text-gray-500 mb-1">
//                       Skills
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {candidate.skills.slice(0, 3).map((skill) => (
//                         <span
//                           key={skill}
//                           className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                       {candidate.skills.length > 3 && (
//                         <span className="text-xs text-gray-500">
//                           +{candidate.skills.length - 3}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {candidate.languages.length > 0 && (
//                   <div className="mb-2">
//                     <p className="text-xs font-medium text-gray-500 mb-1">
//                       Languages
//                     </p>
//                     <div className="flex flex-wrap gap-1">
//                       {candidate.languages.map((language) => (
//                         <span
//                           key={language}
//                           className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
//                         >
//                           {language}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-between text-xs text-gray-500 mt-4">
//                   <span>{candidate.availability.replace("_", " ")}</span>
//                   {candidate.city && candidate.countryCode && (
//                     <span>
//                       {candidate.city}, {candidate.countryCode}
//                     </span>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}

//         {isLoading ? (
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//           </div>
//         ) : candidates.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {candidates.map((candidate) => (
//               <Card
//                 key={candidate.id}
//                 className="cursor-pointer hover:shadow-md transition-shadow duration-200"
//                 onClick={() => !isLoading && viewCandidateProfile(candidate.id)}
//               >
//                 <CardHeader className="pb-2">
//                   <CardTitle className="text-lg">
//                     {candidate.firstName} {candidate.lastName}
//                   </CardTitle>
//                   <p className="text-sm text-gray-500">{candidate.title}</p>
//                 </CardHeader>
//                 <CardContent>
//                   <p className="text-sm mb-2">
//                     {candidate.experience}{" "}
//                     {candidate.experience > 1 ? "years" : "year"} of experience
//                   </p>

//                   {candidate.skills.length > 0 && (
//                     <div className="mb-2">
//                       <p className="text-xs font-medium text-gray-500 mb-1">
//                         Skills
//                       </p>
//                       <div className="flex flex-wrap gap-1">
//                         {candidate.skills.slice(0, 3).map((skill) => (
//                           <span
//                             key={skill}
//                             className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
//                           >
//                             {skill}
//                           </span>
//                         ))}
//                         {candidate.skills.length > 3 && (
//                           <span className="text-xs text-gray-500">
//                             +{candidate.skills.length - 3}
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   )}

//                   {candidate.languages.length > 0 && (
//                     <div className="mb-2">
//                       <p className="text-xs font-medium text-gray-500 mb-1">
//                         Languages
//                       </p>
//                       <div className="flex flex-wrap gap-1">
//                         {candidate.languages.map((language) => (
//                           <span
//                             key={language}
//                             className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
//                           >
//                             {language}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex justify-between text-xs text-gray-500 mt-4">
//                     <span>{candidate.availability.replace("_", " ")}</span>
//                     {candidate.city && candidate.countryCode && (
//                       <span>
//                         {candidate.city}, {candidate.countryCode}
//                       </span>
//                     )}
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12">
//             <p className="text-lg  mb-4">No candidates found</p>
//             <Button
//               variant="destructive"
//               onClick={clearAllFilters}
//               disabled={isLoading}
//             >
//               <RefreshCw className="mr-2 h-4 w-4" />
//               Clear all filters
//             </Button>
//           </div>
//         )}

//         {/* Pagination */}
//         {/* {pagination.pages > 1 && (
//           <div className="flex justify-center mt-6">
//             <div className="flex space-x-1">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={pagination.current === 1}
//                 onClick={() =>
//                   setPagination({
//                     ...pagination,
//                     current: pagination.current - 1,
//                   })
//                 }
//               >
//                 Previous
//               </Button>

//               {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
//                 (page) => (
//                   <Button
//                     key={page}
//                     variant={
//                       pagination.current === page ? "default" : "outline"
//                     }
//                     size="sm"
//                     onClick={() =>
//                       setPagination({ ...pagination, current: page })
//                     }
//                   >
//                     {page}
//                   </Button>
//                 )
//               )}

//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={pagination.current === pagination.pages}
//                 onClick={() =>
//                   setPagination({
//                     ...pagination,
//                     current: pagination.current + 1,
//                   })
//                 }
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         )} */}

//         {!isLoading && pagination.pages > 1 && (
//           <div className="flex justify-center mt-6">
//             <div className="flex space-x-1">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={pagination.current === 1 || isLoading}
//                 onClick={() =>
//                   setPagination({
//                     ...pagination,
//                     current: pagination.current - 1,
//                   })
//                 }
//               >
//                 Previous
//               </Button>

//               {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
//                 (page) => (
//                   <Button
//                     key={page}
//                     variant={
//                       pagination.current === page ? "default" : "outline"
//                     }
//                     size="sm"
//                     onClick={() =>
//                       setPagination({ ...pagination, current: page })
//                     }
//                     disabled={isLoading}
//                   >
//                     {page}
//                   </Button>
//                 )
//               )}

//               <Button
//                 variant="outline"
//                 size="sm"
//                 disabled={pagination.current === pagination.pages || isLoading}
//                 onClick={() =>
//                   setPagination({
//                     ...pagination,
//                     current: pagination.current + 1,
//                   })
//                 }
//               >
//                 Next
//               </Button>
//             </div>
//           </div>
//         )}
//       </TooltipProvider>
//     </div>
//   );
// }

// --------------------------------------------------------
// 06/05/2025 compatible next-intl

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Filter, Save, X, RefreshCw, HelpCircle } from "lucide-react";
import { Availability, JobType } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LoadingSpinner } from "@/components/general/loading-spinner";
import { useTranslations } from "next-intl";

type Candidate = {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  experience: number;
  skills: string[];
  languages: string[];
  availability: Availability;
  preferredJobType: JobType[];
  countryCode?: string;
  city?: string;
};

type Pagination = {
  total: number;
  pages: number;
  current: number;
  limit: number;
};

type FilterState = {
  skills: string[];
  languages: string[];
  experienceMin?: number;
  experienceMax?: number;
  availability: Availability[];
  jobTypes: JobType[];
  location?: string;
};

export default function CandidatesPage() {
  const t = useTranslations("CandidatesPage");
  const router = useRouter();
  const [hasValidSubscription, setHasValidSubscription] = useState<
    boolean | null
  >(null);
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    skills: [],
    languages: [],
    experienceMin: 0,
    experienceMax: 40,
    availability: [],
    jobTypes: [],
    location: undefined,
  });

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    pages: 0,
    current: 1,
    limit: 10,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [savedFilters, setSavedFilters] = useState<any[]>([]);
  const [newFilterName, setNewFilterName] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [skillInput, setSkillInput] = useState("");
  const [languageInput, setLanguageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearAllFilters = () => {
    setFilters({
      skills: [],
      languages: [],
      experienceMin: 0,
      experienceMax: 40,
      availability: [],
      jobTypes: [],
      location: undefined,
    });
    toast.success(t("filtersCleared"));
  };

  const loadCandidates = async () => {
    setIsLoading(true);
    try {
      let url = `/api/candidates?page=${pagination.current}&limit=${pagination.limit}`;

      if (filters.skills && filters.skills.length > 0)
        url += `&skills=${filters.skills.join(",")}`;
      if (filters.languages && filters.languages.length > 0)
        url += `&languages=${filters.languages.join(",")}`;

      if (filters.experienceMin !== undefined && filters.experienceMin !== null)
        url += `&experienceMin=${filters.experienceMin}`;
      if (filters.experienceMax !== undefined && filters.experienceMax !== null)
        url += `&experienceMax=${filters.experienceMax}`;

      if (filters.availability && filters.availability.length > 0)
        url += `&availability=${filters.availability.join(",")}`;
      if (filters.jobTypes && filters.jobTypes.length > 0)
        url += `&jobTypes=${filters.jobTypes.join(",")}`;
      if (filters.location) url += `&location=${filters.location}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setCandidates(data.candidates);
        setPagination(data.pagination);
      } else {
        toast.error(t("loadCandidatesError"), { description: data.error });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("unexpectedError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loadSavedFilters = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/candidates/filters");
      const data = await response.json();

      if (response.ok) {
        setSavedFilters(data);
      } else {
        toast.error(t("loadFiltersError"), { description: data.error });
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : t("unexpectedError")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const saveFilter = async () => {
    try {
      if (!newFilterName.trim()) {
        toast(t("filterNameRequired"));
        return;
      }

      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFilterName,
          ...filters,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNewFilterName("");
        loadSavedFilters();
      } else {
        toast.error(t("saveFilterError"), { description: data.error });
      }
    } catch (error) {
      toast.error(t("saveFilterError"));
      console.error("Error saving filter:", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyFilter = (filter: any) => {
    const processedFilter = {
      skills: Array.isArray(filter.skills)
        ? filter.skills
        : filter.skills
        ? filter.skills.split(",")
        : [],
      languages: Array.isArray(filter.languages)
        ? filter.languages
        : filter.languages
        ? filter.languages.split(",")
        : [],
      experienceMin:
        filter.experienceMin !== undefined
          ? Number(filter.experienceMin)
          : undefined,
      experienceMax:
        filter.experienceMax !== undefined
          ? Number(filter.experienceMax)
          : undefined,
      availability: Array.isArray(filter.availability)
        ? filter.availability
        : filter.availability
        ? filter.availability.split(",")
        : [],
      jobTypes: Array.isArray(filter.jobTypes)
        ? filter.jobTypes
        : filter.jobTypes
        ? filter.jobTypes.split(",")
        : [],
      location: filter.location || undefined,
    };

    setFilters(processedFilter);
  };

  const addSkill = () => {
    if (skillInput.trim() && !filters.skills.includes(skillInput.trim())) {
      setFilters({
        ...filters,
        skills: [...filters.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const addLanguage = () => {
    if (
      languageInput.trim() &&
      !filters.languages.includes(languageInput.trim())
    ) {
      setFilters({
        ...filters,
        languages: [...filters.languages, languageInput.trim()],
      });
      setLanguageInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter((s) => s !== skill),
    });
  };

  const removeLanguage = (language: string) => {
    setFilters({
      ...filters,
      languages: filters.languages.filter((l) => l !== language),
    });
  };

  const viewCandidateProfile = async (candidateId: string) => {
    try {
      await fetch("/api/candidates", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobSeekerId: candidateId,
        }),
      });

      router.push(`/company/candidates/${candidateId}`);
    } catch (error) {
      toast.error(t("saveViewError"));
      console.error("Error saving view:", error);
    }
  };

  useEffect(() => {
    const checkDatabaseAccess = async () => {
      setIsLoadingSubscription(true);
      try {
        const response = await fetch("/api/recruiter/database-access/status");
        const data = await response.json();

        if (response.ok) {
          const hasAccess =
            data.active &&
            (data.status === "active" || data.status === "expiring_soon");

          setHasValidSubscription(hasAccess);

          if (!hasAccess) {
            toast.error(t("subscriptionRequired"));
            router.push("/company/subscription");
          }
        } else {
          throw new Error(data.error || t("checkSubscriptionError"));
        }
      } catch (error) {
        toast.error(t("verifySubscriptionError"));
        console.error("Error verifying your subscription status:", error);

        setHasValidSubscription(false);
      } finally {
        setIsLoadingSubscription(false);
      }
    };

    checkDatabaseAccess();
  }, [router, t]);

  useEffect(() => {
    const handler = setTimeout(() => {
      loadCandidates();
    }, 500);
    return () => clearTimeout(handler);
  }, [filters, pagination.current, pagination.limit]);

  const setExperienceFilter = (type: "min" | "max", value: string) => {
    const numValue = Math.max(0, Math.min(40, parseInt(value)));
    setFilters((prev) => {
      const newMin = type === "min" ? numValue : prev.experienceMin || 0;
      const newMax = type === "max" ? numValue : prev.experienceMax || 40;

      if (newMin > newMax) {
        toast.error(t("experienceValidationError"));
        return prev;
      }

      return {
        ...prev,
        experienceMin: newMin ?? 0,
        experienceMax: newMax ?? 40,
      };
    });
  };

  useEffect(() => {
    loadSavedFilters();
  }, []);

  if (isLoadingSubscription) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!hasValidSubscription) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>{t("subscriptionTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{t("subscriptionMessage")}</p>
            <Button onClick={() => router.push("/company/subscription")}>
              {t("viewPlansButton")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <TooltipProvider
        delayDuration={300}
        skipDelayDuration={0}
        disableHoverableContent
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t("pageTitle")}</h1>
          <Button
            disabled={isLoading}
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <Filter className="mr-2 h-4 w-4" />
            {t("filtersButton")}
            {isLoading && (
              <span className="ml-2 h-4 w-4 border-2 border-t-transparent rounded-full animate-spin"></span>
            )}
          </Button>
        </div>

        {isFiltersOpen && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{t("filterTitle")}</CardTitle>
              <Button
                variant="destructive"
                disabled={isLoading}
                size="sm"
                onClick={clearAllFilters}
                className="flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {t("clearFiltersButton")}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Skills Filter */}
                <div className="space-y-2">
                  <label className="font-medium">{t("skillsLabel")}</label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("skillsTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex">
                    <Input
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder={t("addSkillPlaceholder")}
                      className="mr-2"
                      disabled={isLoading}
                    />
                    <Button onClick={addSkill} size="sm" disabled={isLoading}>
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {skill}
                        <X
                          className="ml-1 h-3 w-3 cursor-pointer"
                          onClick={() => !isLoading && removeSkill(skill)}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages Filter */}
                <div className="space-y-2">
                  <label className="font-medium">{t("languagesLabel")}</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("languagesTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="flex">
                    <Input
                      value={languageInput}
                      onChange={(e) => setLanguageInput(e.target.value)}
                      placeholder={t("addLanguagePlaceholder")}
                      className="mr-2"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={addLanguage}
                      size="sm"
                      disabled={isLoading}
                    >
                      +
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {filters.languages.map((language) => (
                      <span
                        key={language}
                        className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {language}
                        <X
                          className="ml-1 h-3 w-3 cursor-pointer"
                          onClick={() => !isLoading && removeLanguage(language)}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label className="font-medium mr-2">
                      {t("experienceLabel")}
                    </label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t("experienceTooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2">
                      <label className="text-sm mb-1 block">
                        {t("minExperienceLabel")}
                      </label>
                      <Input
                        type="range"
                        min={0}
                        max={40}
                        value={filters.experienceMin || 0}
                        onChange={(e) =>
                          setExperienceFilter("min", e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        disabled={isLoading}
                      />
                      <div className="text-center text-sm mt-1">
                        {filters.experienceMin || 0} {t("years")}
                      </div>
                    </div>

                    <div className="w-full md:w-1/2">
                      <label className="text-sm mb-1 block">
                        {t("maxExperienceLabel")}
                      </label>
                      <Input
                        type="range"
                        min={0}
                        max={40}
                        value={filters.experienceMax || 40}
                        onChange={(e) =>
                          setExperienceFilter("max", e.target.value)
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        disabled={isLoading}
                      />
                      <div className="text-center text-sm mt-1">
                        {filters.experienceMax === 40
                          ? t("40plusYears")
                          : `${filters.experienceMax} ${t("years")}`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability Filter */}
                <div className="space-y-2">
                  <label className="font-medium">
                    {t("availabilityLabel")}
                  </label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("availabilityTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="space-y-2 p-2 border rounded-md">
                    {Object.values(Availability).map((availability) => (
                      <div key={availability} className="flex items-center">
                        <Checkbox
                          id={`availability-${availability}`}
                          checked={filters.availability.includes(availability)}
                          onCheckedChange={(checked) => {
                            if (!isLoading) {
                              if (checked) {
                                setFilters({
                                  ...filters,
                                  availability: [
                                    ...filters.availability,
                                    availability,
                                  ],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  availability: filters.availability.filter(
                                    (a) => a !== availability
                                  ),
                                });
                              }
                            }
                          }}
                          className="h-4 w-4 text-blue-600"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor={`availability-${availability}`}
                          className="ml-2 text-sm font-medium"
                        >
                          {t(`availability.${availability}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Job Type Filter */}
                <div className="space-y-2">
                  <label className="font-medium">{t("jobTypeLabel")}</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("jobTypeTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="space-y-2 p-2 border rounded-md">
                    {Object.values(JobType).map((jobType) => (
                      <div key={jobType} className="flex items-center">
                        <Checkbox
                          id={`jobType-${jobType}`}
                          checked={filters.jobTypes.includes(jobType)}
                          onCheckedChange={(checked) => {
                            if (!isLoading) {
                              if (checked) {
                                setFilters({
                                  ...filters,
                                  jobTypes: [...filters.jobTypes, jobType],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  jobTypes: filters.jobTypes.filter(
                                    (jt) => jt !== jobType
                                  ),
                                });
                              }
                            }
                          }}
                          className="h-4 w-4 text-blue-600"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor={`jobType-${jobType}`}
                          className="ml-2 text-sm font-medium"
                        >
                          {t(`jobType.${jobType}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="font-medium">{t("locationLabel")}</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("locationTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Input
                    value={filters.location || ""}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        location: e.target.value || undefined,
                      })
                    }
                    placeholder={t("locationPlaceholder")}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Save Filter Section */}
              <div className="mt-6 border-t pt-4">
                <div className="flex items-center">
                  <Input
                    value={newFilterName}
                    onChange={(e) => setNewFilterName(e.target.value)}
                    placeholder={t("filterNamePlaceholder")}
                    className="mr-2"
                    disabled={isLoading}
                  />
                  <Button disabled={isLoading} onClick={saveFilter}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? t("savingFilter") : t("saveFilterButton")}
                    {isLoading && (
                      <span className="ml-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                  </Button>
                </div>

                {/* Saved Filters */}
                {savedFilters.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">
                      {t("savedFiltersLabel")}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {savedFilters.map((filter) => (
                        <Button
                          key={filter.id}
                          variant="outline"
                          size="sm"
                          onClick={() => applyFilter(filter)}
                          disabled={isLoading}
                        >
                          {filter.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Candidates List */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : candidates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {candidates.map((candidate) => (
              <Card
                key={candidate.id}
                className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                onClick={() => !isLoading && viewCandidateProfile(candidate.id)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {candidate.firstName} {candidate.lastName}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{candidate.title}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">
                    {candidate.experience}{" "}
                    {candidate.experience > 1 ? t("years") : t("year")}{" "}
                    {t("ofExperience")}
                  </p>

                  {candidate.skills.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        {t("skillsLabel")}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{candidate.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {candidate.languages.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        {t("languagesLabel")}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {candidate.languages.map((language) => (
                          <span
                            key={language}
                            className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-gray-500 mt-4">
                    <span>{t(`availability.${candidate.availability}`)}</span>
                    {candidate.city && candidate.countryCode && (
                      <span>
                        {candidate.city}, {candidate.countryCode}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg mb-4">{t("noCandidatesFound")}</p>
            <Button
              variant="destructive"
              onClick={clearAllFilters}
              disabled={isLoading}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("clearFiltersButton")}
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && pagination.pages > 1 && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current === 1 || isLoading}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    current: pagination.current - 1,
                  })
                }
              >
                {t("previousButton")}
              </Button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={
                      pagination.current === page ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      setPagination({ ...pagination, current: page })
                    }
                    disabled={isLoading}
                  >
                    {page}
                  </Button>
                )
              )}

              <Button
                variant="outline"
                size="sm"
                disabled={pagination.current === pagination.pages || isLoading}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    current: pagination.current + 1,
                  })
                }
              >
                {t("nextButton")}
              </Button>
            </div>
          </div>
        )}
      </TooltipProvider>
    </div>
  );
}
