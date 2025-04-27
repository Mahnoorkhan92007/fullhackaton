import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TaskBoard from './components/TaskBoard';
import Signup from './Signup';
import Login from './Login';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <TaskProvider>
      <Router>
        <Routes>
          {/* Signup page as the default route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Redirect to login if user is not logged in */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* TaskBoard route is protected, user must be logged in */}
          <Route path="/taskboard" element={isLoggedIn ? <TaskBoard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
