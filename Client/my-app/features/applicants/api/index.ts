import { axiosInstance } from '../../../../../utils/axios';
import { Applicant, pagination } from '@/utils/schema';

export type ApplicantParams = Partial<Omit<Applicant, "firstName" | "lastName" | "phone" | "email" | "lastCompany" | "googleDriveUrl" | "updatedAt" | "experienceDescription" | "applicationDate" | "id">> & {
    page?: number;
    limit?: number;
    sort?: string;
    keyword?: string;
};


export const fetchApplicants = async (filters: ApplicantParams): Promise<{
    applicants: Applicant[]
    pagination: pagination,
}> => {
    const { data: { data, pagination } } = await axiosInstance.get('/applicants', { params: filters });
    return { applicants: data, pagination };
};

export const fetchApplicantById = async (id: string): Promise<Applicant> => {
    const { data: { data } } = await axiosInstance.get(`/applicants/${id}`);
    return data;
};

export const createApplicant = async (newApplicant: Applicant): Promise<Applicant> => {
    const { data: { data } } = await axiosInstance.post('/applicants', newApplicant);
    return data;
};

export const updateApplicant = async ({ id, ...updates }: { id: string } & Partial<Applicant>): Promise<Applicant> => {
    const { data: { data } } = await axiosInstance.patch(`/applicants/${id}`, updates);
    return data;
};

export const deleteApplicant = async (id: string): Promise<Applicant> => {
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


