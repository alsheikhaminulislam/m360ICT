import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as attendanceService from "../services/attendance";
import { AppError } from "../middlewares/error";

const attendanceSchema = Joi.object({
    employee_id: Joi.number().required(),
    date: Joi.date().iso().required(),
    check_in_time: Joi.string().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/).required(), // HH:MM:SS
});

const updateAttendanceSchema = Joi.object({
    date: Joi.date().iso(),
    check_in_time: Joi.string(),
});

export const upsertAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = attendanceSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const attendance = await attendanceService.createOrUpdateAttendance(req.body);
        res.status(200).json({ status: "success", data: attendance });
    } catch (err) {
        next(err);
    }
};

export const getAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { employee_id, from, to, page, limit } = req.query;
        const result = await attendanceService.getAttendance({
            employee_id: employee_id ? Number(employee_id) : undefined,
            from: from as string,
            to: to as string,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
        res.json({ status: "success", ...result });
    } catch (err) {
        next(err);
    }
};

export const getAttendanceById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const attendance = await attendanceService.getAttendanceById(Number(id));
        if (!attendance) {
            throw new AppError("Attendance record not found", 404);
        }
        res.json({ status: "success", data: attendance });
    } catch (err) {
        next(err);
    }
};

export const updateAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { error } = updateAttendanceSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }
        const updated = await attendanceService.updateAttendance(Number(id), req.body);
        if (!updated) {
            throw new AppError("Attendance record not found", 404);
        }
        res.json({ status: "success", data: updated });
    } catch (err) {
        next(err);
    }
};

export const deleteAttendance = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        await attendanceService.deleteAttendance(Number(id));
        res.json({ status: "success", message: "Attendance record deleted" });
    } catch (err) {
        next(err);
    }
};
