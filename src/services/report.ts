import db from "../database/db";

interface ReportFilter {
    month: string; // YYYY-MM
    employee_id?: number;
}

export const getMonthlyAttendanceReport = async (filter: ReportFilter) => {
    const { month, employee_id } = filter;
    const startDate = `${month}-01`;
    const endDate = `${month}-31`; // Simplified, DB will handle invalid dates usually, or use last day logic

    let query = db("attendance")
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

    const report = await query;
    return report;
};
