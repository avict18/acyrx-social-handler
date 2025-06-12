import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Share2, PlusCircle } from "lucide-react"
import UserTable from "@/components/user-table"
import AccountTable from "@/components/account-table"

export const metadata: Metadata = {
  title: "Social Accounts Tracker - Dashboard",
  description: "Manage your organization's social media accounts",
}

export default function DashboardPage() {
  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Social Accounts</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Accounts</h2>
            <Link href="/dashboard/accounts/add">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Account
              </Button>
            </Link>
          </div>
          <AccountTable />
        </TabsContent>
        <TabsContent value="users" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">
              Users
            </h2>
            <div>
              <Button asChild>
                <Link href="/dashboard/users/add">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New User
                </Link>
              </Button>
            </div>
            <UserTable />
          </TabsContent>
        </Tabs>
    </div>
  )
}
