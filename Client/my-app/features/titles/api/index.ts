import { axiosInstance } from '@/utils/axios';
import { JobTitle, pagination } from "@/utils/schemas"

export const fetchTitles = async (params = {}): Promise<{
    data: JobTitle[],
    pagination: pagination
}> => {
    const { data } = await axiosInstance.get('/titles', { params });
    return data;
};

export const fetchTitleById = async (id: string): Promise<JobTitle> => {
    const { data: { data } } = await axiosInstance.get(`/titles/${id}`);
    return data;
};

export const fetchJobTitlesByFieldId = async (jobFieldId: string): Promise<{ data: JobTitle[], pagination: pagination }> => {
    const { data } = await axiosInstance.get(`/titles?fieldId=${jobFieldId}`);
    return data;
};

export const createTitle = async (newTitle: Partial<JobTitle>): Promise<JobTitle> => {
    const { data: { data } } = await axiosInstance.post('/titles', newTitle);
    return data;
};

export const updateTitle = async (id: string, updates: Partial<JobTitle>): Promise<JobTitle> => {
    const { data: { data } } = await axiosInstance.patch(`/titles/${id}`, updates);
    return data;
};

export const deleteTitle = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/titles/${id}`);
};


