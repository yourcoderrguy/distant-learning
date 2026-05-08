"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Loader2, KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";

// Strict validation for the email
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid university email"),
});

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setIsLoading(true);
    
    // Simulate backend API call to send the reset email
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              {isSubmitted ? (
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              ) : (
                <KeyRound className="h-8 w-8 text-primary" />
              )}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isSubmitted ? "Check your email" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {isSubmitted 
              ? "We've sent a password reset link to your university email address." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">University Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="student@kings.edu" 
                  {...form.register("email")} 
                  className={form.formState.errors.email ? "border-red-500" : ""}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
              Try another email
            </Button>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t p-4 mt-2">
          <Link href="/login" className="flex items-center text-sm text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}