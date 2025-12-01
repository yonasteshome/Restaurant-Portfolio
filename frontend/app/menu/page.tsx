// app/menu/page.tsx
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, Trash2, Edit } from "lucide-react";
import { motion } from "framer-motion";

export default function MenuPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [items, setItems] = useState<any[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemIngredients, setItemIngredients] = useState("");
  const [editItemId, setEditItemId] = useState<string | null>(null);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);
  const [saving, setSaving] = useState(false);

  // fetch categories
  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCategories(false);
    }
  };

  // fetch items for category
  const fetchItems = async (categoryId: string) => {
    try {
      setLoadingItems(true);
      const res = await api.get(`/menu?category_id=${categoryId}`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingItems(false);
    }
  };

  // create category
  const createCategory = async () => {
    if (!categoryName.trim()) return;
    setSaving(true);
    try {
      await api.post("/category", { category_name: categoryName });
      setCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // delete category
  const deleteCategory = async (id: string) => {
    try {
      await api.delete(`/category/${id}`);
      if (selectedCategory === id) {
        setSelectedCategory(null);
        setItems([]);
      }
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // create or update item
  const createOrUpdateMenuItem = async () => {
    if (!selectedCategory) {
      return alert("Select a category first");
    }

    setSaving(true);
    const payload = {
      name: itemName,
      price: itemPrice,
      ingredients: itemIngredients,
      category_id: selectedCategory,
    };

    try {
      if (editItemId) {
        await api.put(`/menu/${editItemId}`, payload);
      } else {
        await api.post("/menu", payload);
      }

      setItemName("");
      setItemPrice("");
      setItemIngredients("");
      setEditItemId(null);
      fetchItems(selectedCategory);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // delete item
  const deleteMenuItem = async (id: string) => {
    try {
      await api.delete(`/menu/${id}`);
      if (selectedCategory) fetchItems(selectedCategory);
    } catch (err) {
      console.error(err);
    }
  };

  // edit item
  const editMenuItem = (item: any) => {
    setEditItemId(item._id);
    setItemName(item.name);
    setItemPrice(String(item.price ?? ""));
    setItemIngredients(item.ingredients ?? "");
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: categories */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-1 space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Create Category</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Input
                placeholder="Category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <Button onClick={createCategory} disabled={saving}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[60vh] overflow-auto pr-2">
              {loadingCategories ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="animate-spin" />
                </div>
              ) : categories.length === 0 ? (
                <p className="text-sm text-slate-500">No categories yet</p>
              ) : (
                categories.map((cat) => (
                  <div
                    key={cat._id}
                    onClick={() => {
                      setSelectedCategory(cat._id);
                      fetchItems(cat._id);
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                      selectedCategory === cat._id ? "bg-orange-50 border border-orange-200" : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-800">{cat.category_name}</div>

                    <div className="flex gap-2">
                      <button
                        className="text-sm text-rose-600 px-2 py-1 rounded hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCategory(cat._id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right column: items */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Menu Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input placeholder="Item name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                <Input placeholder="Price" type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                <Input placeholder="Ingredients" value={itemIngredients} onChange={(e) => setItemIngredients(e.target.value)} />
              </div>

              <div className="flex items-center gap-3">
                <Button onClick={createOrUpdateMenuItem} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editItemId ? <><Edit className="w-4 h-4 mr-2" /> Update</> : <><PlusCircle className="w-4 h-4 mr-2" /> Add Item</>}
                </Button>

                <div className="text-sm text-slate-500">
                  {selectedCategory ? `Selected category: ${categories.find((c) => c._id === selectedCategory)?.category_name}` : "Select a category to add items"}
                </div>
              </div>

              {/* items list */}
              <div className="space-y-3">
                {loadingItems ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : items.length === 0 ? (
                  <p className="text-sm text-slate-500">No items available.</p>
                ) : (
                  items.map((it) => (
                    <div key={it._id} className="p-3 border rounded-lg flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-800">{it.name}</div>
                        <div className="text-sm text-slate-500">${it.price}</div>
                        <div className="text-sm text-slate-400">{it.ingredients}</div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => editMenuItem(it)}
                          className="px-3 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMenuItem(it._id)}
                          className="px-3 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
