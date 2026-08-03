"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Logo } from "../ui/Logo";
import { api } from "@/lib/api";

export function Navbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState({
    name: "Reader",
    email: "Loading...",
    picture: "picture",
  });

  // Fetch User
useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await api.auth.getMe();
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };
  fetchUser();
}, []);

  // Click-Outside Listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout 
const handleLogout = async () => {
  try {
    await api.auth.logout();
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    router.push("/login");
  }
};

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md transition-colors duration-300 sm:px-8">
      {/* Logo & Brand */}
      <Logo iconBg="bg-blue-500" managerColor="text-blue-500" />
      {/* Profile Actions */}
      <div className="flex items-center gap-4">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <img
              src={user.picture}
              alt="Picture"
              className="w-6.5 rounded-full hover:cursor-pointer"
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-72 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 border border-white/20">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                {/* User Details */}
                <div className="border-b border-gray-100/80 bg-gradient-to-br from-gray-50/80 to-white/50 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center rounded-full justify-center shadow-md">
                      <img src={user.picture} alt="Picture" className="rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-600">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-2">
                  <button
                    onClick={handleLogout}
                    className="group relative flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-700 hover:shadow-sm"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-50/0 to-red-50/0 transition-all duration-200 group-hover:from-red-50/50 group-hover:to-red-100/30" />
                    <LogOut className="relative h-4.5 w-4.5 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:scale-105" />
                    <span className="relative">Sign out</span>
                    <span className="relative ml-auto text-xs font-normal text-gray-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-red-400">
                      ⌘Q
                    </span>
                  </button>
                </div>

                <div className="border-t border-gray-100/60 px-4 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                      Account
                    </span>
                    <span className="text-[10px] text-gray-400">v2.4.1</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
