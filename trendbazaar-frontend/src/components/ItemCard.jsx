import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaInfoCircle } from "react-icons/fa";
import { useApp } from "../context/AppContext";

const ItemCard = ({ item }) => {
  const { addToWishlist, removeFromWishlist, wishlist } = useApp();

  const inWishlist = wishlist.some((i) => i._id === item._id);

  return (
    <div className="w-full max-w-full border rounded-xl shadow-md hover:shadow-xl transition p-3 relative bg-white group">
      {/* Item Image */}
      <div className="relative w-full overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist Icon */}
        <button
          onClick={() =>
            inWishlist ? removeFromWishlist(item._id) : addToWishlist(item._id)
          }
          className={`absolute top-2 right-2 text-xl z-10 ${
            inWishlist ? "text-orange-600" : "text-gray-400"
          } hover:text-orange-500 bg-white p-1 rounded-full shadow`}
        >
          <FaHeart />
        </button>
      </div>

      {/* Item Info */}
      <h3 className="text-lg font-semibold mt-3 text-orange-700 truncate w-full">
        {item.name}
      </h3>
      <p className="text-orange-600 font-bold text-sm sm:text-base md:text-lg w-full">
        ₹{item.price}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between mt-3 items-center gap-2">
        <Link
          to={`/item/${item._id}`}
          className="flex-1 flex items-center justify-center gap-1 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm sm:text-base"
        >
          <FaInfoCircle /> View
        </Link>

        <button className="flex-1 flex items-center justify-center gap-1 bg-yellow-400 text-orange-800 px-3 py-1 rounded hover:bg-yellow-300 text-sm sm:text-base">
          <FaShoppingCart /> Add
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
