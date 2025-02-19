'use client';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(timer === 0) setCanResend(true);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if(isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if(value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <h1 className="text-3xl font-bold mb-2">Finups bd</h1>
          <CardTitle className="text-2xl">OTP Verification</CardTitle>
        </CardHeader>
        
        <CardContent>
          <p className="text-center text-gray-600 mb-8">
            A verification code has been sent on this number. Please enter the code here to verify your mobile number.
          </p>

          <div className="flex justify-center gap-4 mb-8">
            {otp.map((value, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                ref={(el) => (inputsRef.current[index] = el!)}
                className="w-12 h-12 text-center text-xl"
              />
            ))}
          </div>

          <div className="text-center mb-8">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-gray-500">
                Did not get any code? Resend Code in ({timer}s)
              </span>
            )}
          </div>

          <Button className="w-full mb-6">Continue</Button>

          <div className="text-center text-sm mb-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>
{/* 
          <div className="flex gap-4">
            <Button variant="outline" className="w-full gap-2">
              <Google className="h-4 w-4" />
              Signup with Google
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Apple className="h-4 w-4" />
              Signup with Apple
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}