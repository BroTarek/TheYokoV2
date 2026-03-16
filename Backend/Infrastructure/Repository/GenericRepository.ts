// @ts-nocheck
import { db } from '../../db';
import { IGenericRepository } from '../../Domain/Interfaces/RepositoryInterfaces/IGenericRepository';
import { ApiFeatures } from "../../Utils/API_Features";
import { count, eq } from "drizzle-orm";

export class GenericRepository<T extends any> implements IGenericRepository<T> {
  protected table: any;

  constructor(table: any) {
    this.table = table;
  }

  async getAll(queryString: any): Promise<{ data: T[]; pagination: any }> {
    const [totalCountResult] = await db.select({ total: count() }).from(this.table);
    const totalCount = Number(totalCountResult?.total || 0);

    const baseQuery = db.select().from(this.table).$dynamic();

    // We'll search across some basic fields if we find them
    const searchFields = [];
    if (this.table.name) searchFields.push('name');
    if (this.table.firstName) searchFields.push('firstName');
    if (this.table.lastName) searchFields.push('lastName');
    if (this.table.email) searchFields.push('email');

    const apiFeatures = new ApiFeatures(baseQuery, this.table, queryString)
      .filter()
      .search(searchFields)
      .sort()
      .paginate(totalCount);

    const data = await apiFeatures.query;
    return { data, pagination: apiFeatures.paginationResult };
  }

  async getById(id: string): Promise<T | null> {
    const results = await db.select().from(this.table).where(eq(this.table.id, id));
    return (results[0] as T) || null;
  }

  async create(item: any): Promise<T> {
    const results = await db.insert(this.table).values(item).returning();
    return results[0] as T;
  }

  async update(id: string, item: any): Promise<T | null> {
    const updatePayload = { ...item };
    if (this.table.updatedAt) {
      updatePayload.updatedAt = new Date();
    }

    const results = await db.update(this.table)
      .set(updatePayload)
      .where(eq(this.table.id, id))
      .returning();
    return (results[0] as T) || null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(this.table).where(eq(this.table.id, id)).returning();
    return Array.isArray(result) && result.length > 0;
  }
}
