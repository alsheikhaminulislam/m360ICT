import db from "../database/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const findUserByEmail = async (email: string) => {
    return db("hr_users").where({ email }).first();
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
