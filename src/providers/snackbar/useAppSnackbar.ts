import { useSnackbar } from "notistack";

export function useAppSnackbar() {
    const { enqueueSnackbar } = useSnackbar();

    const showSuccess = (message: string) => enqueueSnackbar(message, { variant: "success" });
    const showError = (message: string) => enqueueSnackbar(message, { variant: "error" });
    const showInfo = (message: string) => enqueueSnackbar(message, { variant: "info" });
    const showWarning = (message: string) => enqueueSnackbar(message, { variant: "warning" });

    return { showSuccess, showError, showInfo, showWarning };
}
