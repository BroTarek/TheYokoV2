import { axiosInstance } from '@/utils/axios';
import { ReferralSource } from '@/utils/schemas';
import { pagination } from '@/utils/schemas';

export const fetchReferralSources = async (params = {}): Promise<{
    data: ReferralSource[],
    pagination: pagination
}> => {
    const { data } = await axiosInstance.get('/referral-sources', { params });
    return data;
};

export const fetchReferralSourceById = async (id: string): Promise<ReferralSource> => {
    const { data: { data } } = await axiosInstance.get(`/referral-sources/${id}`);
    return data;
};

export const createReferralSource = async (newReferralSource: Partial<ReferralSource>): Promise<ReferralSource> => {
    const { data: { data } } = await axiosInstance.post('/referral-sources', newReferralSource);
    return data;
};

export const updateReferralSource = async (id: string, updates: Partial<ReferralSource>): Promise<ReferralSource> => {
    const { data: { data } } = await axiosInstance.patch(`/referral-sources/${id}`, updates);
    return data;
};

export const deleteReferralSource = async (id: string): Promise<void> => {
    await axiosInstance.delete(`/referral-sources/${id}`);
};
