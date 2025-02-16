import React, { createContext, useContext, useState } from "react";

// Crear el contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Función para guardar el token en el estado y en localStorage
  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken); // Guardar el token en localStorage
    setToken(newToken); // Actualizar el estado del token
  };

  // Función para eliminar el token del estado y de localStorage
  const removeToken = () => {
    localStorage.removeItem("token"); // Eliminar el token de localStorage
    setToken(null); // Limpiar el estado del token
  };
  // Función para iniciar sesión
  const signIn = async (email, password) => {
    try {
      const response = await fetch(
        "https://farmaciaproyecto.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email, password),
        }
      );
      const data = await response.json();
      console.log("Respuesta del backend en login:", data);

      if (response.ok) {
        saveToken(data.token); // Guardar el token
        setUser(data.user); // Actualizar el estado del usuario
        if (token) {
          localStorage.setItem("token", token);
          console.log("✅ Token guardado correctamente:", token);
        } else {
          console.error(
            "⚠️ El token es undefined, no se guardó en localStorage"
          );
        }
      } else {
        console.error("Error al iniciar sesión:", data.message);
      }
    } catch (error) {
      console.error("Error en la petición de login:", error);
    }
  };

  // Función para cerrar sesión
  const signOut = () => {
    removeToken(); // Eliminar el token
    setUser(null); // Limpiar el estado del usuario
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar el contexto de autenticación
export function useAuth() {
  return useContext(AuthContext);
}
