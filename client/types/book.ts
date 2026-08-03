// types/book.ts
export interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: "Want to Read" | "Reading" | "Completed";
}

export type StatusColorClass =
  | "bg-amber-50 text-amber-700 ring-amber-600/20"
  | "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
  | "bg-slate-50 text-slate-700 ring-slate-600/20";

export interface CardTheme {
  wrapper: string;
  selectFocus: string;
  tagStyle: string;
}

export interface StatusCounts {
  "Want to Read": number;
  Reading: number;
  Completed: number;
}
