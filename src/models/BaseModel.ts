import db from "../database/db";
import { Knex } from "knex";

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResult<T> {
    data: T[];
    meta: PaginationMeta;
}

export abstract class BaseModel<T> {
    constructor(public tableName: string) { }

    protected get db(): Knex.QueryBuilder {
        return db(this.tableName);
    }

    async create(data: Partial<T>): Promise<T> {
        const [id] = await this.db.insert(data);
        return this.findById(id);
    }

    async findById(id: number): Promise<T> {
        return this.db.where({ id }).first();
    }

    async findOne(filter: Partial<T>): Promise<T | undefined> {
        return this.db.where(filter).first();
    }

    async update(id: number, data: Partial<T>): Promise<T> {
        // Automatically update 'updated_at' if it exists in the schema, 
        // but here we manually handle it or let the service/model implementation handle it.
        // For generic usage, we'll merge the data.
        await this.db.where({ id }).update(data);
        return this.findById(id);
    }

    async delete(id: number): Promise<number> {
        return this.db.where({ id }).delete();
    }

    async paginate(
        query: Knex.QueryBuilder,
        page: number = 1,
        limit: number = 10
    ): Promise<PaginatedResult<T>> {
        const offset = (page - 1) * limit;

        // Clone for count to avoid modifying the original query
        const countQuery = query.clone().clearSelect().clearOrder().count({ count: "*" });
        const [countResult] = await countQuery;
        const total = Number(countResult?.count || 0);

        const data = await query.offset(offset).limit(limit);

        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    // Expose raw query builder for custom complex queries
    get queryBuilder(): Knex.QueryBuilder {
        return this.db;
    }
}
