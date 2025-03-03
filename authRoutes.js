import express from "express";
import pkg from "pg";
const { Pool } = pkg;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
});

// 📌 Endpoint para REGISTRAR usuario
router.post("/register", async (req, res) => {
  console.log("📩 Datos recibidos en registro:", req.body);

  const { nombre, apellido, rut, telefono, correo_electronico, password } =
    req.body;

  try {
    // Verificar si todos los campos están presentes
    if (
      !nombre ||
      !apellido ||
      !rut ||
      !telefono ||
      !correo_electronico ||
      !password
    ) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    // Verificar si el usuario ya existe por correo
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE correo_electronico = $1",
      [correo_electronico]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hashear la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insertar usuario en la base de datos
    const insertQuery = `
      INSERT INTO usuarios (nombre, apellido, rut, telefono, correo_electronico, password) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, nombre, apellido, rut, telefono, correo_electronico;
    `;

    const newUser = await pool.query(insertQuery, [
      nombre,
      apellido,
      rut,
      telefono,
      correo_electronico,
      hashedPassword,
    ]);

    // Generar token JWT
    const token = jwt.sign(
      {
        id: newUser.rows[0].id,
        correo_electronico: newUser.rows[0].correo_electronico,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Usuario registrado con éxito:", newUser.rows[0]);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("❌ Error en el servidor (Registro):", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
});

// 📌 Endpoint para INICIAR SESIÓN (LOGIN)
router.post("/login", async (req, res) => {
  const { correo_electronico, password } = req.body;
  console.log("📩 Intento de inicio de sesión:", correo_electronico);

  try {
    // Verificar si el usuario existe
    const user = await pool.query(
      "SELECT id, nombre, apellido, correo_electronico, password FROM usuarios WHERE correo_electronico = $1",
      [correo_electronico]
    );

    if (user.rows.length === 0) {
      console.log("❌ Usuario no encontrado:", correo_electronico);
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña hasheada
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      console.log("❌ Contraseña incorrecta para:", correo_electronico);
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        correo_electronico: user.rows[0].correo_electronico,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Usuario autenticado:", user.rows[0]);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      id: user.rows[0].id,
      nombre: user.rows[0].nombre,
      apellido: user.rows[0].apellido,
      correo_electronico: user.rows[0].correo_electronico,
    });
  } catch (error) {
    console.error("❌ Error en el servidor (Login):", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
