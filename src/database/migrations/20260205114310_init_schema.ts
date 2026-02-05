import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // HR Users Table
    await knex.schema.createTable("hr_users", (table) => {
        table.increments("id").primary();
        table.string("email").notNullable().unique();
        table.string("password_hash").notNullable();
        table.string("name").notNullable();
        table.timestamps(true, true);
    });

    // Employees Table
    await knex.schema.createTable("employees", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.integer("age").notNullable();
        table.string("designation").notNullable();
        table.date("hiring_date").notNullable();
        table.date("date_of_birth").notNullable();
        table.decimal("salary", 14, 2).notNullable();
        table.string("photo_path").nullable();
        table.timestamps(true, true);
        table.timestamp("deleted_at").nullable(); // Soft delete
    });

    // Attendance Table
    await knex.schema.createTable("attendance", (table) => {
        table.increments("id").primary();
        table
            .integer("employee_id")
            .unsigned()
            .notNullable()
            .references("id")
            .inTable("employees")
            .onDelete("CASCADE"); // Or RESTRICT depending on logic, but usually CASCADE or SET NULL on hard delete. Logic handles soft delete.
        table.date("date").notNullable();
        table.time("check_in_time").notNullable(); // Storing time part
        table.index(["employee_id", "date"], "idx_attendance_unique", "unique"); // Unique constraint
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("attendance");
    await knex.schema.dropTableIfExists("employees");
    await knex.schema.dropTableIfExists("hr_users");
}
