import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material"; // Importacion de iconos

function Login() {
  // State para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // State para manejar errores de auth.
  const navigate = useNavigate(); // Hook para navegar entre paginas
  const { signIn } = useAuth(); // Obtiene la FX. de inicio de sesión del AuthContext. (PROPS salen correctamente desde ahi)

  // Handles para el manejo del envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitamos el comportamiento default
    try {
      await signIn({
        email: formData.email, // Enviados como correo_electronico
        password: formData.password,
      });
      navigate("/perfil"); // Redireccion a perfil tras el ingreso
    } catch (error) {
      setError(error.message); // Muestra error en caso de existir fallo en autentificacion.
    }
  };

  // FX. para redirigir a pag. de recuperación de contraseña
  const irARecuperarContraseña = () => {
    navigate("/recuperar-contrasena");
  };

  // FX. para redirigir a la pág. de registro
  const irARegistro = () => {
    navigate("/register");
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
        {/* SECTOR DE TITULO */}
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Iniciar Sesión
        </Typography>

        {/* Mensaje de error */}
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* INGRESO DE DATOS */}
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Campo de Correo + Icono */}
          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Campo de Contraseña + Icono */}
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Boton para enviar el formulario de Login */}
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
            Iniciar Sesión
          </Button>

          {/* Enlace para recuperar contraseña
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
            onClick={irARecuperarContraseña}
          >
            ¿Olvidaste tu contraseña?{" "}
            <Typography
              component="span"
              sx={{ color: "#FF0000", fontWeight: "bold" }}
            >
              Recupérala aquí
            </Typography>
          </Typography> */}

          {/* Enlace para redirigir a la página de registro */}
          <Typography
            variant="body2"
            sx={{ mt: 2, textAlign: "center", cursor: "pointer" }}
            onClick={irARegistro}
          >
            ¿Aún no tienes cuenta?{" "}
            <Typography
              component="span"
              sx={{ color: "#FF0000", fontWeight: "bold" }}
            >
              Regístrate
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
