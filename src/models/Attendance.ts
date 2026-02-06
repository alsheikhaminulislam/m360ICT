import { BaseModel } from "./BaseModel";
import db from "../database/db";

export interface AttendanceDTO {
    employee_id: number;
    date: string;
    check_in_time: string;
}

export interface AttendanceFilter {
    employee_id?: number;
    from?: string;
    to?: string;
    page?: number;
    limit?: number;
}

export class AttendanceModel extends BaseModel<AttendanceDTO & { id: number }> {
    constructor() {
        super("attendance");
    }

    async createOrUpdate(data: AttendanceDTO) {
        const existing = await this.findOne({ employee_id: data.employee_id, date: data.date });

        if (existing) {
            await this.update(existing.id, { check_in_time: data.check_in_time, updated_at: db.fn.now() } as any);
            return this.findById(existing.id);
        } else {
            return this.create(data);
        }
    }

    async findAll(filter: AttendanceFilter) {
        const { employee_id, from, to, page = 1, limit = 10 } = filter;
        let query = this.db;

        if (employee_id) {
            query = query.where({ employee_id });
        }

        if (from) {
            query = query.where("date", ">=", from);
        }

        if (to) {
            query = query.where("date", "<=", to);
        }

        query = query.orderBy("date", "desc");

        return this.paginate(query, page, limit);
    }

    async updateWithTimestamp(id: number, data: Partial<AttendanceDTO>) {
        return this.update(id, { ...data, updated_at: db.fn.now() } as any);
    }

    async getMonthlyReport(startDate: string, endDate: string, employee_id?: number) {
        let query = this.db
            .join("employees", "attendance.employee_id", "employees.id")
            .select(
                "employees.id as employee_id",
                "employees.name",
                db.raw("COUNT(attendance.id) as days_present"),
                db.raw(
                    "SUM(CASE WHEN attendance.check_in_time > '09:45:00' THEN 1 ELSE 0 END) as times_late"
                )
            )
            .whereBetween("attendance.date", [startDate, endDate])
            .groupBy("employees.id", "employees.name");

        if (employee_id) {
            query = query.where("employees.id", employee_id);
        }

        return query;
    }
}

export const attendanceModel = new AttendanceModel();
