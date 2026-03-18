import axios from 'axios';
import { ZodSchema } from 'zod';

// Module augmentation to add zodSchema to Axios config types
declare module 'axios' {
  export interface AxiosRequestConfig {
    zodSchema?: ZodSchema<any>;
  }
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInstance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("userToken");
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     const schema = response.config.zodSchema;

//     if (schema) {
//       const parsed = schema.safeParse(response.data);

//       if (!parsed.success) {
//         console.error("❌ Zod Validation Failed:", parsed.error);
//         throw parsed.error;
//       }

//       // Replace data with validated version
//       response.data = parsed.data;
//     }

//     return response;
//   },
//   (error) => Promise.reject(error)
// );
