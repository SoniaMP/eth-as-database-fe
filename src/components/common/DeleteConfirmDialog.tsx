"use client";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useTheme,
    Stack,
} from "@mui/material";
import { Warning as WarningIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface DeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    name: string;
}

export default function DeleteConfirmDialog({ open, name, onClose, onConfirm }: DeleteConfirmDialogProps) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            slotProps={{
                paper: {
                    sx: {
                        borderRadius: 3,
                        boxShadow: theme.shadows[10],
                    },
                },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <WarningIcon />
                    <Typography variant="h6" component="div">
                        Confirmar Eliminación
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent sx={{ pt: 3 }}>
                <Stack spacing={2} sx={{ textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                        ¿Estás seguro?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                        {`Esta acción eliminará permanentemente: `}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            color: theme.palette.common.white,
                            fontWeight: "bold",
                            backgroundColor: theme.palette.primary.light,
                            padding: 2,
                            borderRadius: 2,
                        }}
                    >
                        {name}
                    </Typography>

                    <Typography variant="body1" fontWeight="bold">
                        Esta acción no se puede deshacer.
                    </Typography>
                </Stack>
            </DialogContent>

            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error" startIcon={<DeleteIcon />}>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    );
}
