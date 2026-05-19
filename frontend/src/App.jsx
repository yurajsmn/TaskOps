import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard';
import TaskBoard from './pages/TaskBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';

function DashboardLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <Header />
      <main className="main-content">
        <div className="page-container">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/projects" element={<DashboardLayout><Projects /></DashboardLayout>} />
        <Route path="/tasks" element={<DashboardLayout><TaskBoard /></DashboardLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
