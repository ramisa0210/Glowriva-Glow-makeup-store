import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const hasInvalidPrice = cartItems.some(item => typeof item.price !== 'number' || isNaN(item.price));
    if (hasInvalidPrice) {
      setCartItems([]);
      alert('Some items in your cart had invalid prices and were removed. Please add them again.');
    }
  }, [cartItems]);

  // Add product or update quantity if exists
  const addToCart = (product, quantity) => {
    setCartItems((items) => {
      const exist = items.find(
        (item) => (item._id || item.id) === (product._id || product.id)
      );
      if (exist) {
        return items.map((item) =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...items, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) =>
      items.filter((item) => (item._id || item.id) !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        (item._id || item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
