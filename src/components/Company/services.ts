import { apiRequest } from "@/services/apiClient";
import { getContract } from "@/services/blockchain";

import { ICompany } from "./interfaces";

// Companies API service functions
export const getCompany = (id: number) => apiRequest(`companies/${id}`);
export const updateCompany = (id: number, data: ICompany) => apiRequest(`companies/${id}`, "PUT", data);
export const deleteCompany = (id: number) => apiRequest(`companies/${id}`, "DELETE");

export const getCompanies = async (account: string) => {
    const contract = await getContract(account);
    const userCompanies = await contract.getCompanies();

    if (userCompanies.length === 0) {
        return [];
    }

    const companies: ICompany[] = await apiRequest(`companies?vatNumbers=${userCompanies.join(",")}`, "GET");

    return companies;
};

export const createCompany = async (data: ICompany) => {
    const contract = await getContract();
    const tx = await contract.registerCompany(data.vatNumber);
    const receipt = await tx.wait();

    if (receipt.status !== 1) {
        throw new Error("Error en la transacción");
    }

    const newCompany: ICompany = {
        ...data,
        dateCreated: new Date().toISOString(),
    };
    await apiRequest("companies", "POST", newCompany);

    return newCompany;
};

// Products API service functions
export const getProducts = () => apiRequest("products", "GET");
export const getProduct = (id: number) => apiRequest(`products/${id}`);
export const createProduct = (data: any) => apiRequest("products", "POST", data);
export const updateProduct = (id: number, data: any) => apiRequest(`products/${id}`, "PUT", data);
export const deleteProduct = (id: number) => apiRequest(`products/${id}`, "DELETE");
