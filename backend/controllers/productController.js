import Product from "../models/Product.js";

/* GET /api/products */
export const getProducts = async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

/* GET /api/products/:id */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Get single product error:", err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

/* POST /api/products  (admin) */
export const createProduct = async (req, res) => {
  try {
    const { name, desc, price, category, img } = req.body;
    const sanitizedImg = img ? img.replace(/^(?:\/public)?\/?images\//, "") : "";
    const product = await Product.create({
      name,
      desc,
      price: Number(price),
      category,
      img: sanitizedImg,
    });
    res.status(201).json(product);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Failed to create product" });
  }
};

/* PUT /api/products/:id  (admin) */
export const updateProduct = async (req, res) => {
  try {
    const { name, desc, price, category, img } = req.body;
    const sanitizedImg = img ? img.replace(/^(?:\/public)?\/?images\//, "") : "";
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, desc, price: Number(price), category, img: sanitizedImg },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
};

/* DELETE /api/products/:id  (admin) */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
