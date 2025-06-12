"use client"

import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

async function getSocialAccounts() {
  const supabase = createClientComponentClient();
  const { data, error } = await supabase.from('social_accounts').select('*');
  if (error) {
    console.error('Error fetching social accounts:', error);
    return [];
  }
  return data || [];
}

export default function AccountTable() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState<any | null>(null);
  const [refreshData, setRefreshData] = useState(false);
  const [newAccount, setNewAccount] = useState({
    platform: "",
    username: "",
    password: "",
    url: "",
    notes: "",
  });

  useEffect(() => {
    async function loadAccounts() {
      const initialData = await getSocialAccounts();
      setAccounts(initialData);
    }

    loadAccounts();
  }, [refreshData]);

  const handleDelete = (id: string) => {
    setAccountToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (accountToDelete) {
      const supabase = createClientComponentClient();
      const { error } = await supabase.from('social_accounts').delete().eq('id', accountToDelete);

      if (error) {
        console.error('Error deleting account:', error);
      } else {
        setAccounts(accounts.filter((account) => account.id !== accountToDelete));
      }

      setAccountToDelete(null);
      setDialogOpen(false);
      setRefreshData((prev) => !prev);
    }
  };

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
    };

    return colors[platform] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  };

  const handleCreate = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.from('social_accounts').insert([newAccount]);

    if (error) {
      console.error('Error creating account:', error);
    } else {
      setNewAccount({
        platform: "",
        username: "",
        password: "",
        url: "",
        notes: "",
      });
      setRefreshData((prev) => !prev);
    }
    setCreateDialogOpen(false);
  };

  const handleEdit = (account: any) => {
    setAccountToEdit(account);
    setEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('social_accounts')
      .update([accountToEdit])
      .eq('id', accountToEdit.id);

    if (error) {
      console.error('Error updating account:', error);
    } else {
      setRefreshData((prev) => !prev);
    }
    setEditDialogOpen(false);
  };

  return (
    <>
      <div className="w-full overflow-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account: any) => (
              <TableRow key={account.id}>
                <TableCell>
                  <Badge className={getPlatformColor(account.platform)}>{account.platform}</Badge>
                </TableCell>
                <TableCell className="font-medium">{account.username}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {visiblePasswords[account.id] ? account.password : "••••••••"}
                    <Button variant="ghost" size="icon" onClick={() => togglePasswordVisibility(account.id)}>
                      {visiblePasswords[account.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{account.url}</TableCell>
                <TableCell>{account.notes}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(account)}>
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
            <DialogDescription>Are you sure you want to delete this social media account? This action cannot be undone.</DialogDescription>
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

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>Edit the details for the social media account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Input
                id="platform"
                value={accountToEdit?.platform || ""}
                onChange={(e) => setAccountToEdit({ ...accountToEdit, platform: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={accountToEdit?.username || ""}
                onChange={(e) => setAccountToEdit({ ...accountToEdit, username: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={accountToEdit?.password || ""}
                onChange={(e) => setAccountToEdit({ ...accountToEdit, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL
              </Label>
              <Input
                id="url"
                type="url"
                value={accountToEdit?.url || ""}
                onChange={(e) => setAccountToEdit({ ...accountToEdit, url: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                value={accountToEdit?.notes || ""}
                onChange={(e) => setAccountToEdit({ ...accountToEdit, notes: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate}>Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
