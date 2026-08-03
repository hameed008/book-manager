// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { StatsBanner } from "@/components/dashboard/StatsBanner";
import { BookGrid } from "@/components/dashboard/BookGrid";
import { BookList } from "@/components/dashboard/BookList";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useBooks } from "@/hooks/useBooks";
import { useBookHelpers } from "@/hooks/useBookHelpers"; // This now works without a Provider

export default function DashboardPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState("All");
  const [tagSearch, setTagSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { books, isLoading, error, fetchBooks, updateStatus, deleteBook } =
    useBooks({ statusFilter, tagSearch });

  const { getStatusIcon, getStatusColor, getCardTheme, getStatusCounts } =
    useBookHelpers();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBooks();
  };

  const clearFilters = () => {
    setStatusFilter("All");
    setTagSearch("");
  };

  const handleDelete = (id: string) => {
    setBookToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;

    setIsDeleting(true);
    const success = await deleteBook(bookToDelete);
    setIsDeleting(false);
    setDeleteModalOpen(false);
    setBookToDelete(null);
  };

  const statusCounts = getStatusCounts(books);
  const isFiltered = statusFilter !== "All" || tagSearch !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 pb-12">
      <DashboardHeader onAddBook={() => router.push("/dashboard/add")} />

      <main className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
        <FilterBar
          tagSearch={tagSearch}
          statusFilter={statusFilter}
          viewMode={viewMode}
          onTagSearchChange={setTagSearch}
          onStatusFilterChange={setStatusFilter}
          onViewModeChange={setViewMode}
          onSearchSubmit={handleSearchSubmit}
        />

        <StatsBanner
          totalBooks={books.length}
          statusCounts={statusCounts}
          isFiltered={isFiltered}
        />

        {error && <ErrorMessage message={error} />}

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {books.length > 0 ? (
              viewMode === "grid" ? (
                <BookGrid
                  books={books}
                  onEdit={(id) => router.push(`/dashboard/edit/${id}`)}
                  onDelete={handleDelete}
                  onStatusChange={updateStatus}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getCardTheme={getCardTheme}
                />
              ) : (
                <BookList
                  books={books}
                  onEdit={(id) => router.push(`/dashboard/edit/${id}`)}
                  onDelete={handleDelete}
                  onStatusChange={updateStatus}
                  getStatusIcon={getStatusIcon}
                  getStatusColor={getStatusColor}
                  getCardTheme={getCardTheme}
                />
              )
            ) : (
              <EmptyState
                hasSearch={tagSearch !== ""}
                onClearFilters={clearFilters}
              />
            )}
          </>
        )}

        <ConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          isLoading={isDeleting}
          title="Delete this book?"
          message="Are you sure you want to remove this book from your collection? This action cannot be undone."
        />
      </main>
    </div>
  );
}
