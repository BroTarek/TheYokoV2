import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchFields,
    fetchFieldById,
    createField,
    updateField,
    deleteField,
    fetchJobTitlesByField
} from '../api';
import { fieldKeys } from '../keys';

// 1. Hook for fetching all Topics (Fields)
export const useFields = (filters = {}) => {
    return useQuery({
        queryKey: fieldKeys.list(filters),
        queryFn: () => fetchFields(filters),
    });
};

// 2. Hook for fetching a single Topic (returns companies/details)
export const useField = (id: string) => {
    return useQuery({
        queryKey: fieldKeys.detail(id),
        queryFn: () => fetchFieldById(id),
        enabled: !!id,
    });
};

// 3. Hook for fetching job titles by Topic
export const useJobTitles = (fieldId: string) => {
    return useQuery({
        queryKey: fieldKeys.detail(`${fieldId}/jobtitles`),
        queryFn: () => fetchJobTitlesByField(fieldId),
        enabled: !!fieldId,
    });
};

// 4. Hook for creating a Field
export const useCreateField = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createField,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fieldKeys.lists() });
        },
    });
};

// 5. Hook for updating a Field
export const useUpdateField = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...updates }: { id: string } & Partial<any>) => updateField(id, updates),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: fieldKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: fieldKeys.lists() });
        },
    });
};


// 6. Hook for deleting a Field
export const useDeleteField = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteField,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: fieldKeys.lists() });
        },
    });
};

