
"use client";

import { Plus, Library } from "lucide-react";
import { GradientButton } from "@/components/ui/Button";

interface DashboardHeaderProps {
  onAddBook: () => void;
}

export function DashboardHeader({ onAddBook }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 px-4 py-8 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 shadow-sm shadow-blue-900/5 ring-1 ring-blue-100/50">
            <Library className="h-7 w-7 text-blue-600" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
              Your Library
            </h1>
            <p className="mt-1 text-sm font-medium text-gray-600">
              A quiet space to reflect on your reading habits.
            </p>
          </div>
        </div>

        <GradientButton
          onClick={onAddBook}
          size="md"
          roundness="sm"
          fromColor="from-blue-600"
          toColor="to-indigo-600"
          className="px-2.5 py-2 ml-10 shadow-md shadow-blue-600/20"
        >
          <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline-block sm:ml-2">Add Book</span>
        </GradientButton>
      </div>
    </header>
  );
}
