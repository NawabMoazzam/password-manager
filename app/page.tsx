import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Import Card components for feature display
import { Shield, Lock, Zap, RefreshCw, Key, Users } from "lucide-react"; // Import Lucide icons
import Image from "next/image";
import Link from "next/link";

// Define the features data
const features = [
  {
    icon: Shield,
    title: "Zero-Knowledge Encryption",
    description: "Your data is encrypted locally before it ever leaves your device. We can't see your passwords, only you can.",
  },
  {
    icon: Lock,
    title: "Cross-Platform Access",
    description: "Securely access your vault on all your devices: desktop, mobile, and browser extensions.",
  },
  {
    icon: Zap,
    title: "One-Click Login",
    description: "Auto-fill credentials instantly across all your favorite websites and apps for a seamless experience.",
  },
  {
    icon: RefreshCw,
    title: "Strong Password Generator",
    description: "Generate unique, complex, and unguessable passwords with a single click for every new account.",
  },
  {
    icon: Key,
    title: "Secure Notes & Cards",
    description: "Beyond passwords, securely store credit/debit card details, bank information, and private notes.",
  },
  {
    icon: Users,
    title: "Family & Team Sharing",
    description: "Securely share selected credentials with trusted family members or team members within your vault.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ========================================
        1. HERO SECTION (Existing Code)
        ========================================
      */}
      <section id="hero" className="px-2 py-7 md:py-20 bg-muted/50">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">The Most Trusted</span>
                  <span className="block text-primary xl:inline">
                    Password Manager.
                  </span>
                </h1>
                <p className="mx-auto text-base text-foreground sm:max-w-md lg:text-xl md:max-w-3xl">
                  Defend against hackers and data breaches, the best password manager for securely managing and sharing sensitive information.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <Button asChild className="mb-3 sm:mb-0">
                    <Link href="/manager" className="flex items-center">
                      Try It Free
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 ml-1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </Link>
                  </Button>
                  <Button asChild variant={"outline"}>
                    <Link href="#features" className="flex items-center">
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl aspect-[16/10]">
                {/* IMPORTANT: Use Next.js Image component for performance.
                  Replace <img> with <Image> and add width/height props.
                */}
                <Image
                  src="/cybersecurity.jpg" // Ensure this image is in the public directory
                  alt="Password Manager Interface"
                  layout="fill"
                  objectFit="cover"
                  priority // Load the hero image first
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
        2. FEATURES/VALUE PROPOSITION SECTION
        ========================================
      */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container max-w-6xl mx-auto px-8 xl:px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Security You Can Trust
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Powerful features designed to keep your digital life secure and simple.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-primary text-primary-foreground mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================
        3. CALL TO ACTION SECTION
        ========================================
      */}
      <section id="cta" className="py-16 bg-primary">
        <div className="container max-w-6xl mx-auto px-8 xl:px-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
            Start Securing Your Digital Life Today
          </h2>
          <p className="mt-4 text-xl text-primary-foreground/90 mb-8">
            Join thousands of users who trust us to protect their most sensitive data.
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-white/90">
            <Link href="/manager">
              Create My Free Vault
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}