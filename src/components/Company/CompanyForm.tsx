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
import { Close as CloseIcon, Business as BusinessIcon, Save as SaveIcon } from "@mui/icons-material";
import { ICompany } from "./interfaces";

interface ICompanyFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (company: Omit<ICompany, "id" | "fechaCreacion">) => void;
    company?: ICompany | null;
}

export const CompanyForm = ({ open, onClose, onSave, company }: ICompanyFormProps) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        vatNumber: "",
    });
    const [errors, setErrors] = useState({
        name: "",
        address: "",
        vatNumber: "",
    });

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name,
                address: company.address,
                vatNumber: company.vatNumber,
            });
        } else {
            setFormData({
                name: "",
                address: "",
                vatNumber: "",
            });
        }
        setErrors({ name: "", address: "", vatNumber: "" });
    }, [company, open]);

    const validateCIF = (vatNumber: string): boolean => {
        const cifRegex = /^[ABCDEFGHJNPQRSUVW]\d{8}$/;
        return cifRegex.test(vatNumber.toUpperCase());
    };

    const handleChange = (field: keyof typeof formData) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));

        // Limpiar error cuando el usuario empiece a escribir
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors = { name: "", address: "", vatNumber: "" };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = "El name es obligatorio";
            isValid = false;
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "El name debe tener al menos 2 caracteres";
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = "La dirección es obligatoria";
            isValid = false;
        } else if (formData.address.trim().length < 5) {
            newErrors.address = "La dirección debe tener al menos 5 caracteres";
            isValid = false;
        }

        if (!formData.vatNumber.trim()) {
            newErrors.vatNumber = "El CIF es obligatorio";
            isValid = false;
        } else if (!validateCIF(formData.vatNumber)) {
            newErrors.vatNumber = "El formato del CIF no es válido (ej: B12345678)";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (validateForm()) {
            onSave({
                name: formData.name.trim(),
                address: formData.address.trim(),
                vatNumber: formData.vatNumber.toUpperCase().trim(),
                dateCreated: new Date().toISOString(),
            });
        }
    };

    const handleClose = () => {
        setFormData({ name: "", address: "", vatNumber: "" });
        setErrors({ name: "", address: "", vatNumber: "" });
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
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <BusinessIcon />
                    <Typography variant="h6" component="div">
                        {company ? "Editar Empresa" : "Nueva Empresa"}
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
                            value={formData.name}
                            onChange={handleChange("name")}
                            error={!!errors.name}
                            helperText={errors.name}
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
                            value={formData.address}
                            onChange={handleChange("address")}
                            error={!!errors.address}
                            helperText={errors.address}
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
                            value={formData.vatNumber}
                            onChange={handleChange("vatNumber")}
                            error={!!errors.vatNumber}
                            helperText={errors.vatNumber || "Formato: Letra seguida de 8 dígitos (ej: B12345678)"}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} variant="outlined">
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
                        {company ? "Actualizar" : "Guardar"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
