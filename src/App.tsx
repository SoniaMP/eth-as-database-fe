"use client"

import type React from "react"
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
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from "@mui/material"
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Business as BusinessIcon,
  Inventory as ProductIcon,
  People as ClientIcon,
  Receipt as InvoiceIcon,
} from "@mui/icons-material"
import EmpresaForm from "./components/EmpresaForm"
import DeleteConfirmDialog from "./components/DeleteConfirmDialog"
import ProductosTab from "./components/ProductosTab"
import ClientesTab from "./components/ClientesTab"
import FacturasTab from "./components/FacturasTab"

export interface Empresa {
  id: string
  nombre: string
  direccion: string
  cif: string
  fechaCreacion: Date
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#115293",
      light: "#42a5f5",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        },
      },
    },
  },
})

function EmpresasTab() {
  const theme = useTheme()
  const [empresas, setEmpresas] = useState<Empresa[]>([
    {
      id: "1",
      nombre: "Tecnología Avanzada S.L.",
      direccion: "Calle Mayor 123, 28001 Madrid",
      cif: "B12345678",
      fechaCreacion: new Date("2023-01-15"),
    },
    {
      id: "2",
      nombre: "Innovación Digital S.A.",
      direccion: "Avenida de la Paz 456, 08001 Barcelona",
      cif: "A87654321",
      fechaCreacion: new Date("2023-03-22"),
    },
  ])

  const [formOpen, setFormOpen] = useState(false)
  const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [empresaToDelete, setEmpresaToDelete] = useState<Empresa | null>(null)
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: "success" | "error" | "info"
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  const handleAddEmpresa = () => {
    setEditingEmpresa(null)
    setFormOpen(true)
  }

  const handleEditEmpresa = (empresa: Empresa) => {
    setEditingEmpresa(empresa)
    setFormOpen(true)
  }

  const handleDeleteClick = (empresa: Empresa) => {
    setEmpresaToDelete(empresa)
    setDeleteDialogOpen(true)
  }

  const handleSaveEmpresa = (empresaData: Omit<Empresa, "id" | "fechaCreacion">) => {
    if (editingEmpresa) {
      setEmpresas((prev) => prev.map((emp) => (emp.id === editingEmpresa.id ? { ...emp, ...empresaData } : emp)))
      setSnackbar({
        open: true,
        message: "Empresa actualizada correctamente",
        severity: "success",
      })
    } else {
      const newEmpresa: Empresa = {
        id: Date.now().toString(),
        ...empresaData,
        fechaCreacion: new Date(),
      }
      setEmpresas((prev) => [...prev, newEmpresa])
      setSnackbar({
        open: true,
        message: "Empresa creada correctamente",
        severity: "success",
      })
    }
    setFormOpen(false)
    setEditingEmpresa(null)
  }

  const handleConfirmDelete = () => {
    if (empresaToDelete) {
      setEmpresas((prev) => prev.filter((emp) => emp.id !== empresaToDelete.id))
      setSnackbar({
        open: true,
        message: "Empresa eliminada correctamente",
        severity: "success",
      })
    }
    setDeleteDialogOpen(false)
    setEmpresaToDelete(null)
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
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
            <BusinessIcon sx={{ fontSize: 120 }} />
          </Box>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Gestión de Empresas
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Sistema de administración para alta, baja y modificación de empresas
          </Typography>
          <Chip
            label={`${empresas.length} empresas registradas`}
            sx={{
              mt: 2,
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Box>

        {/* Tabla de empresas */}
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
              backgroundColor: alpha(theme.palette.primary.main, 0.02),
              borderBottom: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="h5" fontWeight="600" color="primary">
              Lista de Empresas
            </Typography>
          </Box>

          {empresas.length === 0 ? (
            <Box sx={{ p: 6, textAlign: "center" }}>
              <BusinessIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No hay empresas registradas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Haz clic en el botón + para agregar tu primera empresa
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Dirección</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>CIF</TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>Fecha de Creación</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold", color: "primary.main" }}>
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {empresas.map((empresa, index) => (
                    <TableRow
                      key={empresa.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.primary.main, 0.02),
                        },
                        backgroundColor: index % 2 === 0 ? "transparent" : alpha(theme.palette.grey[100], 0.3),
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <BusinessIcon color="primary" sx={{ fontSize: 20 }} />
                          <Typography variant="body1" fontWeight="500">
                            {empresa.nombre}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {empresa.direccion}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={empresa.cif} size="small" variant="outlined" color="primary" />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {empresa.fechaCreacion.toLocaleDateString("es-ES")}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEditEmpresa(empresa)}
                            sx={{
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(empresa)}
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
          )}
        </Paper>

        {/* Botón flotante para agregar */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleAddEmpresa}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            boxShadow: theme.shadows[8],
          }}
        >
          <AddIcon />
        </Fab>
      </Container>

      {/* Formulario modal */}
      <EmpresaForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false)
          setEditingEmpresa(null)
        }}
        onSave={handleSaveEmpresa}
        empresa={editingEmpresa}
      />

      {/* Diálogo de confirmación de eliminación */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        empresaName={empresaToDelete?.nombre || ""}
      />

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
    </>
  )
}

function App() {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <EmpresasTab />
      case 1:
        return <ProductosTab />
      case 2:
        return <ClientesTab />
      case 3:
        return <FacturasTab />
      default:
        return <EmpresasTab />
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          }}
        >
          <Toolbar>
            <BusinessIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Sistema de Gestión Empresarial
            </Typography>
          </Toolbar>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            sx={{
              backgroundColor: alpha(theme.palette.common.white, 0.1),
              "& .MuiTab-root": {
                color: alpha(theme.palette.common.white, 0.7),
                fontWeight: 600,
                minHeight: 64,
                "&.Mui-selected": {
                  color: theme.palette.common.white,
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.common.white,
                height: 3,
              },
            }}
          >
            <Tab icon={<BusinessIcon />} label="Empresas" />
            <Tab icon={<ProductIcon />} label="Productos" />
            <Tab icon={<ClientIcon />} label="Clientes" />
            <Tab icon={<InvoiceIcon />} label="Facturas" />
          </Tabs>
        </AppBar>

        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "calc(100vh - 128px)" }}>{renderTabContent()}</Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
