"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getPasswords, deletePassword } from "@/lib/_actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClipboardButton from "./ui/copy-button";

interface PasswordData {
  website: string;
  username: string;
  password: string;
}

interface PasswordsTableProps {
  refreshKey?: number;
}

export function PasswordsTable({ refreshKey }: PasswordsTableProps) {
  const { user } = useUser();
  const [passwords, setPasswords] = useState<PasswordData[]>([]);
  const [loadingPass, setLoadingPass] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPasswords() {
      try {
        if (!user) return;
        setLoadingPass(true);
        const data = await getPasswords(user.id);
        setPasswords(data.reverse());
        setLoadingPass(false);
      } catch (error: unknown) {
        setLoadingPass(false);
        if (error instanceof Error) {
          console.error("Error fetching passwords:", error.message);
          toast.error(error.message);
        } else if (typeof error === "string") {
          console.error("Error fetching passwords:", error);
          toast.error(error);
        } else {
          console.error("Error fetching passwords:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
    fetchPasswords();
  }, [user, refreshKey]);

  async function handleDelete(index: number) {
    try {
      if (!user) return;
      const updatedPasswords = await deletePassword(index, user.id);
      setPasswords(updatedPasswords.reverse());
      toast.success("Password deleted successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting password:", error.message);
        toast.error(error.message);
      } else if (typeof error === "string") {
        console.error("Error deleting password:", error);
        toast.error(error);
      } else {
        console.error("Error deleting password:", error);
        toast.error("Failed to delete password. Please try again.");
      }
    }
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Manage Your Passwords</CardTitle>
        <CardDescription>
          Ensure you follow best practices for password management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your saved passwords.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Website</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingPass && (
              <TableRow>
                <TableCell colSpan={4} className="text-primary">
                  <Loader2Icon className="mx-auto animate-spin" />
                </TableCell>
              </TableRow>
            )}
            {!loadingPass && passwords.length <= 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center font-medium">
                  No Passwords Found!
                </TableCell>
              </TableRow>
            )}
            {passwords.length > 0 &&
              passwords.map((password, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    <Link
                      href={`${password.website}`}
                      className="underline hover:text-primary transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {password.website}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      {password.username}
                      <ClipboardButton textToCopy={password.username} />
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center">
                      {password.password}
                      <ClipboardButton textToCopy={password.password} />
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="hover:text-red-500">
                          <Trash2Icon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Password</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this password?
                            <br />
                            <span className="text-destructive">
                              This action cannot be undone!
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                handleDelete(index);
                              }}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
