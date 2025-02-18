// 🧩 Importar paquetes necesarios
import express from "express";
import pkg from "pg"; // 🧩 PostgreSQL
import cors from "cors";
const { Pool } = pkg;
import dotenv from "dotenv"; // Variables de entorno
import authRoutes from "./authRoutes.js"; //

// Cargar configuración de variables de entorno
dotenv.config();

// 📌 Configuración del Servidor Express
const app = express();
app.use(cors());
app.use(express.json());
// console.log("📡 DATABASE_URL:", process.env.DATABASE_URL); //para testing
//
// 📌 Configuración de conexión a PostgreSQL (Neon.tech)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL en Neon.tech"))
  .catch((err) =>
    console.error("❌ Error al conectar con la base de datos:", err)
  );

// 📌 Rutas de Productos
app.get("/api/products", async (req, res) => {
  try {
    const query = `
      SELECT 
        id,
        nombre, 
        principio_activo,
        imagen_url,
        stock,
        laboratorio,
        descripcion,
        precio::FLOAT AS precio  
      FROM productos;
    `;

    const result = await pool.query(query);
    console.log("📡 Datos obtenidos desde PostgreSQL:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// 📌 Ruta para obtener productos por ID
app.get("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "El ID debe ser un número" });
  }

  try {
    const result = await pool.query(
      `SELECT id, nombre, principio_activo, precio, imagen_url, laboratorio, descripcion, stock FROM productos WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    console.log("📡 Producto enviado a React:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error en la base de datos:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// 📌 Rutas de Autenticación
app.use("/api/auth", authRoutes);

// 📌 Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send("❌ Página no encontrada");
});

// 📌 Middleware para manejo de errores globales (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// 📌 Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`)
);
