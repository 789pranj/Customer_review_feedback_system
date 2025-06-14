import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { fetchUser } from "./api/auth";
import { useAuthStore } from "./store/auth";
import AudioUpload from "./pages/AudioUpload";
import LiveAudio from "./pages/LiveAudio";

const App = () => {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser()
      .then((res) => setUser(res.data.user))
      .catch(() => clearUser())
      .finally(() => setLoading(false));
  }, [setUser, clearUser]);

  if (loading) return <p>Loading...</p>; // Show while fetching user

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/audio-upload"
          element={
            <ProtectedRoute>
              <AudioUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live-record"
          element={
            <ProtectedRoute>
              <LiveAudio />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
