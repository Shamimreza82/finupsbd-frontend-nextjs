"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Loader2, Apple} from "lucide-react";
import { useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { loginValidationSchema } from "./loginValidation";
import { loginUser } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LoginFrom() {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter()


  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "shamimrezabd67@gmail.com",
      password: "123456",
    },
  });

  async function onSubmit(data: z.infer<typeof loginValidationSchema>) {
    setIsLoading(true);
    setServerError(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = await loginUser(data)
      if(result.success){
        toast.success('Login successfully')
        router.push('/user/profile')
      }

    } catch (error: any) {
      setServerError("Login failed. Please try again later.");
      toast.error('Login failed. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: "google" | "apple") => {
    // Implement social login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {serverError && (
                <div className="text-red-500 text-sm text-center">
                  {serverError}
                </div>
              )}

              <div className="space-y-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                {/* <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+880XXXXXXXXX"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isLoading ? "loggin..." : "Login"}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Do not have an account?{" "}
            <Link href="/register" className="underline hover:text-primary">
              Register
            </Link>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
{/* 
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              type="button"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <Apple className="mr-2 h-4 w-4" /> Apple
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}