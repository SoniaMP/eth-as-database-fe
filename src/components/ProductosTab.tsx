"use client"
import { useState } from "react"
import {
  Container,
  Typography,
  Box,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Alert,
  Snackbar,
  useTheme,
  alpha,
} from "@mui/material"
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Inventory as ProductIcon } from "@mui/icons-material"

export interface Producto {
  id: string
  nombre: string
  descripcion: string
  precio: number
  stock: number
  categoria: string
  fechaCreacion: Date
}

export default function ProductosTab() {
  const theme = useTheme()
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: "1",
      nombre: "Laptop Dell XPS 13",
      descripcion: "Laptop ultrabook con procesador Intel i7",
      precio: 1299.99,
      stock: 15,
      categoria: "Electrónicos",
      fechaCreacion: new Date("2023-01-15"),
    },
    {
      id: "2",
      nombre: "Mouse Logitech MX Master 3",
      descripcion: "Mouse inalámbrico ergonómico para productividad",
      precio: 89.99,
      stock: 45,
      categoria: "Accesorios",
      fechaCreacion: new Date("2023-02-20"),
    },
  ])

  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info"
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
          borderRadius: 3,
          p: 4,
          mb: 4,
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -20,
            right: -20,
            opacity: 0.1,
            transform: "rotate(15deg)",
          }}
        >
          <ProductIcon sx={{ fontSize: 120 }} />
        </Box>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Gestión de Productos
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Administra tu inventario y catálogo de productos
        </Typography>
        <Chip
          label={`${productos.length} productos en inventario`}
          sx={{
            mt: 2,
            backgroundColor: alpha(theme.palette.common.white, 0.2),
            color: "white",
            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Tabla de productos */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            p: 3,
            backgroundColor: alpha(theme.palette.secondary.main, 0.02),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" fontWeight="600" color="secondary">
            Lista de Productos
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha(theme.palette.secondary.main, 0.05) }}>
                <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Producto</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Precio</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Stock</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Categoría</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto, index) => (
                <TableRow
                  key={producto.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha(theme.palette.secondary.main, 0.02),
                    },
                    backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.grey[100], 0.3),
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ProductIcon color="secondary" sx={{ fontSize: 20 }} />
                      <Typography variant="body1" fontWeight="500">
                        {producto.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {producto.descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="600" color="success.main">
                      €{producto.precio.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={`${producto.stock} unidades`}
                      size="small"
                      variant="outlined"
                      color={producto.stock > 20 ? "success" : producto.stock > 5 ? "warning" : "error"}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={producto.categoria} size="small" variant="outlined" color="secondary" />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <IconButton
                        size="small"
                        sx={{
                          color: "secondary.main",
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                          },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: "error.main",
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.error.main, 0.1),
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Botón flotante para agregar */}
      <Fab
        color="secondary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          boxShadow: theme.shadows[8],
        }}
      >
        <AddIcon />
      </Fab>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}
