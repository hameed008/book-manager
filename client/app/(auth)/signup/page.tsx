// app/signup/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  User,
  Mail,
  Lock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";
import { PasswordStrengthChecker } from "@/components/ui/PasswordStrengthChecker";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasTypedPassword, setHasTypedPassword] = useState(false); // Track if user has typed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email" && value !== formData.email) {
      setServerError("");
      setOtpError("");
      setOtpSent(false);
      setOtpVerified(false);
      setCountdown(0);
    }

    // Track if user has typed in password field
    if (name === "password") {
      setHasTypedPassword(true);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Send OTP
  const handleSendOtp = async () => {
    const { email } = formData;
    if (!email) {
      setOtpError("Please enter your email first.");
      return;
    }

    try {
      setIsSending(true);
      setOtpError("");
      await api.auth.sendOtp({ email });

      setOtpSent(true);
      setCountdown(60);
    } catch (err: any) {
      console.error(err);
      setOtpError(err.response?.data?.error || "Failed to send OTP.");
    } finally {
      setIsSending(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async () => {
    const { email } = formData;
    if (!otp) {
      setOtpError("Please enter OTP.");
      return;
    }

    try {
      setIsVerifying(true);
      setOtpError("");

      await api.auth.verifyOtp({ email, otp });

      setOtpVerified(true);
    } catch (err: any) {
      console.error(err);
      setOtpError(err.response?.data?.error || "Invalid or expired OTP.");
    } finally {
      setIsVerifying(false);
    }
  };

  // Final form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setIsSuccess(false);

    if (!otpVerified) {
      setServerError("Please verify your email with OTP before registering.");
      return;
    }

    // Add password strength validation before submitting
    const password = formData.password;
    const strengthChecks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password),
    ];
    const strengthScore = strengthChecks.filter(Boolean).length;

    if (strengthScore < 4) {
      setServerError(
        "Please create a stronger password. It should be at least 'Good' strength.",
      );
      return;
    }

    try {
      setIsLoading(true);

      await api.auth.signup({ ...formData, otp });

      setIsSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (error: any) {
      console.error(error);
      setServerError(
        error.response?.data?.error ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="relative flex min-h-[100vh] items-center justify-center bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-400 px-4 py-8 sm:px-6 lg:px-8">
      
      <div
        className="fixed inset-0 h-full w-full pointer-events-none bg-[linear-gradient(to_right,#ffffff1f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1f_1px,transparent_1px)] bg-[size:6rem_4rem]"
        aria-hidden="true"
      />

      {/* Main card - added my-4 for margin and relative z-10 */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-xl shadow-blue-900/10 ring-1 ring-gray-900/5 my-4">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        {serverError && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 ring-1 ring-red-100">
            {serverError}
          </div>
        )}

        {isSuccess && (
          <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 ring-1 ring-green-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Account created! Redirecting...
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              id="name"
              name="name"
              type="text"
              icon={User}
              required
              placeholder="Jane Austen"
              value={formData.name}
              onChange={handleChange}
            />

            <div className="space-y-3 border-l-2 border-transparent transition-colors duration-300">
              <Input
                label="Email address"
                id="email"
                name="email"
                type="email"
                icon={Mail}
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={otpVerified}
              />

              {otpVerified ? (
                <div className="flex items-center gap-2 text-sm font-medium text-green-600 px-1">
                  <CheckCircle2 className="h-4 w-4" /> Email Verified
                </div>
              ) : (
                <div className="space-y-3 px-1">
                  {otpSent && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter 4-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md focus:shadow-blue-500/30 sm:text-sm sm:leading-6"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isVerifying || otp.length < 4}
                        className="rounded-md bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-100 disabled:opacity-50 transition-colors"
                      >
                        {isVerifying ? "..." : "Verify"}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSending || countdown > 0 || !formData.email}
                      className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:text-gray-400 transition-colors"
                    >
                      {isSending
                        ? "Sending..."
                        : countdown > 0
                          ? `Resend OTP in ${countdown}s`
                          : otpSent
                            ? "Resend OTP"
                            : "Send OTP to verify"}
                    </button>

                    {otpError && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <ShieldAlert className="h-3 w-3" /> {otpError}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div>
              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                icon={Lock}
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              {/* Only show password strength when user has started typing */}
              {hasTypedPassword && (
                <PasswordStrengthChecker password={formData.password} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !otpVerified}
            className="flex w-full justify-center rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none"
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
