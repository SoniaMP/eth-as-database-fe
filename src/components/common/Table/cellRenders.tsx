import { Box, Typography } from "@mui/material";
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
};
