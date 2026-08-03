"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-md transition-all">
      {/* Modal Container */}
      <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-300 overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-gray-900/5">
        <div className="p-8">
          <div className="flex flex-col items-center text-center gap-5">
        
            <div className="flex shrink-0 h-14 w-14 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-100 shadow-sm shadow-red-200/50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse gap-3 px-8 pb-8 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-600/20 transition-all hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Book"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
