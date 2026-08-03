// components/dashboard/EmptyState.tsx
"use client";

import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  hasSearch: boolean;
  onClearFilters?: () => void;
}

export function EmptyState({ hasSearch, onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300/60 bg-white/50 backdrop-blur-sm py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/20">
        <BookOpen className="h-10 w-10" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-gray-900">
        {hasSearch ? "No matching books" : "Your library is waiting"}
      </h3>
      <p className="mt-2 max-w-md text-gray-500">
        {hasSearch
          ? "We couldn't find anything matching your current filters. Try adjusting your search."
          : "You haven't added any books yet. Start building your collection to track your reading journey."}
      </p>
      {hasSearch && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/30"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
