"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, BookOpen } from "lucide-react";

// Mock Database State
const INITIAL_COURSES = [
  { id: 101, code: "CSC401", title: "Web Technologies", instructor: "Dr. Adebayo", active: true },
  { id: 102, code: "CSC302", title: "Database Systems", instructor: "Dr. Adebayo", active: true },
  { id: 103, code: "EDU501", title: "Distance Learning Pedagogy", instructor: "Prof. Ojo", active: true },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(INITIAL_COURSES);

  const handleDeleteCourse = (id: number) => {
    if (confirm("WARNING: Deleting this course will remove all associated student assignments. Proceed?")) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Global Course Registry</h2>
          <p className="text-slate-500">Monitor and manage all active academic modules.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>Module Title</TableHead>
              <TableHead>Assigned Lecturer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-800 rounded text-xs font-bold font-mono">
                    {course.code}
                  </span>
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell className="text-slate-600">{course.instructor}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Master Record
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}