import { axiosInstance } from '@/utils/axios';
import { JobField, pagination } from "@/utils/schemas"

export const fetchFields = async (params = {}): Promise<{
    data: JobField[],
    pagination: pagination
}> => {
    const { data } = await axiosInstance.get('/fields', { params });
    return data;
};

export const fetchFieldById = async (id: string): Promise<JobField> => {
    const { data: { data } } = await axiosInstance.get(`/fields/${id}`);
    return data;
};

export const createField = async (newField: Partial<JobField>): Promise<JobField> => {
    const { data: { data } } = await axiosInstance.post('/fields', newField);
    return data;
};

export const updateField = async (id: string, updates: Partial<JobField>): Promise<JobField> => {
    const { data: { data } } = await axiosInstance.patch(`/fields/${id}`, updates);
    return data;
};

export const deleteField = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/fields/${id}`);
};

export const fetchJobTitlesByField = async (fieldId: string) => {
    const { data: { data } } = await axiosInstance.get(`/titles?fieldId=${fieldId}`);
    return data;
};


