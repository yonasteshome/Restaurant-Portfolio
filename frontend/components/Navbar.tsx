// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileNav from "./MobileNav";
import { Utensils, Menu as MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Menu", href: "/menu" },
    { label: "Feedback", href: "/feedback" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* left: brand */}
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-600 text-white">
                  <Utensils className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <span className="font-semibold text-lg text-slate-800">QR Menu Admin</span>
                  <div className="text-sm text-slate-500">Manage your restaurant</div>
                </div>
              </Link>
            </div>

            {/* center: desktop nav */}
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  {n.label}
                </Link>
              ))}
            </div>

            {/* right: actions */}
            <div className="flex items-center gap-3">
              {/* Example: profile / logout could go here */}
              <div className="hidden md:flex items-center text-sm text-slate-600">
                Admin
              </div>

              {/* mobile menu button */}
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && <MobileNav onClose={() => setOpen(false)} navItems={navItems} />}
      </AnimatePresence>
    </>
  );
}
