# HR Management Backend

RESTful API for HR management built with Node.js, Express, TypeScript, Knex, and MySQL.

## Features
- **HR Authentication**: JWT-based login.
- **Employee Management**: CRUD operations with photo upload and soft delete.
- **Attendance Tracking**: Daily check-in/check-out with unique constraints.
- **Reporting**: Monthly attendance summary (Present/Late calculation).

## Prerequisites
- Node.js
- MySQL Database

## Setup

1.  **Clone Request**:
    \`\`\`bash
    git clone <repo-url>
    cd hr-backend
    \`\`\`

2.  **Install Dependencies**:
    \`\`\`bash
    npm install
    \`\`\`

3.  **Database Configuration**:
    -   Ensure MySQL is running.
    -   Create a database named `hr_db` (or whatever matches your `.env`).
    -   Update `.env` with your DB credentials.
    
    Example `.env`:
    \`\`\`properties
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=hr_db
    JWT_SECRET=supersecretkey
    \`\`\`

4.  **Run Migrations & Seeds**:
    \`\`\`bash
    npm run migrate
    npm run seed
    \`\`\`

    *Note: Seed creates default HR user: `hr@example.com` / `password123`*

5.  **Start Server**:
    \`\`\`bash
    npm run dev
    \`\`\`

## API Endpoints

### Auth
- `POST /auth/login` - Login with email/password.

### Employees (Protected)
- `GET /employees` - List employees.
- `POST /employees` - Create employee (multipart/form-data for `photo`).
- `PUT /employees/:id` - Update employee.
- `DELETE /employees/:id` - Soft delete employee.

### Attendance (Protected)
- `GET /attendance` - List attendance.
- `POST /attendance` - Check-in/Upsert.

### Reports (Protected)
- `GET /reports/attendance?month=2023-10` - Monthly report.

## Testing
Use Postman to test the endpoints.
1. Login to get `token`.
2. Add `Authorization: Bearer <token>` to headers for other requests.
