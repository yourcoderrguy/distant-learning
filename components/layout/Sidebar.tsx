"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { BookOpen, CheckSquare, Users, Home, LayoutDashboard, MessageSquare } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  // Dynamically generate links based on the user's role
  const getLinks = () => {
    const baseLinks = [{ name: "Forum", href: "/forum", icon: MessageSquare }];
    
    switch (user.role) {
      case "student":
        return [
          { name: "My Courses", href: "/student/courses", icon: BookOpen },
          { name: "Assignments", href: "/student/assignments", icon: CheckSquare },
          ...baseLinks
        ];
      case "lecturer":
        return [
          { name: "Manage Courses", href: "/lecturer/courses", icon: BookOpen },
          { name: "Grade Submissions", href: "/lecturer/grading", icon: CheckSquare },
          ...baseLinks
        ];
      case "admin":
        return [
          { name: "Manage Users", href: "/admin/users", icon: Users },
          { name: "All Courses", href: "/admin/courses", icon: BookOpen },
          ...baseLinks
        ];
      default:
        return [];
    }
  };

  const links = getLinks();

  return (
    <aside className="hidden md:flex w-64 flex-col bg-slate-900 text-slate-300 transition-all duration-300">
      <div className="flex h-16 items-center justify-center border-b border-slate-800 px-4">
        <h2 className="text-lg font-bold text-white tracking-wider">KINGS LMS</h2>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive 
                  ? "bg-slate-800 text-white" 
                  : "hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}