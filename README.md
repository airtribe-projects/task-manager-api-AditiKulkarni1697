# Task Manager API

A RESTful API for managing tasks with features like priority levels, completion tracking, and timestamps. Built with Node.js, Express, and MongoDB.

## Features

- **Create, Read, Update, Delete (CRUD)** tasks
- **Filter tasks** by completion status and priority
- **Sort tasks** by creation date
- **Automatic timestamps** (createdAt, updatedAt)
- **Centralized error handling** with consistent JSON error responses
- **Input validation** middleware for robust data validation
- **Priority levels**: low, medium, high
- **Task completion tracking**

## Project Structure

```
backend/
├── db.js                      # MongoDB connection
├── index.js                   # Express app setup and server
├── package.json               # Dependencies
├── controller/
│   └── task.controller.js     # Route handlers
├── models/
│   └── task.model.js          # Mongoose schema
├── routes/
│   └── task.routes.js         # API routes
└── middleware/
    ├── catchAsync.js          # Async error wrapper
    ├── error.middleware.js     # Centralized error handler
    └── inputValidation.middleware.js  # Request validation
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file** (if needed for MongoDB connection):
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanager
   NODE_ENV=development
   ```

4. **Update database connection** in `db.js` with your MongoDB URI

5. **Start the server:**
   ```bash
   npm run start
   ```
   
   Or with nodemon (auto-reload):
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3030`

## API Endpoints

### Base URL
```
http://localhost:3030
```

---

### 1. **Get Welcome Message**
```
GET /
```

**Response:**
```
Welcome
```

---

### 2. **Get All Tasks**
```
GET /tasks
```

**Query Parameters:**
- `completed` (optional): `"true"` or `"false"` - filter by completion status
- `createdAt` (optional): `1` (ascending) or `-1` (descending) - sort by creation date

**Example:**
```bash
# Get all tasks
curl http://localhost:3030/tasks

# Get completed tasks sorted by creation date (ascending)
curl "http://localhost:3030/tasks?completed=true&createdAt=1"

# Get incomplete tasks sorted descending
curl "http://localhost:3030/tasks?completed=false&createdAt=-1"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Learn Node.js",
      "description": "Complete Node.js tutorial",
      "priority": "high",
      "completed": false,
      "createdAt": "2026-02-01T10:30:00.000Z",
      "updatedAt": "2026-02-01T10:30:00.000Z"
    }
  ]
}
```

---

### 3. **Get Task by ID**
```
GET /tasks/:id
```

**Example:**
```bash
curl http://localhost:3030/tasks/507f1f77bcf86cd799439011
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Learn Node.js",
    "description": "Complete Node.js tutorial",
    "priority": "high",
    "completed": false,
    "createdAt": "2026-02-01T10:30:00.000Z",
    "updatedAt": "2026-02-01T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "status": 404,
  "message": "Task with id 507f1f77bcf86cd799439011 is not present"
}
```

---

### 4. **Get Tasks by Priority**
```
GET /tasks/priority/:level
```

**Priority Levels:** `low`, `medium`, `high`

**Example:**
```bash
curl http://localhost:3030/tasks/priority/high

curl http://localhost:3030/tasks/priority/medium
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Urgent Task",
      "description": "High priority task",
      "priority": "high",
      "completed": false,
      "createdAt": "2026-02-01T10:30:00.000Z",
      "updatedAt": "2026-02-01T10:30:00.000Z"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "success": false,
  "status": 400,
  "message": "Invalid priority. Must be one of: low, medium, high"
}
```

---

### 5. **Create a Task**
```
POST /tasks
```

**Request Body:**
```json
{
  "title": "Learn MongoDB",
  "description": "Study MongoDB basics and queries",
  "priority": "medium"
}
```

**Example:**
```bash
curl -X POST http://localhost:3030/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn MongoDB",
    "description": "Study MongoDB basics",
    "priority": "medium"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Learn MongoDB",
    "description": "Study MongoDB basics",
    "priority": "medium",
    "completed": false,
    "createdAt": "2026-02-01T11:00:00.000Z",
    "updatedAt": "2026-02-01T11:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "status": 400,
  "message": "Provide correct input"
}
```

---

### 6. **Update a Task**
```
PUT /tasks/:id
```

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "high",
  "completed": true
}
```

**Example:**
```bash
curl -X PUT http://localhost:3030/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Task",
    "completed": true,
    "priority": "high"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Task",
    "description": "Complete Node.js tutorial",
    "priority": "high",
    "completed": true,
    "createdAt": "2026-02-01T10:30:00.000Z",
    "updatedAt": "2026-02-01T11:15:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "status": 404,
  "message": "Task with id 507f1f77bcf86cd799439011 not found"
}
```

---

### 7. **Delete a Task**
```
DELETE /tasks/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:3030/tasks/507f1f77bcf86cd799439011
```

**Response (200):**
```json
{
  "success": true
}
```

**Error Response (404):**
```json
{
  "success": false,
  "status": 404,
  "message": "The task with id 507f1f77bcf86cd799439011 is not present"
}
```

---

## Input Validation

The API validates all task inputs:

- **title** (required, string): Task title
- **description** (required, string): Task description
- **priority** (optional, string): One of `low`, `medium`, `high` (defaults to `medium`)
- **completed** (optional, boolean): Task completion status

Invalid inputs return a 400 error:
```json
{
  "success": false,
  "status": 400,
  "message": "Provide correct input"
}
```

---

## Error Handling

All errors follow a consistent JSON format:

```json
{
  "success": false,
  "status": 400,
  "message": "Error description"
}
```

Common status codes:
- `200`: Success
- `201`: Created successfully
- `400`: Bad request (validation error)
- `404`: Not found
- `500`: Internal server error

---

## Testing with Postman/cURL

### Create a Task
```bash
curl -X POST http://localhost:3030/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","description":"Milk, eggs, bread","priority":"low"}'
```

### Get All Tasks
```bash
curl http://localhost:3030/tasks
```

### Filter by Status
```bash
curl "http://localhost:3030/tasks?completed=false"
```

### Get by Priority
```bash
curl http://localhost:3030/tasks/priority/high
```

### Update a Task (replace `<TASK_ID>`)
```bash
curl -X PUT http://localhost:3030/tasks/<TASK_ID> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete a Task
```bash
curl -X DELETE http://localhost:3030/tasks/<TASK_ID>
```

---

## Database Schema

### Task Model

```javascript
{
  title: String (required),
  description: String (required),
  priority: String (enum: ["low", "medium", "high"], default: "medium"),
  completed: Boolean,
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-updated)
}
```

---

## Middleware

### Error Middleware
Centralized error handler that catches all thrown errors and returns consistent JSON responses.

### Input Validation Middleware
Validates request body for task creation and updates, ensuring correct data types and required fields.

### Catch Async Middleware
Wraps async route handlers to catch promise rejections and forward errors to the error middleware.

---

## Environment

- **Node.js**: v14+
- **Express.js**: v4+
- **MongoDB**: v4+
- **Mongoose**: v6+

---

## License

ISC
