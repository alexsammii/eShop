import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.scss";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice
  } = useCart();

  return (
    <div className={styles.cartPage}>
      <div className={styles.container}>
        <h1>Your Cart</h1>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((item, index) => (
              <div key={index} className={styles.cartItem}>
                <div className={styles.info}>
                  <h2>{item.name}</h2>
                  <p>{item.selectedVariant}</p>
                </div>

                <div className={styles.controls}>
                  <button onClick={() => decreaseQuantity(item)}>-</button>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <button onClick={() => increaseQuantity(item)}>+</button>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className={styles.summaryBox}>
              <h3>Total Items: {totalItems}</h3>
              <h3>Total Price: ${totalPrice.toFixed(2)}</h3>

              <div className={styles.actions}>
                <button className={styles.clearBtn} onClick={clearCart}>
                  Clear Cart
                </button>
                <button className={styles.checkoutBtn}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className={styles.empty}>Your cart is currently empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
