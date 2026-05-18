"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ElegantButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "burgundy" | "sage" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const ElegantButton = React.forwardRef<
  HTMLButtonElement,
  ElegantButtonProps
>(({ variant = "gold", size = "md", className, children, ...props }, ref) => {
  const baseClasses =
    "font-inter font-500 rounded-2xl transition-all duration-500 ease-smooth hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    gold: "bg-[#D4AF88] text-[#3A2F2F] hover:bg-[#C4A078] shadow-elegant hover:shadow-xl",
    burgundy:
      "bg-[#8B4F6F] text-[#FFFFFF] hover:bg-[#7B3F5F] shadow-elegant hover:shadow-xl",
    sage: "bg-[#A8B5A2] text-[#3A2F2F] hover:bg-[#98A592] shadow-elegant hover:shadow-xl",
    outline:
      "border-2 border-[#D4AF88] text-[#D4AF88] hover:bg-[#D4AF88] hover:text-[#3A2F2F] transition-colors",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm md:text-base",
    md: "px-6 py-3 text-base md:text-lg",
    lg: "px-8 py-4 text-lg md:text-xl",
  };

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

ElegantButton.displayName = "ElegantButton";
