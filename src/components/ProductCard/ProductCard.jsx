import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [isFavourite, setIsFavourite] = useState(product.favourited || false);

  const toggleFavourite = (e) => {
    e.preventDefault(); 
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <div className={styles.heartIcon} onClick={toggleFavourite}>
          {isFavourite ? <FaHeart color="red" /> : <FaRegHeart color="grey" />}
        </div>

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
