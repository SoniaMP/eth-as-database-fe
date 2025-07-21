import { useEffect, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { Container, Paper, Stack } from "@mui/material";

import { useAppSnackbar } from "@/providers/snackbar/useAppSnackbar";
import tablesConfig from "@/config/tableColumns.json";

import { ICompany } from "./interfaces";
import { CompanyForm } from "./CompanyForm";
import DeleteConfirmDialog from "../common/DeleteConfirmDialog";
import AddFab from "../common/AddFab";
import { SummaryTitle } from "../styled";
import ConfigurableTable from "../common/Table/ConfigurableTable";
import Summary from "../common/Summary";
import { ESummaryType } from "../common/interfaces";
import EmptyData from "../common/EmptyData";
import { createCompany, deleteCompany, getCompanies, updateCompany } from "./services";

export const Company = () => {
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<ICompany | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [companyToDelete, setCompanyToDelete] = useState<ICompany | null>(null);
    const { showSuccess } = useAppSnackbar();
    const { columns } = tablesConfig.companiesTable || {};

    useEffect(() => {
        getCompanies().then((res) => {
            setCompanies(res);
        });
    }, []);

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

    const handleSaveCompany = async (companyData: Omit<ICompany, "id" | "fechaCreacion">) => {
        if (selectedCompany) {
            const newCompany: ICompany = await updateCompany(selectedCompany.id, {
                ...selectedCompany,
                ...companyData,
            });
            setCompanies((prev) => prev.map((comp) => (comp.id === newCompany.id ? newCompany : comp)));
            showSuccess("Company actualizada correctamente");
        } else {
            const newCompany: ICompany = {
                id: companies.length + 1,
                ...companyData,
                dateCreated: new Date().toISOString(),
            };
            const createdCompany = await createCompany(newCompany);
            const newCompanies = [...companies, createdCompany];
            setCompanies(newCompanies);
            showSuccess("Empresa creada correctamente");
        }
        setFormOpen(false);
        setSelectedCompany(null);
    };

    const handleConfirmDelete = async () => {
        if (companyToDelete) {
            await deleteCompany(companyToDelete.id);
            setCompanies((prev) => prev.filter((comp) => comp.id !== companyToDelete.id));
            showSuccess("Empresa eliminada correctamente");
        }
        setDeleteDialogOpen(false);
        setCompanyToDelete(null);
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Stack spacing={2}>
                    <Summary summaryType={ESummaryType.COMPANIES} total={companies.length} icon={BusinessIcon} />
                    <Paper elevation={4}>
                        <SummaryTitle>Lista de Empresas</SummaryTitle>
                        {companies.length === 0 ? (
                            <EmptyData icon={BusinessIcon} summaryType={ESummaryType.COMPANIES} />
                        ) : (
                            <ConfigurableTable
                                columns={columns}
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
                name={companyToDelete?.name || ""}
            />
        </>
    );
};
