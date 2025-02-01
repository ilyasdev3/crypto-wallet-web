import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-200 py-8">
      <div className="container mx-auto text-center">
        <Box className="space-y-4">
          <Typography className="text-white text-xl font-semibold">
            Coindex
          </Typography>
          <Typography className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Coindex. All rights reserved.
          </Typography>

          <div className="flex justify-center space-x-6">
            <Link href="#" className="text-accent-blue hover:text-primary-500">
              About
            </Link>
            <Link href="#" className="text-accent-blue hover:text-primary-500">
              Privacy Policy
            </Link>
            <Link href="#" className="text-accent-blue hover:text-primary-500">
              Terms of Service
            </Link>
          </div>
        </Box>
      </div>
    </footer>
  );
};

export default Footer;
