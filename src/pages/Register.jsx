import { useState } from "react";
import api from "../api/axios";

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/users/", form);
      setSubmitted(true);
      alert("Registration successful. Please check your email for activation.");
    } catch (err) {
      const errorData = err.response?.data;
      console.error("Registration error:", errorData);

      const message = errorData
        ? Object.values(errorData).flat().join("\n")
        : "Registration failed. Please try again.";

      alert(message);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/users/resend_activation/", { email: form.email });
      alert("Activation email resent. Please check your inbox.");
    } catch (err) {
      const msg = err.response?.data?.email?.[0] || "Resend failed.";
      alert(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} className="p-2 border" required />
        <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} className="p-2 border" required />
        <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} className="p-2 border" required />
        <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} className="p-2 border" required />
        <input name="re_password" placeholder="Re-enter Password" type="password" value={form.re_password} onChange={handleChange} className="p-2 border" required />
        <button type="submit" className="bg-black text-white py-2 rounded hover:bg-gray-900 transition-colors">
          Register
        </button>
      </form>

      {submitted && (
        <div className="mt-4">
          <p className="text-sm mb-2">Didn’t receive the activation email?</p>
          <button
            onClick={handleResend}
            className="bg-black text-white p-2 rounded hover:bg-gray-900 transition-colors"
          >
            Resend Activation Email
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
