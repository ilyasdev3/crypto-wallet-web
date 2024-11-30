import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] font-bold text-primary-500/20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-semibold text-white">
              Page Not Found
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          <p className="text-gray-400 text-lg">
            Oops! The page you're looking for has vanished into the crypto void.
          </p>
          <p className="text-gray-500">
            It seems you've ventured into uncharted territory. Let's get you
            back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center px-6 py-3 bg-dark-100 text-white rounded-lg hover:bg-dark-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-12 opacity-50">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-2 bg-primary-500/20 rounded animate-pulse"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
