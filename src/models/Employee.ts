import { BaseModel } from "./BaseModel";
import db from "../database/db";

export interface CreateEmployeeDTO {
    name: string;
    age: number;
    designation: string;
    hiring_date: string;
    date_of_birth: string;
    salary: number;
    photo_path?: string;
}

export interface UpdateEmployeeDTO extends Partial<CreateEmployeeDTO> { }

export interface EmployeeFilter {
    search?: string;
    page?: number;
    limit?: number;
}

export class EmployeeModel extends BaseModel<CreateEmployeeDTO & { id: number, deleted_at?: string }> {
    constructor() {
        super("employees");
    }

    async findAll(filter: EmployeeFilter) {
        const { search, page = 1, limit = 10 } = filter;
        let query = this.db.whereNull("deleted_at");

        if (search) {
            query = query.where("name", "like", `%${search}%`);
        }

        return this.paginate(query, page, limit);
    }

    async findByIdActive(id: number) {
        return this.db.where({ id }).whereNull("deleted_at").first();
    }

    async updateWithTimestamp(id: number, data: UpdateEmployeeDTO) {
        return this.update(id, { ...data, updated_at: db.fn.now() } as any);
    }

    async softDelete(id: number) {
        return this.db.where({ id }).update({ deleted_at: db.fn.now() });
    }
}

export const employeeModel = new EmployeeModel();
