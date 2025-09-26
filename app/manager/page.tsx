import { PasswordForm } from "@/components/passwords-form";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
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

export default function Manager() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <TableRow>
                <TableCell className="font-medium">
                  <Link
                    href="https://google.com"
                    className="underline hover:text-primary transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://google.com
                  </Link>
                </TableCell>
                <TableCell>Nawab</TableCell>
                <TableCell>Password@123</TableCell>
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
                        <Button>Delete</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Manage Your Credit Cards</CardTitle>
          <CardDescription>
            Ensure you follow best practices for password management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all your Credit Cards.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Card Note</TableHead>
                <TableHead>Credit Card No.</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>CVV</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Buissness Mastercard
                </TableCell>
                <TableCell>4174 19xx xxxx xxxx</TableCell>
                <TableCell>12/30</TableCell>
                <TableCell>456</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="hover:text-red-500">
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Secure Your Passwords</CardTitle>
          <CardDescription>
            Ensure you follow best practices for password management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Secure Your Passwords</CardTitle>
          <CardDescription>
            Ensure you follow best practices for password management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
