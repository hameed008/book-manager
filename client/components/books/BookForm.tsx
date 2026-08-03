"use client";

import { useState } from "react";
import { BookType, UserPen, Tags } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { GradientButton } from "../ui/Button";

export interface BookFormData {
  title: string;
  author: string;
  tags: string; 
  status: "Want to Read" | "Reading" | "Completed";
}

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
  isLoading: boolean;
  submitLabel: string;
}

export function BookForm({
  initialData,
  onSubmit,
  isLoading,
  submitLabel,
}: BookFormProps) {
  
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData?.title || "",
    author: initialData?.author || "",
    tags: initialData?.tags || "",
    status: initialData?.status || "Want to Read",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Book Title"
        id="title"
        name="title"
        type="text"
        icon={BookType}
        required
        placeholder="e.g., The Midnight Library"
        value={formData.title}
        onChange={handleChange}
      />

      <Input
        label="Author"
        id="author"
        name="author"
        type="text"
        icon={UserPen}
        required
        placeholder="e.g., Matt Haig"
        value={formData.author}
        onChange={handleChange}
      />

      <Input
        label="Tags (Comma separated)"
        id="tags"
        name="tags"
        type="text"
        icon={Tags}
        placeholder="e.g., Fiction, Fantasy, Contemporary"
        value={formData.tags}
        onChange={handleChange}
      />

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Reading Status
        </label>
        <div className="group relative mt-1 flex rounded-md shadow-sm">
          <div
            className="absolute -inset-[1px] rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100"
            aria-hidden="true"
          />
          <div className="relative flex w-full overflow-hidden rounded-md border border-gray-300 bg-white transition-colors group-focus-within:border-transparent">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="block w-full border-0 bg-transparent py-2 pl-3 pr-10 text-gray-900 focus:outline-none focus:ring-0 sm:text-sm"
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <GradientButton
          type="submit"
          isLoading={isLoading}
          size="lg"
          className="w-full"
          fromColor="from-blue-600"
          toColor="to-indigo-600"
        >
          {submitLabel}
        </GradientButton>
      </div>
    </form>
  );
}
