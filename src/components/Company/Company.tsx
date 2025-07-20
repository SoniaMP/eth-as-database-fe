import { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { Container, Paper, Stack } from "@mui/material";

import { useAppSnackbar } from "@/providers/snackbar/useAppSnackbar";
import tablesConfig from "@/config/tableColumns.json";

import data from "./data.json";
import { ICompany } from "./interfaces";
import { CompanyForm } from "./CompanyForm";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import AddFab from "../common/AddFab";
import { SummaryTitle } from "../styled";
import ConfigurableTable from "../common/Table/ConfigurableTable";
import Summary from "../common/Summary";
import { ESummaryType } from "../common/interfaces";
import EmptyData from "../common/EmptyData";

export const Company = () => {
    const [companies, setCompanies] = useState<ICompany[]>(data);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<ICompany | null>(null);
    const { showSuccess } = useAppSnackbar();
    const { columns } = tablesConfig.companiesTable || {};

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

    const handleSaveCompany = (companyData: Omit<ICompany, "id" | "fechaCreacion">) => {
        if (selectedCompany) {
            setCompanies((prev) =>
                prev.map((comp) => (comp.id === selectedCompany.id ? { ...comp, ...companyData } : comp)),
            );
            showSuccess("Company actualizada correctamente");
        } else {
            const newCompany: ICompany = {
                id: Date.now().toString(),
                ...companyData,
                dateCreated: new Date().toISOString(),
            };
            setCompanies((prev) => [...prev, newCompany]);
            showSuccess("Empresa creada correctamente");
        }
        setFormOpen(false);
        setSelectedCompany(null);
    };

    const handleConfirmDelete = () => {
        if (companyToDelete) {
            setCompanies((prev) => prev.filter((comp) => comp.id !== companyToDelete.id));
            showSuccess("Empresa eliminada correctamente");
        }
        setDeleteDialogOpen(false);
        setCompanyToDelete(null);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Stack spacing={4}>
                    <Summary summaryType={ESummaryType.COMPANIES} total={companies.length} icon={BusinessIcon} />
                    <Paper elevation={8}>
                        <SummaryTitle>Lista de Empresas</SummaryTitle>

                        {companies.length === 0 ? (
                            <EmptyData icon={BusinessIcon} summaryType={ESummaryType.COMPANIES} />
                        ) : (
                            <ConfigurableTable
                                columns={columns}
                                data={data}
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
                name={companyToDelete?.name || ""}
            />
        </>
    );
};
