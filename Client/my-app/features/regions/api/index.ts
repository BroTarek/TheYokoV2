import { axiosInstance } from '@/utils/axios';
import { Region } from '@/utils/schemas'; // There is pagination? I'll let standard array return if not.
import { pagination } from '@/utils/schemas'; // If it uses schema.ts still from elsewhere, wait, I can just use generic standard.

export const fetchRegions = async (params = {}): Promise<{
    data: Region[],
    pagination: pagination
}> => {
    const { data } = await axiosInstance.get('/regions', { params });
    return data;
};

export const fetchRegionById = async (id: string): Promise<Region> => {
    const { data: { data } } = await axiosInstance.get(`/regions/${id}`);
    return data;
};

export const createRegion = async (newRegion: Partial<Region>): Promise<Region> => {
    const { data: { data } } = await axiosInstance.post('/regions', newRegion);
    return data;
};

export const updateRegion = async (id: string, updates: Partial<Region>): Promise<Region> => {
    const { data: { data } } = await axiosInstance.patch(`/regions/${id}`, updates);
    return data;
};

export const deleteRegion = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/regions/${id}`);
};
