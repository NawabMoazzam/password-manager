import { SignUp } from "@clerk/nextjs";
import { ChartLine, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Shield, Lock, Zap, RefreshCw, Key, Copy } from "lucide-react";

export default function SignUpPage() {
  const features = [
    {
      icon: Shield,
      title: "Zero-Knowledge Encryption",
      description:
        "Your data is encrypted locally before it ever leaves your device. We can't see your passwords, only you can.",
    },
    {
      icon: Lock,
      title: "Cross-Platform Access",
      description:
        "Securely access your vault on all your devices: desktop, mobile, and browser extensions.",
    },
    {
      icon: Zap,
      title: "Organized & Categorized",
      description:
        "Keep your digital life clutter-free by categorizing your entries for quick searching and retrieval.",
    },
    {
      icon: RefreshCw,
      title: "Strong Password Generator",
      description:
        "Generate unique, complex, and unguessable passwords with a single click for every new account.",
    },
    {
      icon: Key,
      title: "Secure Notes & Cards",
      description:
        "Beyond passwords, securely store credit/debit card details, bank information, and private notes.",
    },
    {
      icon: Copy,
      title: "Instant Copy & Access",
      description:
        "Easily access and copy your usernames, passwords, and card numbers with a single tap or click right when you need them.",
    },
  ];
  return (
    <div className="bg-muted/50 grid flex-1 lg:grid-cols-2">
      <div className="hidden flex-1 items-center justify-end p-6 md:p-10 lg:flex">
        <ul className="max-w-sm space-y-8">
          {features.map((feature, index) => (
            <li key={index}>
              <div className="flex items-center gap-2">
                <feature.icon className="size-4" />
                <p className="font-semibold">{feature.title}</p>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 md:p-10 lg:justify-start">
        <SignUp />
      </div>
    </div>
  );
}
