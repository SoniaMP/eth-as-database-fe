/*
 * .
 *        . * .
 *      * RRRR  *   Copyright (c) 2012 - 2025
 *     .  RR  R  .  EUIPO - European Union Intellectual Property Office
 *     *  RRR    *
 *      . RR RR .   ALL RIGHTS RESERVED
 *       *. _ .*
 * .
 *  The use and distribution of this software is under the restrictions exposed in 'license.txt'
 */

import { useState } from "react";
import {
  Box,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

import { useAppSnackbar } from "@/providers/snackbar/useAppSnackbar";

import data from "./data.json";
import { ICompany } from "./interfaces";
import { CompanyTable } from "./CompanyTable";
import { CompanyForm } from "./CompanyForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import AddFab from "../common/AddFab";

export const Company = () => {
  const theme = useTheme();
  const [empresas, setEmpresas] = useState<ICompany[]>(data);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [empresaToDelete, setEmpresaToDelete] = useState<ICompany | null>(null);
  const { showSuccess } = useAppSnackbar();

  const handleAddEmpresa = () => {
    setSelectedCompany(null);
    setFormOpen(true);
  };

  const handleEditEmpresa = (empresa: ICompany) => {
    setSelectedCompany(empresa);
    setFormOpen(true);
  };

  const handleDeleteCompany = (empresa: ICompany) => {
    setEmpresaToDelete(empresa);
    setDeleteDialogOpen(true);
  };

  const handleSaveEmpresa = (
    empresaData: Omit<ICompany, "id" | "fechaCreacion">
  ) => {
    if (selectedCompany) {
      setEmpresas((prev) =>
        prev.map((emp) =>
          emp.id === selectedCompany.id ? { ...emp, ...empresaData } : emp
        )
      );
      showSuccess("Empresa actualizada correctamente");
    } else {
      const newEmpresa: ICompany = {
        id: Date.now().toString(),
        ...empresaData,
        fechaCreacion: new Date().toISOString(),
      };
      setEmpresas((prev) => [...prev, newEmpresa]);
      showSuccess("Empresa creada correctamente");
    }
    setFormOpen(false);
    setSelectedCompany(null);
  };

  const handleConfirmDelete = () => {
    if (empresaToDelete) {
      setEmpresas((prev) =>
        prev.filter((emp) => emp.id !== empresaToDelete.id)
      );
      showSuccess("Empresa eliminada correctamente");
    }
    setDeleteDialogOpen(false);
    setEmpresaToDelete(null);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              borderRadius: 3,
              p: 4,
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
            <Typography variant="h3" component="h1" fontWeight="bold">
              Gestión de Empresas
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Sistema de administración para alta, baja y modificación de
              empresas
            </Typography>
            <Chip
              label={`${empresas.length} empresas registradas`}
              sx={{
                mt: 2,
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>

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
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h5" fontWeight="600" color="primary">
                Lista de Empresas
              </Typography>
            </Box>

            {empresas.length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <BusinessIcon
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No hay empresas registradas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Haz clic en el botón + para agregar tu primera empresa
                </Typography>
              </Box>
            ) : (
              <CompanyTable
                data={empresas}
                onDelete={handleDeleteCompany}
                onEdit={handleEditEmpresa}
              />
            )}
          </Paper>

          <AddFab onClick={handleAddEmpresa} />
        </Stack>
      </Container>

      <CompanyForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedCompany(null);
        }}
        onSave={handleSaveEmpresa}
        empresa={selectedCompany}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        empresaName={empresaToDelete?.nombre || ""}
      />
    </>
  );
};
