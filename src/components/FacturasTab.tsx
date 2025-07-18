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
  Receipt as InvoiceIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"

export interface Factura {
  id: string
  numero: string
  cliente: string
  fecha: Date
  vencimiento: Date
  total: number
  estado: "Pendiente" | "Pagada" | "Vencida"
  items: number
}

export default function FacturasTab() {
  const theme = useTheme()
  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: "1",
      numero: "FAC-2024-001",
      cliente: "Ana García López",
      fecha: new Date("2024-01-15"),
      vencimiento: new Date("2024-02-15"),
      total: 1250.5,
      estado: "Pagada",
      items: 3,
    },
    {
      id: "2",
      numero: "FAC-2024-002",
      cliente: "Carlos Rodríguez Martín",
      fecha: new Date("2024-01-20"),
      vencimiento: new Date("2024-02-20"),
      total: 890.75,
      estado: "Pendiente",
      items: 2,
    },
    {
      id: "3",
      numero: "FAC-2024-003",
      cliente: "Tech Solutions S.L.",
      fecha: new Date("2023-12-10"),
      vencimiento: new Date("2024-01-10"),
      total: 2150.0,
      estado: "Vencida",
      items: 5,
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

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "Pagada":
        return "success"
      case "Pendiente":
        return "warning"
      case "Vencida":
        return "error"
      default:
        return "default"
    }
  }

  const totalFacturado = facturas.reduce((sum, factura) => sum + factura.total, 0)
  const facturasPendientes = facturas.filter((f) => f.estado === "Pendiente").length

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box
        sx={{
          background: `linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)`,
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
          <InvoiceIcon sx={{ fontSize: 120 }} />
        </Box>
        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
          Gestión de Facturas
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Controla tu facturación y cobros
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Chip
            label={`${facturas.length} facturas emitidas`}
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              color: "white",
              fontWeight: "bold",
            }}
          />
          <Chip
            label={`€${totalFacturado.toFixed(2)} facturado`}
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              color: "white",
              fontWeight: "bold",
            }}
          />
          <Chip
            label={`${facturasPendientes} pendientes`}
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>
      </Box>

      {/* Tabla de facturas */}
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
            backgroundColor: alpha("#7b1fa2", 0.02),
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h5" fontWeight="600" sx={{ color: "#7b1fa2" }}>
            Lista de Facturas
          </Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: alpha("#7b1fa2", 0.05) }}>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Número</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Vencimiento</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Total</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#7b1fa2" }}>Estado</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold", color: "#7b1fa2" }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facturas.map((factura, index) => (
                <TableRow
                  key={factura.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: alpha("#7b1fa2", 0.02),
                    },
                    backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.grey[100], 0.3),
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InvoiceIcon sx={{ color: "#7b1fa2", fontSize: 20 }} />
                      <Typography variant="body1" fontWeight="500">
                        {factura.numero}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {factura.cliente}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {factura.fecha.toLocaleDateString("es-ES")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {factura.vencimiento.toLocaleDateString("es-ES")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="600" color="success.main">
                      €{factura.total.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={factura.estado}
                      size="small"
                      variant="outlined"
                      color={getEstadoColor(factura.estado) as any}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                      <IconButton
                        size="small"
                        sx={{
                          color: "#7b1fa2",
                          "&:hover": {
                            backgroundColor: alpha("#7b1fa2", 0.1),
                          },
                        }}
                      >
                        <ViewIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: "info.main",
                          "&:hover": {
                            backgroundColor: alpha(theme.palette.info.main, 0.1),
                          },
                        }}
                      >
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{
                          color: "#7b1fa2",
                          "&:hover": {
                            backgroundColor: alpha("#7b1fa2", 0.1),
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
          backgroundColor: "#7b1fa2",
          color: "white",
          "&:hover": {
            backgroundColor: "#4a148c",
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
