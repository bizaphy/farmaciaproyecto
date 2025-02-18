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

import { Email, Lock, Person, Badge, Phone } from "@mui/icons-material";

function Register() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    correo_electronico: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones de todos los campos
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.rut ||
      !formData.telefono ||
      !formData.correo_electronico ||
      !formData.password
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await signUp(formData);
      navigate("/login"); // Redirigir al login después del registro exitoso
    } catch (error) {
      setError(error.message);
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
          Registro de Usuario
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            margin="normal"
            required
            value={formData.nombre}
            onChange={(e) =>
              setFormData({ ...formData, nombre: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Apellido"
            variant="outlined"
            margin="normal"
            required
            value={formData.apellido}
            onChange={(e) =>
              setFormData({ ...formData, apellido: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="RUT"
            variant="outlined"
            margin="normal"
            required
            value={formData.rut}
            onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Badge color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Teléfono"
            type="tel"
            variant="outlined"
            margin="normal"
            required
            value={formData.telefono}
            onChange={(e) =>
              setFormData({ ...formData, telefono: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Correo electrónico"
            type="email"
            variant="outlined"
            margin="normal"
            required
            value={formData.correo_electronico}
            onChange={(e) =>
              setFormData({ ...formData, correo_electronico: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

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
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
