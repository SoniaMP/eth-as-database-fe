"use client"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useTheme,
  alpha,
} from "@mui/material"
import { Warning as WarningIcon, Delete as DeleteIcon } from "@mui/icons-material"

interface DeleteConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  empresaName: string
}

export default function DeleteConfirmDialog({ open, onClose, onConfirm, empresaName }: DeleteConfirmDialogProps) {
  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: theme.shadows[10],
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <WarningIcon />
          <Typography variant="h6" component="div">
            Confirmar Eliminación
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 2,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              backgroundColor: alpha(theme.palette.error.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <DeleteIcon sx={{ fontSize: 40, color: "error.main" }} />
          </Box>

          <Typography variant="h6" gutterBottom>
            ¿Estás seguro?
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Esta acción eliminará permanentemente la empresa:
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              padding: 2,
              borderRadius: 2,
              mb: 2,
            }}
          >
            {empresaName}
          </Typography>

          <Typography variant="body2" color="error.main">
            Esta acción no se puede deshacer.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          sx={{
            borderRadius: 2,
            px: 3,
            background: `linear-gradient(135deg, ${theme.palette.error.main} 0%, ${theme.palette.error.dark} 100%)`,
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
