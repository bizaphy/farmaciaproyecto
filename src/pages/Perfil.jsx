import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
} from "@mui/material";
import { Person, Phone, Home } from "@mui/icons-material";

// 📌 Componente para mostrar y editar el perfil del usuario
const Profile = () => {
  const { user } = useAuth(); // 📌 Obtiene el usuario autenticado desde el contexto de autenticación

  // 📌 Estados para almacenar la información del perfil y controlar la edición
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // 📌 Efecto para obtener el perfil del usuario cuando el componente se monta
  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // 📌 Función para obtener los datos del perfil desde la base de datos
  const fetchProfile = async () => {
    const response = await fetch(`http://localhost:5000/api/profile/${user.id}`);
    const data = await response.json();

    if (data) {
      setProfile(data);
      setFormData({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  };


   // 📌 Función para actualizar el perfil en el backend local
   const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:3000/api/profile/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        ...formData,
        updated_at: new Date(),
      }),
    });

    const result = await response.json();
    if (result.success) {
      setIsEditing(false);
      fetchProfile(); // 📌 Recarga los datos actualizados
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "12px" }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Mi Perfil
        </Typography>

        {/* 📌 Información del perfil si no se está editando */}
        {!isEditing ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              <strong>Nombre:</strong> {profile?.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user?.email}
            </Typography>
            <Typography>
              <strong>Teléfono:</strong> {profile?.phone}
            </Typography>
            <Typography>
              <strong>Dirección:</strong> {profile?.address}
            </Typography>

            {/* 📌 Botón EDITAR PERFIL*/}
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              sx={{
                mt: 2,
                backgroundColor: "#FF0000",
                "&:hover": { backgroundColor: "#CC0000" },
              }}
            >
              Editar Perfil
            </Button>
          </Box>
        ) : (
          // 📌 Formulario para la edicion del perfil
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
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
              label="Dirección"
              variant="outlined"
              fullWidth
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home color="action" />
                  </InputAdornment>
                ),
              }}
            />

            {/* 📌 Botones para guardar o cancelar la edición */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#FF0000",
                  "&:hover": { backgroundColor: "#CC0000" },
                }}
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                onClick={() => setIsEditing(false)}
                sx={{
                  backgroundColor: "#808080",
                  "&:hover": { backgroundColor: "#606060" },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
