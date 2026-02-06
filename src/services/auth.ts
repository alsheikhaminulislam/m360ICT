import { userModel } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const findUserByEmail = async (email: string) => {
    return userModel.findByEmail(email);
};

export const verifyPassword = async (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
};

export const generateToken = (user: { id: number; email: string }) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" }
    );
};

