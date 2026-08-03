"use client";


import { AppPreview } from "@/components/layout/AppPreview";
import { CoreFeatures } from "@/components/layout/CoreFeatures";
import { Footer } from "@/components/layout/Footer";
import Main from "@/components/layout/Main";

export default function LandingPage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-600 to-blue-800 selection:bg-blue-400/30">
        <Main />
        <AppPreview />
        <CoreFeatures />
        <Footer />
      </div>
    </>
  );
}
