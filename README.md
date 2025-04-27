# Task Management System

## Overview
This is a Task Management application built for the Oritso Private Limited screening assignment.  
It allows users to Create, Read, Update, Delete (CRUD) and Search tasks using a ReactJS frontend, .NET backend, and MySQL database.

---

## Database Design

### ER Diagram
(Attach your ER diagram image here, or describe simply.)

- **Task Table**  
  - `id` (Primary Key)
  - `title` (VARCHAR)
  - `description` (TEXT)
  - `due_date` (DATETIME)
  - `status` (ENUM or VARCHAR)
  - `remarks` (TEXT)
  - `created_on` (TIMESTAMP)
  - `last_updated_on` (TIMESTAMP)
  - `created_by_user_id` (INT)
  - `created_by_user_name` (VARCHAR)
  - `last_updated_by_user_id` (INT)
  - `last_updated_by_user_name` (VARCHAR)

### Data Dictionary

| Field Name | Data Type | Description |
|:-----------|:----------|:------------|
| id | INT (Primary Key) | Unique identifier for each task |
| title | VARCHAR(255) | Title of the task |
| description | TEXT | Description of the task |
| due_date | DATETIME | Deadline for the task |
| status | VARCHAR(50) | Status (Pending, Completed, In Progress) |
| remarks | TEXT | Additional remarks |
| created_on | TIMESTAMP | Record creation time |
| last_updated_on | TIMESTAMP | Record last update time |
| created_by_user_id | INT | ID of the creator |
| created_by_user_name | VARCHAR(255) | Name of the creator |
| last_updated_by_user_id | INT | ID of the person who updated |
| last_updated_by_user_name | VARCHAR(255) | Name of the person who updated |

### Indexes Used
- Primary Key Index on `id`
- Index on `due_date`
- Index on `status`

### Code First or DB First?
- **Approach Used:** DB First  
- **Reason:**  
  - MySQL database structure was defined first to clearly model real-world task properties.  
  - Backend code (Entity Models) was generated based on existing DB schema.

---

## Application Structure

### Application Type
- **Frontend:** ReactJS (Single Page Application - SPA)
- **Backend:** .NET Core Web API
- **Database:** MySQL

### Frontend Structure
- **Why ReactJS?**
  - Fast SPA performance
  - Easy state management
  - Component-driven architecture for future scalability

- **Pages:**
  - Task List Page (View all tasks + Search)
  - Create New Task
  - Update Task
  - Task Details View
  - Delete Task Button with Confirmation

### Backend Structure
- **API Endpoints:**
  - `POST /api/tasks` → Create a task
  - `GET /api/tasks` → Fetch all tasks
  - `GET /api/tasks/{id}` → Fetch a task by ID
  - `PUT /api/tasks/{id}` → Update a task
  - `DELETE /api/tasks/{id}` → Delete a task
  - `GET /api/tasks/search?query=xyz` → Search tasks by title/status

- **Layers:**
  - Controller
  - Services
  - Repository
  - Entity/Model
  - Database Context

---

## Build & Installation

### Environment Details
- .NET 6
- Node.js 18+
- React 18+
- MySQL 8+
- Visual Studio 2022 / VS Code

### Backend Setup (DotNet)
```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

## Frontend end Setup (React js)

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Steps to Run Frontend
```bash
# Navigate to frontend directory
cd frontend

# Install all dependencies
npm install

# Start the development server
npm run dev

```
## Database Setup (Mysql)

-- Create the database
CREATE DATABASE task_management;

-- Use the database
USE task_management;

-- Create the tasks table
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATETIME,
  status VARCHAR(50),
  remarks TEXT,
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_updated_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by_user_id INT,
  created_by_user_name VARCHAR(255),
  last_updated_by_user_id INT,
  last_updated_by_user_name VARCHAR(255)
);


## Database Confrigation


"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=task_management;User Id=root;Password=yourpassword;"
}

