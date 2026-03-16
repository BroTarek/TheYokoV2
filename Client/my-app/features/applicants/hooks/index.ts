import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchApplicants,
    fetchApplicantById,
    createApplicant,
    updateApplicant,
    deleteApplicant,
    archiveApplicant,
    unarchiveApplicant,
    ApplicantParams
} from '../api';
import { applicantKeys } from '../keys';


// import { Applicant } from '../../../utils/schemass';

// 1. Hook for fetching all Applicants
export const useApplicants = (filters: ApplicantParams) => {
    return useQuery({
        queryKey: applicantKeys.list(filters),
        queryFn: () => fetchApplicants(filters),
    });
};

// 2. Hook for fetching a single Applicant
export const useApplicant = (id: string) => {
    return useQuery({
        queryKey: applicantKeys.detail(id),
        queryFn: () => fetchApplicantById(id),
        enabled: !!id,
    });
};

// 3. Hook for creating a Applicant
export const useCreateApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createApplicant,
        onSuccess: () => {
            // Invalidate both the list and any generic Applicant queries
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};

// 4. Hook for updating a Applicant
export const useUpdateApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateApplicant,
        onSuccess: (data, variables) => {
            // Invalidate specific Applicant detail and the lists
            queryClient.invalidateQueries({ queryKey: applicantKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};

// 5. Hook for deleting a Applicant
export const useDeleteApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteApplicant,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};

// 6. Hook for archiving a Applicant
export const useArchiveApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: archiveApplicant,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};

// 7. Hook for unarchiving a Applicant
export const useUnarchiveApplicant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unarchiveApplicant,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};
