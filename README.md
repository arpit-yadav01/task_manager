🚀 Project & Task Manager

A simple full-stack app where users can create projects and manage tasks inside them. Each user only sees their own data.

🌐 Live Demo
Frontend (Vercel):
https://task-manager-beige-eta.vercel.app
Backend (Render API):
https://task-manager-n38k.onrender.com
loom video url
https://www.loom.com/share/74a0d2509406422fb0f0382a0251d7fa
✨ Features
User can register and login
Create projects
Add tasks inside projects
Update task status (Todo / In Progress / Done)
Delete tasks
Data is user-specific (no access to others’ data)
🛠 Tech Stack
Frontend
React (Vite)
Axios
React Router
Backend
Node.js
Express
MongoDB (Mongoose)
JWT Authentication (HTTP-only cookies)
🔁 App Flow
App opens on /projects
If user is not logged in:
Projects are not shown
User is redirected to login
If user is logged in:
Projects are fetched
User can create and manage projects
Logout clears session
📁 Folder Structure
Backend
src/
  controllers/
  routes/
  models/
  middleware/
  config/
  app.js
Frontend
src/
  api/
  components/
  pages/
  App.jsx
  main.jsx
⚙️ Setup (Local Development)
1️⃣ Clone Repo
git clone https://github.com/arpit-yadav01/task_manager.git
cd task_manager
2️⃣ Backend Setup
cd backend
npm install
npm run dev

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔌 API (Quick Overview)
Auth
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
Projects
GET /api/projects
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id
Tasks
GET /api/tasks/:projectId
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
🚀 Deployment
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas
👨‍💻 Author

Arpit Yadav