import React, { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Add to Cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) =>
        item.id === product.id &&
        item.selectedVariant === product.selectedVariant
    );

    const stockLimit = product.quantity ?? Infinity;

    if (existingItem) {
      if (existingItem.quantity < stockLimit) {
        setCartItems(
          cartItems.map((item) =>
            item.id === product.id &&
            item.selectedVariant === product.selectedVariant
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        alert("You've reached the stock limit for this item.");
      }
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          stock: product.quantity, // used for stock checks
        },
      ]);
    }
  };

  // ✅ Increase Quantity
  const increaseQuantity = (item) => {
    const cartItem = cartItems.find(
      (c) => c.id === item.id && c.selectedVariant === item.selectedVariant
    );

    const stockLimit = item.stock ?? item.quantity ?? Infinity;

    if (cartItem.quantity < stockLimit) {
      setCartItems(
        cartItems.map((c) =>
          c.id === item.id && c.selectedVariant === item.selectedVariant
            ? { ...c, quantity: c.quantity + 1 }
            : c
        )
      );
    } else {
      alert("You've reached the maximum stock available for this item.");
    }
  };

  // ✅ Decrease Quantity
  const decreaseQuantity = (item) => {
    setCartItems(
      cartItems
        .map((cartItem) =>
          cartItem.id === item.id && cartItem.selectedVariant === item.selectedVariant
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  // ✅ Remove from Cart
  const removeFromCart = (item) => {
    setCartItems(
      cartItems.filter(
        (cartItem) =>
          !(cartItem.id === item.id && cartItem.selectedVariant === item.selectedVariant)
      )
    );
  };

  // ✅ Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Total Items
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // ✅ Total Price (case-insensitive key match for bottles/cans)
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (!item || !item.prices || !item.selectedVariant) return acc;

      const variant = item.selectedVariant.toLowerCase().trim();

      const matchedKey = Object.keys(item.prices).find((key) =>
        key.toLowerCase().trim() === variant
      );

      const price = matchedKey && item.prices[matchedKey]
        ? Number(item.prices[matchedKey])
        : 0;

      return acc + price * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
