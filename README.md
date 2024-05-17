# Task Management API

This API provides a simple task management system with user authentication, task creation, updating, and deletion functionalities. It also supports real-time updates using WebSocket.

## Features

- User Authentication with JWT
- CRUD operations for tasks
- Real-time task updates using WebSocket
- API documentation

## Getting Started

### Prerequisites

- Node.js (v16.20.2)
- npm
- MySQL

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/task-management-api.git
   cd task-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory with the following content:

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=password
   DB_NAME=test

   JWT_SECRET=your_jwt_secret
   JWT_EXPIRATION=3600s
   ```

4. Run the application:

   ```bash
   npm run start
   ```

5. Access the API at [http://localhost:3000](http://localhost:3000) (base URL)

### Usage

#### Authentication

- **Register**: `POST /auth/register`

  ```json
  {
    "username": "testuser@taskmanager.com",
    "password": "password"
  }
  ```

- **Login**: `POST /auth/login`

  ```json
  {
    "username": "testuser@taskmanager.com",
    "password": "password"
  }
  ```

#### Tasks

- **Create Task**: `POST /tasks`

  ```json
  {
    "title": "Task 1",
    "description": "This is task 1",
  }
  ```

- **Get All Tasks**: `GET /tasks`

- **Get Task by ID**: `GET /tasks/:id`

- **Update Task**: `PATCH /tasks/:id`

  ```json
  {
    "title": "Updated Task 1",
    "description": "This is updated task 1",
    "completed": true
  }
  ```

- **Delete Task**: `DELETE /tasks/:id`

#### Real-time Updates

Connect to the WebSocket at `ws://localhost:3000` to receive real-time updates. Listen for the following events:

- `taskCreated`
- `taskDeleted`

### API Documentation

Access the Swagger API documentation at [http://localhost:3000/docs](http://localhost:3000/docs).

### License

This project is licensed under the MIT License.
