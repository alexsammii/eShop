import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const ProductCard = ({ product }) => {
  const [isFavourited, setIsFavourited] = useState(product.favourited || false);

  const toggleFavourite = async () => {
    const newStatus = !isFavourited;
    setIsFavourited(newStatus);

    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        favourited: newStatus,
      });
    } catch (error) {
      console.error("Failed to update favourite:", error);
      setIsFavourited(!newStatus);
    }
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.favIcon} onClick={toggleFavourite}>
        {isFavourited ? <FaHeart color="red" /> : <FaRegHeart />}
      </div>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
        <h4>{product.name}</h4>
        <p>Click to view options</p>
      </Link>
    </div>
  );
};

export default ProductCard;
