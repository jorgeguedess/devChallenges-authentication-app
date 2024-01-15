import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LoginProvider } from "@/context/LoginContext";

const notoSans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Authentication App",
  description:
    "Explore end-to-end authentication that covers registration, login, logout, user editing, password recovery, and authentication across multiple providers. This project is a response to the challenge proposed by the devChallenges website, providing an engaging and practical experience in authentication for web development with Next.js.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${notoSans.className} flex min-h-screen flex-col text-primary sm:py-4`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session}>
            <LoginProvider values={session?.user}>
              <Toaster />
              <div className="flex flex-col items-end p-2">
                <ModeToggle />
              </div>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </LoginProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
