import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import UserTable from "@/components/user-table"

export default function UsersPage() {
  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">System Users</h1>
        <Button asChild>
          <Link href="/dashboard/users/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New User
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">
          Manage users who have access to the social accounts management system. Control permissions and user roles.
        </p>

        <UserTable />
      </div>
    </div>
  )
}
