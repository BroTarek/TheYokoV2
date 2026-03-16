import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchCompanies,
    fetchCompanyById,
    createCompany,
    updateCompany,
    archiveCompany,
    unarchiveCompany,
    deleteCompany
} from '../api';
import { companyKeys } from '../keys';
import { Company } from '@/utils/schemas';

// 1. Hook for fetching all companies
export const useCompanies = (filters: any = {}) => {
    return useQuery({
        queryKey: companyKeys.list(filters),
        queryFn: () => fetchCompanies(filters),
    });
};

// 2. Hook for fetching a single company
export const useCompany = (id: string) => {
    return useQuery({
        queryKey: companyKeys.detail(id),
        queryFn: () => fetchCompanyById(id),
        enabled: !!id,
    });
};

// 3. Hook for creating a company
export const useCreateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
        },
    });
};

// 4. Hook for updating a company
export const useUpdateCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<Company> }) => updateCompany(id, updates),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
        },
    });
};

// 5. Hook for archiving a company
export const useArchiveCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: archiveCompany,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
        },
    });
};

// 6. Hook for unarchiving a company
export const useUnarchiveCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unarchiveCompany,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
        },
    });
};

// 7. Hook for deleting a company
export const useDeleteCompany = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: companyKeys.lists() });
        },
    });
};


