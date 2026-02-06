# HR Management System

A comprehensive HR Management Backend API built with Node.js, Express, TypeScript, and MySQL. This system provides complete employee management, attendance tracking, and reporting capabilities with JWT authentication.

## Live Demo

**API Tester Interface:** [Demo Link](https://alsheikhaminulislam.github.io/m360ICT/)  
*(The `index.html` file provides an interactive API testing interface similar to Swagger UI)*

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Database Setup](#database-setup)
- [Environment Configuration](#environment-configuration)
- [API Testing](#api-testing)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Security](#security)
- [License](#license)

## Features

- **JWT Authentication** - Secure user authentication and authorization
- **Employee Management** - Complete CRUD operations for employee records
- **Photo Upload** - Employee photo management with file upload support
- **Attendance Tracking** - Clock in/out functionality with real-time tracking
- **Comprehensive Reports** - Detailed attendance and employee reports
- **Security** - Helmet.js, CORS, bcrypt password hashing
- **Validation** - Request validation using Joi
- **Database Migrations** - Knex.js for database schema management

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Knex.js
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **Validation:** Joi
- **Security:** Helmet, CORS
- **File Upload:** Multer
- **Development:** Nodemon, ts-node

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MySQL** (v5.7 or higher)
- **Postman** (optional, for API testing)

## Quick Start

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone <https://github.com/alsheikhaminulislam/m360ICT.git>
cd m360ICT
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

#### Option A: Using the SQL File (Recommended)

The project includes a pre-configured database dump file `hr_db.sql` with sample data.

1. Open your MySQL client or command line
2. Create the database and import the SQL file:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE hr_db;
USE hr_db;
SOURCE hr_db.sql;
```

Or using command line directly:

```bash
mysql -u root -p hr_db < hr_db.sql
```

**What's included in `hr_db.sql`:**
- Complete database schema (users, employees, attendance tables)
- Sample admin user credentials
- Sample employee records
- Sample attendance data
- All necessary indexes and constraints

#### Option B: Using Knex Migrations

```bash
npm run migrate
npm run seed
```

### 4. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=hr_root
DB_PASSWORD=hr_password
DB_NAME=hr_db
JWT_SECRET=changeme_in_prod
BCRYPT_ROUNDS=10

# CORS Configuration
# Use '*' to allow all origins (development only)
# Or specify comma-separated list of allowed origins for production
# Example: ALLOWED_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
ALLOWED_ORIGINS=*
```

**Important Notes:**
- Change `JWT_SECRET` to a strong, random string in production
- Update `DB_USER` and `DB_PASSWORD` to match your MySQL credentials
- Set `ALLOWED_ORIGINS` to specific domains in production for security

### 5. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

**Important:** After changing any environment variables (especially `ALLOWED_ORIGINS`), you must restart the server for changes to take effect!

## Database Setup

### Database Schema

The `hr_db.sql` file contains the complete database structure:

**Tables:**
- `users` - System users with authentication credentials
- `employees` - Employee information and records
- `attendance` - Attendance tracking with clock in/out times
- `reports` - Generated reports and analytics

### Default Credentials

After importing `hr_db.sql`, you can login with:

```
Email: admin@example.com
Password: admin123
```

**Important:** Change the default admin password immediately after first login!

## Environment Configuration

The `.env.example` file provides a template for all required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | Database username | `hr_root` |
| `DB_PASSWORD` | Database password | `hr_password` |
| `DB_NAME` | Database name | `hr_db` |
| `JWT_SECRET` | Secret key for JWT | `your-secret-key` |
| `BCRYPT_ROUNDS` | Bcrypt hashing rounds | `10` |
| `ALLOWED_ORIGINS` | CORS allowed origins | `*` or `https://yourdomain.com` |

## API Testing

### Using Postman (Recommended)

The project includes a complete Postman collection: `HR Management Backend.postman_collection.json`

**Steps to use:**

1. **Open Postman**
2. **Import the collection:**
   - Click "Import" button
   - Select `HR Management Backend.postman_collection.json`
   - The collection will be imported with all endpoints pre-configured

3. **Set up environment variables in Postman:**
   - Create a new environment
   - Add variables:
     - `baseUrl`: `http://localhost:3000`
     - `token`: (will be auto-set after login)

4. **Test the API:**
   - Start with the **Auth** folder → **Login** request
   - The token will be automatically saved in web browser but in postman you have to save it manually in the environment variables
   - All other requests will use this token for authentication

**What's included in the Postman collection:**
- All API endpoints organized by category
- Pre-configured request bodies with sample data
- Automatic token management
- Example responses
- Ready-to-use test cases

### Using the Interactive Web Interface

Open `index.html` in your browser for a beautiful, interactive API testing interface:

1. **Open the file:**
   ```bash
   # Simply open index.html in your browser
   # Or serve it using a local server
   ```

2. **Configure the API:**
   - Enter your API base URL (e.g., `http://localhost:3000`)
   - Login to get your authentication token
   - The token will be automatically used for all requests

3. **Test endpoints:**
   - Navigate through different sections (Auth, Employees, Attendance, Reports)
   - Fill in the required fields
   - Click "Send Request" to test
   - View formatted responses

**Features of the Web Interface:**
- Modern, Material Design-inspired UI
- Fully responsive design
- Collapsible sections for easy navigation
- Pre-filled sample data
- Real-time request/response display
- Clean and intuitive interface

## API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

All endpoints (except login and register) require JWT authentication.

**Header:**
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints Overview

#### Authentication
- `POST /auth/login` - HR user login

#### Employees
- `GET /employees` - List all employees (with optional pagination & filters)
- `GET /employees/:id` - Get a single employee by ID
- `POST /employees` - Create a new employee (supports `multipart/form-data` for photo)
- `PUT /employees/:id` - Update employee details (also allow updating/replacing photo)
- `DELETE /employees/:id` - Delete an employee

#### Attendance
- `GET /attendance` - List attendance entries (filterable by `employee_id`, `date`, `range`)
- `GET /attendance/:id` - Get a single attendance entry
- `POST /attendance` - Create or upsert attendance
    - **Body:** `employee_id`, `date`, `check_in_time`
    - **Logic:** If (`employee_id`, `date`) exists, updates `check_in_time` instead of creating a duplicate
- `PUT /attendance/:id` - Update an attendance entry
- `DELETE /attendance/:id` - Delete an attendance entry

#### Reports
- `GET /reports/attendance` - Monthly attendance summary
    - **Query:** `month=YYYY-MM` (required), optional `employee_id`
    - **Response per employee:** `employee_id`, `name`, `days_present`, `times_late`
    - **Late Rule:** `check_in_time > 09:45:00` counts as late

### Example Queries
- `GET /employees?search=rahim` - Search by employee name (partial)
- `GET /attendance?employee_id=12&from=2025-08-01&to=2025-08-31`
- `GET /reports/attendance?month=2025-08`

## Project Structure

```
m360ICT/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── validators/      # Request validation schemas
│   └── index.ts         # Application entry point
├── uploads/             # Uploaded files (employee photos)
├── scripts/             # Utility scripts
├── .env.example         # Environment variables template
├── hr_db.sql           # Database dump with sample data
├── HR Management Backend.postman_collection.json  # Postman collection
├── index.html          # Interactive API tester
├── knexfile.ts         # Knex configuration
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
└── README.md           # This file
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with auto-reload | 
| `npm run migrate` | Run database migrations |
| `npm run seed` | Seed database with sample data | 

## Security

This application implements several security best practices:

- **Password Hashing:** bcrypt with configurable rounds
- **JWT Authentication:** Secure token-based authentication
- **CORS:** Configurable cross-origin resource sharing
- **Helmet:** Security headers middleware
- **Input Validation:** Joi schema validation
- **SQL Injection Prevention:** Parameterized queries via Knex
- **Environment Variables:** Sensitive data stored in .env

### Production Security Checklist

- [ ] Change default `JWT_SECRET` to a strong random string
- [ ] Update default admin credentials
- [ ] Set `ALLOWED_ORIGINS` to specific domains (not `*`)
- [ ] Use HTTPS in production
- [ ] Enable rate limiting
- [ ] Set up proper database backups
- [ ] Review and update CORS settings
- [ ] Enable database SSL connections

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For issues, questions, or contributions, please open an issue in the repository.

---

**Note:** This README assumes you'll be deploying the `index.html` file to a live server. Update the "Live Demo" link at the top once deployed.

**Quick Testing Guide:**
1. Import `hr_db.sql` into MySQL
2. Copy `.env.example` to `.env` and configure
3. Run `npm install` and `npm run dev`
4. Import `HR Management Backend.postman_collection.json` into Postman
5. Open `index.html` in browser for interactive testing
6. Login with `admin@example.com` / `admin123`
7. Start testing the API!
