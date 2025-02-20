# Todo List Web App

This is a full-stack Todo List web application.

## Features
- Add, edit, and delete todos
- Mark todos as completed
- Responsive UI
- Backend API integration
- Persistent storage
- RESTful API design
- Error handling and validation

## Technologies Used
- React
- Node.js
- Express.js
- MongoDB
- Axios
- Bootstrap

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/nitheeshdr/mern-todo-lists.git
cd mern-todo-lists

## 2. Install Dependencies
```sh 
npm install

### 3. Start the Application
```sh
npm start

### API Endpoints

### Base URL:
```sh
http://localhost:5000/api

### Endpoints:

### Get all todos

### GET /todos

### Response:
```sh
[
  {
    "_id": "650e7a2b3d10",
    "title": "Complete project",
    "completed": false
  }
]

### Add a new todo

### POST /todos

### Request Body:
```sh
{
  "title": "New Todo"
}

### Response:
```sh
{
  "_id": "650e7a2b3d11",
  "title": "New Todo",
  "completed": false
}

### Update a todo

### PUT /todos/:id

### Request Body:
```sh
{
  "title": "Updated Todo",
  "completed": true
}

### Response:
```sh
{
  "_id": "650e7a2b3d10",
  "title": "Updated Todo",
  "completed": true
}

### Delete a todo

### DELETE /todos/:id

### Response:
```sh
{
  "message": "Todo deleted successfully"
}

Contributing

Feel free to contribute by forking the repository and submitting a pull request.

License

This project is licensed under the MIT License.
