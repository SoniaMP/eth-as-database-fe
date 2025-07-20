import { Box, BoxProps, styled, Theme, Typography, TypographyProps } from "@mui/material";

export const SummaryContainer = styled(({ Icon, children, ...props }: BoxProps & { Icon?: React.ElementType }) => (
    <Box {...props}>
        {Icon && (
            <Box
                sx={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    opacity: 0.1,
                    transform: "rotate(15deg)",
                }}
            >
                <Icon sx={{ fontSize: 120 }} />
            </Box>
        )}
        {children}
    </Box>
))(({ theme }) => ({
    position: "relative",
    background: theme.palette.primary.main,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(4),
    color: "white",
}));

export const SummaryTitle = styled((props: TypographyProps) => (
    <Box
        sx={{
            p: 2,
            borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
        }}
    >
        <Typography variant="h5" {...props} />
    </Box>
))(({ theme }) => ({
    fontWeight: "bold",
    color: theme.palette.primary.main,
}));
