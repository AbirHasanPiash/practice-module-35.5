import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  const login = async (email, password) => {
    const res = await api.post("/auth/jwt/create/", { email, password });
    localStorage.setItem("access", res.data.access);
    api.defaults.headers.common["Authorization"] = `JWT ${res.data.access}`;

    const userRes = await api.get("/auth/users/me/");
    setUser(userRes.data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("access");
    delete api.defaults.headers.common["Authorization"];
  };

  // 🔁 On app load — fetch user if token exists
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      api.defaults.headers.common["Authorization"] = `JWT ${token}`;
      api
        .get("/auth/users/me/")
        .then((res) => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false)); // Done loading
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="p-4">Loading...</div>; // ⏳ Optional loader

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
