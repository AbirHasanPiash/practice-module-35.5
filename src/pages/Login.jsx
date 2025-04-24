import { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.detail || "Login failed.";
      alert(message);
      console.error("Login error:", err);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await api.post("/auth/users/reset_password/", { email });
      setResetMessage("Password reset link sent. Check your email.");
    } catch (err) {
      const message = err.response?.data?.email?.[0] || "Reset request failed.";
      setResetMessage(message);
      console.error("Password reset error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-900 transition-colors"
        >
          Login
        </button>
      </form>
      
      <div className="mt-4 text-sm">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => setShowReset(true)}
        >
          Forgot your password?
        </button>
        {showReset && (
          <div className="mt-2">
            <button
              onClick={handlePasswordReset}
              className="text-sm text-white bg-black px-3 py-1 rounded hover:bg-gray-900 transition-colors"
            >
              Send Reset Email
            </button>
            {resetMessage && (
              <p className="mt-2 text-gray-700">{resetMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
