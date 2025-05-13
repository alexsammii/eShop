import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navbar__logo}>
        Bella Spritz
      </Link>

      <div className={styles.navbar__menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`${styles.navbar__links} ${menuOpen ? styles.open : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
