import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Hidden on mobile, fixed width on desktop */}
      {/* <aside className="hidden md:block w-64 flex-shrink-0">
        <Sidebar />
      </aside> */}

      {/* Main Content Wrapper */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
