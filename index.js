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
        dosis,        
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

////

// 📌 Ruta para CREAR un nuevo producto
app.post("/api/products", async (req, res) => {
  console.log("📌 Recibida solicitud POST en /api/products");
  console.log("📌 Datos recibidos en el backend:", req.body);

  try {
    // 📌 Extraer los datos del cuerpo de la solicitud
    let {
      nombre,
      principio_activo,
      dosis,
      descripcion,
      precio,
      imagen_url,
      stock,
      laboratorio,
    } = req.body;

    // 📌 Valores predeterminados (||)
    nombre =
      nombre ||
      (console.log(
        "⚠️ Advertencia: nombre no recibido, asignando valor 'Producto Desconocido'"
      ),
      "Producto Desconocido");
    principio_activo =
      principio_activo ||
      (console.log(
        "⚠️ Advertencia: principio_activo no recibido, asignando valor 'Desconocido'"
      ),
      "Desconocido");
    dosis =
      dosis ||
      (console.log(
        "⚠️ Advertencia: dosis no recibido, asignando valor 'No especificado'"
      ),
      "No especificado");
    descripcion =
      descripcion ||
      (console.log(
        "⚠️ Advertencia: descripcion no recibida, asignando valor 'Sin descripción'"
      ),
      "Sin descripción");
    precio =
      precio ||
      (console.log("⚠️ Advertencia: precio no recibido, asignando valor 0.0"),
      0.0);
    imagen_url =
      imagen_url ||
      (console.log(
        "⚠️ Advertencia: imagen_url no recibido, asignando valor 'https://example.com/default-image.jpg'"
      ),
      "https://example.com/default-image.jpg");
    stock =
      stock ||
      (console.log("⚠️ Advertencia: stock no recibido, asignando valor 0"), 0);
    laboratorio =
      laboratorio ||
      (console.log(
        "⚠️ Advertencia: laboratorio no recibido, asignando valor 'Laboratorio Desconocido'"
      ),
      "Laboratorio Desconocido");

    const insertQuery = `
      INSERT INTO productos (
        nombre, 
        principio_activo, 
        dosis, 
        descripcion, 
        precio, 
        imagen_url, 
        stock, 
        laboratorio
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `;

    const newProduct = await pool.query(insertQuery, [
      nombre,
      principio_activo,
      dosis,
      descripcion,
      precio,
      imagen_url,
      stock,
      laboratorio,
    ]);

    console.log("✅ Producto creado con éxito:", newProduct.rows[0]);

    res.status(201).json({
      message: "Producto creado exitosamente",
      producto: newProduct.rows[0],
    });
  } catch (error) {
    console.error("❌ Error al crear producto:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});


// 📌 Ruta para MODIFICAR un producto por ID
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    principio_activo,
    dosis,
    descripcion,
    precio,
    imagen_url,
    stock,
    laboratorio,
  } = req.body;

  try {
    // Verificar si el producto existe antes de actualizarlo
    const productExists = await pool.query(
      "SELECT * FROM productos WHERE id = $1",
      [id]
    );

    if (productExists.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado para actualizar" });
    }

    // Actualizar el producto en la base de datos
    const updateQuery = `
      UPDATE productos
      SET 
        nombre = $1,
        principio_activo = $2,
        dosis = $3,
        descripcion = $4,
        precio = $5,
        imagen_url = $6,
        stock = $7,
        laboratorio = $8
      WHERE id = $9
      RETURNING *;
    `;

    const updatedProduct = await pool.query(updateQuery, [
      nombre,
      principio_activo,
      dosis,
      descripcion,
      precio,
      imagen_url,
      stock,
      laboratorio,
      id,
    ]);

    console.log("✅ Producto actualizado con éxito:", updatedProduct.rows[0]);

    res.status(200).json({
      message: "Producto actualizado exitosamente",
      producto: updatedProduct.rows[0],
    });
  } catch (error) {
    console.error("❌ Error al actualizar producto:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});



// 📌 Ruta para ELIMINAR un producto por ID
app.delete("/api/products/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "El ID debe ser un número" });
  }

  try {
    const result = await pool.query(
      `DELETE FROM productos WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    console.log("🗑️ Producto eliminado:", result.rows[0]);
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

console.log("📌 Cargando rutas de autenticación...");

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
