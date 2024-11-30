import React from "react";
import { Button } from "@mui/material";

const CTASection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-gradient-start to-gradient-end py-16 px-8 text-center text-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Manage Your Digital Assets?
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Secure, reliable, and easy-to-use — start today and experience the
          next generation of digital asset management.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            variant="contained"
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md"
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            className="border-primary-500 text-white hover:bg-primary-50 hover:text-dark-50 font-semibold py-3 px-6 rounded-xl shadow-md"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
