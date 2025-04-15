"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddAccountPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [platform, setPlatform] = useState<string>("")
  const [customPlatform, setCustomPlatform] = useState<string>("")

  const handlePlatformChange = (value: string) => {
    setPlatform(value)
    if (value !== "other") {
      setCustomPlatform("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, you would send this data to your backend
      // If platform is "other", use the customPlatform value instead
      const finalPlatform = platform === "other" ? customPlatform : platform
      console.log("Platform:", finalPlatform)

      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard/accounts")
    } catch (error) {
      console.error("Error adding account:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-3xl font-bold">Add New Social Account</h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Add a new social media account to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select required onValueChange={handlePlatformChange}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="pinterest">Pinterest</SelectItem>
                  <SelectItem value="snapchat">Snapchat</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {platform === "other" && (
              <div className="space-y-2">
                <Label htmlFor="customPlatform">Custom Platform Name</Label>
                <Input
                  id="customPlatform"
                  placeholder="e.g., Snapchat, Reddit"
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name/Handle</Label>
              <Input id="accountName" placeholder="e.g., @AcryxTech" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="email@example.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input id="notes" placeholder="Any additional information" />
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Adding Account..." : "Add Account"}
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
  )
}
