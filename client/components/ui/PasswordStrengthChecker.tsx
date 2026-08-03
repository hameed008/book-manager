
import { useState, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface PasswordStrengthCheckerProps {
  password: string;
  className?: string;
}

interface StrengthRequirement {
  label: string;
  test: (password: string) => boolean;
  met: boolean;
}

export function PasswordStrengthChecker({
  password,
  className = "",
}: PasswordStrengthCheckerProps) {
  const [requirements, setRequirements] = useState<StrengthRequirement[]>([
    {
      label: "At least 8 characters",
      test: (pwd) => pwd.length >= 8,
      met: false,
    },
    {
      label: "Contains uppercase letter",
      test: (pwd) => /[A-Z]/.test(pwd),
      met: false,
    },
    {
      label: "Contains lowercase letter",
      test: (pwd) => /[a-z]/.test(pwd),
      met: false,
    },
    {
      label: "Contains number",
      test: (pwd) => /\d/.test(pwd),
      met: false,
    },
    {
      label: "Contains special character",
      test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      met: false,
    },
  ]);

  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState("");

  useEffect(() => {
    // Update requirements status
    setRequirements((prev) =>
      prev.map((req) => ({
        ...req,
        met: req.test(password),
      })),
    );

    // Calculate strength score (0-5)
    const metCount = requirements.filter((req) => req.test(password)).length;
    setStrengthScore(metCount);

    // Set strength label and color
    if (password.length === 0) {
      setStrengthLabel("");
    } else if (metCount <= 2) {
      setStrengthLabel("Weak");
    } else if (metCount <= 3) {
      setStrengthLabel("Fair");
    } else if (metCount <= 4) {
      setStrengthLabel("Good");
    } else {
      setStrengthLabel("Strong");
    }
  }, [password]);

  // Helper to get color based on strength
  const getStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200";
    if (strengthScore <= 2) return "bg-red-500";
    if (strengthScore <= 3) return "bg-yellow-500";
    if (strengthScore <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  // Helper to get text color for requirements
  const getRequirementColor = (met: boolean) => {
    return met ? "text-green-600" : "text-gray-500";
  };

  // Helper to get icon for requirements
  const getRequirementIcon = (met: boolean) => {
    if (met) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-gray-300" />;
  };

  return (
    <div className={`space-y-3 mt-2 ${className}`}>
      {/* Only show when password has some content */}
      {password.length > 0 && (
        <>
          {/* Strength bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                Password Strength
              </span>
              <span
                className={`text-xs font-semibold ${
                  strengthScore <= 2
                    ? "text-red-500"
                    : strengthScore <= 3
                      ? "text-yellow-600"
                      : strengthScore <= 4
                        ? "text-blue-600"
                        : "text-green-600"
                }`}
              >
                {strengthLabel}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-in-out ${getStrengthColor()}`}
                style={{
                  width: `${(strengthScore / 5) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Requirements list */}
          <div className="space-y-1.5 pt-1">
            {requirements.map((req, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 text-xs transition-colors duration-300 ${getRequirementColor(
                  req.met,
                )}`}
              >
                {getRequirementIcon(req.met)}
                <span className={req.met ? "font-medium" : ""}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
