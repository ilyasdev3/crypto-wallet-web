import React from "react";
import { AccountBalanceWallet, Explore, Send } from "@mui/icons-material";

const steps = [
  {
    title: "Create Your Wallet",
    description:
      "Get started by creating a secure wallet in just a few clicks. Your personal data is encrypted and protected.",
    icon: (
      <AccountBalanceWallet fontSize="large" className="text-primary-500" />
    ),
  },
  {
    title: "Explore Features",
    description:
      "Discover all the powerful features of our wallet, including transaction history, social integration, and more.",
    icon: <Explore fontSize="large" className="text-primary-500" />,
  },
  {
    title: "Start Transacting",
    description:
      "Send, receive, and manage your assets seamlessly with our user-friendly wallet interface.",
    icon: <Send fontSize="large" className="text-primary-500" />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-dark py-16 px-8 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold  mb-8">How It Works</h2>
        <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">
          Our wallet app is designed to be secure, fast, and user-friendly.
          Follow these simple steps to start using it.
        </p>

        {/* Steps List */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-dark-50 p-6 rounded-2xl shadow-card max-w-xs mx-auto md:mx-0 flex flex-col items-center text-center"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-primary-50 mt-4 mb-2">
                {step.title}
              </h3>
              <p className="text-primary-200">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
