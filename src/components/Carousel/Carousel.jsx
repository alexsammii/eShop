import { useState, useEffect } from "react";
import styles from "./Carousel.module.scss";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle wrap-around safely
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  if (!items || items.length === 0) {
    return (
      <section className={styles.carouselWrapper}>
        <h2>Featured Flavours</h2>
        <p>Loading featured items...</p>
      </section>
    );
  }

  const item = items[currentIndex];

  return (
    <section className={styles.carouselWrapper}>
      <h2>Featured Flavours</h2>
      <div className={styles.carouselContainer}>
        <button onClick={prevSlide} className={styles.arrow}>
          ←
        </button>

        <div className={styles.carouselItem}>
          <img src={item.imageUrl} alt={item.name} />
          <h4>{item.name}</h4>
        </div>

        <button onClick={nextSlide} className={styles.arrow}>
          →
        </button>
      </div>
    </section>
  );
};

export default Carousel;
