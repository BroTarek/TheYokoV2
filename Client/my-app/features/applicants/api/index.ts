import { axiosInstance } from '@/utils/axios';
import { Applicant, pagination } from '@/utils/schemas';

export type ApplicantParams = Partial<Omit<Applicant, "firstName" | "lastName" | "phone" | "email" | "lastCompany" | "googleDriveUrl" | "updatedAt" | "experienceDescription" | "applicationDate" | "id">> & {
    page?: number;
    limit?: number;
    sort?: string;
    keyword?: string;
    populate?: boolean;
};


export const fetchApplicants = async (filters: ApplicantParams): Promise<{
    applicants: any[]
    pagination: pagination,
}> => {
    const { data: { data, pagination } } = await axiosInstance.get('/applicants', { params: { populate: true, ...filters } });
    return { applicants: data, pagination };
};

export const fetchApplicantById = async (id: string): Promise<any> => {
    const { data: { data } } = await axiosInstance.get(`/applicants/${id}`, { params: { populate: true } });
    return data;
};

export const createApplicant = async (newApplicant: any): Promise<any> => {
    const { data: { data } } = await axiosInstance.post('/applicants?populate=true', newApplicant);
    return data;
};

export const updateApplicant = async ({ id, ...updates }: { id: string } & Partial<any>): Promise<any> => {
    const { data: { data } } = await axiosInstance.patch(`/applicants/${id}?populate=true`, updates);
    return data;
};

export const deleteApplicant = async (id: string): Promise<any> => {
    const { data } = await axiosInstance.delete(`/applicants/${id}`);
    return data;
};

export const archiveApplicant = async (id: string): Promise<Applicant> => {
    // Backend likely uses patch for archiving
    const { data: { data } } = await axiosInstance.patch(`/applicants/${id}`, { isArchived: true }); // or whichever status/flag
    return data;
};

export const unarchiveApplicant = async (id: string): Promise<Applicant> => {
    const { data: { data } } = await axiosInstance.patch(`/applicants/${id}`, { isArchived: false });
    return data;
};


