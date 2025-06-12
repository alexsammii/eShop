import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import styles from "./ProductPage.module.scss";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";


const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.warn("No product found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);


const handleAddToCart = async (variant) => {
  const variantKey = variant.toLowerCase();
  const variantCount = product.variantMultiplier?.[variantKey] ?? 1;
  const currentStock = product.quantity ?? 0;

  if (currentStock < variantCount) {
    toast.error("Not enough stock available.");
    return;
  }

  try {
    // Update Firestore stock before adding to cart
    const newStock = currentStock - variantCount;

    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, {
      quantity: newStock,
    });

    // Add to cart
    const productWithVariant = {
      ...product,
      selectedVariant: variant,
      quantity: newStock, 
    };

    addToCart(productWithVariant);
    toast.success("Added to cart!");
  } catch (error) {
    console.error("Failed to update Firestore stock:", error);
    toast.error("Something went wrong while adding to cart.");
  }
};



  if (!product) return <p className={styles.loading}>Loading product...</p>;


  return (
    <div className={styles.productPage}>
      <div className={`${styles.container} ${styles.shadowBox}`}>
        <div className={styles.imageSection}>
          <img src={product.imageUrl} alt={product.name} />
        </div>

        <div className={styles.detailsSection}>
          <h1>{product.name}</h1>
          <p className={styles.description}>
            A refreshing, lightly sparkling blend crafted for indulgent
            afternoons and sun-drenched gatherings.
          </p>

          <h4>Ingredients</h4>
          <ul className={styles.ingredientsList}>
            <li>Wine</li>
            <li>Water</li>
            <li>Oils</li>
            <li>Flavours</li>
            <li>Colours</li>
            <li>Sodium Benzoate</li>
            <li>Cidric Acid</li>
            <li>Glycerol</li>
          </ul>

          <div className={styles.variantsSection}>
            <h4>Available Options</h4>
            {product.variants.map((variant) => {
              const price = product.prices[variant.toLowerCase()] ?? "N/A";
              return (
                <div key={variant} className={styles.variantRow}>
                  <span>{variant}</span>
                  <span className={styles.price}>
                    {typeof price === "number"
                      ? `$${price.toFixed(2)}`
                      : "$N/A"}
                  </span>
                  <button
                    className={styles.addButton}
                    onClick={() => handleAddToCart(variant)}
                  >
                    Add to Cart
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
