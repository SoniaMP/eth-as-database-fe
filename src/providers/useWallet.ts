import { useEffect, useState } from "react";

export const useWallet = () => {
    const { ethereum } = window as any;
    const [account, setAccount] = useState<string>("");
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const isMetaMaskInstalled = () => {
        return typeof window !== "undefined" && ethereum && ethereum.isMetaMask;
    };

    useEffect(() => {
        const checkConnection = async () => {
            if (isMetaMaskInstalled()) {
                try {
                    const accounts = await ethereum.request({ method: "eth_accounts" });
                    if (accounts.length > 0) {
                        setAccount(accounts[0]);
                        setIsConnected(true);
                    }
                } catch (error) {
                    console.error("Error checking connection:", error);
                }
            }
        };

        checkConnection();

        if (isMetaMaskInstalled()) {
            ethereum.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setIsConnected(true);
                } else {
                    setAccount("");
                    setIsConnected(false);
                }
                setError("");
            });

            ethereum.on("chainChanged", () => window.location.reload());
        }

        return () => {
            if (isMetaMaskInstalled()) {
                ethereum.removeAllListeners("accountsChanged");
                ethereum.removeAllListeners("chainChanged");
            }
        };
    }, []);

    const connectWallet = async () => {
        if (!isMetaMaskInstalled()) {
            setError("MetaMask no está instalado");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts.length > 0) {
                setAccount(accounts[0]);
                setIsConnected(true);
            }
        } catch (error: any) {
            if (error.code === 4001) {
                setError("Conexión rechazada por el usuario");
            } else {
                setError("Error al conectar con MetaMask");
            }
            console.error("Error connecting wallet:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isMetaMaskInstalled, account, isConnected, isLoading, error, connectWallet };
};
