"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");
    setIsLoading(true);

    try {

      await api.auth.login({
        email: formData.email,
        password: formData.password,
      });
      router.push("/dashboard");
    } catch (err: any) {
      setServerError(
        err.response?.data?.message ||
          "Failed to log in. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-600 via-indigo-500 to-blue-400 px-4 sm:px-6 lg:px-8">
    
      <div
        className="absolute inset-0 h-full w-full pointer-events-none bg-[linear-gradient(to_right,#ffffff1f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1f_1px,transparent_1px)] bg-[size:6rem_4rem]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl shadow-blue-950/20 ring-1 ring-white/30">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Log in to manage your personal book collection.
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleLogin}>
          <div className="space-y-8">
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
            />

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
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 ring-1 ring-red-100">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center rounded-sm bg-gradient-to-r from-blue-600 to-indigo-600 py-2.5 px-4 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-blue-600 hover:text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
