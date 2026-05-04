"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger would go here */}
        <h1 className="text-xl font-semibold text-slate-800 md:hidden">Kings LMS</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <User className="h-4 w-4" />
          {user?.fullname || "Guest"}
          <span className="ml-1 text-xs uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {user?.role}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}