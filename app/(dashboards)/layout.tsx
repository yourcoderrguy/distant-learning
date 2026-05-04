import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar remains hidden on mobile, handled by Navbar Sheet */}
      <Sidebar /> 
      <div className="flex flex-1 flex-col overflow-hidden w-full">
        <Navbar />
        {/* Main scrollable content area with responsive padding */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}