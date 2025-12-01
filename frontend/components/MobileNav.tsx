// components/MobileNav.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  onClose: () => void;
  navItems: { label: string; href: string }[];
};

export default function MobileNav({ onClose, navItems }: Props) {
  return (
    <>
      {/* backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black z-40"
      />

      {/* drawer */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 z-50 h-full w-72 bg-white shadow-xl border-r border-slate-200"
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-orange-600 text-white flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="font-semibold">QR Menu Admin</div>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="p-2 rounded hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((n) => (
            <Link key={n.href} href={n.href} onClick={onClose}>
              <div className="px-3 py-2 rounded-md hover:bg-slate-50 transition cursor-pointer text-slate-700">
                {n.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-slate-100">
          <button className="w-full py-2 rounded-md bg-orange-600 text-white font-medium">Logout</button>
        </div>
      </motion.aside>
    </>
  );
}
