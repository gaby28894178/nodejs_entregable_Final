// services
import {getAllProducts,saveProduct,getProductByIdModel,updateProductModel,deleteProductModel} from "../models/product.model.js";

const getAll = async () => {
  return await getAllProducts();
};

const getProductById = async (id) => {
  return await getProductByIdModel(id);
};

const createProduct = async (product) => {
  return await saveProduct(product);
};

const updateProduct = async (id, updates) => {
  return await updateProductModel(id, updates);
};

const deleteProduct = async (id) => {
  return await deleteProductModel(id);
};

export default {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
