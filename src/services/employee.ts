import db from "../database/db";

interface CreateEmployeeDTO {
    name: string;
    age: number;
    designation: string;
    hiring_date: string;
    date_of_birth: string;
    salary: number;
    photo_path?: string;
}

interface UpdateEmployeeDTO extends Partial<CreateEmployeeDTO> { }

interface EmployeeFilter {
    search?: string;
    page?: number;
    limit?: number;
}

export const createEmployee = async (data: CreateEmployeeDTO) => {
    const [id] = await db("employees").insert(data);
    return db("employees").where({ id }).first();
};

export const getEmployees = async (filter: EmployeeFilter) => {
    const { search, page = 1, limit = 10 } = filter;
    const offset = (page - 1) * limit;

    let query = db("employees").whereNull("deleted_at");

    if (search) {
        query = query.where("name", "like", `%${search}%`);
    }

    const [countResult] = await query.clone().count({ count: "*" });
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
};

export const getEmployeeById = async (id: number) => {
    return db("employees").where({ id }).whereNull("deleted_at").first();
};

export const updateEmployee = async (id: number, data: UpdateEmployeeDTO) => {
    await db("employees").where({ id }).update({ ...data, updated_at: db.fn.now() });
    return getEmployeeById(id);
};

export const softDeleteEmployee = async (id: number) => {
    return db("employees")
        .where({ id })
        .update({ deleted_at: db.fn.now() });
};
