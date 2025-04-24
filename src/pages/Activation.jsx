import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Activation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await api.post("/auth/users/activation/", { uid, token });
        navigate("/welcome");
      } catch (err) {
        console.error("Activation failed:", err.response?.data || err.message);
        alert("Activation failed. Link may be invalid or expired.");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="text-center mt-20">
      <h2 className="text-xl font-semibold">Activating your account...</h2>
    </div>
  );
};

export default Activation;
