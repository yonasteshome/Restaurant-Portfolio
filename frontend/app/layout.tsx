// app/layout.tsx
import "./globals.css"; // ensure Tailwind & shadcn styles are loaded
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant Admin",
  description: "Manage menus, categories, feedback and more",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-slate-50 min-h-screen"}>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
