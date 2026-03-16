import { axiosInstance } from "@/utils/axios";
import {  JobField } from "@/utils/schemas";
import { ZodSchema } from "zod";


// Generic GET with Zod validation
export const get = async <T>(
    url: string,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.get(url, {
        zodSchema: schema
    });

    return res.data as T;
};

// Generic POST
export const post = async <T>(
    url: string,
    body: JobField,
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
    body: Partial<JobField>,
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
    body: Partial<JobField>,
    schema?: ZodSchema<T>
): Promise<T> => {
    const res = await axiosInstance.patch(url, body, {
        zodSchema: schema,
    });

    return res.data.data as T;
};
