import { Box, Chip, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

type CellRenderFn = (value: string) => React.ReactNode;

export const cellRenders: Record<string, CellRenderFn> = {
    name: (value) => {
        return (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BusinessIcon color="primary" sx={{ fontSize: 20 }} />
                <Typography variant="body1" fontWeight="500">
                    {value}
                </Typography>
            </Box>
        );
    },
    vatNumber: (value) => {
        return <Chip label={value} size="small" variant="outlined" color="primary" />;
    },
    date: (value) => {
        return (
            <Typography variant="body2" color="text.secondary">
                {new Date(value).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })}
            </Typography>
        );
    },
};
