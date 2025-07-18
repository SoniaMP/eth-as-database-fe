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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  People as ClientIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material"

export interface Cliente {
  id: string
  nombre: string
  email: string
  telefono: string
  empresa: string
  direccion: string
  fechaRegistro: Date
}

export default function ClientesTab() {
  const theme = useTheme()
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: "1",
      nombre: "Ana García López",
      email: "ana.garcia@email.com",
      telefono: "+34 666 123 456",
      empresa: "Consultora ABC",
      direccion: "Calle Serrano 45, Madrid",
      fechaRegistro: new Date("2023-01-10"),
    },
    {
      id: "2",
      nombre: "Carlos Rodríguez Martín",
      email: "carlos.rodriguez@empresa.com",
      telefono: "+34 677 987 654",
      empresa: "Tech Solutions S.L.",
      direccion: "Avenida Diagonal 123, Barcelona",
      fechaRegistro: new Date("2023-02-15"),
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
          background: `linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)`,
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
          <ClientIcon sx={{ fontSize: 120 }} />
        </Box>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Gestión de Clientes
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Administra tu cartera de clientes y contactos
        </Typography>
        <Chip
          label={`${clientes.length} clientes registrados`}
          sx={{
            mt: 2,
            backgroundColor: alpha(theme.palette.common.white, 0.2),
            color: "white",
            fontWeight: "bold",
          }}
        />
      </Box>

      {/* Tabla de clientes */}
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
            backgroundColor: alpha("#2e7d32", 0.02),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" fontWeight="600" sx={{ color: "#2e7d32" }}>
            Lista de Clientes
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha("#2e7d32", 0.05) }}>
                <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>Contacto</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>Empresa</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>Dirección</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>Registro</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente, index) => (
                <TableRow
                  key={cliente.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha("#2e7d32", 0.02),
                    },
                    backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.grey[100], 0.3),
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <ClientIcon sx={{ color: "#2e7d32", fontSize: 20 }} />
                      <Typography variant="body1" fontWeight="500">
                        {cliente.nombre}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <EmailIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {cliente.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {cliente.telefono}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {cliente.empresa}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {cliente.direccion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {cliente.fechaRegistro.toLocaleDateString("es-ES")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <IconButton
                        size="small"
                        sx={{
                          color: "#2e7d32",
                          "&:hover": {
                            backgroundColor: alpha("#2e7d32", 0.1),
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
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          backgroundColor: "#2e7d32",
          color: "white",
          "&:hover": {
            backgroundColor: "#1b5e20",
          },
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
