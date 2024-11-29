import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Checkbox } from "@/src/components/ui/checkbox";
export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your details below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input
              id="company-name"
              type="text"
              placeholder="Enter your company name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <select
              id="country"
              name="country"
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="" disabled selected>
                Select your country
              </option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
              <option value="in">India</option>
              <option value="tn">Tunisia</option>
              <option value="al">Algeria</option>
              <option value="eg">Egypt</option>
              <option value="fr">France</option>
              <option value="it">Italy</option>
              <option value="mr">Morroco</option>
              <option value="gh">Ghana</option>
              <option value="sa">South Africa</option>
              <option value="ge">Germany</option>
              <option value="sa">Saudi Arabia</option>
              
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              name="language"
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="" disabled selected>
                Select your language
              </option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="de">German</option>
              <option value="zh">Chinese</option>
              <option value="ar">Arabic</option>
              {/* Add more language options as needed */}
            </select>
          </div>
          <div className="grid gap-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="verify-password">Verify Password</Label>
            <Input
              id="verify-password"
              type="password"
              placeholder="Re-enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Signup
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
