# Project & Task Manager

A simple full-stack app where users can create projects and manage tasks inside them. Each user only sees their own data.

---

## Features

- User can register and login
- Create projects
- Add tasks inside projects
- Update task status (Todo / In Progress / Done)
- Delete tasks
- Data is user-specific (no access to others’ data)

---

## Tech Stack

Frontend:
- React (Vite)
- Axios
- React Router

Backend:
- Node.js
- Express
- MongoDB (Mongoose)
- JWT authentication (HTTP-only cookies)

---

## App Flow

- App opens on `/projects`
- If user is not logged in:
  - Projects are not shown
  - Prompt to login
- If logged in:
  - Projects are fetched
  - User can create and manage projects
- Logout clears session

---

## Folder Structure

Backend:

src/
controllers/
routes/
models/
middleware/
config/
app.js


Frontend:

src/
api/
components/
pages/
App.jsx
main.jsx


---

## Setup

### Clone repo

git clone https://github.com/your-username/project-name.git

cd project-name


### Backend

cd backend
npm install
npm run dev


Create `.env`:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret


### Frontend

cd frontend
npm install
npm run dev


---

## API (short)

Auth:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

Projects:
- GET /api/projects
- POST /api/projects
- PUT /api/projects/:id
- DELETE /api/projects/:id

Tasks:
- GET /api/tasks/:projectId
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id

---

## Deployment

- Frontend: Vercel / Netlify
- Backend: Render
- MongoDB: Atlas

(Add your live URLs here)

---



---

## Author

Arpit Yadav