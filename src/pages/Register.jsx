import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";

import { Email, Lock, Person } from "@mui/icons-material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Envía los datos del formulario
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error del backend:", errorData); // Verifica el error del backend
        throw new Error("Error al registrar el usuario.");
      }

      const data = await response.json();

      console.log("Usuario registrado:", data);
      setError("");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError(
        errorData.message ||
          "Error al registrar el usuario. Inténtalo de nuevo."
      );
    }
  };

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "white",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Registro de Usuario
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Campo de Nombre Completo con Icono */}
          <TextField
            fullWidth
            label="Nombre completo"
            variant="outlined"
            margin="normal"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Campo de Correo con Icono */}
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Campo de Contraseña con Icono */}
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              bgcolor: "#FF0000",
              "&:hover": { bgcolor: "#B20000" },
            }}
          >
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
