"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye, EyeOff } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for social accounts
const initialAccounts = [
  {
    id: 1,
    platform: "Facebook",
    accountName: "Acryx Technologies",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "John Doe",
    addedOn: "2023-01-15",
  },
  {
    id: 2,
    platform: "Twitter",
    accountName: "@AcryxTech",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Jane Smith",
    addedOn: "2023-02-20",
  },
  {
    id: 3,
    platform: "Instagram",
    accountName: "acryxtechnologies",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Mike Johnson",
    addedOn: "2023-03-10",
  },
  {
    id: 4,
    platform: "LinkedIn",
    accountName: "Acryx Technologies",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Sarah Williams",
    addedOn: "2023-04-05",
  },
  {
    id: 5,
    platform: "YouTube",
    accountName: "Acryx Tech Channel",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Alex Brown",
    addedOn: "2023-05-12",
  },
  {
    id: 6,
    platform: "Pinterest",
    accountName: "AcryxTech",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "John Doe",
    addedOn: "2023-06-18",
  },
  {
    id: 7,
    platform: "TikTok",
    accountName: "@acryxtech",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Jane Smith",
    addedOn: "2023-07-22",
  },
  {
    id: 8,
    platform: "Snapchat",
    accountName: "acryxtech",
    email: "social@acryx.com",
    password: "••••••••",
    addedBy: "Mike Johnson",
    addedOn: "2023-08-30",
  },
]

export default function AccountTable() {
  const [accounts, setAccounts] = useState(initialAccounts)
  const [visiblePasswords, setVisiblePasswords] = useState<Record<number, boolean>>({})
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = (id: number) => {
    setAccountToDelete(id)
    setDialogOpen(true)
  }

  const confirmDelete = () => {
    if (accountToDelete) {
      setAccounts(accounts.filter((account) => account.id !== accountToDelete))
      setAccountToDelete(null)
      setDialogOpen(false)
    }
  }

  const togglePasswordVisibility = (id: number) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const getPlatformColor = (platform: string) => {
    const colors: Record<string, string> = {
      Facebook: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Twitter: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
      Instagram: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      LinkedIn: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      YouTube: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      TikTok: "bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100",
      Pinterest: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Snapchat: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    }

    return colors[platform] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <>
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Account Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.id}>
                <TableCell>
                  <Badge className={getPlatformColor(account.platform)}>{account.platform}</Badge>
                </TableCell>
                <TableCell className="font-medium">{account.accountName}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {visiblePasswords[account.id] ? "password123" : "••••••••"}
                    <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(account.id)}>
                      {visiblePasswords[account.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{account.addedBy}</TableCell>
                <TableCell>{account.addedOn}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(account.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this social media account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
