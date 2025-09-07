import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const { api, fetchProfile } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        await fetchProfile(); // fetch user after setting token
        toast.success(" Login successful!");
        setTimeout(() => navigate("/"), 1500); // thoda delay for better UX
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login error",);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Toast container */}
      <ToastContainer />

      <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        <FaSignInAlt /> Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute top-2 left-3 text-orange-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <FaLock className="absolute top-2 left-3 text-orange-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 pl-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
