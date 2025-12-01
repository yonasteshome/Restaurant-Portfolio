"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login, error, loading } = useAuthStore();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(form.username, form.password);
    if (success) router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-yellow-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-sm"
      >
        <Card className="shadow-xl border border-orange-100 rounded-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <div className="flex justify-center mb-2">
              <Utensils className="w-10 h-10 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Restaurant Admin Login
            </CardTitle>
            <CardDescription className="text-gray-500">
              Manage your menu, orders & staff efficiently
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-8">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg shadow-none focus-visible:ring-0 focus-visible:border-gray-300"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg shadow-none focus-visible:ring-0 focus-visible:border-gray-300"
                />
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-600 text-sm text-center mt-1">
                  {error}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-6 mt-4">
              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              {/* Signup Link */}
              <p className="text-sm text-center text-gray-600">
                Don’t have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="text-orange-600 hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
