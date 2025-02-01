import React, { useState, useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";

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
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  // Calculate the width of a single card including margin
  useEffect(() => {
    if (containerRef.current) {
      const firstCard = containerRef.current.querySelector(".testimonial-card");
      if (firstCard) {
        const cardRect = firstCard.getBoundingClientRect();
        setCardWidth(cardRect.width + 32); // width + margin
      }
    }
  }, []);

  // Create an array that's 3x the original length to ensure smooth looping
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  useEffect(() => {
    if (!isPaused && cardWidth > 0) {
      const singleLoopWidth = cardWidth * testimonials.length;

      const animate = async () => {
        await controls.start({
          x: -singleLoopWidth,
          transition: {
            duration: 15,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      };

      animate();

      // Reset position when reaching the end of the first set
      const checkPosition = () => {
        const currentX = x.get();
        if (currentX <= -singleLoopWidth) {
          x.set(0);
        }
      };

      const interval = setInterval(checkPosition, 50);
      return () => clearInterval(interval);
    }
  }, [controls, isPaused, cardWidth, testimonials.length]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    const currentX = x.get();
    const singleLoopWidth = cardWidth * testimonials.length;

    controls.start({
      x: -singleLoopWidth,
      transition: {
        duration: 15 * (1 - -currentX / singleLoopWidth),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  return (
    <section className="bg-dark-50 py-16 px-8 overflow-hidden">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          What Our Users Say
        </h2>
        <p className="text-lg text-primary-200 mb-12 max-w-2xl mx-auto">
          Hear from our happy users who trust us to manage their digital assets
          securely and efficiently.
        </p>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex space-x-8"
            style={{ x }}
            animate={controls}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card bg-dark-100 p-8 rounded-2xl shadow-card text-left min-w-[300px]"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
