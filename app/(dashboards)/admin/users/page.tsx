"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Trash2, Plus, UserCog } from "lucide-react";

// Types for strict safety
type Role = "student" | "lecturer" | "admin";

interface PlatformUser {
  id: number;
  fullname: string;
  email: string;
  matric: string;
  role: Role;
}

// Mock Database State
const INITIAL_USERS: PlatformUser[] = [
  { id: 1, fullname: "Mary Samuel", email: "mary@kings.edu", matric: "CSC/2022/012", role: "student" },
  { id: 2, fullname: "Dr. Adebayo", email: "adebayo@kings.edu", matric: "STAFF001", role: "lecturer" },
  { id: 3, fullname: "Admin User", email: "admin@kings.edu", matric: "ADMIN01", role: "admin" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<PlatformUser[]>(INITIAL_USERS);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ fullname: "", email: "", matric: "", role: "student" as Role });

  const handleDelete = (id: number) => {
    // In a real app, this would be a DELETE request to your API
    if (confirm("Are you sure you want to revoke this user's access?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleRoleChange = (id: number, newRole: Role) => {
    // In a real app, this would be a PATCH request
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate backend network request
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newUser: PlatformUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      ...formData
    };
    
    setUsers([...users, newUser]);
    setIsSaving(false);
    setIsAddingMode(false);
    setFormData({ fullname: "", email: "", matric: "", role: "student" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Access Management</h2>
          <p className="text-slate-500">Provision accounts and manage platform permissions.</p>
        </div>

        <Dialog open={isAddingMode} onOpenChange={setIsAddingMode}>
          <DialogTrigger asChild>
            <Button className="bg-slate-900 text-white hover:bg-slate-800">
              <Plus className="h-4 w-4 mr-2" />
              Provision User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new account. They will receive an email to set their password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddUser}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input 
                    id="fullname" 
                    required 
                    value={formData.fullname}
                    onChange={(e) => setFormData({...formData, fullname: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">University Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="matric">ID / Matric No.</Label>
                    <Input 
                      id="matric" 
                      required 
                      value={formData.matric}
                      onChange={(e) => setFormData({...formData, matric: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">System Role</Label>
                    <select 
                      id="role"
                      className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as Role})}
                    >
                      <option value="student">Student</option>
                      <option value="lecturer">Lecturer</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddingMode(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Provisioning..." : "Create Account"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>User Details</TableHead>
              <TableHead>System ID</TableHead>
              <TableHead>Role / Permission</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="font-medium text-slate-900 flex items-center gap-2">
                    <UserCog className="h-4 w-4 text-slate-400" />
                    {user.fullname}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{user.email}</div>
                </TableCell>
                <TableCell className="font-mono text-sm text-slate-600">{user.matric}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold
                    ${user.role === 'admin' ? 'bg-red-100 text-red-800' : ''}
                    ${user.role === 'lecturer' ? 'bg-emerald-100 text-emerald-800' : ''}
                    ${user.role === 'student' ? 'bg-blue-100 text-blue-800' : ''}
                  `}>
                    {user.role === 'admin' && <Shield className="h-3 w-3 mr-1" />}
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <select 
                      className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-slate-50 text-slate-700 outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                    >
                      <option value="student">Student</option>
                      <option value="lecturer">Lecturer</option>
                      <option value="admin">Admin</option>
                    </select>
                    
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                  No users found in the system.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}