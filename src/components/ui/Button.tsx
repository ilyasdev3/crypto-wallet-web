import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  variant: "primary" | "secondary" | "outlined" | "text"; // Different button styles
  size: "small" | "medium" | "large"; // Button sizes
  onClick?: () => void; // Optional click handler
  to?: string; // Link target (optional, if it's a navigation button)
  children: React.ReactNode; // Button content
  className?: string; // Custom classes
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  to,
  children,
  className = "",
}) => {
  const baseClasses =
    "font-semibold rounded-lg focus:outline-none transition-all duration-300";

  // Define button styles based on variant and size
  const variantClasses = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-accent-blue text-white hover:bg-accent-blue/80",
    outlined:
      "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white",
    text: "bg-transparent text-primary-500 hover:bg-primary-100",
  };

  const sizeClasses = {
    small: "px-3 py-2 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // Render Link if 'to' is provided, else render a regular button
  return to ? (
    <Link to={to} className={buttonClasses}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
