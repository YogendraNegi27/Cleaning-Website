import * as React from "react";
import { cn } from "@/lib/utils";

export interface OrbButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "default" | "sm" | "lg";
  children: React.ReactNode;
}

export const OrbButton = React.forwardRef<HTMLButtonElement, OrbButtonProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 select-none",
          "bg-zinc-900 text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] dark:bg-white dark:text-zinc-950",
          size === "sm" ? "px-4 py-1.5 text-xs" : "px-7 py-3.5 text-sm sm:text-base",
          className
        )}
        {...props}
      >
        {/* Subtle radial orb glow effect */}
        <span className="pointer-events-none absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/30 via-sky-400/30 to-indigo-500/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

OrbButton.displayName = "OrbButton";
export default OrbButton;
