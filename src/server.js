import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route.js";

const app = express();

// Configurar CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send({ msj: "running /" });
});

app.use("/api/products",productRoutes)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
