"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import {
  Close as CloseIcon,
  Business as BusinessIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { ICompany } from "./interfaces";

interface EmpresaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (empresa: Omit<ICompany, "id" | "fechaCreacion">) => void;
  empresa?: ICompany | null;
}

export const CompanyForm = ({
  open,
  onClose,
  onSave,
  empresa,
}: EmpresaFormProps) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    cif: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    direccion: "",
    cif: "",
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        nombre: empresa.nombre,
        direccion: empresa.direccion,
        cif: empresa.cif,
      });
    } else {
      setFormData({
        nombre: "",
        direccion: "",
        cif: "",
      });
    }
    setErrors({ nombre: "", direccion: "", cif: "" });
  }, [empresa, open]);

  const validateCIF = (cif: string): boolean => {
    const cifRegex = /^[ABCDEFGHJNPQRSUVW]\d{8}$/;
    return cifRegex.test(cif.toUpperCase());
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Limpiar error cuando el usuario empiece a escribir
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors = { nombre: "", direccion: "", cif: "" };
    let isValid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
      isValid = false;
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
      isValid = false;
    }

    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es obligatoria";
      isValid = false;
    } else if (formData.direccion.trim().length < 5) {
      newErrors.direccion = "La dirección debe tener al menos 5 caracteres";
      isValid = false;
    }

    if (!formData.cif.trim()) {
      newErrors.cif = "El CIF es obligatorio";
      isValid = false;
    } else if (!validateCIF(formData.cif)) {
      newErrors.cif = "El formato del CIF no es válido (ej: B12345678)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      onSave({
        nombre: formData.nombre.trim(),
        direccion: formData.direccion.trim(),
        cif: formData.cif.toUpperCase().trim(),
      });
    }
  };

  const handleClose = () => {
    setFormData({ nombre: "", direccion: "", cif: "" });
    setErrors({ nombre: "", direccion: "", cif: "" });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: "white",
          position: "relative",
          pr: 6,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BusinessIcon />
          <Typography variant="h6" component="div">
            {empresa ? "Editar Empresa" : "Nueva Empresa"}
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <TextField
              label="Nombre de la empresa"
              value={formData.nombre}
              onChange={handleChange("nombre")}
              error={!!errors.nombre}
              helperText={errors.nombre}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="Dirección"
              value={formData.direccion}
              onChange={handleChange("direccion")}
              error={!!errors.direccion}
              helperText={errors.direccion}
              fullWidth
              multiline
              rows={2}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              label="CIF"
              value={formData.cif}
              onChange={handleChange("cif")}
              error={!!errors.cif}
              helperText={
                errors.cif ||
                "Formato: Letra seguida de 8 dígitos (ej: B12345678)"
              }
              fullWidth
              variant="outlined"
              inputProps={{
                style: { textTransform: "uppercase" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
            }}
          >
            {empresa ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
