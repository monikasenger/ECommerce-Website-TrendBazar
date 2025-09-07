import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlist } = useApp();
  const navigate = useNavigate();

  // Show toast if wishlist is empty
  useEffect(() => {
    if (wishlist.length === 0) {
      toast.warning("Your wishlist is empty!");
    }
  }, [wishlist]);

  const handleView = (itemName) => {
    toast.success(`Opening details for ${itemName}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        <FaHeart /> Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlist.map((item) => (
            <li
              key={item._id}
              className="border p-4 rounded flex justify-between items-center bg-orange-50 hover:bg-orange-100 transition"
            >
              {/* Item Image */}
              <img
                src={item.image || "/assets/default-item.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              {/* Item Name and Icon */}
              <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4 ml-4">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-orange-500 text-xl" />
                  <span className="font-semibold">{item.name}</span>
                </div>

                {/* Price */}
                <span className="font-bold text-orange-600">₹{item.price}</span>

                {/* View Button */}
                <Link
                  to={`/item/${item._id}`}
                  onClick={() => handleView(item.name)}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
