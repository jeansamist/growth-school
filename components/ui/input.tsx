import { cn } from "@/lib/utils";
import * as React from "react";
import { InputHTMLAttributes } from "react";

export type InputProps = {
  state?: "valid" | "default";
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ state, className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-12 border shadow-sm border-primary-soft rounded-md px-6 py-3 outline-none focus:outline-none focus:border-primary transition-colors font-medium placeholder:transition-colors",
          state === "valid"
            ? "border-primary placeholder:text-primary/65 focus:placeholder:text-primary text-primary focus:border-primary"
            : "border-primary-soft",
          className
        )}
        {...props}
      />
    );
  }
);
