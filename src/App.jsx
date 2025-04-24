import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./auth/AuthProvider";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import PasswordResetConfirm from "./pages/PasswordResetConfirm";
import Activation from "./pages/Activation";
import Welcome from "./pages/Welcome";

function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-black text-white p-4 flex gap-4 justify-between">
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          {user && <Link to="/dashboard">Dashboard</Link>}
        </div>
        <div className="flex gap-4">
          {user ? (
            <>
              <span className="text-gray-400">Hi, {user.email}</span>
              <button onClick={handleLogout} className="underline text-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/reset/confirm/:uid/:token"element={<PasswordResetConfirm />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/auth/activate/:uid/:token" element={<Activation />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
