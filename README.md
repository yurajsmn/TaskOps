# TaskOps Enterprise Platform

TaskOps is a full-stack, enterprise-grade project management application built with the **MERN** (MongoDB, Express, React, Node.js) stack. It features a sophisticated, modern **3D glassmorphism interface**, delivering a premium and dynamic user experience.

## Features
- **Role-Based Access Control**: Secure login/signup system with distinct permissions for `Admin` and `Member` roles.
- **Project Management**: Admins can create new projects and dynamically assign members to them. (Only the Admin who creates a project can assign members to it).
- **Task Kanban Board**: Seamlessly create tasks, assign them to team members within specific projects, and track their progress through 'Todo', 'In-Progress', and 'Done' stages.
- **Dynamic Dashboard**: View real-time statistics including active projects, completed tasks, and total team members.
- **Modern UI**: A responsive, high-fidelity user interface featuring glassmorphism styles, hover effects, and modern typography.

## Tech Stack
- **Frontend**: React (Vite), React Router, CSS3 (Glassmorphism design)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcryptjs

## Prerequisites
Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- A MongoDB cluster/URI

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repository-url>
   cd taskops
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside the `/backend` folder:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5001
   ```
   *Optional: Seed the database with initial Admin and Member accounts, as well as dummy projects:*
   ```bash
   node seed.js
   ```
   Run the backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**:
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**:
   The frontend runs by default on `http://localhost:5173`. Open your browser to explore TaskOps.
   
   *If you seeded the database, you can log in with:*
   - **Admin:** `admin@taskops.com` / `admin123`
   - **Member:** `member@taskops.com` / `member123`

## License
MIT License
