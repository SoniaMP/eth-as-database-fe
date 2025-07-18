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
import BusinessIcon from "@mui/icons-material/Business";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ICompany } from "./interfaces";

interface ICompanyTableProps {
  data: ICompany[];
  onDelete: (company: ICompany) => void;
  onEdit: (company: ICompany) => void;
}

export const CompanyTable = ({
  data,
  onDelete,
  onEdit,
}: ICompanyTableProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={
              {
                // backgroundColor: alpha(theme.palette.primary.main, 0.05),
              }
            }
          >
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Nombre
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Dirección
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              CIF
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "primary.main" }}>
              Fecha de Creación
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              sx={{
                "&:hover": {
                  // backgroundColor: alpha(theme.palette.primary.main, 0.02),
                },
                // backgroundColor:
                //   index % 2 === 0
                //     ? "transparent"
                //     : alpha(theme.palette.grey[100], 0.3),
              }}
            >
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <BusinessIcon color="primary" sx={{ fontSize: 20 }} />
                  <Typography variant="body1" fontWeight="500">
                    {item.nombre}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {item.direccion}
                </Typography>
              </TableCell>
              <TableCell>
                <Chip
                  label={item.cif}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {item.fechaCreacion}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() => onEdit(item)}
                    sx={{
                      color: "primary.main",
                      "&:hover": {
                        // backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      },
                    }}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete(item)}
                    sx={{
                      color: "error.main",
                      "&:hover": {
                        // backgroundColor: alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  >
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
