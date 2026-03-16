import { get, post, patch, del, put } from './request';
import { z } from 'zod';
import { Company, CompanySchema, PaginationSchema } from '@/utils/schemas';

const CompaniesResponseSchema = z.object({
    data: z.array(CompanySchema),
    pagination: PaginationSchema
});

const CompanyDetailResponseSchema = z.object({
    data: CompanySchema
});

// If the backend returns more details for a specific company, we can extend this
// But looking at CompanyRepository, getById returns { data: companyObject }

export const fetchCompanies = async (filters = {}) => {
    const response = await get<z.infer<typeof CompaniesResponseSchema>>('/companies', CompaniesResponseSchema, filters);
    console.log(response)
    return { companies: response.data, pagination: response.pagination };
};

export const fetchCompanyById = async (id: string) => {
    return await get<z.infer<typeof CompanyDetailResponseSchema>>(`/companies/${id}`, CompanyDetailResponseSchema);
};

export const createCompany = async (newCompany: Partial<Company>) => {
    return await post<z.infer<typeof CompanyDetailResponseSchema>>('/companies', newCompany, CompanyDetailResponseSchema);
};

export const updateCompany = async (id: string, updates: Partial<Company>) => {
    return await put<z.infer<typeof CompanyDetailResponseSchema>>(`/companies/${id}`, updates, CompanyDetailResponseSchema);
};

export const archiveCompany = async (id: string) => {
    // Backend CompanyRepository doesn't have archive/unarchive, it's just a regular update usually
    // or maybe it's not implemented yet. I'll stick to what the backend has.
    // If the backend doesn't have it, we just update the specific field.
    return await patch<any>(`/companies/${id}`, { isArchived: true });
};

export const unarchiveCompany = async (id: string) => {
    return await patch<any>(`/companies/${id}`, { isArchived: false });
};

export const deleteCompany = async (id: string) => {
    return await del<void>(`/companies/${id}`);
};


