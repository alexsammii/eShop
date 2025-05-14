import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../services/ProductService";
import { Link, useLocation } from "react-router-dom";
import styles from './Home.module.scss';
import layout from "../../scss/Layout.module.scss";
import Navbar from "../../components/NavBar/Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const featured = products.filter((p) => p.isFeatured);
  const cans = products.filter((p) => !p.name.includes("(Bottle)"));
  const bottles = products.filter((p) => p.name.includes("(Bottle)"));

  return (
    <>
      <div className="home-page">

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <img src="/bella-hero.jpg" alt="Bella Spritz" className={styles.heroImage} />
          <div className={styles.heroText}>
            <h1>Bella Spritz</h1>
            <p>A Sip of Summer</p>
            <Link to="/shop">
              <button>Shop All</button>
            </Link>
          </div>
        </section>

        {/* Icon Bar */}
        <section className={styles.iconsBar}>
          <div className={layout.container}>
            <div className={styles.iconsRow}>
              <div>🌿<p>Gluten-Free</p></div>
              <div>💧<p>Hydrating</p></div>
              <div>✅<p>Vegan</p></div>
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className={styles.aboutSection}>
          <div className={styles.aboutContainer}>
            <div className={styles.aboutImage}>
              <img src="/bella-pour.jpg" alt="Ruby Pour" />
            </div>
            <div className={styles.aboutText}>
              <h2>A new kind of spritz™</h2>
              <p>
                Bella Spritz is your new favourite summer drink – bold, refreshing,
                and full of life. Crafted with quality spirits and juicy flavours,
                it's the taste of sunshine in every sip.
              </p>
              <Link to="/shop">
                <button className={styles.heroButton}>Shop Now</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Flavours Carousel */}
        <section className={`${styles.featured} ${layout.whiteBackground}`}>
          <div className={layout.container}>
            <h2>Featured Flavours</h2>
            <div className={styles.carousel}>
              {featured.map((p) => (
                <div key={p.id} className={styles.carouselItem}>
                  {isHome && p.name === 'Bella Spritz – Blood Orange and Bitters' && (
                    <div className={styles.ribbon}>New Flavour</div>
                  )}
                  <img src={p.imageUrl} alt={p.name} />
                  <h4>{p.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <p>© {new Date().getFullYear()} Bella Spritz. All rights reserved.</p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
