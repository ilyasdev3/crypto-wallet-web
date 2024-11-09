import React from "react";
import { Avatar } from "@mui/material";

const testimonials = [
  {
    name: "Emily Johnson",
    position: "Product Manager",
    feedback:
      "This wallet app is incredibly user-friendly and secure. It has made managing my digital assets so much easier!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    position: "Software Engineer",
    feedback:
      "I love the clean interface and seamless transactions. Highly recommend it to anyone looking for a reliable wallet.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sofia Ramos",
    position: "Freelancer",
    feedback:
      "The security features give me peace of mind, and the app is a breeze to use. Great job on this product!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-dark-50 py-16 px-8">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-500 mb-8">
          What Our Users Say
        </h2>
        <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">
          Hear from our happy users who trust us to manage their digital assets
          securely and efficiently.
        </p>

        {/* Testimonials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-100 p-8 rounded-2xl shadow-card text-left"
            >
              <div className="flex items-center mb-4">
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 mr-4 border-2 border-primary-500"
                />
                <div>
                  <h3 className="text-lg font-semibold text-primary-50">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-primary-300">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-primary-200 mt-4">{testimonial.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
