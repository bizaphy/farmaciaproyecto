import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// 📌 Creación del contexto del carrito
export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const { token, setToken } = useAuth(); // ✅ Sacamos esto del `useState`

  // 📌 Estado del carrito (se inicializa desde localStorage)
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // 📌 Función para obtener el carrito desde la API
  const fetchCarrito = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("⚠️ No se encontró el token");
      return;
    }
    console.log("✅ Token enviado en fetchCarrito:", token);
    try {
      const response = await fetch(
        "https://farmaciaproyecto.onrender.com/api/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al obtener el carrito: ${response.status}`);
      }

      const data = await response.json();
      setCarrito(data); // ✅ Guardamos los datos en el estado
    } catch (error) {
      console.error("Error en fetchCarrito:", error);
    }
  };

  // 📌 Efecto para cargar el carrito cuando el token está disponible
  useEffect(() => {
    if (token) {
      fetchCarrito();
    }
  }, [token]); // ✅ Se ejecuta solo cuando el token cambia

  // 📌 Agregar un producto al carrito
  const agregarAlCarrito = async (producto) => {
    if (!token) {
      console.error("No se encontró el token");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: producto.id,
          quantity: 1,
        }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al agregar al carrito");
      const data = await response.json();
      console.log("Producto agregado:", data);

      fetchCarrito(); // ✅ Recargar el carrito después de agregar un producto
    } catch (error) {
      console.error(error);
    }
  };

  // 📌 Calcular el total del carrito
  const calcularTotal = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  // 📌 Incrementar cantidad de un producto
  const incrementarCantidad = (id) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      )
    );
  };

  // 📌 Disminuir cantidad de un producto
  const disminuirCantidad = (id) => {
    setCarrito(
      (prevCarrito) =>
        prevCarrito
          .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
          .filter((p) => p.cantidad > 0) // 🔹 Elimina el producto si la cantidad llega a 0
    );
  };

  // 📌 Eliminar un producto del carrito
  const eliminarDelCarrito = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }, // ✅ Se agregó token
        credentials: "include",
      });

      if (!response.ok) throw new Error("Error al eliminar producto");
      fetchCarrito(); // ✅ Recargar el carrito después de eliminar un producto
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        disminuirCantidad,
        eliminarDelCarrito,
        calcularTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;
