import Link from "next/link";
import { BookOpen } from "lucide-react";

interface LogoProps {
  variant?: "default" | "white";
  bookColor?: string;
  managerColor?: string;
  iconBg?: string;
  iconColor?: string;
}

export function Logo({
  variant = "default",
  bookColor,
  managerColor,
  iconBg,
  iconColor,
}: LogoProps) {
  const isWhite = variant === "white";

  const finalBookColor =
    bookColor || (isWhite ? "text-white" : "text-gray-900");
  const finalManagerColor =
    managerColor || (isWhite ? "text-emerald-200" : "text-emerald-600");
  const finalIconBg =
    iconBg ||
    "bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-500/20";
  const finalIconColor = iconColor || "text-white";

  
  const targetRoute = "/";

  return (
   
    <Link 
      href={targetRoute}
      className="flex items-center gap-3 transition-opacity hover:opacity-90"
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all ${finalIconBg}`}
      >
        <BookOpen className={`h-5 w-5 ${finalIconColor}`} />
      </div>

      <span
        className={`text-xl font-bold tracking-tight transition-colors ${finalBookColor}`}
      >
        Book
        <span className={`font-medium transition-colors ${finalManagerColor}`}>
          Manager
        </span>
      </span>
    </Link>
  );
}