import React, { useState, useEffect } from "react";

const SearchBar = ({ products, onFilter }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Run filtering automatically when user types or changes category
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, category, products]);

  const handleSearch = () => {
    let filtered = products;

    // ✅ Category filter
    if (category) {
      if (category === "under2000") {
        filtered = filtered.filter((p) => Number(p.price) < 2000);
      } else {
        filtered = filtered.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        );
      }
    }

    // ✅ Name filter
    if (name) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    setSuggestions(name ? filtered.slice(0, 6) : []); // show suggestions only if typing
    onFilter(filtered);
  };

  const handleSelect = (product) => {
    setName(product.name);
    setSuggestions([]);
    onFilter([product]); // directly show selected product
  };

  return (
    <div className="relative flex flex-col sm:flex-row gap-2 mb-6 mt-4 justify-center items-center">
      {/* 🔎 Search input */}
      <input
        type="text"
        placeholder="Search product..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-64 sm:w-80"
      />

      {/* 📂 Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-64 sm:w-52"
      >
        <option value="">All Categories</option>
        <option value="makeup">Makeup</option>
        <option value="skincare">Skincare</option>
        <option value="haircare">Haircare</option>
        <option value="bodycare">Bodycare</option>
        <option value="under2000">💸 Under 2000</option>
      </select>

      {/* 🔍 Search button */}
      <button
        onClick={handleSearch}
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
      >
        Search
      </button>

      {/* 📝 Suggestions dropdown */}
      {name && suggestions.length > 0 && (
        <ul className="absolute top-12 sm:top-14 bg-white border rounded shadow-lg w-64 sm:w-80 z-20 max-h-72 overflow-y-auto">
          {suggestions.map((s) => {
            const imgPath = s.img
              ? s.img.replace(/^\/?images\//, "")
              : "default-product.jpg";
            const imageUrl = `/images/${imgPath}`;

            return (
              <li
                key={s._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-pink-100 cursor-pointer"
                onClick={() => handleSelect(s)}
              >
                <img
                  src={imageUrl}
                  alt={s.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{s.name}</span>
                  <span className="text-xs text-gray-500">
                    {s.category} — ৳{s.price}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
