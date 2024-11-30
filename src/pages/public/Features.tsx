import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Shield,
  Wallet,
  Globe,
  BarChart3,
  Zap,
  Clock,
  Users,
  Lock,
} from "lucide-react";
import Button from "../../components/ui/Button";

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <Card className="bg-dark-200 hover:bg-dark-100 transition-colors duration-300 border-none">
    <CardContent className="p-6">
      <div className="mb-4 bg-primary-500/10 w-12 h-12 rounded-lg flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description:
        "Advanced encryption and multi-signature technology protect your assets with institutional-grade security measures and regular security audits.",
    },
    {
      icon: Wallet,
      title: "Multi-Currency Support",
      description:
        "Manage multiple cryptocurrencies in one secure wallet. Support for Bitcoin, Ethereum, and other major cryptocurrencies with real-time conversion rates.",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Access your wallet from anywhere in the world, with support for multiple languages and currencies. Available 24/7 on all devices.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Comprehensive portfolio tracking with detailed analytics, performance metrics, and customizable reports to inform your investment decisions.",
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description:
        "Lightning-fast transactions with optimal gas fees and automatic transaction verification. Real-time updates on transaction status.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support through multiple channels. Expert assistance available whenever you need it, with rapid response times.",
    },
    {
      icon: Users,
      title: "Social Trading",
      description:
        "Connect with other traders, share insights, and learn from the community. Follow top performers and replicate their successful strategies.",
    },
    {
      icon: Lock,
      title: "Privacy Control",
      description:
        "Full control over your privacy settings with optional anonymity features. Choose what you share and with whom.",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-300 py-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4  bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Powerful Features for Modern Crypto Trading
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Experience the next generation of cryptocurrency management with our
            comprehensive suite of trading and security features.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of traders who have already discovered the power of
            our platform.
          </p>
          <Button
            to="/wallet"
            variant="primary"
            size="large"
            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Features;
