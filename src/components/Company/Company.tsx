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
import { SummaryContainer } from "../styled";

export const Company = () => {
  const theme = useTheme();
  const [companies, setCompanies] = useState<ICompany[]>(data);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<ICompany | null>(null);
  const { showSuccess } = useAppSnackbar();

  const handleAddCompany = () => {
    setSelectedCompany(null);
    setFormOpen(true);
  };

  const handleEditCompany = (company: ICompany) => {
    setSelectedCompany(company);
    setFormOpen(true);
  };

  const handleDeleteCompany = (company: ICompany) => {
    setCompanyToDelete(company);
    setDeleteDialogOpen(true);
  };

  const handleSaveCompany = (
    companyData: Omit<ICompany, "id" | "fechaCreacion">
  ) => {
    if (selectedCompany) {
      setCompanies((prev) =>
        prev.map((comp) =>
          comp.id === selectedCompany.id ? { ...comp, ...companyData } : comp
        )
      );
      showSuccess("Company actualizada correctamente");
    } else {
      const newCompany: ICompany = {
        id: Date.now().toString(),
        ...companyData,
        fechaCreacion: new Date().toISOString(),
      };
      setCompanies((prev) => [...prev, newCompany]);
      showSuccess("Empresa creada correctamente");
    }
    setFormOpen(false);
    setSelectedCompany(null);
  };

  const handleConfirmDelete = () => {
    if (companyToDelete) {
      setCompanies((prev) =>
        prev.filter((comp) => comp.id !== companyToDelete.id)
      );
      showSuccess("Empresa eliminada correctamente");
    }
    setDeleteDialogOpen(false);
    setCompanyToDelete(null);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={4}>
          <SummaryContainer Icon={BusinessIcon}>
            <Typography variant="h3" fontWeight="bold">
              Gestión de Empresas
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Sistema de administración para alta, baja y modificación de
              companies
            </Typography>
            <Chip
              label={`${companies.length} companies registradas`}
              sx={{ color: "white", fontWeight: "bold" }}
            />
          </SummaryContainer>

          <Paper elevation={8}>
            <Box
              sx={{
                p: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Typography variant="h5" fontWeight="600" color="primary">
                Lista de Empresas
              </Typography>
            </Box>

            {companies.length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <BusinessIcon
                  sx={{ fontSize: 64, color: "text.secondary", mb: 2 }}
                />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No hay companies registradas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Haz clic en el botón + para agregar tu primera empresa
                </Typography>
              </Box>
            ) : (
              <CompanyTable
                data={companies}
                onDelete={handleDeleteCompany}
                onEdit={handleEditCompany}
              />
            )}
          </Paper>

          <AddFab onClick={handleAddCompany} />
        </Stack>
      </Container>

      <CompanyForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedCompany(null);
        }}
        onSave={handleSaveCompany}
        company={selectedCompany}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        empresaName={companyToDelete?.nombre || ""}
      />
    </>
  );
};
