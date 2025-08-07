import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import { AccountBalanceWallet, Link as LinkIcon, Warning } from "@mui/icons-material";

import { useWallet } from "@/providers/useWallet";
import { formatAddress } from "./utils";
import { AddressChipStyled, WalletButtonStyled } from "./styled";

const getTooltipContent = (isConnected: boolean, account: string) => {
    const { isMetaMaskInstalled } = useWallet();
    if (!isMetaMaskInstalled()) {
        return "MetaMask no está instalado";
    }
    if (isConnected && account) {
        return (
            <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    Cuenta conectada:
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
                    {account}
                </Typography>
            </Box>
        );
    }
    return "Conectar con MetaMask";
};

const getStartIcon = (isConnected: boolean, isLoading: boolean) => {
    if (isLoading) {
        return <CircularProgress size={20} color="inherit" />;
    }
    return isConnected ? <LinkIcon /> : <AccountBalanceWallet />;
};

export const WalletButton = () => {
    const { isMetaMaskInstalled, account, isConnected, isLoading, connectWallet } = useWallet();

    if (!isMetaMaskInstalled()) {
        return (
            <Tooltip title="MetaMask no está instalado. Instálalo para continuar.">
                <WalletButtonStyled
                    startIcon={<Warning sx={{ color: "white" }} />}
                    onClick={() => window.open("https://metamask.io/download/", "_blank")}
                >
                    Instalar MetaMask
                </WalletButtonStyled>
            </Tooltip>
        );
    }

    return (
        <Tooltip title={getTooltipContent(isConnected, account)} arrow placement="top">
            <WalletButtonStyled
                startIcon={getStartIcon(isConnected, isLoading)}
                onClick={isConnected ? undefined : connectWallet}
                disabled={isLoading}
            >
                {isLoading ? (
                    "Conectando..."
                ) : isConnected ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle2">Conectado</Typography>
                        <AddressChipStyled label={formatAddress(account)} size="small" />
                    </Box>
                ) : (
                    "Conectar Wallet"
                )}
            </WalletButtonStyled>
        </Tooltip>
    );
};
