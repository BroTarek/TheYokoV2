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
        // Optimistic update
        onMutate: async (id) => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: applicantKeys.lists() });
            await queryClient.cancelQueries({ queryKey: applicantKeys.detail(id) });

            // Snapshot the previous values
            const previousLists = queryClient.getQueriesData({ queryKey: applicantKeys.lists() });
            const previousDetail = queryClient.getQueryData(applicantKeys.detail(id));

            // Optimistically update lists
            queryClient.setQueriesData({ queryKey: applicantKeys.lists() }, (old: any) => {
                if (!old || !old.applicants) return old;
                
                const exists = old.applicants.some((a: any) => a.id === id);
                if (!exists) return old;

                return {
                    ...old,
                    applicants: old.applicants.filter((a: any) => a.id !== id),
                    pagination: {
                        ...old.pagination,
                        totalCount: Math.max(0, old.pagination.totalCount - 1)
                    }
                };
            });

            // Optimistically update detail
            queryClient.setQueryData(applicantKeys.detail(id), (old: any) => {
                if (!old) return old;
                return { ...old, isArchived: true };
            });

            return { previousLists, previousDetail };
        },
        onError: (err, id, context: any) => {
            // Rollback on error
            if (context?.previousLists) {
                context.previousLists.forEach(([queryKey, oldData]: [any, any]) => {
                    queryClient.setQueryData(queryKey, oldData);
                });
            }
            if (context?.previousDetail) {
                queryClient.setQueryData(applicantKeys.detail(id), context.previousDetail);
            }
        },
        onSettled: (data, error, variables) => {
            // Always refetch after error or success
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
        // Optimistic update
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: applicantKeys.lists() });
            await queryClient.cancelQueries({ queryKey: applicantKeys.detail(id) });

            const previousLists = queryClient.getQueriesData({ queryKey: applicantKeys.lists() });
            const previousDetail = queryClient.getQueryData(applicantKeys.detail(id));

            queryClient.setQueriesData({ queryKey: applicantKeys.lists() }, (old: any) => {
                if (!old || !old.applicants) return old;
                
                const exists = old.applicants.some((a: any) => a.id === id);
                if (!exists) return old;

                return {
                    ...old,
                    applicants: old.applicants.filter((a: any) => a.id !== id),
                    pagination: {
                        ...old.pagination,
                        totalCount: Math.max(0, old.pagination.totalCount - 1)
                    }
                };
            });

            queryClient.setQueryData(applicantKeys.detail(id), (old: any) => {
                if (!old) return old;
                return { ...old, isArchived: false };
            });

            return { previousLists, previousDetail };
        },
        onError: (err, id, context: any) => {
            // Rollback on error
            if (context?.previousLists) {
                context.previousLists.forEach(([queryKey, oldData]: [any, any]) => {
                    queryClient.setQueryData(queryKey, oldData);
                });
            }
            if (context?.previousDetail) {
                queryClient.setQueryData(applicantKeys.detail(id), context.previousDetail);
            }
        },
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries({ queryKey: applicantKeys.detail(variables) });
            queryClient.invalidateQueries({ queryKey: applicantKeys.lists() });
        },
    });
};
