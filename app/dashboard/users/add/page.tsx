"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AddUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the new user in Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
          },
        },
      });

      if (error) {
        console.error("Error adding user:", error);
        // Handle error (e.g., display an error message to the user)
      } else {
        // Redirect to the users page after successful creation
        router.push("/dashboard/users");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      // Handle error (e.g., display an error message to the user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add New User</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Add a new user to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding User..." : "Add User"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <p className="text-sm text-muted-foreground">All fields marked with * are required</p>
        </CardFooter>
      </Card>
    </div>
  );
}
