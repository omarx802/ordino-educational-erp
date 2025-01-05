"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { registerUser } from "@/src/lib/api";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import axios from "axios";

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export function CreateAccount() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    surname: "",
    email: "",
    password: "",
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: checked,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.termsAccepted) {
      setMessage({ type: "error", text: "You must accept the terms and conditions." });
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser(
        formData.name,
        formData.surname,
        formData.email,
        formData.password
      );
      setMessage({ type: "success", text: response.message });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage({ type: "error", text: error.response?.data.message || "Registration failed" });
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details below to create an account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">First Name</Label>
            <Input id="name" name="name" type="text" placeholder="Your first name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" name="surname" type="text" placeholder="Your surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Your password here..." value={formData.password} onChange={handleChange} required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" name="termsAccepted" checked={formData.termsAccepted} onCheckedChange={handleCheckboxChange} />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          {message && <p className={`text-sm text-${message.type === "error" ? "red" : "green"}-500`}>{message.text}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
