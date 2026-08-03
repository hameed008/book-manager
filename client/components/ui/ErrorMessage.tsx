// components/ui/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mb-6 rounded-2xl bg-red-50/80 backdrop-blur-sm p-4 text-sm text-red-600 ring-1 ring-red-600/10">
      {message}
    </div>
  );
}
