"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GradientButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default  function Main() {
  const router = useRouter();
  return (
    <>
      {/* Top Navigation */}
      <header className="flex items-center justify-between px-6 py-6 sm:px-12">
        <Logo variant="white" managerColor="text-green-300" />

        {/* Top Right Corner Buttons */}
        <div className="flex items-center gap-6">
          <GradientButton
            onClick={() => router.push("/login")}
            size="md"
            roundness="full"
            fromColor="bg-white"
            toColor="bg-white"
            textColor="text-blue-600"
            className="gap-2 font-medium"
          >
            Login
          </GradientButton>
        </div>
      </header>
      {/* Hero Section */}
      <main className="flex flex-1 min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl flex flex-col space-y-4 text-center items-center">
        
          <span className="text-white">A book manager</span>

          <span className="flex flex-wrap items-center justify-center gap-x-4 text-white">
            <span>that</span>
            <span className="relative inline-block px-5 py-1.5 rounded-2xl bg-white text-black shadow-xl shadow-black/10 ring-1 ring-black/5 transform -rotate-1 transition-transform hover:rotate-0">
              works
            </span>
            <span>for you.</span>
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100 sm:text-xl">
          A quiet space to log your books, reflect on your habits, and
          rediscover your favorite authors. No clutter, just clarity.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <GradientButton
            onClick={() => router.push("/signup")}
            size="lg"
            roundness="full"
            fromColor="bg-white"
            toColor="bg-white"
            textColor="text-gray-900"
            className="group gap-2 shadow-lg hover:scale-105"
          >
            Start your library
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </GradientButton>
        </div>
      </main>
    </>
  );
}
