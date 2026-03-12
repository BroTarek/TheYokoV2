import { SQL, and, eq, ilike, or, desc, asc, sql, count } from 'drizzle-orm';
import { db } from '../db';

export class ApiFeatures {
  public query: any;
  private table: any;
  private queryString: any;
  public paginationResult: any = {};

  constructor(query: any, table: any, queryString: any) {
    this.query = query;
    this.table = table;
    this.queryString = queryString;
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludesFields.forEach((field) => delete queryStringObj[field]);

    const filters: SQL[] = [];
    Object.keys(queryStringObj).forEach((key) => {
      if (this.table[key]) {
        filters.push(eq(this.table[key], queryStringObj[key]));
      }
    });

    if (filters.length > 0) {
      this.query = this.query.where(and(...filters));
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').map((s: string) => {
        const order = s.startsWith('-') ? desc : asc;
        const field = s.replace('-', '');
        return this.table[field] ? order(this.table[field]) : null;
      }).filter(Boolean);

      if (sortBy.length > 0) {
        this.query = this.query.orderBy(...sortBy);
      }
    } else if (this.table.createdAt) {
      this.query = this.query.orderBy(desc(this.table.createdAt));
    }
    return this;
  }

  search(searchFields: string[]) {
    if (this.queryString.keyword) {
      const searches = searchFields.map(field =>
        this.table[field] ? ilike(this.table[field], `%${this.queryString.keyword}%`) : null
      ).filter(Boolean);

      if (searches.length > 0) {
        this.query = this.query.where(or(...searches as SQL[]));
      }
    }
    return this;
  }

  limitFields() {
    // In Drizzle, fields are usually selected at the start. 
    // Implementing this would require more complex query manipulation.
    // For simplicity, we return the full objects.
    return this;
  }

  paginate(totalCount: number) {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.limit(limit).offset(skip);

    this.paginationResult = {
      currentPage: page,
      limit: limit,
      numberOfPages: Math.ceil(totalCount / limit),
      totalCount
    };

    return this;
  }
}