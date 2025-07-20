import { apiRequest } from "@/services/apiClient";
import { ICompany } from "./interfaces";

export const getCompanies = () => apiRequest("companies", "GET");
export const getCompany = (id: number) => apiRequest(`companies/${id}`);
export const createCompany = (data: ICompany) => apiRequest("companies", "POST", data);
export const updateCompany = (id: number, data: ICompany) => apiRequest(`companies/${id}`, "PUT", data);
export const deleteCompany = (id: number) => apiRequest(`companies/${id}`, "DELETE");
