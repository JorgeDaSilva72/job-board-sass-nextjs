export const getStatusJobsBadgeStyle = (status: string): string => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium";
    case "expired":
      return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium";
    case "draft":
      return "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium";
    default:
      return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium";
  }
};
