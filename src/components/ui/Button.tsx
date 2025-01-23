import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  variant: "primary" | "secondary" | "outlined" | "text";
  size: "small" | "medium" | "large";
  onClick?: () => void;
  to?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  onClick,
  to,
  children,
  className = "",
  disabled = false,
}) => {
  const baseClasses =
    "font-semibold rounded-lg focus:outline-none transition-all duration-300";

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

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return to ? (
    <Link
      to={to}
      className={buttonClasses}
      onClick={disabled ? (e) => e.preventDefault() : undefined}
    >
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonClasses} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
