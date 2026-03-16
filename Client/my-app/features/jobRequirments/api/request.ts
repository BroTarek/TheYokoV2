import { axiosInstance } from "@/utils/axios";
import { Company, Applicant } from "@/utils/schemas";
import { ZodSchema } from "zod";

export type ApplicantParams = Omit<Applicant, "firstName"|"lastName" |"phone"| "email"|"lastCompany"|"googleDriveUrl"|"updatedAt"|"experienceDescription"
|"applicationDate"|"id"
>
// Generic GET with Zod validation
export const get = async <T>(
    url: string,
    schema?: ZodSchema<T>,
    params?: ApplicantParams
): Promise<T> => {
    const res = await axiosInstance.get(url, {
        zodSchema: schema,
        params,
    });

    return res.data as T;
};

// Generic POST
export const post = async <T>(
    url: string,
    body: Applicant,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.post(url, body, {
        zodSchema: schema,
    });

    return res.data as T;
};

// Generic DELETE
export const del = async <T>(
    url: string,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.delete(url, {
        zodSchema: schema,
    });

    return res.data as T;
};

// Generic PUT
export const put = async <T>(
    url: string,
    body: Partial<Applicant>,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.put(url, body, {
        zodSchema: schema,
    });

    return res.data as T;
};

// Generic PATCH
export const patch = async <T>(
    url: string,
    body: Partial<Applicant>,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.patch(url, body, {
        zodSchema: schema,
    });

    return res.data.data as T;
};
