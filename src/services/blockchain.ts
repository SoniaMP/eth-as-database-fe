import { ethers } from "ethers";
import contractABI from "@/config/abi/CompanyRegistry.json";
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

declare let window: any;

export const getProvider = () => {
    if (!window.ethereum) throw new Error("MetaMask no está disponible");
    return new ethers.BrowserProvider(window.ethereum);
};

export const getSigner = async (account?: string) => {
    const provider = getProvider();
    if (!account) return await provider.getSigner();
    return await provider.getSigner(account);
};

export const getContract = async (account?: string) => {
    if (!CONTRACT_ADDRESS) throw new Error("CONTRACT_ADDRESS no está definido en el entorno");

    const signer = await getSigner(account);
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
};
