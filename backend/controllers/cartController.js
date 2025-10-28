import Cart from "../models/Cart.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.product"
  );
  res.json(cart);
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [{ product: productId, quantity }] });
  } else {
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) item.quantity += quantity;
    else cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  const item = cart.items.find((i) => i.product.toString() === productId);
  if (item) item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  cart.items = cart.items.filter((i) => i.product.toString() !== productId);
  await cart.save();
  res.json(cart);
};
