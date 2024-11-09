import React from "react";
import PageTemplate from "../../components/_layout";
import Typography from "../../components/ui/Typography";

const Features: React.FC = () => {
  const features = [
    {
      title: "Real-Time Data",
      description:
        "Access real-time data to track your transactions, balances, and more. Stay updated on your financial activities and monitor your wallet’s health instantly.",
      icon: "📊",
    },
    {
      title: "Secure Transactions",
      description:
        "All your transactions are secured with end-to-end encryption. Rest assured that your data is protected against unauthorized access, ensuring a safe transaction experience.",
      icon: "🔒",
    },
    {
      title: "Easy Integration",
      description:
        "Seamlessly integrate with other platforms and tools with our powerful API. Whether you're a developer or a business owner, our simple and efficient API makes integration a breeze.",
      icon: "⚙️",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Enjoy a simple, intuitive, and fast interface designed for everyone. Whether you're a beginner or an experienced user, navigating our platform is easy and enjoyable.",
      icon: "👨‍💻",
    },
    {
      title: "24/7 Customer Support",
      description:
        "We provide round-the-clock support to assist with any questions or issues. Our dedicated support team is available to ensure your experience is smooth and hassle-free.",
      icon: "📞",
    },
    {
      title: "Multi-Currency Support",
      description:
        "Manage multiple currencies in one platform. From cryptocurrencies to traditional currencies, our platform allows you to track and manage various assets in one place.",
      icon: "💰",
    },
    {
      title: "Analytics and Reports",
      description:
        "Generate comprehensive reports and analytics to gain insights into your financial habits. Make data-driven decisions with our detailed reporting tools.",
      icon: "📈",
    },
    {
      title: "Mobile-Optimized",
      description:
        "Access all the features on-the-go with our mobile-optimized interface. Whether you’re using a smartphone or tablet, our app is designed for smooth mobile browsing.",
      icon: "📱",
    },
  ];

  return (
    <PageTemplate>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-dark-200 p-6 rounded-lg shadow-md hover:bg-dark-300 transition"
          >
            <div className="text-4xl mb-4 text-primary-500">{feature.icon}</div>
            <Typography variant="h6" className="mb-2 font-semibold">
              {feature.title}
            </Typography>
            <Typography variant="body1">{feature.description}</Typography>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Features;
