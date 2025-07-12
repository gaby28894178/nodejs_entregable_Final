import productService from "../services/product.service.js";

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAll();
    res.status(200).json({
      message: "Lista de productos",
      payload: products
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID requerido",
        error: "Debe proporcionar un ID"
      });
    }

    const product = await productService.getProductById(id);
    res.status(200).json({
      message: "Producto encontrado",
      payload: product
    });
  } catch (error) {
    res.status(404).json({
      message: "Producto no encontrado",
      error: error.message
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { createdAt, ...bodyWithoutCreatedAt } = req.body;
    const { nombre, precio, disponible } = bodyWithoutCreatedAt;

    if (!nombre || precio === undefined) {
      return res.status(400).json({
        message: "Campos requeridos",
        error: "nombre y precio son requeridos"
      });
    }

    const precioNum = parseFloat(precio);
    if (isNaN(precioNum)) {
      return res.status(400).json({
        message: "Formato inválido",
        error: "precio debe ser un número"
      });
    }

    const newProduct = {
      nombre,
      precio: precioNum,
      disponible: disponible ?? false
    };

    const createdProduct = await productService.createProduct(newProduct);
    res.status(201).json({
      message: "Producto creado",
      payload: createdProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;

    if (!id) {
      return res.status(400).json({
        message: "ID requerido",
        error: "Debe proporcionar un ID"
      });
    }

    // Eliminar campo createdAt si viene en el body
    if ("createdAt" in updates) {
      delete updates.createdAt;
    }

    const allowedFields = ['nombre', 'precio', 'disponible'];
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Campos no permitidos",
        error: `Los campos ${invalidFields.join(', ')} no son permitidos`
      });
    }

    if (updates.precio !== undefined) {
      const precioNum = parseFloat(updates.precio);
      if (isNaN(precioNum)) {
        return res.status(400).json({
          message: "Formato inválido",
          error: "precio debe ser un número"
        });
      }
      updates.precio = precioNum;
    }

    const updatedProduct = await productService.updateProduct(id, updates);
    res.status(200).json({
      message: "Producto actualizado",
      payload: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "ID requerido",
        error: "Debe proporcionar un ID"
      });
    }

    await productService.deleteProduct(id);
    res.status(200).json({
      message: "Producto eliminado"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
