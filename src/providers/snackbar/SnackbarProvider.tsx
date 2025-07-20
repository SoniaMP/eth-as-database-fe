import React from "react";
import { SnackbarProvider } from "notistack";

const SnackbarProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            autoHideDuration={3000}
            preventDuplicate
        >
            {children}
        </SnackbarProvider>
    );
};

export default SnackbarProviderWrapper;
