"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock } from "lucide-react";

// Mock Data
const SUBMISSIONS = [
  { id: 1, student: "Mary Samuel", course: "CSC401", title: "Build a responsive webpage", date: "2026-05-20", status: "pending", answer: "https://github.com/mary/csc401-task" },
  { id: 2, student: "John Doe", course: "CSC401", title: "JavaScript DOM project", date: "2026-05-19", status: "graded", grade: 85 },
  { id: 3, student: "Mary Samuel", course: "CSC302", title: "Normalization Exercise", date: "2026-05-22", status: "pending", answer: "Attached PDF document." },
];

export default function LecturerGradingPage() {
  const [selectedSub, setSelectedSub] = useState<number | null>(null);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleGradeSubmit = async () => {
    if (!grade) return;
    setIsSaving(true);
    // Simulate API call to save grade
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSaving(false);
    setSelectedSub(null);
    setGrade("");
    setFeedback("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Grade Submissions</h2>
        <p className="text-slate-500">Review student work and provide feedback.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {SUBMISSIONS.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell className="font-medium text-slate-900">{sub.student}</TableCell>
                <TableCell>
                  <span className="text-xs font-bold text-slate-500 block">{sub.course}</span>
                  {sub.title}
                </TableCell>
                <TableCell className="text-slate-500">{sub.date}</TableCell>
                <TableCell>
                  {sub.status === "graded" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Graded ({sub.grade}/100)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <Clock className="h-3.5 w-3.5" />
                      Needs Grading
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog 
                    open={selectedSub === sub.id} 
                    onOpenChange={(isOpen) => !isOpen && setSelectedSub(null)}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        variant={sub.status === "graded" ? "outline" : "default"} 
                        size="sm"
                        onClick={() => setSelectedSub(sub.id)}
                      >
                        {sub.status === "graded" ? "Edit Grade" : "Review Work"}
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Grade Submission</DialogTitle>
                        <DialogDescription>
                          {sub.student} - {sub.title}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-6 py-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                          <span className="font-semibold text-slate-700 block mb-1">Student Answer/Link:</span>
                          <span className="text-slate-600 break-all">{sub.answer || "No text provided."}</span>
                        </div>

                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="score" className="text-right font-medium">Score (/100)</Label>
                          <Input 
                            id="score" 
                            type="number" 
                            className="col-span-3" 
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            placeholder="e.g., 85" 
                          />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                          <Label htmlFor="feedback" className="text-right font-medium pt-2">Feedback</Label>
                          {/* Standard Tailwind Textarea */}
                          <textarea 
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="col-span-3 flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950"
                            placeholder="Great job on the UI structure..."
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedSub(null)}>Cancel</Button>
                        <Button onClick={handleGradeSubmit} disabled={!grade || isSaving}>
                          {isSaving ? "Saving..." : "Publish Grade"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}