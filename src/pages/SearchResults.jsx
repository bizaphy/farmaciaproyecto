import React, { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import ProductosCard from "../components/ProductosCard";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";

function SearchResults() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query")?.trim() || "";

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://farmaciaproyecto.onrender.com/api/products");
      if (response.status === 200) {
        setAllProducts(response.data);
        setFilteredProducts(response.data);
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      setError("Hubo un problema al obtener los productos.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (query) {
      const filtered = allProducts.filter(product =>
        product.nombre.toLowerCase().includes(query.toLowerCase()) ||
        product.descripcion?.toLowerCase().includes(query.toLowerCase()) ||
        product.principio_activo?.toLowerCase().includes(query.toLowerCase()) ||
        product.laboratorio?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(allProducts);
    }
  }, [query, allProducts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const finalProducts = filteredProducts.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.principio_activo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.laboratorio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Barra de búsqueda con diseño mejorado */}
      <TextField
        label="Buscar productos"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
        }}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : finalProducts.length > 0 ? (
        <TableContainer component={Paper} sx={{ borderRadius: "10px", overflow: "hidden", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <Table sx={{ minWidth: 650 }} aria-label="tabla de productos">
            <TableHead sx={{ backgroundColor: "#009CC7" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Nombre</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Principio Activo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Dosis</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Stock</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Laboratorio</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Descripción</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
  {finalProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => {
    console.log("ID del producto en SearchResults:", product.id); // 📌 Debug: Verificar IDs en consola
    return (
      <TableRow 
        key={product.id} 
        sx={{ 
          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", 
          "&:hover": { backgroundColor: "#e0f7fa" } 
        }}
      >
        <TableCell component="th" scope="row">{product.id}</TableCell>
        <TableCell align="right"> 
          <Link 
            to={`/producto/${product.id}`} 
            style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}
          >
            {product.nombre}
          </Link>
        </TableCell>
        <TableCell align="right">{product.principio_activo}</TableCell>
        <TableCell align="right">{product.dosis}</TableCell>
        <TableCell align="right">{product.stock}</TableCell>
        <TableCell align="right">{product.laboratorio}</TableCell>
        <TableCell align="right">{product.descripcion}</TableCell>
        <TableCell align="right">${product.precio}</TableCell>
      </TableRow>
    );
  })}
</TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={finalProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <p className="text-gray-500 text-center mt-4">No se encontraron productos.</p>
      )}
    </div>
  );
}

export default SearchResults;