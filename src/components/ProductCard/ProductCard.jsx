import { Link } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.cardLink}>
        <img src={product.imageUrl} alt={product.name} />
        <h4>{product.name}</h4>
        <p>Click to view options</p>
      </Link>
    </div>
  );
};

export default ProductCard;
