import { db } from "../config/db.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc // <-- AGREGADO
} from "firebase/firestore";const productCollection = collection(db, "productos");

export const getAllProducts = async () => {
  const snapshot = await getDocs(productCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const saveProduct = async (product) => {
  const newProduct = await addDoc(productCollection, product);
  return { id: newProduct.id, ...product };
};

export const getProductByIdModel = async (id) => {
  const productRef = doc(db, "productos", id); // ✅ corregido
  const snapshot = await getDoc(productRef);
  if (!snapshot.exists()) throw new Error("Producto no encontrado");
  return { id: snapshot.id, ...snapshot.data() };
};

export const deleteProductModel = async (id) => {
  const productRef = doc(db, "productos", id); // ✅ corregido
  await deleteDoc(productRef);
  return true;
};

export const updateProductModel = async (id, updates) => {
  const productRef = doc(db, "productos", id); // ✅ corregido
  const snapshot = await getDoc(productRef);
  if (!snapshot.exists()) throw new Error("Producto no encontrado");
  await updateDoc(productRef, updates);
  return { id, ...updates };
};
