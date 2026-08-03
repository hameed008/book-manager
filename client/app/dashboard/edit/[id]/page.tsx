"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { BookOpen } from "lucide-react";
import { BookForm, BookFormData } from "@/components/books/BookForm";
import { api } from "@/lib/api";

export default function EditBookPage() {
  const router = useRouter();
  const params = useParams();
  const bookId = params.id;

  const [initialData, setInitialData] = useState<BookFormData | null>(null);
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.books.getById(bookId as string);
        const book = response.data.book;

        setInitialData({
          title: book.title,
          author: book.author,
          tags: book.tags ? book.tags.join(", ") : "",
          status: book.status,
        });
      } catch (err) {
        setError("Failed to load book data. It may have been deleted.");
      } finally {
        setIsFetching(false);
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  const handleUpdate = async (formData: BookFormData) => {
    setError("");
    setIsSaving(true);

    try {
      const formattedTags = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [];

      await api.books.update(bookId as string, {
        ...formData,
        tags: formattedTags as any, // Cast as any to resolve TypeScript type mismatch
      });

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update book.");
      setIsSaving(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-blue-900/5 ring-1 ring-gray-100">
        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Edit Book</h2>
              <p className="text-sm text-gray-500">
                Update the details of this entry.
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

          {initialData ? (
            <BookForm
              initialData={initialData}
              onSubmit={handleUpdate}
              isLoading={isSaving}
              submitLabel="Save Changes"
            />
          ) : (
            <div className="text-center text-gray-500">Book not found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
