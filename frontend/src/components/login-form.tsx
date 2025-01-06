"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { loginUser } from "@/src/lib/api";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // Error state
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Apply dark mode class only after the component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
  
    try {
      console.log("Submitting login request with:", { email, password });
      const response = await loginUser(email, password);
  
      if (response && response.access_token) {
        localStorage.setItem("token", response.access_token); // Save JWT Token
        router.push("/inside/dashboard"); // Redirection
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);  // Log error for debugging
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className={isClient ? "system" : ""}> {/* Apply dark mode after client-side rendering */}
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign in</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Link href="#" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
