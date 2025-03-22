// "use client";
// import { deleteApplicationPost } from "@/app/actions";
// import { requireUser } from "@/app/utils/hooks";
// import { GeneralSubmitButton } from "@/components/general/SubmitButtons";

// import { buttonVariants } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Trash2Icon, ArrowLeftIcon, AlertCircleIcon } from "lucide-react";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { toast } from "sonner";

// type Params = Promise<{ applicationId: string }>;

// const DeleteApplicationPage = async ({ params }: { params: Params }) => {
//   await requireUser();
//   const { applicationId } = await params;
//   const router = useRouter();
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleDelete = async () => {
//     setIsDeleting(true);
//     setError(null);

//     try {
//       const result = await deleteApplicationPost(applicationId);

//       if (result.success) {
//         toast.success("Your application has been successfully deleted.!");

//         router.push("/job-seeker/applications");
//       } else {
//         setError(result.error || "An error occurred while deleting");
//         toast.error(result.error || "An error occured while deleting");
//       }
//     } catch (err) {
//       setError("An unexpected error has occurred.");
//       toast.error("An unexpected error has occurred.");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     // <div className="flex items-center justify-center h-screen">
//     //   {" "}
//     //   {/* Conteneur parent */}
//     //   <Card className="max-w-lg mx-auto w-full ">
//     //     <CardHeader>
//     //       <CardTitle>Are you absolutely sure?</CardTitle>
//     //       <CardDescription>
//     //         This action cannot be undone. This will permanently delete your
//     //         application post and remove your data from our servers.
//     //       </CardDescription>
//     //     </CardHeader>
//     //     <CardFooter className="flex justify-between gap-4">
//     //       <Link
//     //         href={`/job-seeker/applications`}
//     //         className={buttonVariants({ variant: "outline" })}
//     //       >
//     //         <ArrowLeftIcon className="size-4" />
//     //         Cancel
//     //       </Link>
//     //       <form
//     //         action={async () => {
//     //           "use server";
//     //           await deleteApplicationPost(applicationId);
//     //         }}
//     //       >
//     //         <GeneralSubmitButton
//     //           text="Delete Appliaction"
//     //           variant="destructive"
//     //           icon={<Trash2Icon className="size-4" />}
//     //         />
//     //       </form>
//     //     </CardFooter>
//     //   </Card>
//     // </div>

//     <div className="flex items-center justify-center min-h-screen p-4">
//       <Card className="max-w-lg mx-auto w-full">
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-red-600">
//             <AlertCircleIcon className="size-5" />
//             Supprimer cette candidature
//           </CardTitle>
//           <CardDescription>
//             Cette action ne peut pas être annulée. Cela supprimera
//             définitivement votre candidature et retirera vos données de nos
//             serveurs.
//           </CardDescription>
//         </CardHeader>

//         {error && (
//           <CardContent>
//             <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
//               {error}
//             </div>
//           </CardContent>
//         )}

//         <CardFooter className="flex justify-between gap-4">
//           <Link
//             href={`/job-seeker/applications`}
//             className={buttonVariants({ variant: "outline" })}
//           >
//             <ArrowLeftIcon className="size-4 mr-2" />
//             Annuler
//           </Link>

//           <GeneralSubmitButton
//             text="Supprimer la candidature"
//             variant="destructive"
//             icon={<Trash2Icon className="size-4" />}
//             // onClick={handleDelete}
//             // isLoading={isDeleting}
//             // disabled={isDeleting}
//           />
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default DeleteApplicationPage;

"use client";
import { requireUser } from "@/app/utils/hooks";
import { DeleteApplicationClient } from "./DeleteApplicationClient";

type Params = Promise<{ applicationId: string }>;

// Ce composant est un Server Component qui fait la vérification d'authentification
export default async function DeleteApplicationPage({
  params,
}: {
  params: Params;
}) {
  // Vérifie l'authentification côté serveur
  await requireUser();
  const { applicationId } = await params;

  // Passe ensuite au composant client avec les données nécessaires
  return <DeleteApplicationClient applicationId={applicationId} />;
}
