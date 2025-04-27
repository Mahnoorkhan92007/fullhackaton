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
          {/* Default route will show Signup if the user is not logged in */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Redirect to TaskBoard if logged in, otherwise Signup */}
          <Route path="/" element={isLoggedIn ? <TaskBoard /> : <Signup />} />

          {/* TaskBoard route is protected, user must be logged in */}
          <Route path="/taskboard" element={isLoggedIn ? <TaskBoard /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
}

export default App;
