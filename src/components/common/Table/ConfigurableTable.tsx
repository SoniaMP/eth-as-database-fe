import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { cellRenders } from "./cellRenders";

const ConfigurableTable = ({ columns, data, onEdit, onDelete }: any) => {
    return (
        <TableContainer component={Paper}>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        {columns.map((col: any) => (
                            <TableCell
                                key={col.id}
                                align={col.align || "left"}
                                sx={{
                                    fontWeight: "bold",
                                    color: "primary.main",
                                }}
                            >
                                {col.label}
                            </TableCell>
                        ))}
                        <TableCell align="center" sx={{ width: 100, fontWeight: "bold", color: "primary.main" }}>
                            Acciones
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any, index: number) => (
                        <TableRow key={index}>
                            {columns.map((col: any) => {
                                const value = row[col.id];
                                if (col.customRender && cellRenders[col.customRender]) {
                                    return (
                                        <TableCell key={col.id} align={col.align || "left"}>
                                            {cellRenders[col.customRender](value)}
                                        </TableCell>
                                    );
                                }
                                return (
                                    <TableCell key={col.id} align={col.align || "left"}>
                                        {value}
                                    </TableCell>
                                );
                            })}
                            <TableCell align="center">
                                <Box
                                    sx={{
                                        display: "flex",
                                        gap: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: "primary.main" }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => onDelete(row)} sx={{ color: "error.main" }}>
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

export default ConfigurableTable;
