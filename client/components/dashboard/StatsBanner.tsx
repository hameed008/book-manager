// components/dashboard/StatsBanner.tsx
"use client";

import { Library, Clock, BookOpen, CheckCircle } from "lucide-react";

interface StatsBannerProps {
  totalBooks: number;
  statusCounts: {
    "Want to Read": number;
    Reading: number;
    Completed: number;
  };
  isFiltered: boolean;
}

export function StatsBanner({
  totalBooks,
  statusCounts,
  isFiltered,
}: StatsBannerProps) {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 sm:p-8">
      <div
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-50/50 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              {isFiltered ? "Filtered Results" : "Total Collection"}
            </p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                {totalBooks}
              </h2>
              <span className="text-sm font-medium text-gray-500">
                {totalBooks === 1 ? "Book" : "Books"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-4 py-2 ring-1 ring-inset ring-slate-200/50 transition-colors hover:bg-slate-100/80 cursor-default">
            <Clock className="h-4 w-4 text-slate-500" />
            <div className="text-sm">
              <span className="font-semibold text-slate-700">
                {statusCounts["Want to Read"]}
              </span>
              <span className="ml-1.5 text-slate-500">Upcoming</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-amber-50 px-4 py-2 ring-1 ring-inset ring-amber-200/50 transition-colors hover:bg-amber-100/80 cursor-default">
            <BookOpen className="h-4 w-4 text-amber-600" />
            <div className="text-sm">
              <span className="font-semibold text-amber-700">
                {statusCounts.Reading}
              </span>
              <span className="ml-1.5 text-amber-600/80">Reading</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 px-4 py-2 ring-1 ring-inset ring-emerald-200/50 transition-colors hover:bg-emerald-100/80 cursor-default">
            <CheckCircle className="h-4 w-4 text-emerald-600" />
            <div className="text-sm">
              <span className="font-semibold text-emerald-700">
                {statusCounts.Completed}
              </span>
              <span className="ml-1.5 text-emerald-600/80">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
