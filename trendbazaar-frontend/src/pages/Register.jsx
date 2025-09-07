import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const { api, fetchProfile } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      const { data } = await api.post("/users/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        await fetchProfile();
        toast.success("🎉 Registration successful!");
        navigate("/"); // redirect after registration
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Register error");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-orange-50 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        <FaUser /> Register
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded p-2 gap-2 bg-white">
          <FaUser className="text-orange-500" />
          <input
            type="text"
            placeholder="Name"
            className="w-full outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded p-2 gap-2 bg-white">
          <FaEnvelope className="text-orange-500" />
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center border rounded p-2 gap-2 bg-white">
          <FaLock className="text-orange-500" />
          <input
            type="password"
            placeholder="Password"
            className="w-full outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 transition text-white py-2 rounded font-semibold"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
