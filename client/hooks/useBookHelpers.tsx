// hooks/useBookHelpers.tsx
import { ReactElement } from "react";
import { BookOpen, Clock, CheckCircle } from "lucide-react";
import { StatusColorClass, CardTheme } from "@/types/book";

// Remove the "use" prefix - this is now a regular function, not a hook
export function getBookHelpers() {
  const getStatusIcon = (status: string): ReactElement => {
    switch (status) {
      case "Reading":
        return <BookOpen className="h-4 w-4 text-amber-600" />;
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default:
        return <Clock className="h-4 w-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string): StatusColorClass => {
    switch (status) {
      case "Reading":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      default:
        return "bg-slate-50 text-slate-700 ring-slate-600/20";
    }
  };

  const getCardTheme = (status: string): CardTheme => {
    switch (status) {
      case "Reading":
        return {
          wrapper:
            "bg-gradient-to-br from-orange-50/50 to-orange-50 ring-blue-200 hover:ring-blue-300 hover:shadow-blue-900/15",
          selectFocus: "focus:ring-blue-500/50",
          tagStyle: "text-orange-700 ring-orange-400/50",
        };
      case "Completed":
        return {
          wrapper:
            "bg-gradient-to-br from-emerald-50/50 to-emerald-100 ring-emerald-200 hover:ring-emerald-300 hover:shadow-emerald-900/15",
          selectFocus: "focus:ring-emerald-500/50",
          tagStyle: "text-emerald-700 ring-emerald-400/50",
        };
      case "Want to Read":
      default:
        return {
          wrapper:
            "bg-gradient-to-br from-violet-50/50 to-violet-100 ring-violet-200 hover:ring-violet-300 hover:shadow-violet-900/15",
          selectFocus: "focus:ring-violet-500/50",
          tagStyle: "text-violet-700 ring-violet-400/50",
        };
    }
  };

  const getStatusCounts = (books: any[]) => {
    return {
      "Want to Read": books.filter((b) => b.status === "Want to Read").length,
      Reading: books.filter((b) => b.status === "Reading").length,
      Completed: books.filter((b) => b.status === "Completed").length,
    };
  };

  return {
    getStatusIcon,
    getStatusColor,
    getCardTheme,
    getStatusCounts,
  };
}

// Also export as useBookHelpers for backward compatibility
export const useBookHelpers = getBookHelpers;
