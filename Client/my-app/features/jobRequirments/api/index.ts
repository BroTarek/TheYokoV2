import { axiosInstance } from '@/utils/axios';
import { JobRequirement, pagination } from '@/utils/schemas';

export const fetchJobRequirements = async (filters = {}): Promise<{
    data: JobRequirement[],
    pagination: pagination
}> => {
    const { data: { data, pagination } } = await axiosInstance.get('/job-requirements', { params: { populate: true, ...filters } });
    return { data, pagination };
};

export const fetchJobRequirementById = async (id: string): Promise<JobRequirement> => {
    const { data: { data } } = await axiosInstance.get(`/job-requirements/${id}`, { params: { populate: true } });
    return data;
};

export const createJobRequirement = async (newRequirement: Partial<JobRequirement>): Promise<JobRequirement> => {
    const { data: { data } } = await axiosInstance.post('/job-requirements', newRequirement);
    return data;
};

export const updateJobRequirement = async (id: string, updates: Partial<JobRequirement>): Promise<JobRequirement> => {
    const { data: { data } } = await axiosInstance.patch(`/job-requirements/${id}`, updates);
    return data;
};

export const deleteJobRequirement = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/job-requirements/${id}`);
};


