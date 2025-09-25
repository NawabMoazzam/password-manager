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

export default function Header() {
  return (
    <header className="flex justify-between items-center px-7 h-16 border-b border-border">
      <Link href={"/"} className="font-extrabold tracking-tight text-primary">Password Manager</Link>
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
