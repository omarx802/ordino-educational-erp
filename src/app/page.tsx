import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function HomePage() {
  return (
    <main className="p-4 flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to MiniERP</h1>
      <p className="mb-6 text-center text-lg">
        Join us today and explore the amazing features we offer!
      </p>
      <Link href="/login">
        <Button className="px-6 py-2 text-lg">Go to Login</Button>
      </Link>
    </main>
  );
}
