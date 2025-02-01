import React from "react";
import { Security, TrendingUp, People } from "@mui/icons-material";

const features = [
  {
    title: "Secure Transactions",
    description:
      "Your assets are safe with state-of-the-art security protocols, keeping your funds secure at all times.",
    icon: <Security fontSize="large" className="text-primary-500" />,
  },
  {
    title: "Real-Time Analytics",
    description:
      "Stay informed with real-time insights and analytics, helping you make data-driven decisions.",
    icon: <TrendingUp fontSize="large" className="text-primary-500" />,
  },
  {
    title: "Social Integration",
    description:
      "Connect with other users, share updates, and build your crypto community within the platform.",
    icon: <People fontSize="large" className="text-primary-500" />,
  },
];

const Features: React.FC = () => {
  return (
    <section className="bg-dark text-white py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Key Features</h2>
        <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">
          Explore the powerful features that make managing your crypto assets
          easier and more secure.
        </p>

        {/* Features List */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-50 p-6 rounded-2xl shadow-card max-w-xs mx-auto md:mx-0 flex flex-col items-center text-center"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-primary-50 mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-primary-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
