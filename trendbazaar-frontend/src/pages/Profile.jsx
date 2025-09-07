import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { toast } from "react-toastify";
import {
  FaUser,
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaVenusMars,
  FaHome,
  FaSave,
  FaTimes,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, updateProfile, fetchProfile } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    image: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob || "",
        gender: user.gender || "",
        address: user.address ? JSON.stringify(user.address) : "",
        image: null,
      });
    }
  }, [user]);

  if (!user) return <p className="p-6">Please login to see profile.</p>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    const toastId = toast.loading("Updating profile...");
    try {
      await updateProfile(data);
      await fetchProfile();
      setEditMode(false);
      toast.update(toastId, {
        render: "Profile updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to update profile",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow bg-orange-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center gap-2">
        <FaUser /> Profile
      </h2>

      <div className="mb-4 flex flex-col items-center">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-2 object-cover border-2 border-orange-400"
          />
        )}
        {editMode && (
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border p-1 rounded w-full"
          />
        )}
      </div>

      {/* Fields */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FaUser className="text-orange-500" />
          <label className="font-semibold">Name:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
            />
          ) : (
            <p className="flex-1">{user.name}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaEnvelope className="text-orange-500" />
          <label className="font-semibold">Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
            />
          ) : (
            <p className="flex-1">{user.email}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaPhone className="text-orange-500" />
          <label className="font-semibold">Phone:</label>
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
            />
          ) : (
            <p className="flex-1">{user.phone || "-"}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaBirthdayCake className="text-orange-500" />
          <label className="font-semibold">Date of Birth:</label>
          {editMode ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
            />
          ) : (
            <p className="flex-1">{user.dob || "-"}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <FaVenusMars className="text-orange-500" />
          <label className="font-semibold">Gender:</label>
          {editMode ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="flex-1">{user.gender || "-"}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <FaHome className="text-orange-500 mt-1" />
          <label className="font-semibold">Address:</label>
          {editMode ? (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="flex-1 border p-1 rounded"
              rows={3}
            />
          ) : (
            <p className="flex-1">
              {user.address ? JSON.stringify(user.address) : "-"}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-2 flex-wrap">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-700 transition"
            >
              <FaSave /> Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-500 transition"
            >
              <FaTimes /> Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-orange-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-orange-700 transition"
          >
            <FaEdit /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
