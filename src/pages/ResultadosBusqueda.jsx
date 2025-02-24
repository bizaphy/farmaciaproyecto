import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; 
import axios from "axios";

const ResultadosBusqueda = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase().trim() || "";

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://farmaciaproyecto.onrender.com/api/products");

        console.log("Respuesta API:", response.data); // Verifica la estructura de los datos

        if (Array.isArray(response.data)) {
          setProductos(response.data); // Si la API devuelve un array directamente
        } else if (Array.isArray(response.data.products)) {
          setProductos(response.data.products); // Si la API tiene un campo "products"
        } else {
          throw new Error("Estructura inesperada en la API");
        }
      } catch (err) {
        setError("Hubo un error al cargar los productos");
        console.error("Error al obtener productos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    console.log("Query recibido:", query); // Verificar que la query se está capturando bien

    if (query !== "" && productos.length > 0) {
      const filtrados = productos.filter((producto) =>
        producto.nombre?.toLowerCase().includes(query)
      );

      console.log("Productos filtrados:", filtrados); //Depuración
      setProductosFiltrados(filtrados);
    } else {
      setProductosFiltrados([]);
    }
  }, [query, productos, location.search]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (productosFiltrados.length === 0) {
    return <p>No se encontraron productos para "{query}"</p>;
  }

  return (
    <div>
      <h2>Resultados para: "{query}"</h2>
      <div>
        {productosFiltrados.map((producto) => (
          <li key={producto.id}>
            <Link to={`/producto/${producto.id}`}>
              {producto.nombre} - ${producto.precio}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default ResultadosBusqueda;