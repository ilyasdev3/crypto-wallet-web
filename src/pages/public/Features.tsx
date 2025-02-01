import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Wallet,
  ArrowRightLeft,
  BarChart3,
  Shield,
  Users,
  Bell,
  Newspaper,
  Lock,
  TrendingUp,
} from "lucide-react";
import Button from "../../components/ui/Button";
import PageTemplate from "../../components/_layout";

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
      icon: Wallet,
      title: "Secure Ethereum Wallet",
      description:
        "Manage your ETH with our secure wallet implementation. Send, receive, and store your cryptocurrency with confidence using industry-standard security practices.",
    },
    {
      icon: ArrowRightLeft,
      title: "Easy Transactions",
      description:
        "Transfer funds between users seamlessly. Our platform supports both internal transfers to other users and external withdrawals to any Ethereum address.",
    },
    {
      icon: BarChart3,
      title: "Transaction History",
      description:
        "Keep track of all your transactions with detailed history and real-time status updates. Monitor pending, completed, and failed transactions easily.",
    },
    {
      icon: Users,
      title: "Social Integration",
      description:
        "Connect with other users through our social features. Follow other traders, share updates, and build your crypto community within the platform.",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description:
        "Stay informed with instant notifications for all your wallet activities. Get alerts for incoming transfers, successful transactions, and important updates.",
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description:
        "Your assets are protected with robust authentication mechanisms. Enjoy peace of mind with our JWT-based authentication system and secure session management.",
    },
    {
      icon: Newspaper,
      title: "News Feed",
      description:
        "Stay updated with your network's activities through our integrated news feed. Share posts, interact with other users, and keep up with the latest updates.",
    },
    {
      icon: Lock,
      title: "Enhanced Security",
      description:
        "Your funds are safeguarded with advanced encryption and multi-layer security protocols, ensuring maximum protection against unauthorized access.",
    },
  ];

  return (
    <PageTemplate>
      <div className="min-h-screen text-white">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
              Powerful Features for Your Crypto Wallet
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Experience a comprehensive suite of tools designed to make
              managing your digital assets simple, secure, and social.
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
              Join our community and experience the next generation of crypto
              wallet management.
            </p>
            <Button
              to="/wallet"
              variant="primary"
              size="large"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg transition-colors duration-300"
            >
              Create Account
            </Button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Features;
