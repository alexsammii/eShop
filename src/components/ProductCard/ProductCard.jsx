
import React from 'react';
import styles from './ProductCard.module.scss';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(product)}>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Click to view options</p>
    </div>
  );
};

export default ProductCard;
