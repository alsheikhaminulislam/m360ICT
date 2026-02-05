import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    const email = "hr@example.com";
    const existingUser = await knex("hr_users").where({ email }).first();

    if (!existingUser) {
        // Defines a default password "password123"
        const passwordHash = await bcrypt.hash("password123", 10);
        await knex("hr_users").insert({
            email,
            password_hash: passwordHash,
            name: "HR Admin",
        });
        console.log("Seeded HR User: hr@example.com / password123");
    }
}
