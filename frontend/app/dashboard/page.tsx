"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, Layers, UtensilsCrossed } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const fetchMenu = async () => {
    try {
      // ✔ Correct endpoint for admin
      const res = await api.get("/category/items", {
        withCredentials: true,
      });

      // Combine items from categories
      const allItems = res.data.flatMap((cat: any) => cat.items || []);

      setMenuItems(allItems);
    } catch (error) {
      console.error("Error fetching menu", error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      <p className="text-gray-600">Welcome! Here is your restaurant's performance summary.</p>

      {/* GRID NAVIGATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/categories" className="block">
          <Card className="hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold">Categories</CardTitle>
              <Layers />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Manage all categories of your restaurant.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/menu" className="block">
          <Card className="hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold">Menu Items</CardTitle>
              <UtensilsCrossed />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Create and manage your menu items.</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/feedback" className="block">
          <Card className="hover:shadow-xl transition-all cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl font-semibold">Feedback</CardTitle>
              <Users />
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">View and review customer feedback.</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-xl transition-all cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Analytics</CardTitle>
            <BarChart3 />
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Insights and data coming soon...</p>
          </CardContent>
        </Card>
      </div>

      {/* CUSTOMER MENU PREVIEW */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Restaurant Menu Preview</h2>
        <p className="text-gray-600 mb-4">Items displayed as customers will see them.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuItems.length > 0 ? (
            menuItems.map((item: any) => (
              <Card
                key={item._id}
                className="rounded-2xl shadow hover:shadow-lg transition-all overflow-hidden"
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    className="h-36 w-full object-cover"
                    alt={item.name}
                  />
                ) : (
                  <div className="h-36 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <CardContent className="p-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {item.ingredients || "No ingredients listed"}
                  </p>
                  <p className="font-bold mt-2">{item.price} ETB</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No menu items available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
