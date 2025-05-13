import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

const productCollectionRef = collection(db, "products");

export const getAllProducts = async () => {
  const data = await getDocs(productCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
