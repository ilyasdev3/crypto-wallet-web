import React from "react";

interface SpinnerProps {
  height?: string;
}

const Spinner = ({ height }: SpinnerProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        height ? height : "min-h-screen"
      }`}
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  );
};

export default Spinner;
