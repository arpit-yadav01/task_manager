# Project & Task Manager

A simple full-stack application where users can create projects and manage tasks inside them. Each user only sees their own data.

---

## Live Demo

Frontend:  
https://task-manager-beige-eta.vercel.app  

Backend API:  
https://task-manager-n38k.onrender.com  

---

## Features

- User authentication (register, login, logout)  
- Create and manage projects  
- Add tasks inside projects  
- Update task status (Todo / In Progress / Done)  
- Delete tasks  
- User-specific data (no cross access)  

---

## Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication (HTTP-only cookies)

---

## App Flow

- App opens on `/projects`
- If user is not logged in → redirected to login
- After login → projects are fetched
- User can create and manage projects
- Logout clears session

---

## Folder Structure

### Backend
backend/
src/
controllers/
routes/
models/
middleware/
config/
app.js



### Frontend


frontend/
src/
api/
components/
pages/
App.jsx
main.jsx



---

## Loom Video

https://www.loom.com/share/74a0d2509406422fb0f0382a0251d7fa

---

## Deployment

- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## Author

Arpit Yadav