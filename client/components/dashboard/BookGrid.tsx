// components/dashboard/BookGrid.tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Book } from "@/types/book";

interface BookGridProps {
  books: Book[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: string) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusColor: (status: string) => string;
  getCardTheme: (status: string) => {
    wrapper: string;
    selectFocus: string;
    tagStyle: string;
  };
}

export function BookGrid({
  books,
  onEdit,
  onDelete,
  onStatusChange,
  getStatusIcon,
  getStatusColor,
  getCardTheme,
}: BookGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => {
        const theme = getCardTheme(book.status);
        return (
          <div
            key={book._id}
            className={`group flex flex-col justify-between rounded-2xl p-5 shadow-sm ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${theme.wrapper}`}
          >
            <div>
              {/* Top Row: Status Badge (Left) & Actions (Right) */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusColor(book.status)}`}
                >
                  {getStatusIcon(book.status)}
                  <span>{book.status}</span>
                </div>

                <div className="flex items-center gap-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100">
                  <button
                    onClick={() => onEdit(book._id)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
                    title="Edit Book"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(book._id)}
                    className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                    title="Delete Book"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Book Information */}
              <h3 className="mb-1 line-clamp-2 text-lg font-bold leading-tight text-gray-900">
                {book.title}
              </h3>
              <p className="text-sm font-medium italic text-gray-500">
                {book.author}
              </p>

              {/* Tags */}
              {book.tags && book.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {book.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center rounded-md bg-white/60 px-2 py-1 text-xs font-medium ring-1 ring-inset backdrop-blur-sm ${theme.tagStyle}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Status Selector */}
            <div className="mt-6 border-t border-gray-900/5 pt-5">
              <select
                value={book.status}
                onChange={(e) => onStatusChange(book._id, e.target.value)}
                className={`block w-full cursor-pointer rounded-xl border-0 bg-white/50 py-2.5 pl-4 pr-10 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 transition-all hover:bg-white focus:bg-white focus:outline-none focus:ring-2 backdrop-blur-sm ${theme.selectFocus}`}
              >
                <option value="Want to Read">Want to Read</option>
                <option value="Reading">Reading</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
}
