"use client";
import { useEffect, useState } from "react";
import { Container, Paper, Stack } from "@mui/material";
import { Inventory as ProductIcon } from "@mui/icons-material";

import tablesConfig from "@/config/tableColumns.json";

import { IProduct } from "./interfaces";
import { useAppSnackbar } from "@/providers/snackbar/useAppSnackbar";
import { SummaryTitle } from "../styled";
import AddFab from "../common/AddFab";
import Summary from "../common/Summary";
import { ESummaryType } from "../common/interfaces";
import EmptyData from "../common/EmptyData";
import ConfigurableTable from "../common/Table/ConfigurableTable";
import { getProducts } from "../Company/services";

export const Products = () => {
    const [products, setProductos] = useState<IProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const { showWarning } = useAppSnackbar();
    const { columns } = tablesConfig.productsTable || {};

    useEffect(() => {
        getProducts().then((res) => {
            setProductos(res);
        });
    }, []);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setFormOpen(true);
    };

    const handleEditProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setFormOpen(true);
    };

    const handleDeleteProduct = (product: IProduct) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 3 }}>
            <Stack spacing={2}>
                <Summary summaryType={ESummaryType.PRODUCTS} total={products.length} icon={ProductIcon} />
                <Paper elevation={4}>
                    <SummaryTitle>Gestión de Productos</SummaryTitle>
                    {products.length === 0 ? (
                        <EmptyData icon={ProductIcon} summaryType={ESummaryType.PRODUCTS} />
                    ) : (
                        <ConfigurableTable
                            columns={columns}
                            data={products}
                            onDelete={handleDeleteProduct}
                            onEdit={handleEditProduct}
                        />
                    )}
                </Paper>
                <AddFab onClick={handleAddProduct} />
            </Stack>
        </Container>
    );
};
