import { HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: "positive" | "neutral" | "negative";
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    const variants = {
      positive: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      neutral: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      negative: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-sm border",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
