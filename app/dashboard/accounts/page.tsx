import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import AccountTable from "@/components/account-table"

export default function AccountsPage() {
  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Social Media Accounts</h1>
        <Button asChild>
          <Link href="/dashboard/accounts/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Account
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground">
          Manage all your organization&apos;s social media accounts in one place. View account details, update credentials,
          or add new accounts.
        </p>

        <AccountTable />
      </div>
    </div>
  )
}
