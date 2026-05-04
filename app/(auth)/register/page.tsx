"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GraduationCap, Loader2 } from "lucide-react";

const registerSchema = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.string().email("Please enter a valid university email"),
  matric: z.string().min(2, "Matric / Staff ID is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullname: "", email: "", matric: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsLoading(true);
    // Simulate backend registration delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    
    alert("Registration request submitted to Admin for approval.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Create Account</CardTitle>
          <CardDescription>Register for the Kings Distance Learning Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" placeholder="John Doe" {...form.register("fullname")} />
              {form.formState.errors.fullname && <p className="text-xs text-red-500">{form.formState.errors.fullname.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">University Email</Label>
              <Input id="email" type="email" placeholder="john@kings.edu" {...form.register("email")} />
              {form.formState.errors.email && <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="matric">Matric Number / Staff ID</Label>
              <Input id="matric" placeholder="CSC/2026/001" {...form.register("matric")} />
              {form.formState.errors.matric && <p className="text-xs text-red-500">{form.formState.errors.matric.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...form.register("password")} />
              {form.formState.errors.password && <p className="text-xs text-red-500">{form.formState.errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Submit Registration"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <p className="text-sm text-slate-500">
            Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Sign In</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}