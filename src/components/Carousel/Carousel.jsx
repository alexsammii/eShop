import { useState } from "react";
import styles from "../../pages/Home/Home.module.scss";

const Carousel = ({ items, isHome = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };


  const currentItem = items[currentIndex];

  return (
    <section className={styles.featured}>
      <h2>Featured Flavours</h2>
      <div className={styles.carouselContainer}>
        <button onClick={prevSlide} className={styles.arrow}>
          ←
        </button>

        <div className={styles.carouselItem}>
          <img src={currentItem.imageUrl} alt={currentItem.name} />
          <h4>{currentItem.name}</h4>
        </div>

        <button onClick={nextSlide} className={styles.arrow}>
          →
        </button>
      </div>
    </section>
  );
};

export default Carousel;
