import React, { useEffect, useState, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
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
    const filtered = allProducts.filter(product =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.principio_activo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.laboratorio?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, allProducts]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
      <TextField
        label="Buscar productos"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{
          width: "50%", // Ajusta el ancho
          minWidth: "300px", // Define un ancho mínimo para evitar que sea demasiado pequeña
          display: "block",
          margin: "20px auto", // Centra el buscador horizontalmente
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
      ) : searchTerm.trim() !== "" && filteredProducts.length > 0 ? (
        <TableContainer 
          component={Paper} 
          sx={{ borderRadius: "10px", overflowX: "auto", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="tabla de productos">
            <TableHead sx={{ backgroundColor: "#009CC7" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="left">Nombre</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", display: { xs: "none", sm: "table-cell" } }} align="left">Principio Activo</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", display: { xs: "none", md: "table-cell" } }} align="left">Dosis</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="right">Stock</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", display: { xs: "none", md: "table-cell" } }} align="left">Laboratorio</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold", display: { xs: "none", lg: "table-cell" } }} align="left">Descripción</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }} align="left">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
                <TableRow 
                  key={product.id} 
                  sx={{ 
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white", 
                    "&:hover": { backgroundColor: "#e0f7fa" } 
                  }}
                >
                  <TableCell component="th" scope="row">{product.id}</TableCell>
                  <TableCell align="left">
                    <Link 
                      to={`/producto/${product.id}`} 
                      style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}
                    >
                      {product.nombre}
                    </Link>
                  </TableCell>
                  <TableCell align="left" sx={{ display: { xs: "none", sm: "table-cell" } }}>{product.principio_activo}</TableCell>
                  <TableCell align="left" sx={{ display: { xs: "none", md: "table-cell" } }}>{product.dosis}</TableCell>
                  <TableCell align="left">{product.stock}</TableCell>
                  <TableCell align="left" sx={{ display: { xs: "none", md: "table-cell" } }}>{product.laboratorio}</TableCell>
                  <TableCell align="left" sx={{ display: { xs: "none", lg: "table-cell" } }}>{product.descripcion}</TableCell>
                  <TableCell align="left">${product.precio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredProducts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : searchTerm.trim() !== "" ? (
        <p className="text-gray-500 text-center mt-4">No se encontraron productos.</p>
      ) : null}
    </div>
  );
}

export default SearchResults;