/**
 * Generic Interface for Repositories
 * T represents the Entity type (e.g., Applicants, Companies)
 */
export interface IGenericRepository<T> {
  getAll(queryString: any): Promise<{ data: T[]; pagination: any }>;
  getById(id: string): Promise<T | null>;
  create(item: any): Promise<T>;
  update(id: string, item: any): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}
