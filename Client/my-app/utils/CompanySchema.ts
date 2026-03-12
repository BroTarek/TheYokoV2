import { CompanySchema as BaseCompanySchema, Company as BaseCompany } from "./schemas";

export const CompanySchema = BaseCompanySchema;
export type Company = BaseCompany;
export { BaseCompanySchema as ProductSchema }; // For backwards compatibility if needed
export type { BaseCompany as Product };

