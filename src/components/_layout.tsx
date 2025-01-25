import React from "react";
import Navbar from "./Navbar";

interface PageTemplateProps {
  children: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  return (
    <div className="bg-dark text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-8">{children}</div>
      </div>
    </div>
  );
};

export default PageTemplate;
