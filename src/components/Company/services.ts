import { apiRequest } from "@/services/apiClient";
import { ICompany } from "./interfaces";

// Companies API service functions
export const getCompanies = () => apiRequest("companies", "GET");
export const getCompany = (id: number) => apiRequest(`companies/${id}`);
export const createCompany = (data: ICompany) => apiRequest("companies", "POST", data);
export const updateCompany = (id: number, data: ICompany) => apiRequest(`companies/${id}`, "PUT", data);
export const deleteCompany = (id: number) => apiRequest(`companies/${id}`, "DELETE");

// Products API service functions
export const getProducts = () => apiRequest("products", "GET");
export const getProduct = (id: number) => apiRequest(`products/${id}`);
export const createProduct = (data: any) => apiRequest("products", "POST", data);
export const updateProduct = (id: number, data: any) => apiRequest(`products/${id}`, "PUT", data);
export const deleteProduct = (id: number) => apiRequest(`products/${id}`, "DELETE");
