"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Library, PlusCircle, Settings, BookOpen } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "My Collection", href: "/dashboard", icon: Library },
    { name: "Add Book", href: "/dashboard/add", icon: PlusCircle },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-100 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
        <BookOpen className="h-6 w-6 text-gray-900" />
        <span className="text-lg font-semibold tracking-tight text-gray-900">
          BookManager
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-50 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`h-5 w-5 ${isActive ? "text-gray-900" : "text-gray-400"}`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
