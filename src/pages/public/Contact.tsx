import React, { useState } from "react";
import PageTemplate from "../../components/_layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Github,
  Linkedin,
} from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our services? We're here to help and provide
            you with the support you need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            {/* Email Card */}
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Email Us</h3>
                    <a
                      href="mailto:support@walletapp.com"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      ilyasdev3@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone Card */}
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg">
                    <Phone className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Call Us</h3>
                    <a
                      href="tel:+923144778939"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      +923 1447 78939
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hours Card */}
            {/* <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Business Hours</h3>
                    <p className="text-gray-400">Mon - Fri: 9AM - 5PM EST</p>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* GitHub Card */}
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg">
                    <Github className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">GitHub</h3>
                    <a
                      href="https://github.com/ilyasdev3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      @ilyasdev3
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Card */}
            <Card className="bg-dark-200 border-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-primary-500/10 rounded-lg">
                    <Linkedin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ilyasdev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-primary-500 transition-colors"
                    >
                      ilyasdev
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-2 bg-dark-200 border-none">
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-dark-100"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-dark-100"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-dark-100"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full p-3 bg-dark-100 text-white rounded-lg border border-dark-50/10 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    placeholder="Type your message here..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;
