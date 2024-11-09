import React from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";
import Hero from "../../components/Hero";
import HowItWorks from "../../components/HowItWorks";
import Features from "../../components/Features";
import Testimonials from "../../components/Testimonials";
import Footer from "../../components/Footer";
import CTASection from "../../components/CTASection";

const Home: React.FC = () => {
  return (
    <PageTemplate>
      <Hero />
      <HowItWorks />
      <Features />
      <CTASection />
      <Testimonials />
      <Footer />
    </PageTemplate>
  );
};

export default Home;
