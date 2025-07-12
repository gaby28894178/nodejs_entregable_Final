import { db } from "../config/db.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc // <-- AGREGADO
} from "firebase/firestore";

const productCollection = collection(db, "productos");

// Obtener todos los productos
export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error("Error al obtener productos: " + error.message);
  }
};

// Crear un nuevo producto
export const saveProduct = async (product) => {
  try {
    const newProduct = await addDoc(productCollection, product);
    return { id: newProduct.id, ...product };
  } catch (error) {
    throw new Error("Error al guardar producto: " + error.message);
  }
};

// Obtener producto por ID
export const getProductByIdModel = async (id) => {
  try {
    const productRef = doc(productCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    throw new Error("Error al obtener producto: " + error.message);
  }
};

// Eliminar producto
export const deleteProductModel = async (id) => {
  try {
    const productRef = doc(productCollection, id);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    throw new Error("Error al eliminar producto: " + error.message);
  }
};

// Actualizar producto
export const updateProductModel = async (id, updates) => {
  try {
    const productRef = doc(productCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      throw new Error("Producto no encontrado");
    }

    await updateDoc(productRef, updates);
    return { id, ...updates };
  } catch (error) {
    throw new Error("Error al actualizar producto: " + error.message);
  }
};
