import Link from "next/link"
import { Share2 } from "lucide-react"

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Share2 className="h-6 w-6" />
          <span>Social Accounts Tracker</span>
        </Link>
      </div>
    </header>
  )
}
