import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as reportService from "../services/report";
import { AppError } from "../middlewares/error";

const reportSchema = Joi.object({
    month: Joi.string()
        .pattern(/^\d{4}-\d{2}$/)
        .required(), // YYYY-MM
    employee_id: Joi.number().optional(),
});

export const getAttendanceReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { month, employee_id } = req.query;
        const { error } = reportSchema.validate({ month, employee_id });
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const report = await reportService.getMonthlyAttendanceReport({
            month: month as string,
            employee_id: employee_id ? Number(employee_id) : undefined,
        });

        res.json({ status: "success", data: report });
    } catch (err) {
        next(err);
    }
};
