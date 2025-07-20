import { Box, Typography } from "@mui/material";

import { ESummaryType } from "./interfaces";

interface IEmptyDataProps {
    icon?: any;
    summaryType: ESummaryType;
}

const mapSummaryLiterals: Record<ESummaryType, Record<string, string>> = {
    companies: {
        title: "No hay empresas registradas",
        subtitle: "Haz clic en el botón + para agregar tu primera empresa",
    },
};

const EmptyData = ({ icon, summaryType }: IEmptyDataProps) => {
    const Icon = icon;
    return (
        <Box sx={{ p: 6, textAlign: "center" }}>
            {Icon && <Icon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />}
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {mapSummaryLiterals[summaryType]?.title || "No hay datos disponibles"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {mapSummaryLiterals[summaryType]?.subtitle || "No hay información para mostrar"}
            </Typography>
        </Box>
    );
};

export default EmptyData;
