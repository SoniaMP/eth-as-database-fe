import type React from "react";
import { useState } from "react";
import { Typography, Box, useTheme, AppBar, Toolbar, Tabs, Tab } from "@mui/material";
import {
    Business as BusinessIcon,
    Inventory as ProductIcon,
    People as ClientIcon,
    Receipt as InvoiceIcon,
} from "@mui/icons-material";

import { Company } from "./components/Company";
import FacturasTab from "./components/FacturasTab";
import { Products } from "./components/Products";
import ClientesTab from "./components/ClientesTab";

const TabContent = ({ tabIndex }: { tabIndex: number }) => {
    switch (tabIndex) {
        case 0:
            return <Company />;
        case 1:
            return <Products />;
        case 2:
            return <ClientesTab />;
        case 3:
            return <FacturasTab />;
        default:
            return <Company />;
    }
};

const App = () => {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
            <AppBar position="static" elevation={0} sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
                <Toolbar>
                    <BusinessIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Sistema de Gestión Empresarial
                    </Typography>
                </Toolbar>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    sx={{
                        background: theme.palette.common.white,
                        "& .MuiTab-root": { fontWeight: 600 },
                    }}
                >
                    <Tab icon={<BusinessIcon />} label="Empresas" />
                    <Tab icon={<ProductIcon />} label="Productos" />
                    <Tab icon={<ClientIcon />} label="Clientes" />
                    <Tab icon={<InvoiceIcon />} label="Facturas" />
                </Tabs>
            </AppBar>
            <TabContent tabIndex={currentTab} />
        </Box>
    );
};

export default App;
