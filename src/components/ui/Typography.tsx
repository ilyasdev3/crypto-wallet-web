import React from "react";

interface TypographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "subtitle1"
    | "subtitle2"
    | "caption"
    | "overline"
    | "button"; // Define possible typography variants
  color?:
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "dark"
    | "light"
    | "accent-blue"; // Custom color options

  align?: "left" | "center" | "right"; // Text alignment
  children: React.ReactNode; // Text content
  className?: string; // Additional classes for customization
}

const Typography: React.FC<TypographyProps> = ({
  variant,
  color = "primary",
  align = "left",
  children,
  className = "",
}) => {
  // Define base classes
  const baseClasses = `${className} font-semibold leading-tight`;

  // Define typography styles for each variant
  const variantClasses = {
    h1: "text-5xl md:text-6xl",
    h2: "text-4xl md:text-5xl",
    h3: "text-3xl md:text-4xl",
    h4: "text-2xl md:text-3xl",
    h5: "text-xl md:text-2xl",
    h6: "text-lg md:text-xl",
    body1: "text-base md:text-lg",
    body2: "text-sm md:text-base",
    subtitle1: "text-lg md:text-xl",
    subtitle2: "text-md md:text-lg",
    caption: "text-xs md:text-sm",
    overline: "text-xs font-medium uppercase tracking-wider",
    button: "text-base font-medium uppercase tracking-wide",
  };

  // Define color classes for different color options
  const colorClasses = {
    primary: "text-primary-500",
    secondary: "text-primary-400",
    error: "text-error",
    success: "text-success",
    warning: "text-warning",
    dark: "text-dark-200",
    light: "text-light",
    "accent-blue": "text-accent-blue",
  };

  // Combine classes dynamically
  const classes = `${baseClasses} ${variantClasses[variant]} ${colorClasses[color]} text-${align}`;

  return <span className={classes}>{children}</span>;
};

export default Typography;
