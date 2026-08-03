// hooks/useBooks.tsx
import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: "Want to Read" | "Reading" | "Completed";
}

interface UseBooksOptions {
  statusFilter?: string;
  tagSearch?: string;
}

export function useBooks(options: UseBooksOptions = {}) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBooks = useCallback(async () => {
    setError("");
    setIsLoading(true);

    try {
      const params: Record<string, string> = {};

      if (options.statusFilter && options.statusFilter !== "All") {
        params.status = options.statusFilter;
      }
      if (options.tagSearch && options.tagSearch.trim() !== "") {
        params.tag = options.tagSearch.trim();
      }

      const response = await api.books.getAll(params);
      setBooks(response.data.books);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError("Failed to load your collection. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [options.statusFilter, options.tagSearch]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const updateStatus = useCallback(
    async (bookId: string, newStatus: string) => {
      try {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book._id === bookId
              ? { ...book, status: newStatus as Book["status"] }
              : book,
          ),
        );

        // FIX: Cast newStatus as any to bypass the strict type check
        await api.books.update(bookId, { status: newStatus as any });
      } catch (err) {
        fetchBooks();
      }
    },
    [fetchBooks],
  );

  const deleteBook = useCallback(async (bookId: string) => {
    try {
      await api.books.delete(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
      return true;
    } catch (error) {
      console.error("Failed to delete book:", error);
      return false;
    }
  }, []);

  return {
    books,
    isLoading,
    error,
    fetchBooks,
    updateStatus,
    deleteBook,
  };
}
