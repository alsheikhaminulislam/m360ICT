import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { findUserByEmail, verifyPassword, generateToken } from "../services/auth";
import { AppError } from "../middlewares/error";

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }

        const isValid = await verifyPassword(password, user.password_hash);
        if (!isValid) {
            throw new AppError("Invalid credentials", 401);
        }

        const token = generateToken(user);

        res.json({
            status: "success",
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        next(err);
    }
};
