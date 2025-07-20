import {
    Box,
    Chip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon, Inventory as ProductIcon } from "@mui/icons-material";

import { IProduct } from "./interfaces";

interface IProductsTableProps {
    products: IProduct[];
    onDelete: (company: IProduct) => void;
    onEdit: (company: IProduct) => void;
}

export const ProductsTable = ({ products, onDelete, onEdit }: IProductsTableProps) => {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Producto</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Precio</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Stock</TableCell>
                        <TableCell sx={{ fontWeight: "bold", color: "secondary.main" }}>Categoría</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold", color: "secondary.main" }}>
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <ProductIcon color="secondary" sx={{ fontSize: 20 }} />
                                    <Typography variant="body1" fontWeight="500">
                                        {product.name}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body1" fontWeight="600" color="success.main">
                                    €{product.price.toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={`${product.stock} unidades`}
                                    size="small"
                                    variant="outlined"
                                    color={product.stock > 20 ? "success" : product.stock > 5 ? "warning" : "error"}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip label={product.category} size="small" variant="outlined" color="secondary" />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                                    <IconButton size="small" sx={{ color: "secondary.main" }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: "error.main" }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
