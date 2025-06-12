"use client";

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

async function getRegisteredUsers() {
  const supabase = createClientComponentClient();
  const { data: { users }, error } = await supabase.auth.listUsers();

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return users || [];
}

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const userData = await getRegisteredUsers();
      setUsers(userData);
    }

    loadUsers();
  }, [refreshData]);

  const handleDelete = (id: string) => {
    setUserToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      const supabase = createClientComponentClient();
      const { error } = await supabase.auth.admin.deleteUser(userToDelete);

      if (error) {
        console.error("Error deleting user:", error);
      } else {
        setUsers(users.filter((user: any) => user.id !== userToDelete));
      }

      setUserToDelete(null);
      setDialogOpen(false);
      setRefreshData(prev => !prev)
    }
  };

  return (
    <>
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.user_metadata?.full_name || user.email}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
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
            <DialogDescription>Are you sure you want to delete this user? This action cannot be undone.</DialogDescription>
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
  );
}
