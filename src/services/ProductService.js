import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const productCollectionRef = collection(db, "products");

export const getAllProducts = async () => {
  const data = await getDocs(productCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const createProduct = async (productData) => {
  const productRef = doc(db, "products", productData.id);
  await setDoc(productRef, productData);
};
