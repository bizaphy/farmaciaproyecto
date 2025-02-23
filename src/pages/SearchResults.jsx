import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Obtener el término de búsqueda
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://farmaciaproyecto.onrender.com/api/products/search?query=${query}`
        );

        setResults(response.data);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <div>Cargando resultados...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Resultados de búsqueda para "{query}"
      </h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{product.nombre}</h2>
              <p>{product.descripcion}</p>
              <p className="text-green-600 font-bold">${product.precio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}

export default SearchResults;
