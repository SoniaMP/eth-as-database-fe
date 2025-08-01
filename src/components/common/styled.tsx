import { Button, ButtonProps, Chip, styled } from "@mui/material";

export const WalletButtonStyled = styled((props: ButtonProps) => <Button variant="outlined" {...props} />)(
    ({ theme }) => ({
        borderRadius: theme.spacing(0.5),
        textTransform: "none",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        border: `1px solid ${theme.palette.common.white}`,
        color: theme.palette.common.white,
    }),
);

export const AddressChipStyled = styled(Chip)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    fontFamily: "monospace",
    fontSize: "0.75rem",
}));
