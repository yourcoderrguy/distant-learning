"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Plus, Settings, Users } from "lucide-react";

// Mock Data: To be replaced with database fetching
const MY_COURSES = [
  { id: 101, code: "CSC401", title: "Web Technologies", students: 45, assignments: 2 },
  { id: 102, code: "CSC302", title: "Database Systems", students: 38, assignments: 1 },
];

export default function LecturerCoursesPage() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    // Simulate API call to backend
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsCreating(false);
    // In a real app, you would refresh the router here to show the new course
    alert("Course creation architecture ready for backend integration.");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Manage Courses</h2>
          <p className="text-slate-500">Oversee your assigned modules and curriculum.</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Add a new course module to the LMS. It will be immediately available to students.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateCourse}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input id="code" placeholder="e.g., CSC501" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input id="title" placeholder="e.g., Advanced AI Systems" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? "Saving..." : "Save Course"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MY_COURSES.map((course) => (
          <Card key={course.id} className="border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-1 bg-slate-100 text-slate-800 rounded-md">
                  {course.code}
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center gap-1.5 text-primary font-medium">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.assignments} Tasks</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}