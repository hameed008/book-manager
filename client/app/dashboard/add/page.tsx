"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookPlus } from "lucide-react";
import { BookForm, BookFormData } from "@/components/books/BookForm";
import { api } from "@/lib/api";

export default function AddBookPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCreate = async (formData: BookFormData) => {
    setError("");
    setIsSaving(true);

    try {
      const formattedTags = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [];

      await api.books.create({
        ...formData,
        // Add "as any" here to tell TypeScript it's okay to pass an array
        tags: formattedTags as any,
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add book.");
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-gray-100">
        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add a New Book
              </h2>
              <p className="text-sm text-gray-500">
                Log a new entry into your collection.
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600 ring-1 ring-red-100">
              {error}
            </div>
          )}

          <BookForm
            onSubmit={handleCreate}
            isLoading={isSaving}
            submitLabel="Add Book"
          />
        </div>
      </div>
    </div>
  );
}
