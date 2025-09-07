import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaHeart, FaArrowLeft, FaCartPlus, FaShoppingBag, FaTag } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import ItemCard from "../components/ItemCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    items,
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
  } = useApp();

  const item = items.find((i) => i._id === id);

  const inCart = cart.some((i) => i.item._id === item?._id);
  const inWishlist = wishlist.some((i) => i._id === item?._id);

  const cartItem = cart.find((i) => i.item._id === item?._id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(item._id);
      toast.info(`${item.name} removed from Wishlist`);
    } else {
      addToWishlist(item._id);
      toast.success(`${item.name} added to Wishlist `);
    }
  };

  const handleAddToCart = () => {
    if (!inCart) {
      addToCart(item._id, quantity);
      toast.success(`${item.name} added to Cart `);
    } else {
      toast.info(`${item.name} is already in Cart`);
    }
  };

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(item._id, quantity);
    }
    toast.success(`Proceeding to Checkout... `);
    setTimeout(() => {
      navigate("/cart");
    }, 1600);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!item) return <p className="p-6">Item not found</p>;

  // Similar items by category
  const similarItems = items.filter(
    (i) => i.category === item.category && i._id !== item._id
  );

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
      {/* Toast Container */}
      <ToastContainer />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={item.image}
          alt={item.name}
          className="w-full md:w-64 h-64 object-cover rounded shadow-md hover:shadow-xl transition-shadow duration-300"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-orange-700 flex items-center gap-2">
            <FaTag /> {item.name}
          </h1>
          <p className="text-gray-600 mt-2">{item.description}</p>
          <p className="text-xl font-semibold mt-2 text-orange-600">₹{item.price}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={decreaseQuantity}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
            >
              -
            </button>
            <span className="px-2 font-semibold">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
            >
              +
            </button>
          </div>

          {/* Wishlist & Cart Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleWishlist}
              className={`text-2xl ${inWishlist ? "text-orange-600" : "text-gray-400"
                } hover:text-orange-500 transition`}
            >
              <FaHeart />
            </button>

            {!inCart ? (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1 px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                <FaCartPlus /> Add to Cart
              </button>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="flex items-center gap-1 px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  <FaShoppingBag /> Go to Cart
                </Link>
                <button
                  onClick={handleBuyNow}
                  className="flex items-center gap-1 px-4 py-2 rounded bg-yellow-400 text-orange-800 hover:bg-yellow-300 transition"
                >
                  <FaShoppingBag /> Buy Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Similar Items */}
      {similarItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-orange-700 flex items-center gap-2">
            <FaTag /> Similar Items
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similarItems.map((simItem) => (
              <ItemCard key={simItem._id} item={simItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
