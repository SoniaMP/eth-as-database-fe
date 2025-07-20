"use client";
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Chip,
  useTheme,
  Stack,
} from "@mui/material";
import { Add as AddIcon, Inventory as ProductIcon } from "@mui/icons-material";

import data from "./data.json";
import { ProductsTable } from "./ProductsTable";
import { IProduct } from "./interfaces";
import { useAppSnackbar } from "@/providers/snackbar/useAppSnackbar";
import { SummaryContainer } from "../styled";
import AddFab from "../common/AddFab";

export const Products = () => {
  const theme = useTheme();
  const [products, setProductos] = useState<IProduct[]>(data);
  const { showWarning } = useAppSnackbar();

  const handleAddProduct = () => {
    showWarning("Funcionalidad de añadir producto aún no implementada");
  };

  const handleEditProduct = (product: IProduct) => {
    showWarning(
      `Funcionalidad para editar producto ${product.name} aún no implementada`,
    );
  };

  const handleDeleteProduct = (product: IProduct) => {
    showWarning(
      `Funcionalidad para eliminar producto ${product.name} aún no implementada`,
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <SummaryContainer Icon={ProductIcon}>
          <Typography variant="h3" fontWeight="bold">
            Gestión de Productos
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Administra tu inventario y catálogo de products
          </Typography>
          <Chip
            label={`${products.length} products en inventario`}
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
            <Typography variant="h5" fontWeight="600" color="secondary">
              Lista de Productos
            </Typography>
          </Box>

          <ProductsTable
            products={products}
            onDelete={handleDeleteProduct}
            onEdit={handleEditProduct}
          />
        </Paper>
      </Stack>
      <AddFab onClick={handleAddProduct} />
    </Container>
  );
};
