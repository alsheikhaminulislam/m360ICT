import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import * as employeeService from "../services/employee";
import { AppError } from "../middlewares/error";

const employeeSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().min(18).required(),
    designation: Joi.string().required(),
    hiring_date: Joi.date().iso().required(),
    date_of_birth: Joi.date().iso().required(),
    salary: Joi.number().positive().required(),
});

const updateEmployeeSchema = Joi.object({
    name: Joi.string(),
    age: Joi.number().integer().min(18),
    designation: Joi.string(),
    hiring_date: Joi.date().iso(),
    date_of_birth: Joi.date().iso(),
    salary: Joi.number().positive(),
});

export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = employeeSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const photo_path = req.file ? req.file.path : undefined;

        const employee = await employeeService.createEmployee({
            ...req.body,
            photo_path,
        });

        res.status(201).json({ status: "success", data: employee });
    } catch (err) {
        next(err);
    }
};

export const getEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { search, page, limit } = req.query;
        const result = await employeeService.getEmployees({
            search: search as string,
            page: page ? Number(page) : 1,
            limit: limit ? Number(limit) : 10,
        });
        res.json({ status: "success", ...result });
    } catch (err) {
        next(err);
    }
};

export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const employee = await employeeService.getEmployeeById(Number(id));
        if (!employee) {
            throw new AppError("Employee not found", 404);
        }
        res.json({ status: "success", data: employee });
    } catch (err) {
        next(err);
    }
};

export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        const { error } = updateEmployeeSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        let updateData = { ...req.body };
        if (req.file) {
            updateData.photo_path = req.file.path;
        }

        const updatedEmployee = await employeeService.updateEmployee(
            Number(id),
            updateData
        );

        if (!updatedEmployee) {
            throw new AppError("Employee not found", 404);
        }

        res.json({ status: "success", data: updatedEmployee });
    } catch (err) {
        next(err);
    }
};

export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;
        await employeeService.softDeleteEmployee(Number(id));
        res.json({ status: "success", message: "Employee deleted" });
    } catch (err) {
        next(err);
    }
};
