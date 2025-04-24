import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const PasswordResetConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    new_password: "",
    re_new_password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        ...form,
      });
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      const error = err.response?.data;
      const message = error
        ? Object.values(error).flat().join("\n")
        : "Reset failed.";
      setMessage(message);
      console.error("Reset confirm error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Set New Password</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={form.new_password}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <input
          type="password"
          name="re_new_password"
          placeholder="Re-enter New Password"
          value={form.re_new_password}
          onChange={handleChange}
          className="p-2 border"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-900 transition-colors"
        >
          Confirm Reset
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
};

export default PasswordResetConfirm;
