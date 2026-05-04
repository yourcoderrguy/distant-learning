"use client";

import { useState } from "react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Mock Data: To be replaced with backend fetch
const ASSIGNMENTS = [
  { id: 201, course: "CSC401", title: "Build a responsive webpage", due: "2026-05-28", status: "pending" },
  { id: 202, course: "CSC401", title: "JavaScript DOM project", due: "2026-06-10", status: "submitted" },
  { id: 203, course: "CSC302", title: "Normalization Exercise", due: "2026-05-25", status: "pending" },
];

export default function StudentAssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmission = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to your backend
    await new Promise(resolve => setTimeout(resolve, 800));
    
    alert(`Success! Assignment ${selectedAssignment} submitted to backend.`);
    
    setIsSubmitting(false);
    setSelectedAssignment(null);
    setSubmissionText("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">My Assignments</h2>
        <p className="text-slate-500">Track your deadlines and submit your coursework.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ASSIGNMENTS.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium text-slate-900">{assignment.course}</TableCell>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.due}</TableCell>
                <TableCell>
                  {assignment.status === "submitted" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Submitted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Pending
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Dialog 
                    open={selectedAssignment === assignment.id} 
                    onOpenChange={(isOpen) => !isOpen && setSelectedAssignment(null)}
                  >
                    <DialogTrigger asChild>
                      <Button 
                        variant={assignment.status === "submitted" ? "outline" : "default"} 
                        size="sm"
                        onClick={() => setSelectedAssignment(assignment.id)}
                      >
                        {assignment.status === "submitted" ? "View Work" : "Submit Work"}
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent className="sm:max-w-[525px]">
                      <DialogHeader>
                        <DialogTitle>Submit Assignment</DialogTitle>
                        <DialogDescription>
                          {assignment.course}: {assignment.title}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="answer">Your Answer / Submission Link</Label>
                          <textarea 
                            id="answer"
                            value={submissionText}
                            onChange={(e) => setSubmissionText(e.target.value)}
                            className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                            placeholder="Type your answer here or paste a link to your repository/document..."
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
                          Cancel
                        </Button>
                        <Button 
                          onClick={handleSubmission} 
                          disabled={!submissionText.trim() || isSubmitting}
                        >
                          {isSubmitting ? "Uploading..." : "Submit to Lecturer"}
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