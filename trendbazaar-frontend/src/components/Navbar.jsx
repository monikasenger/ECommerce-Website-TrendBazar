import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { FaShoppingCart, FaHeart, FaUser, FaStore, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { cart, wishlist, user, setUser } = useApp();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/login");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-orange-600 text-white p-4 shadow-md relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-yellow-200">
          <FaStore /> Trend Bazar
        </Link>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Links */}
        <div
          className={`md:flex md:items-center md:gap-6 w-full md:w-auto absolute md:static top-16 left-0 md:top-auto bg-orange-600 md:bg-transparent transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            to="/"
            className="block px-4 py-3 md:py-0 hover:text-yellow-200 flex items-center gap-1"
            onClick={() => setMenuOpen(false)}
          >
            <FaStore /> Home
          </Link>

          <Link
            to="/items"
            className="block px-4 py-3 md:py-0 hover:text-yellow-200 flex items-center gap-1"
            onClick={() => setMenuOpen(false)}
          >
            <FaStore /> Items
          </Link>

          <Link
            to="/wishlist"
            className="relative block px-4 py-3 md:py-0 hover:text-yellow-200 flex items-center gap-1"
            onClick={() => setMenuOpen(false)}
          >
            <FaHeart size={20} /> Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative block px-4 py-3 md:py-0 hover:text-yellow-200 flex items-center gap-1"
            onClick={() => setMenuOpen(false)}
          >
            <FaShoppingCart size={20} /> Cart
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User Authentication */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-4 py-3 md:py-0 w-full md:w-auto hover:text-yellow-200"
              >
                <FaUser /> <span className="truncate max-w-[100px]">{user.name}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Orders
                  </Link>
                  <Link
                    to="/cart"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Cart
                  </Link>
                  <Link
                    to="/wishlist"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Wishlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-orange-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col md:flex-row gap-2 px-4 py-3 md:py-0">
              <Link
                to="/login"
                className="bg-white text-orange-600 px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser /> Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-orange-800 px-3 py-1 rounded hover:bg-yellow-500 flex items-center gap-1"
                onClick={() => setMenuOpen(false)}
              >
                <FaUser /> Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
