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
import {
  Inventory,
  Medication,
  Numbers,
  Description,
  AttachMoney,
  Image,
  Store,
  Layers,
} from "@mui/icons-material";

function CrearProducto() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 📌 Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    principio_activo: "",
    dosis: "",
    descripcion: "",
    precio: "",
    imagen_url: "",
    stock: "",
    laboratorio: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // 📌 Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://farmaciaproyecto.onrender.com/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            principio_activo: formData.principio_activo,
            dosis: formData.dosis,
            descripcion: formData.descripcion,
            precio: parseFloat(formData.precio),
            imagen_url: formData.imagen_url,
            stock: parseInt(formData.stock),
            laboratorio: formData.laboratorio,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el producto");
      }

      // 📌 Mostrar mensaje de éxito
      setSuccess(true);
      setError("");

      // 📌 Limpiar el formulario tras creacion correcta
      setFormData({
        nombre: "",
        principio_activo: "",
        dosis: "",
        descripcion: "",
        precio: "",
        imagen_url: "",
        stock: "",
        laboratorio: "",
      });

      // 📌 Redirigir nuevamente para seguir creando
      setTimeout(() => {
        setSuccess(false); // Ocultar tras unos segundos
        navigate("/crearproducto");
      }, 3000); // ⏰ 3 segundos de tiempo de espera
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
          Crear Nuevo Producto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            Producto creado con éxito 🎉
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* 📌 Nombre */}
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
                  <Inventory color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Principio Activo */}
          <TextField
            fullWidth
            label="Principio Activo"
            variant="outlined"
            margin="normal"
            required
            value={formData.principio_activo}
            onChange={(e) =>
              setFormData({ ...formData, principio_activo: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Medication color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Dosis */}
          <TextField
            fullWidth
            label="Dosis"
            variant="outlined"
            margin="normal"
            required
            value={formData.dosis}
            onChange={(e) =>
              setFormData({ ...formData, dosis: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Numbers color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Descripción */}
          <TextField
            fullWidth
            label="Descripción"
            variant="outlined"
            margin="normal"
            required
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Precio */}
          <TextField
            fullWidth
            label="Precio"
            variant="outlined"
            margin="normal"
            required
            type="number"
            value={formData.precio}
            onChange={(e) =>
              setFormData({ ...formData, precio: e.target.value })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* 📌 Botón para enviar */}
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
            Publicar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CrearProducto;
