
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useCart } from "../../context/CartContext";
import styles from "./ProductPage.module.scss";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct({ ...data, id });
        setSelectedVariant(data.variants[0]);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedVariant,
      prices: product.prices, 
    });
  };

  return (
    <div className={styles.productPage}>
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} width="200" />

      <p><strong>Price:</strong> 
        {product?.prices?.[selectedVariant] !== undefined
          ? `$${product.prices[selectedVariant]}`
          : "Price unavailable"}
      </p>

      <p><strong>In Stock:</strong> {product.quantity}</p>

      <label>Variant: </label>
      <select
        value={selectedVariant}
        onChange={(e) => setSelectedVariant(e.target.value)}
      >
        {product.variants.map((v, i) => (
          <option key={i} value={v}>
            {v}
          </option>
        ))}
      </select>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
