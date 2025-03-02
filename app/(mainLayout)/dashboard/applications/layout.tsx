import ToastHandler from "@/components/general/ToastHandler";
import React, { Suspense } from "react";

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
      <Suspense fallback={<div>Loading...</div>}>
        <ToastHandler />
        {children}
      </Suspense>
    </div>
  );
};

export default ApplicationLayout;
