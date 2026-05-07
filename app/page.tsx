import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, BookOpen, Globe, Shield } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header with BOTH Sign In and Register */}
      <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-900">
         <Image 
  src="/logo.jpg" 
  alt="Kings University Logo" 
  width={100} 
  height={50} 
  className="object-contain rounded-md" 
/>
        </div>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="ghost" className="font-medium">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button className="font-medium">Create Account</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Distance Learning Portal Live
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mb-6">
          Empowering Education Beyond the Classroom.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10">
          Access your courses, submit assignments, and collaborate with peers and lecturers on the official Kings University digital learning platform.
        </p>
        
        <Link href="/login">
          <Button size="lg" className="h-12 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
            Access Portal <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Role-Based Access</h3>
            <p className="text-slate-500">Dedicated interfaces designed specifically for students, lecturers, and administrators.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-emerald-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-emerald-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Global Forum</h3>
            <p className="text-slate-500">Engage in real-time academic discussions with the entire university community.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-purple-700" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Secure Grading</h3>
            <p className="text-slate-500">Submit coursework securely and receive direct, private feedback from instructors.</p>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2026 Kings University. Distance Learning System Architecture.</p>
      </footer>
    </div>
  );
}