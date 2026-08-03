import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { BookOpen, Mail, Heart, ArrowUp } from "lucide-react";
import { Logo } from "../ui/Logo";


export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-blue-800/80 to-blue-900/90 backdrop-blur-sm">

      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
      <div className="absolute top-0 left-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 py-12 lg:px-8">
      
        <div className="flex flex-col items-center text-center">
          {/* Brand */}
          <Logo variant="white" managerColor="text-emerald-300" />

          <p className="mt-3 max-w-md text-sm leading-relaxed text-blue-100/80">
            Organize your reading journey. Track your books. Discover new
            worlds.
          </p>

          {/* Social Icons */}
          <div className="mt-5 flex gap-2">
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 text-blue-200/50 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
              aria-label="GitHub"
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 text-blue-200/50 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
              aria-label="Twitter"
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 text-blue-200/50 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="rounded-lg bg-white/5 p-2 text-blue-200/50 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-24 bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />

          
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <a
              href="/login"
              className="text-sm font-medium text-blue-100/90 transition-colors duration-200 hover:text-emerald-300"
            >
              Log in
            </a>
            <a
              href="/dashboard"
              className="text-sm font-medium text-blue-100/90 transition-colors duration-200 hover:text-emerald-300"
            >
              Create Account
            </a>
            <a
              href=""
              className="text-sm font-medium text-blue-100/90 transition-colors duration-200 hover:text-emerald-300"
            >
              Dashboard
            </a>
          </div>

  
          <div className="mt-8 flex w-full flex-col items-center gap-4 border-t border-white/5 pt-6 sm:flex-row sm:justify-between">
            <p className="text-xs text-blue-100">
              © {new Date().getFullYear()} BookManager. Built with{" "}
              <Heart className="inline h-3 w-3 text-emerald-400/60" /> for
              readers everywhere.
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs text-blue-100 transition-all duration-300 hover:bg-emerald-500/20 hover:text-emerald-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-1" />
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}