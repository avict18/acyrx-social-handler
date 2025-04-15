"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock data for users
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2023-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", createdAt: "2023-02-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Viewer", createdAt: "2023-03-10" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "Editor", createdAt: "2023-04-05" },
  { id: 5, name: "Alex Brown", email: "alex@example.com", role: "Viewer", createdAt: "2023-05-12" },
  { id: 6, name: "Emily Davis", email: "emily@example.com", role: "Editor", createdAt: "2023-06-18" },
  { id: 7, name: "Chris Wilson", email: "chris@example.com", role: "Viewer", createdAt: "2023-07-22" },
  { id: 8, name: "Taylor Moore", email: "taylor@example.com", role: "Admin", createdAt: "2023-08-30" },
]

export default function UserTable() {
  const [users, setUsers] = useState(initialUsers)
  const [userToDelete, setUserToDelete] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDelete = (id: number) => {
    setUserToDelete(id)
    setDialogOpen(true)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete))
      setUserToDelete(null)
      setDialogOpen(false)
    }
  }

  const getRoleBadge = (role: string) => {
    const styles: Record<string, string> = {
      Admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      Editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Viewer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    }

    return styles[role] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
  }

  return (
    <>
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadge(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(user.id)}>
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
              Are you sure you want to delete this user? This action cannot be undone.
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
