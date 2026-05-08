"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { BookOpen, CheckSquare, Users, MessageSquare } from "lucide-react";
import Image from "next/image";

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
    /* Changed from bg-slate-900 to bg-secondary (Deep Navy Blue) */
    <aside className="hidden md:flex w-64 flex-col bg-secondary text-secondary-foreground transition-all duration-300 shadow-xl z-10">
      
      {/* Sidebar Header with the New Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <Image 
          src="/logo.jpg" 
          alt="Kings University Logo" 
          width={32} 
          height={32} 
          className="object-contain rounded-md bg-white p-0.5" 
        />
        <h2 className="text-lg font-bold tracking-wider text-white">KINGS LMS</h2>
      </div>
      
      <nav className="flex-1 space-y-2 p-4">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              /* Changed active state to bg-primary (Royal Blue) */
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive 
                  ? "bg-primary text-white shadow-md" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
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