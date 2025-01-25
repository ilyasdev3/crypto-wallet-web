import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600",
        secondary: "bg-accent-blue text-white hover:bg-accent-blue/80",
        success: "bg-accent-success text-dark-300",
        warning: "bg-accent-warning text-dark-300",
        error: "bg-accent-error text-white",
        outline: "border-2 border-primary-500 text-primary-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={badgeVariants({ variant, className })} {...props} />;
}

export { Badge, badgeVariants };
