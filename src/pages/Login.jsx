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
import { Email, Lock } from "@mui/icons-material"; // Importar iconos

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const irARecuperarContraseña = () => {
    navigate("/recuperar-contrasena");
  };

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
        <Typography variant="h4" fontWeight="bold" color="black" gutterBottom>
          Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Campo de Correo con Icono */}
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

          {/* Campo de Contraseña con Icono */}
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
          </Typography>

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
