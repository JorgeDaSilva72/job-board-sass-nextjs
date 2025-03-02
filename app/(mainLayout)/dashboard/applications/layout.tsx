import ToastHandler from "@/components/general/ToastHandler";
import React from "react";

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
      <ToastHandler />
      {children}
    </div>
  );
};

export default ApplicationLayout;
