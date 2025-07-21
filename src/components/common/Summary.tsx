import { Box, Chip, Stack, Typography } from "@mui/material";

import { SummaryContainer } from "../styled";
import { ESummaryType } from "./interfaces";

interface ISummaryProps {
    icon?: any;
    summaryType: ESummaryType;
    total: number;
}

const mapSummaryLiterals: Record<ESummaryType, Record<string, string>> = {
    companies: {
        title: "Gestión de Empresas",
        subtitle: "Sistema de administración para alta, baja y modificación de empresas",
        totalLabel: "empresas registradas",
    },
};

const Summary = ({ icon, summaryType, total }: ISummaryProps) => {
    const Icon = icon || null;
    return (
        <SummaryContainer Icon={Icon}>
            <Stack spacing={1}>
                <Typography variant="h4" fontWeight="bold">
                    {mapSummaryLiterals[summaryType]?.title || "Resumen"}
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    {mapSummaryLiterals[summaryType]?.subtitle}
                </Typography>
                <Box>
                    <Chip
                        label={`${total} ${mapSummaryLiterals[summaryType]?.totalLabel || "elementos"}`}
                        sx={{ color: "white", fontWeight: "bold" }}
                    />
                </Box>
            </Stack>
        </SummaryContainer>
    );
};

export default Summary;
