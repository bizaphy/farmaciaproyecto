import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica del correo electrónico
    if (!email || !email.includes("@")) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    try {
      // Aquí iría la lógica para enviar la solicitud de recuperación de contraseña
      // Por ejemplo, una llamada a una API
      console.log("Solicitud de recuperación enviada para:", email);

      // Simular éxito
      setSuccess("Se ha enviado un correo para restablecer tu contraseña.");
      setError("");
      setEmail("");

      // Redirigir al usuario después de unos segundos
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError("Ocurrió un error al enviar la solicitud. Inténtalo de nuevo.");
      console.error(error);
    }
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
          Recuperar Contrasena
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {success}
          </Alert>
        )}

        <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contrasena.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Enviar
          </Button>
        </Box>

        {/* Enlace para volver al inicio de sesión */}
        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Volver al inicio de sesión
        </Typography>
      </Box>
    </Container>
  );
}

export default RecuperarContrasena;
