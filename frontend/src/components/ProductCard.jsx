import React, { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import {
  FaStar,
  FaRegStar,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";

// Track out of stock products globally to ensure consistency
const outOfStockProducts = {};

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) return null;

  // Initialize out of stock status for this product if not already set
  if (outOfStockProducts[product.id] === undefined) {
    // Make exactly 2 products out of stock (first two for demo)
    outOfStockProducts[product.id] = index < 2;
  }

  const handleAdd = () => {
    addToCart(product, quantity);
    alert(`${product.name} added to cart!`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const imgPath = product.img ? product.img.replace(/^\/?images\//, "") : "";
  const imageUrl = imgPath ? `/images/${imgPath}` : "/images/default-product.jpg";

  // ⭐ Generate random rating for demo
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // 💸 Discount calculation
  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  // Check if product is out of stock
  const isOutOfStock = outOfStockProducts[product.id];
  const stockCount = isOutOfStock ? 0 : Math.floor(Math.random() * 10) + 20; // 20-30 in stock

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden relative flex flex-col"
    >
      {/* Wishlist button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" size={18} />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-red-500" size={18} />
        )}
      </button>

      {/* Discount badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
          {discount}% OFF
        </div>
      )}

      {/* Stock status badge */}
      <div className={`absolute top-4 ${discount > 0 ? 'left-16' : 'left-4'} z-10 text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
        !isOutOfStock 
          ? 'bg-green-100 text-green-800 border border-green-600' 
          : 'bg-red-100 text-red-800 border border-red-600'
      }`}>
        {!isOutOfStock ? `${stockCount}+ in Stock` : 'Out of Stock'}
      </div>

      {/* Product Image */}
      <div className="relative w-full h-56 bg-gray-50 flex items-center justify-center overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={product.name}
          className="h-full object-contain"
          whileHover={{ scale: 1.1 }}
        />
        {/* Overlay for out of stock items */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="bg-red-600 text-white font-bold px-4 py-2 rounded-lg">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="flex flex-col flex-grow p-4 space-y-2">
        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.desc || "Premium quality product with excellent features."}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`full-${i}`} />
          ))}
          {hasHalfStar && <FaRegStar />}
          {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
          ))}
          <span className="ml-2 text-gray-500 text-xs">{rating} / 5</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-pink-700 font-bold text-lg">
            ৳{Number(product.price || 0).toFixed(2)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-gray-400 line-through text-sm">
              ৳{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity + Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-2">
          {/* Quantity selector */}
          <div className={`flex items-center border border-gray-300 rounded-lg overflow-hidden ${
            isOutOfStock ? 'opacity-50' : ''
          }`}>
            <button
              onClick={() => !isOutOfStock && setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={isOutOfStock}
            >
              -
            </button>
            <span className="px-3 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => !isOutOfStock && setQuantity(quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>

          {/* Add to cart button */}
          <motion.button
            whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
            whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
            onClick={!isOutOfStock ? handleAdd : null}
            className={`flex items-center font-medium text-sm px-5 py-2 rounded-full transition ${
              !isOutOfStock 
                ? 'bg-pink-600 hover:bg-pink-700 text-white' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={isOutOfStock}
          >
            <FaShoppingCart className="mr-2" /> 
            {!isOutOfStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;