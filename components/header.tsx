import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toogle";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-7 h-16 bg-muted/50 border-b border-border">
      <Link href={"/"} className="font-extrabold tracking-tight text-foreground flex items-center gap-2 h-16">
      <Shield className="bg-primary rounded w-auto h-auto p-2"/>
      Password Manager
      </Link>
      <div className="flex items-center gap-2">
        <SignedOut>
          <SignInButton>
            <Button variant={"outline"}>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign Up</Button>
          </SignUpButton>
        </SignedOut>
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
