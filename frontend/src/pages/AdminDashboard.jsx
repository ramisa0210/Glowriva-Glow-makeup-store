import React, { useEffect, useState } from "react"; 
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Product states
  const [products, setProducts] = useState([
      { id: 1, name: "Night Repair Cream", category: "Skincare", price: 1825, stock: 15, image: "/images/product-05.jpg" },
      { id: 2, name: "Vitamin E Body Oil", category: "Skincare", price: 1186, stock: 0, image: "/images/product-07.jpg" },
      { id: 3, name: "Foundation", category: "Makeup", price: 1547, stock: 22, image: "/images/found.png" },
      { id: 4, name: "Keratin Shampoo", category: "Haircare", price: 1475, stock: 18, image: "/images/product-02.jpg" },
      { id: 5, name: "Waterproof Mascara", category: "Makeup", price: 1221, stock: 0, image: "/images/mascara.jpg" },
      { id: 6, name: "Aloe Vera Gel", category: "Skincare", price: 950, stock: 30, image: "/images/product-06.jpg" },
      { id: 7, name: "Lipstick Matte", category: "Makeup", price: 780, stock: 12, image: "/images/lipstick.png" },
      { id: 8, name: "Herbal Hair Oil", category: "Haircare", price: 1350, stock: 20, image: "/images/product-10.jpg" },
      { id: 9, name: "Blush Powder", category: "Makeup", price: 1020, stock: 16, image: "/images/blush.jpg" },
      { id: 10, name: "Sunscreen Lotion SPF50", category: "Skincare", price: 1150, stock: 25, image: "/images/product-03.jpg" },
      { id: 11, name: "Shimmer Body Lotion", category: "Bodycare", price: 1320, stock: 18, image: "/images/product-01.jpg" },
      { id: 12, name: "Herbal Face Wash", category: "Skincare", price: 890, stock: 22, image: "/images/product-11.jpg" },
      { id: 13, name: "Hair Conditioner", category: "Haircare", price: 1250, stock: 14, image: "/images/style.png" },
    { id: 14, name: "Nail Polish Set", category: "Makeup", price: 980, stock: 20, image: "/images/collection-1.jpg" },
      { id: 15, name: "Body Scrub", category: "Bodycare", price: 1420, stock: 10, image: "/images/product-08.jpg" },
      { id: 16, name: "Eyeshadow Palette", category: "Makeup", price: 1780, stock: 8, image: "/images/col.jpg" },
      { id: 17, name: "Coconut Hair Mask", category: "Haircare", price: 1620, stock: 12, image: "/images/blog-3.png" },
      { id: 18, name: "Body Mist", category: "Bodycare", price: 770, stock: 30, image: "/images/floral.jpg" },
      { id: 19, name: "Rose Water Toner", category: "Skincare", price: 920, stock: 24, image: "/images/product-01.jpg" },
      { id: 20, name: "Shiny Hair Serum", category: "Haircare", price: 1550, stock: 15, image: "/images/product-17.jpg" },
    ]);
  

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [categories] = useState(["Skincare", "Makeup", "Haircare", "Fragrance"]);
  
  // New state variables for additional features
  const [customers, setCustomers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrder: "",
    expiryDate: "",
    usageLimit: "",
    active: true
  });
  
  // Form state
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null
  });

  const authHeaders = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchOrders();
    fetchCustomers();
    fetchCoupons();
    setFilteredProducts(products);
  }, [currentUser, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/orders", authHeaders());
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error("Admin /orders fetch failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      // This would be replaced with actual API call
      const mockCustomers = [
    { id: 1, name: "Disha Hossain", email: "disha@gmail.com", orders: 5, totalSpent: 12500, joinDate: "2025-01-15" },
    { id: 2, name: "Rosy Akter", email: "rosy@gmail.com", orders: 2, totalSpent: 4500, joinDate: "2025-03-22" },
    { id: 3, name: "Ramisa Jannat", email: "ramisa@gmail.com", orders: 8, totalSpent: 21000, joinDate: "2025-09-06" },
    { id: 4, name: "Tania Islam", email: "tania@example.com", orders: 3, totalSpent: 7200, joinDate: "2023-05-18" },
    { id: 5, name: "Rifat Karim", email: "rifat@example.com", orders: 6, totalSpent: 15800, joinDate: "2023-02-10" },
    { id: 6, name: "Moushumi Sultana", email: "moushumi@example.com", orders: 4, totalSpent: 9800, joinDate: "2023-04-03" },
    { id: 7, name: "Shanto Biswas", email: "shanto@example.com", orders: 7, totalSpent: 17200, joinDate: "2022-12-20" },
    { id: 8, name: "Nabila Akter", email: "nabila@example.com", orders: 3, totalSpent: 6400, joinDate: "2023-06-08" },
];

      setCustomers(mockCustomers);
    } catch (err) {
      console.error("Failed to fetch customers:", err.message);
    }
  };

  const fetchCoupons = async () => {
    try {
      // This would be replaced with actual API call
      const mockCoupons = [
        { id: 1, code: "WELCOME10", discountType: "percentage", discountValue: 10, minOrder: 0, expiryDate: "2023-12-31", usageLimit: 100, usedCount: 45, active: true },
        { id: 2, code: "FREESHIP", discountType: "fixed", discountValue: 100, minOrder: 1500, expiryDate: "2023-10-15", usageLimit: 50, usedCount: 32, active: true },
        { id: 3, code: "SUMMER25", discountType: "percentage", discountValue: 25, minOrder: 2000, expiryDate: "2023-09-30", usageLimit: 75, usedCount: 75, active: false },
      ];
      setCoupons(mockCoupons);
    } catch (err) {
      console.error("Failed to fetch coupons:", err.message);
    }
  };

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/orders/${id}/status`, { status: newStatus }, authHeaders());
      const updated = orders.map((o) =>
        o._id === id ? { ...o, status: newStatus } : o
      );
      setOrders(updated);
      handleSearch(searchTerm, updated);
    } catch (err) {
      console.error(`Update to ${newStatus} failed`, err.message);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`/orders/${id}`, authHeaders());
      const updated = orders.filter((o) => o._id !== id);
      setOrders(updated);
      handleSearch(searchTerm, updated);
    } catch (err) {
      console.error("Delete failed", err.message);
    }
  };

  // Product handlers
  const handleProductSearch = (term) => {
    const filtered = products.filter(
      (p) =>
        p.name?.toLowerCase().includes(term.toLowerCase()) ||
        p.category?.toLowerCase().includes(term.toLowerCase())
    );
    setProductSearchTerm(term);
    setFilteredProducts(filtered);
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: null
    });
    setShowProductModal(true);
  };

  const openEditProductModal = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image
    });
    setShowProductModal(true);
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm({
      ...productForm,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProductForm({
          ...productForm,
          image: e.target.result
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitProduct = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productForm, id: editingProduct.id } 
          : p
      );
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    } else {
      // Add new product
      const newProduct = {
        ...productForm,
        id: Math.max(...products.map(p => p.id)) + 1
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts);
    }
    
    setShowProductModal(false);
  };

  const deleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  // Coupon handlers
  const openAddCouponModal = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrder: "",
      expiryDate: "",
      usageLimit: "",
      active: true
    });
    setShowCouponModal(true);
  };

  const openEditCouponModal = (coupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrder: coupon.minOrder,
      expiryDate: coupon.expiryDate,
      usageLimit: coupon.usageLimit,
      active: coupon.active
    });
    setShowCouponModal(true);
  };

  const handleCouponFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponForm({
      ...couponForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const submitCoupon = (e) => {
    e.preventDefault();
    
    if (editingCoupon) {
      // Update existing coupon
      const updatedCoupons = coupons.map(c => 
        c.id === editingCoupon.id 
          ? { ...c, ...couponForm, id: editingCoupon.id } 
          : c
      );
      setCoupons(updatedCoupons);
    } else {
      // Add new coupon
      const newCoupon = {
        ...couponForm,
        id: Math.max(...coupons.map(c => c.id), 0) + 1,
        usedCount: 0
      };
      setCoupons([...coupons, newCoupon]);
    }
    
    setShowCouponModal(false);
  };

  const deleteCoupon = (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    
    const updatedCoupons = coupons.filter(c => c.id !== id);
    setCoupons(updatedCoupons);
  };

  const toggleCouponStatus = (id) => {
    const updatedCoupons = coupons.map(c => 
      c.id === id ? { ...c, active: !c.active } : c
    );
    setCoupons(updatedCoupons);
  };

  // Badge styling
  const badge = (status) =>
    ({
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[status?.toLowerCase()] || "bg-gray-100 text-gray-800");

  // Search filtering
  const handleSearch = (term, data = orders) => {
    const filtered = data.filter(
      (o) =>
        o.userId?.name?.toLowerCase().includes(term.toLowerCase()) ||
        o._id?.toLowerCase().includes(term.toLowerCase())
    );
    setSearchTerm(term);
    setFilteredOrders(filtered);
  };

  // Export to CSV
  const exportCSV = () => {
    const headers = ["Order ID,Customer,Amount,Status,Date"];
    const rows = filteredOrders.map((o) =>
      [
        `#${o._id.slice(-6).toUpperCase()}`,
        o.userId?.name,
        `৳${o.totalAmount}`,
        o.status,
        new Date(o.createdAt).toLocaleDateString(),
      ].join(",")
    );
    const csv = [...headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  const pendingOrders = orders.filter((o) => o.status?.toLowerCase() === "pending").length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const outOfStockProducts = products.filter(p => p.stock <= 0).length;
  const totalCustomers = customers.length;
  const activeCoupons = coupons.filter(c => c.active).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-300 to-blue-400 p-6 text-white rounded-b-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Dashboard</h2>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm">{currentUser?.name || "Admin"}</div>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-xs bg-white text-pink-600 px-3 py-1 rounded mt-1"
                >
                  Logout
                </button>
              </div>
              <div className="w-10 h-10 bg-white text-pink-600 rounded-full flex items-center justify-center">
                <i className="fas fa-user"></i>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-pink-600 p-4 rounded-lg shadow text-white flex items-center">
              <div className="mr-4 bg-pink-800 p-2 rounded-full">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <div>
                <div className="text-sm">Total Orders</div>
                <div className="text-xl font-bold">{orders.length}</div>
              </div>
            </div>
            <div className="bg-purple-700 p-4 rounded-lg shadow text-white flex items-center">
              <div className="mr-4 bg-purple-500 p-2 rounded-full">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <div className="text-sm">Pending Orders</div>
                <div className="text-xl font-bold">{pendingOrders}</div>
              </div>
            </div>
            <div className="bg-blue-800 p-4 rounded-lg shadow text-white flex items-center">
              <div className="mr-4 bg-blue-500 p-2 rounded-full">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div>
                <div className="text-sm">Total Revenue</div>
                <div className="text-xl font-bold">{totalRevenue}</div>
              </div>
            </div>
            <div className="bg-rose-700 p-4 rounded-lg shadow text-white flex items-center">
              <div className="mr-4 bg-rose-500 p-2 rounded-full">
                <i className="fas fa-box-open"></i>
              </div>
              <div>
                <div className="text-sm">Out of Stock</div>
                <div className="text-xl font-bold">{outOfStockProducts}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-12 overflow-x-auto">
            <button
              onClick={() => setActiveTab("orders")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "orders"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "products"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setActiveTab("customers")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "customers"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setActiveTab("coupons")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "coupons"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Coupons
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === "analytics"
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
      </div>

      {/* Orders Tab Content */}
      {activeTab === "orders" && (
        <>
          {/* Search + Export */}
          <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <input
              type="text"
              placeholder="Search orders or customers..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <button
              onClick={exportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export
            </button>
          </div>

          {/* Orders Table */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            {loading ? (
              <p className="text-center">Loading orders…</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-center text-red-500">No matching orders found.</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Order ID", "Customer", "Amount", "Status", "Date", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((o) => {
                      const statusLower = o.status?.toLowerCase();
                      const isPending = statusLower === "pending";

                      return (
                        <tr key={o._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium">
                            #{o._id.slice(-6).toUpperCase()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">{o.userId?.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">৳{o.totalAmount}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${badge(
                                o.status
                              )}`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 space-x-2">
                            {isPending && (
                              <>
                                <button
                                  onClick={() => updateStatus(o._id, "confirmed")}
                                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateStatus(o._id, "shipped")}
                                  className="px-3 py-1 text-xs bg-indigo-600 text-white rounded"
                                >
                                  Shipped
                                </button>
                                <button
                                  onClick={() => updateStatus(o._id, "delivered")}
                                  className="px-3 py-1 text-xs bg-green-600 text-white rounded"
                                >
                                  Delivered
                                </button>
                              </>
                            )}
                            <button
                              onClick={() => deleteOrder(o._id)}
                              className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </>
      )}

      {/* Products Tab Content */}
      {activeTab === "products" && (
        <>
          {/* Search + Add Product */}
          <div className="max-w-7xl mx-auto px-4 mt-6 flex flex-col sm:flex-row justify-between gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-md"
              value={productSearchTerm}
              onChange={(e) => handleProductSearch(e.target.value)}
            />
            <button
              onClick={openAddProductModal}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Add Product
            </button>
          </div>

          {/* Low Stock Alert Banner */}
          {outOfStockProducts > 0 && (
            <div className="max-w-7xl mx-auto px-4 mt-4">
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                <p className="font-bold">Inventory Alert</p>
                <p>You have {outOfStockProducts} product{outOfStockProducts !== 1 ? 's' : ''} out of stock.</p>
              </div>
            </div>
          )}

          {/* Products Table */}
          <main className="max-w-7xl mx-auto px-4 py-6">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-red-500">No products found.</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Image", "Name", "Category", "Price", "Stock", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-12 w-12 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-sm">
                          {product.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          ৳{product.price}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              product.stock > 0 
                                ? product.stock <= 5 
                                  ? "bg-yellow-100 text-yellow-800" 
                                  : "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => openEditProductModal(product)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </>
      )}

      {/* Customers Tab Content */}
      {activeTab === "customers" && (
        <>
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Join Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                              <i className="fas fa-user"></i>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">{customer.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ৳{customer.totalSpent}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {customer.joinDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Coupons Tab Content */}
      {activeTab === "coupons" && (
        <>
          <div className="max-w-7xl mx-auto px-4 mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Discount Coupons</h2>
            <button
              onClick={openAddCouponModal}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Create Coupon
            </button>
          </div>

          <main className="max-w-7xl mx-auto px-4 py-6">
            {coupons.length === 0 ? (
              <p className="text-center text-gray-500">No coupons found.</p>
            ) : (
              <div className="overflow-x-auto bg-white shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Code", "Discount", "Minimum Order", "Expiry", "Usage", "Status", "Actions"].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {coupons.map((coupon) => (
                      <tr key={coupon.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-sm">
                          {coupon.code}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {coupon.discountType === 'percentage' 
                            ? `${coupon.discountValue}%` 
                            : `৳${coupon.discountValue}`}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          ৳{coupon.minOrder}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {coupon.expiryDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {coupon.usedCount} / {coupon.usageLimit}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              coupon.active 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {coupon.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => openEditCouponModal(coupon)}
                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => toggleCouponStatus(coupon.id)}
                            className={`px-3 py-1 text-xs rounded ${
                              coupon.active
                                ? "bg-yellow-600 text-white"
                                : "bg-green-600 text-white"
                            }`}
                          >
                            {coupon.active ? "Deactivate" : "Activate"}
                          </button>
                          <button
                            onClick={() => deleteCoupon(coupon.id)}
                            className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </>
      )}

      {/* Analytics Tab Content */}
      {activeTab === "analytics" && (
        <>
          <div className="max-w-7xl mx-auto px-4 mt-6">
            <h2 className="text-xl font-semibold mb-4">Sales Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Revenue Overview</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">৳{totalRevenue}</p>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                  </div>
                  <div className="text-green-600">
                    <i className="fas fa-arrow-up"></i>
                    <span>12%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Overview</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">{totalCustomers}</p>
                    <p className="text-sm text-gray-500">Total Customers</p>
                  </div>
                  <div className="text-green-600">
                    <i className="fas fa-arrow-up"></i>
                    <span>8%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Promotions</h3>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">{activeCoupons}</p>
                    <p className="text-sm text-gray-500">Active Coupons</p>
                  </div>
                  <div className="text-blue-600">
                    <i className="fas fa-tag"></i>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Top Selling Products</h3>
              <div className="space-y-4">
                {products.slice(0, 3).map((product, index) => (
                  <div key={product.id} className="flex items-center">
                    <span className="text-lg font-bold text-pink-600 mr-4">{index + 1}</span>
                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded mr-3" />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">৳{product.price}</p>
                      <p className="text-sm text-gray-500">{product.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={submitProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows="3"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳)</label>
                <input
                  type="number"
                  name="price"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={productForm.category}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={productForm.stock}
                  onChange={handleProductFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                {productForm.image && (
                  <div className="mb-2">
                    <img src={productForm.image} alt="Preview" className="h-20 w-20 object-cover rounded" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-md"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
            </h2>
            <form onSubmit={submitCoupon}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  name="code"
                  value={couponForm.code}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  name="discountType"
                  value={couponForm.discountType}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {couponForm.discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                </label>
                <input
                  type="number"
                  name="discountValue"
                  value={couponForm.discountValue}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Amount</label>
                <input
                  type="number"
                  name="minOrder"
                  value={couponForm.minOrder}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={couponForm.expiryDate}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                <input
                  type="number"
                  name="usageLimit"
                  value={couponForm.usageLimit}
                  onChange={handleCouponFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  name="active"
                  checked={couponForm.active}
                  onChange={handleCouponFormChange}
                  className="h-4 w-4 text-pink-600 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Active Coupon</label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-md"
                >
                  {editingCoupon ? "Update" : "Create"} Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;