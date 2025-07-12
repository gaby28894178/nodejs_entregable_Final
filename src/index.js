import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.route.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js"; 
import { authentication } from "./middleware/authentication.js";

const app = express();

// Configurar CORS
const permitido = {
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true 
}
app.use(cors(permitido));

// Middleware para parsear JSON
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send({ msj: "running /" });
});

app.use("/api/products",authentication, productRoutes)

app.use("/api/auth",authRoutes)

// Middlewares finales
app.use(notFound);        // Para rutas no encontradas (404)
app.use(errorHandler);    // Para errores generales


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
