import JobApplicationPage from "@/components/general/JobApplicationPage";

// // app/(jobs)/jobs/[jobId]/apply/page.tsx
// // const ApplyJobPage = async function ApplyPage({
// //   params,
// // }: {
// //   params: { jobId: string };
// // }) {

const ApplyJobPage = () => {
  //   const { jobData } = await getJob(params.jobId);
  //   return <JobApplicationPage jobData={jobData} />;
  return <JobApplicationPage />;
};

export default ApplyJobPage;

// const ApplyJobPage = () => {
//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">Postuler à l'offre</h1>

//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Nom complet
//           </label>
//           <input
//             type="text"
//             placeholder="Votre nom"
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Votre email"
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             CV (PDF)
//           </label>
//           <input
//             type="file"
//             className="mt-1 block w-full p-2 border rounded-md"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Message
//           </label>
//           <textarea
//             placeholder="Votre message"
//             className="mt-1 block w-full p-2 border rounded-md"
//             rows={4}
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           Envoyer la candidature
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ApplyJobPage;
