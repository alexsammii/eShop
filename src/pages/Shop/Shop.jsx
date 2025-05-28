import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../services/ProductService';
import styles from './Shop.module.scss';
import layout from '../../scss/Layout.module.scss';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(data => setProducts(data));
  }, []);

  const cans = products.filter(p => !p.name.toLowerCase().includes('bottle'));
  const bottles = products.filter(p => p.name.toLowerCase().includes('bottle'));

  return (
    <div className={styles.shopPage}>
      <div className={layout.container}> 
        <h2>Shop Bella Spritz Cans</h2>
        <div className={styles.grid}>
          {cans.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <h2>Shop Bella Spritz Bottles</h2>
        <div className={styles.grid}>
          {bottles.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
