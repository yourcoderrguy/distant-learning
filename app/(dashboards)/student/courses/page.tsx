import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users } from "lucide-react";

// Mock Data: Replace with actual database fetch later
const ENROLLED_COURSES = [
  { id: 101, code: "CSC401", title: "Web Technologies", instructor: "Dr. Adebayo", assignments: 2 },
  { id: 102, code: "CSC302", title: "Database Systems", instructor: "Dr. Adebayo", assignments: 1 },
  { id: 103, code: "EDU501", title: "Distance Learning Pedagogy", instructor: "Prof. Ojo", assignments: 0 },
];

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">My Enrolled Courses</h2>
        <p className="text-slate-500">View and manage your current semester courses.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ENROLLED_COURSES.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {course.code}
                </span>
              </div>
              <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1">
                <Users className="h-3.5 w-3.5" />
                {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center text-sm text-slate-500 gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{course.assignments} Pending Tasks</span>
                </div>
                <Button size="sm" variant="outline" className="font-medium">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Enter
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}