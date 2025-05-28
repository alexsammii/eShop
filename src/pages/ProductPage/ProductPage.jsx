import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.warn("No product found");
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>
      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name || "Product"}
          style={{ maxWidth: "300px" }}
        />
)}

      <p>Coming soon: description, ingredients, price, etc.</p>
    </div>
  );
};

export default ProductPage;
