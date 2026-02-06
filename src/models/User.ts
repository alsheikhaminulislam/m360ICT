import { BaseModel } from "./BaseModel";

export interface User {
    id: number;
    email: string;
    password_hash: string;
}

export class UserModel extends BaseModel<User> {
    constructor() {
        super("hr_users");
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({ email });
    }
}

export const userModel = new UserModel();
