// components/ui/input.tsx
import * as React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  prefix?: React.ReactNode;
  error?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, error, ...props }, ref) => {
    return (
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {prefix}
          </div>
        )}
        <input
          type={type}
          className={`flex h-10 w-full rounded-lg border border-dark-50/10 bg-dark-100 px-3 py-2 text-sm placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50 ${
            prefix ? "pl-10" : ""
          } ${error ? "border-accent-error" : ""} ${className}`}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-accent-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
