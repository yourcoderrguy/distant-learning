"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Menu, BookOpen, CheckSquare, Users, MessageSquare, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Demo Magic: Instantly switch roles without typing passwords
  const handleDemoSwitch = (email: string, pass: string, route: string) => {
    login(email, pass);
    router.push(route);
  };

  const getMobileLinks = () => {
    if (!user) return [];
    const baseLinks = [{ name: "Forum", href: "/forum", icon: MessageSquare }];
    switch (user.role) {
      case "student": return [{ name: "My Courses", href: "/student/courses", icon: BookOpen }, { name: "Assignments", href: "/student/assignments", icon: CheckSquare }, ...baseLinks];
      case "lecturer": return [{ name: "Manage Courses", href: "/lecturer/courses", icon: BookOpen }, { name: "Grade Submissions", href: "/lecturer/grading", icon: CheckSquare }, ...baseLinks];
      case "admin": return [{ name: "Manage Users", href: "/admin/users", icon: Users }, { name: "All Courses", href: "/admin/courses", icon: BookOpen }, ...baseLinks];
      default: return [];
    }
  };

  const mobileLinks = getMobileLinks();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile Sidebar Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-slate-900 text-slate-300 p-0 border-r-slate-800">
            <div className="flex h-16 items-center justify-center border-b border-slate-800 px-4">
              <h2 className="text-lg font-bold text-white tracking-wider">KINGS LMS</h2>
            </div>
            <nav className="flex-1 space-y-1 p-4">
              {mobileLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                const Icon = link.icon;
                return (
                  <Link key={link.name} href={link.href} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive ? "bg-slate-800 text-white" : "hover:bg-slate-800/50 hover:text-white"}`}>
                    <Icon className="h-5 w-5" /> {link.name}
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold text-slate-800 md:hidden">Kings LMS</h1>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {/* DEMO ROLE SWITCHER */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden sm:flex border-primary/20 text-primary hover:bg-primary/10">
              <Zap className="h-4 w-4 mr-2" /> Quick Switch
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Demo Roles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleDemoSwitch("mary@kings.edu", "1234", "/student/courses")} className="cursor-pointer">
              👨‍🎓 Student View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDemoSwitch("adebayo@kings.edu", "lect123", "/lecturer/courses")} className="cursor-pointer">
              👨‍🏫 Lecturer View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDemoSwitch("admin@kings.edu", "admin123", "/admin/users")} className="cursor-pointer">
              🛡️ Admin View
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
          <User className="h-4 w-4" />
          {user?.fullname || "Guest"}
          <span className="ml-1 text-xs uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {user?.role}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-red-600">
          <LogOut className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}