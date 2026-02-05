import db from "../database/db";

interface AttendanceDTO {
    employee_id: number;
    date: string;
    check_in_time: string;
}

interface AttendanceFilter {
    employee_id?: number;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}

export const createOrUpdateAttendance = async (data: AttendanceDTO) => {
    const existing = await db("attendance")
        .where({ employee_id: data.employee_id, date: data.date })
        .first();

    if (existing) {
        await db("attendance")
            .where({ id: existing.id })
            .update({ check_in_time: data.check_in_time, updated_at: db.fn.now() });
        return db("attendance").where({ id: existing.id }).first();
    } else {
        const [id] = await db("attendance").insert(data);
        return db("attendance").where({ id }).first();
    }
};

export const getAttendance = async (filter: AttendanceFilter) => {
    const { employee_id, from, to, page = 1, limit = 10 } = filter;
    const offset = (page - 1) * limit;

    let query = db("attendance");

    if (employee_id) {
        query = query.where({ employee_id });
    }

    if (from) {
        query = query.where("date", ">=", from);
    }

    if (to) {
        query = query.where("date", "<=", to);
    }

    const [countResult] = await query.clone().count({ count: "*" });
    const total = Number(countResult?.count || 0);

    const data = await query.offset(offset).limit(limit).orderBy("date", "desc");

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

export const getAttendanceById = async (id: number) => {
    return db("attendance").where({ id }).first();
};

export const updateAttendance = async (id: number, data: Partial<AttendanceDTO>) => {
    await db("attendance").where({ id }).update({ ...data, updated_at: db.fn.now() });
    return getAttendanceById(id);
};

export const deleteAttendance = async (id: number) => {
    return db("attendance").where({ id }).delete();
};
