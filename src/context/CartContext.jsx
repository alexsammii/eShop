import React, { createContext, useContext, useState, useMemo } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add to Cart
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
          stock: product.quantity,
        },
      ]);
    }
  };

  // Increase
const increaseQuantity = async (item) => {
  const variantKey = item.selectedVariant?.toLowerCase();
  const variantQty = item.variantMultiplier?.[variantKey] ?? 1;

  try {
    const productRef = doc(db, "products", item.id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      alert("Product not found in inventory.");
      return;
    }

    const currentStock = productSnap.data().quantity ?? 0;

    if (currentStock < variantQty) {
      alert("You've reached the stock limit for this item.");
      return;
    }

    await updateDoc(productRef, {
      quantity: currentStock - variantQty,
    });

    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedVariant === item.selectedVariant
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } catch (error) {
    console.error("Increase error:", error);
    alert("Could not update inventory. Try again.");
  }
};

  // Decrease
const decreaseQuantity = async (item) => {
  const variantKey = item.selectedVariant?.toLowerCase();
  const variantQty = item.variantMultiplier?.[variantKey] ?? 1;

  try {
    const productRef = doc(db, "products", item.id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      alert("Product not found in inventory.");
      return;
    }

    const currentStock = productSnap.data().quantity ?? 0;

    await updateDoc(productRef, {
      quantity: currentStock + variantQty,
    });

    setCartItems((prev) =>
      prev
        .map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedVariant === item.selectedVariant
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  } catch (error) {
    console.error("Decrease error:", error);
    alert("Could not update inventory. Try again.");
  }
};

  // Remove from Cart
  const removeFromCart = async (item) => {
  try {
    const docRef = doc(db, "products", item.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const productData = docSnap.data();
      const variant = item.selectedVariant.toLowerCase();
      const multiplier = productData.variantMultiplier?.[variant] ?? 1;
      const restoreAmount = multiplier * item.quantity;

      const newStock = (productData.quantity ?? 0) + restoreAmount;

      await updateDoc(docRef, {
        quantity: newStock,
      });
    }

    // Then remove from cart
    setCartItems(
      cartItems.filter(
        (cartItem) =>
          !(cartItem.id === item.id && cartItem.selectedVariant === item.selectedVariant)
      )
    );
  } catch (error) {
    console.error("Error restoring inventory:", error);
    alert("Could not update inventory. Try again.");
  }
};


  // Clear Cart
  const clearCart = async () => {
  try {
    // Loop through all items to restore stock
    for (const item of cartItems) {
      const docRef = doc(db, "products", item.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const productData = docSnap.data();
        const variant = item.selectedVariant.toLowerCase();
        const multiplier = productData.variantMultiplier?.[variant] ?? 1;
        const restoreAmount = multiplier * item.quantity;

        const newStock = (productData.quantity ?? 0) + restoreAmount;

        await updateDoc(docRef, {
          quantity: newStock,
        });
      }
    }

    // Clear cart after restoring stock
    setCartItems([]);
  } catch (error) {
    console.error("Error clearing cart:", error);
    alert("Could not update inventory. Try again.");
  }
};


  // Total Items
  const totalItems = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  // Total Price
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
