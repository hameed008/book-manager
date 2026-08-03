// components/dashboard/FilterBar.tsx
"use client";

import { Search, Filter, LayoutGrid, List } from "lucide-react";

interface FilterBarProps {
  tagSearch: string;
  statusFilter: string;
  viewMode: "grid" | "list";
  onTagSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onViewModeChange: (mode: "grid" | "list") => void;
  onSearchSubmit: (e: React.FormEvent) => void;
}

export function FilterBar({
  tagSearch,
  statusFilter,
  viewMode,
  onTagSearchChange,
  onStatusFilterChange,
  onViewModeChange,
  onSearchSubmit,
}: FilterBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full sm:flex-1">
        <form
          onSubmit={onSearchSubmit}
          className="group relative flex w-full max-w-md flex-1 rounded-md shadow-sm"
        >
          <div
            className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
            aria-hidden="true"
          />

          <div className="relative flex w-full overflow-hidden rounded-md border border-gray-300 bg-white transition-colors group-focus-within:border-transparent">
            <div className="pointer-events-none flex items-center pl-3 pr-2">
              <Search className="h-4 w-4 text-gray-400" />
            </div>

            <input
              type="text"
              placeholder="Search by tag (e.g., Fiction)..."
              value={tagSearch}
              onChange={(e) => onTagSearchChange(e.target.value)}
              className="block w-full border-0 bg-transparent py-2 pl-1 pr-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
            />
            <button type="submit" className="hidden" />
          </div>
        </form>
      </div>

      <div className="flex w-full flex-row items-center justify-between gap-4 sm:w-auto sm:justify-end">
        {/* Status Dropdown Filter */}
        <div className="flex w-full flex-1 items-center gap-2 sm:w-auto">
          <Filter className="hidden h-4 w-4 text-gray-400 sm:block" />
          <div className="group relative flex w-full rounded-md shadow-sm sm:w-48">
            <div
              className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
              aria-hidden="true"
            />

            <div className="relative flex w-full overflow-hidden rounded-md border border-gray-300 bg-white transition-colors group-focus-within:border-transparent">
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="block w-full cursor-pointer border-0 bg-transparent py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
              >
                <option value="All">All Statuses</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex shrink-0 items-center rounded-md border border-gray-300 bg-white p-0.5 shadow-sm">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`flex items-center justify-center rounded px-2.5 py-1.5 transition-colors ${
              viewMode === "grid"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
            title="Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewModeChange("list")}
            className={`flex items-center justify-center rounded px-2.5 py-1.5 transition-colors ${
              viewMode === "list"
                ? "bg-gray-100 text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
            title="Table View"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
