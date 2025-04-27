import { FooterSection } from "@/components/general/footer";
import { Navbar } from "@/components/general/Navbar";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
      <Navbar />
      {children}
      <FooterSection />
    </div>
  );
};

export default MainLayout;
