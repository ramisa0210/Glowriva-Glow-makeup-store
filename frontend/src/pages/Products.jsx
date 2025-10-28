import React, { useEffect, useState } from "react";
import api from "../api/axios";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products"); // fetch all products once
        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error("Fetch products error:", err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const grouped = filtered.reduce((acc, p) => {
    const cat = p.category || "uncategorized";
    (acc[cat] = acc[cat] || []).push(p);
    return acc;
  }, {});

  if (loading) return <p className="text-center py-20">Loading products…</p>;

  return (
    <main className="min-h-screen pb-20">
      {/* 🔎 Search bar */}
      <SearchBar products={products} onFilter={setFiltered} />

      {/* Product sections */}
      {Object.entries(grouped).map(([cat, items]) => (
        <section key={cat} className="py-16">
          <div className="bg-pink-50 p-8 rounded-lg shadow-lg space-y-6">
            <h2 className="text-4xl font-bold text-center text-pink-600 mb-6">
              {cat}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {items.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Products;
