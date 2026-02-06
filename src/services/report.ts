import { attendanceModel } from "../models/Attendance";

interface ReportFilter {
    month: string; // YYYY-MM
    employee_id?: number;
}

export const getMonthlyAttendanceReport = async (filter: ReportFilter) => {
    const { month, employee_id } = filter;
    const startDate = `${month}-01`;
    const endDate = `${month}-31`; // Simplified, DB will handle invalid dates usually, or use last day logic

    // Use query from AttendanceModel
    const result = await attendanceModel.getMonthlyReport(startDate, endDate, employee_id);
    return result;
};

