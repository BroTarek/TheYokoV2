import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createTitle,
    deleteTitle,
    fetchJobTitlesByFieldId,
    fetchTitleById,
    fetchTitles,
    updateTitle
} from '../api';
import { titleKeys } from '../keys';
import { JobTitle } from '@/utils/schema';

// 1. Hook for fetching all Titles
export const useTitles = (filters = {}) => {
    return useQuery({
        queryKey: titleKeys.list(filters),
        queryFn: () => fetchTitles(filters),
    });
};

// 2. Hook for fetching a single JobTitle
export const useTitle = (id: string) => {
    return useQuery({
        queryKey: titleKeys.detail(id),
        queryFn: () => fetchTitleById(id),
        enabled: !!id,
    });
};

// 3. Hook for fetching job titles by Field
export const useJobTitles = (fieldId: string) => {
    return useQuery({
        queryKey: titleKeys.detail(`${fieldId}/jobtitles`),
        queryFn: () => fetchJobTitlesByFieldId(fieldId),
        enabled: !!fieldId,
    });
};

// 4. Hook for creating a Title
export const useCreateTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTitle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: titleKeys.lists() });
        },
    });
};

// 5. Hook for updating a Title
export const useUpdateTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, ...updates }: { id: string } & Partial<JobTitle>) => updateTitle(id, updates),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: titleKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: titleKeys.lists() });
        },
    });
};

// 6. Hook for deleting a Title
export const useDeleteTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTitle,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: titleKeys.lists() });
        },
    });
};


