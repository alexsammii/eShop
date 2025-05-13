import React, { useState } from "react";
import styles from "./ProductModal.module.scss";
import { useCart } from "../../context/CartContext";

const ProductModal = ({ product, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedVariant) {
      setError(true);
      return;
    }

    addToCart({ ...product, selectedVariant, prices: product.prices });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <img src={product.imageUrl} alt={product.name} />
        <h2>{product.name}</h2>
        <p>Choose a variant below</p>

        <div className={styles.variantSection}>
          <select
            value={selectedVariant}
            onChange={(e) => {
              setSelectedVariant(e.target.value);
              setError(false);
            }}
          >
            <option value="">-- Select a variant --</option>
            {product.variants?.map((variant, idx) => (
              <option key={idx} value={variant}>
                {variant}
              </option>
            ))}
          </select>

          {error && <p className={styles.error}>Please select a variant before adding to cart.</p>}

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
