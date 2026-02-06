import { attendanceModel, AttendanceDTO, AttendanceFilter } from "../models/Attendance";

export { AttendanceDTO, AttendanceFilter };

export const createOrUpdateAttendance = async (data: AttendanceDTO) => {
    return attendanceModel.createOrUpdate(data);
};

export const getAttendance = async (filter: AttendanceFilter) => {
    return attendanceModel.findAll(filter);
};

export const getAttendanceById = async (id: number) => {
    return attendanceModel.findById(id);
};

export const updateAttendance = async (id: number, data: Partial<AttendanceDTO>) => {
    return attendanceModel.updateWithTimestamp(id, data);
};

export const deleteAttendance = async (id: number) => {
    return attendanceModel.delete(id);
};

