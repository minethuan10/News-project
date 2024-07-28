import React, { useEffect, useState } from "react";
import "./bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import { NavBar } from "./components/navbar";
import Login from "./components/login";
import SignUp from "./components/register";
import MainPage from "./components/MainPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/profile";
import { auth } from "./components/firebase";
import { AuthProvider } from "./components/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import Home from "./components/Home";

function App() {
  const [user, setUser] = useState();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <Router>
        <div className={`App ${darkMode ? 'dark-mode' : ''}`} style={{ minHeight: '100vh', position: 'relative' }}>
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Routes>
                <Route path="/" element={user ? <Navigate to="/" /> : <Home darkMode={darkMode} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/navbar" element={<NavBar darkMode={darkMode} />} />
                <Route path="/ForgotPassword" element={<ForgotPassword />} />
                <Route path="/MainPage" element={<MainPage />} />
              </Routes>
              <ToastContainer />
            </div>
          </div>
          <div 
            style={{ 
              position: 'absolute', 
              bottom: '20px', 
              right: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              backgroundColor: darkMode ? '#333' : '#fff', // Change background color
              color: darkMode ? '#fff' : '#000', // Change text color
              padding: '10px', // Optional: add padding for better appearance
              borderRadius: '5px', // Optional: rounded corners
              zIndex: 1000 // Ensure it's above other content
            }}
          >
            <FontAwesomeIcon 
              icon={darkMode ? faSun : faMoon} 
              style={{ marginRight: '10px', color: darkMode ? '#fff' : '#000' }} // Change icon color
            />
            <label className="switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
