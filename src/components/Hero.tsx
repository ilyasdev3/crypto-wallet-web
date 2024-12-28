import React from "react";
import { Link } from "react-router-dom";

const Hero: React.FC = () => {
  return (
    <section className="bg-dark text-primary-50 py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold ">
            Manage Your Digital Assets with Ease
          </h1>
          <p className="text-lg md:text-xl text-primary-200">
            Discover a seamless way to control, track, and grow your crypto
            portfolio all in one secure and intuitive platform.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              to="/wallet"
              className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow-glow hover:bg-primary-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="text-primary-500 bg-dark-50 px-6 py-3 rounded-lg shadow-card hover:bg-dark-100 transition"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
          <img
            src="../../public/crypto_banner.png"
            alt="Crypto Wallet App"
            className="w-full h-full max-w-md md:max-w-lg shadow-card"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
