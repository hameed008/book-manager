import { InputHTMLAttributes, forwardRef, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Eye, EyeOff } from "lucide-react"; // Import eye icons

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, icon: Icon, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <div className="group relative mt-1 flex rounded-md shadow-sm">
          <div
            className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
            aria-hidden="true"
          />

          <div className="relative flex w-full overflow-hidden rounded-md border border-gray-300 bg-white transition-colors group-focus-within:border-transparent">
            {Icon && (
              <div className="flex items-center justify-center bg-gray-50/50 px-3 border-r border-gray-300">
                <Icon className="h-4 w-4 text-gray-400" />
              </div>
            )}

            {/* The Input Field */}
            <input
              id={id}
              ref={ref}
              type={isPassword && showPassword ? "text" : type}
              className="block w-full border-0 bg-transparent py-2 pl-3 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
              {...props}
            />

            {/* Show/Hide Password Toggle */}
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="flex items-center justify-center px-3 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";
