import { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg";
  fromColor?: string;
  toColor?: string;
  textColor?: string;
  roundness?: "none" | "sm" | "md" | "lg" | "full";
  isLoading?: boolean;
}

export function GradientButton({
  children,
  size = "md",
  fromColor = "from-blue-500",
  toColor = "to-indigo-600",
  textColor = "text-white",
  roundness = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    xs: "px-2 py-1 text-[11px]",
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base font-semibold",
  };

  const roundnessClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  const baseClasses =
    "inline-flex items-center justify-center shadow-sm transition-all hover:scale-[1.02] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100";

  return (
    <button
      disabled={isLoading || disabled}
      className={`
        bg-gradient-to-r ${fromColor} ${toColor} ${textColor}
        ${baseClasses} 
        ${sizeClasses[size]} 
        ${roundnessClasses[roundness]} 
        ${className}
      `}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
