"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building, User, Bell, Palette, FileDown, FileUp, Save, Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue="Acryx Technologies" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Company Website</Label>
                <Input id="company-website" defaultValue="https://acryx.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea id="company-address" defaultValue="123 Tech Street, Silicon Valley, CA 94043" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Default Settings</CardTitle>
              <CardDescription>Configure default behavior for the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-logout">Auto Logout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
                </div>
                <Switch id="auto-logout" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="default-view">Default View</Label>
                  <p className="text-sm text-muted-foreground">Choose which page to show after login</p>
                </div>
                <Select defaultValue="dashboard">
                  <SelectTrigger id="default-view" className="w-[180px]">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="accounts">Social Accounts</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Settings */}
        <TabsContent value="account" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" defaultValue="Social Media Manager" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="mt-2">
                <Save className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure when you&apos;ll receive email notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Account Added</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a new social account is added</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New User Added</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when a new user is added to the system
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Account Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive an email when a social account is updated</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Configure in-app notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">Show notifications when users log in</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Account Activity</Label>
                  <p className="text-sm text-muted-foreground">Show notifications for account changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${theme === "light" ? "border-primary" : "border-muted"}`}
                  onClick={() => setTheme("light")}
                >
                  <Sun className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">Light</span>
                </div>
                <div
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${theme === "dark" ? "border-primary" : "border-muted"}`}
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">Dark</span>
                </div>
                <div
                  className={`flex flex-col items-center justify-center rounded-md border-2 p-4 hover:border-primary ${theme === "system" ? "border-primary" : "border-muted"}`}
                  onClick={() => setTheme("system")}
                >
                  <Monitor className="mb-2 h-6 w-6" />
                  <span className="text-sm font-medium">System</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Display Density</CardTitle>
              <CardDescription>Adjust the spacing and density of UI elements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center justify-center rounded-md border-2 border-primary p-4 hover:border-primary">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center">
                    <div className="h-4 w-full rounded-sm bg-primary"></div>
                  </div>
                  <span className="text-sm font-medium">Compact</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:border-primary">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center">
                    <div className="h-3 w-full rounded-sm bg-primary"></div>
                  </div>
                  <span className="text-sm font-medium">Comfortable</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:border-primary">
                  <div className="mb-2 flex h-6 w-6 items-center justify-center">
                    <div className="h-2 w-full rounded-sm bg-primary"></div>
                  </div>
                  <span className="text-sm font-medium">Spacious</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>Download your data in various formats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label>Social Accounts Data</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export as JSON
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export as PDF
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Label>Users Data</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                  <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export as JSON
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Import Data</CardTitle>
              <CardDescription>Upload data from external sources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Label>Social Accounts Data</Label>
                <div className="flex items-center gap-2">
                  <Input id="import-accounts" type="file" />
                  <Button>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Supported formats: CSV, JSON</p>
              </div>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Label>Users Data</Label>
                <div className="flex items-center gap-2">
                  <Input id="import-users" type="file" />
                  <Button>
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Supported formats: CSV, JSON</p>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Note: Importing data will not overwrite existing records unless specified.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
