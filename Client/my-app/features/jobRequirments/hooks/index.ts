import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchJobRequirements,
    fetchJobRequirementById,
    createJobRequirement,
    updateJobRequirement,
    deleteJobRequirement
} from '../api';
import { jobRequirementKeys } from '../keys';
import { JobRequirement } from '@/utils/schemas';

// 1. Hook for fetching all Job Requirements
export const useJobRequirements = (filters = {}) => {
    return useQuery({
        queryKey: jobRequirementKeys.list(filters),
        queryFn: () => fetchJobRequirements(filters),
    });
};

// 2. Hook for fetching a single Job Requirement
export const useJobRequirement = (id: string) => {
    return useQuery({
        queryKey: jobRequirementKeys.detail(id),
        queryFn: () => fetchJobRequirementById(id),
        enabled: !!id,
    });
};

// 3. Hook for creating a Job Requirement
export const useCreateJobRequirement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createJobRequirement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobRequirementKeys.lists() });
        },
    });
};

// 4. Hook for updating a Job Requirement
export const useUpdateJobRequirement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, updates }: { id: string; updates: Partial<JobRequirement> }) => updateJobRequirement(id, updates),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: jobRequirementKeys.detail(variables.id) });
            queryClient.invalidateQueries({ queryKey: jobRequirementKeys.lists() });
        },
    });
};

// 5. Hook for deleting a Job Requirement
export const useDeleteJobRequirement = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteJobRequirement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: jobRequirementKeys.lists() });
        },
    });
};


