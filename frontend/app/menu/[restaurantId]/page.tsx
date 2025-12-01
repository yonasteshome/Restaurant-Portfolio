"use client";

import { useEffect, useState, use } from "react";

export default function PublicMenuPage(props: { params: Promise<{ restaurantId: string }> }) {
  const { restaurantId } = use(props.params);

  const [menu, setMenu] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadMenu() {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/category/public/${restaurantId}/items`;

        const res = await fetch(url);

        const type = res.headers.get("content-type");
        if (!type || !type.includes("application/json")) {
          throw new Error("Backend returned HTML. Check your URL.");
        }

        const data = await res.json();
        setMenu(data);
      } catch (err) {
        console.error("MENU ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [restaurantId]);

  if (loading) return <p className="p-4">Loading menu…</p>;

  const categories = ["All", ...menu.map((c) => c.category_name)];

  // ===== FILTER ITEMS BY SEARCH =====
  const filteredMenu = menu.map((category) => {
    const filteredItems = (category.items || []).filter((item: any) => {
      const itemName = item?.name || "";
      return itemName.toLowerCase().includes(search.toLowerCase());
    });

    return {
      ...category,
      items: filteredItems,
    };
  });

  // ===== FILTER BY CATEGORY =====
  const visibleMenu =
    activeCategory === "All"
      ? filteredMenu
      : filteredMenu.filter((c) => c.category_name === activeCategory);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Menu</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-3 shadow-sm focus:outline-none"
        />
      </div>

      {/* ===== CATEGORY FILTER BAR (Improved mobile + PC) ===== */}
      <div
        className="
          flex gap-3 overflow-x-auto py-2 sticky top-0 bg-white z-20
          scrollbar-thin scrollbar-thumb-gray-300
          lg:justify-center lg:overflow-x-visible
        "
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 whitespace-nowrap rounded-full border transition ${
              activeCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== MENU ITEMS ===== */}
      {visibleMenu.every((c) => c.items.length === 0) ? (
        <p className="text-center text-gray-600 mt-10">No items found.</p>
      ) : (
        <div className="mt-6 space-y-10">
          {visibleMenu.map((category) =>
            category.items.length > 0 ? (
              <div key={category._id}>
                <h2 className="text-xl font-semibold mb-4">{category.category_name}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {category.items.map((item: any) => (
                    <div
                      key={item._id}
                      className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                    >
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-xl mb-3"
                        />
                      )}

                      <h3 className="text-lg font-bold">{item.name}</h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {item.ingredients || "No description"}
                      </p>

                      <p className="font-bold text-lg mt-2">{item.price} ETB</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
