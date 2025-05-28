import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home/Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import Cart from "./pages/Cart/Cart";
import Navbar from "./components/NavBar/Navbar";
import Shop from "./pages/Shop/Shop";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <ToastContainer position="bottom-left" autoClose={1000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
