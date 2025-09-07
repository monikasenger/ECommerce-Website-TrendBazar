import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaPlus, FaArrowLeft, FaMinus, FaTrash, FaEye, FaUser, FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, user, fetchCart, updateCartItem, removeFromCart } = useApp();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const qtyObj = {};
    cart.forEach((c) => (qtyObj[c.item._id] = c.quantity));
    setQuantities(qtyObj);
  }, [cart]);

  const handleIncrease = async (itemId) => {
    const newQty = quantities[itemId] + 1;
    setQuantities({ ...quantities, [itemId]: newQty });
    await updateCartItem(itemId, newQty);
    fetchCart();
    toast.info("Item quantity increased!");
  };

  const handleDecrease = async (itemId) => {
    if (quantities[itemId] === 1) {
      toast.warn("Minimum quantity is 1");
      return;
    }
    const newQty = quantities[itemId] - 1;
    setQuantities({ ...quantities, [itemId]: newQty });
    await updateCartItem(itemId, newQty);
    fetchCart();
    toast.info("Item quantity decreased!");
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
    fetchCart();
    toast.error("Item removed from cart!");
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      toast.warn("Your cart is empty!");
      return;
    }
    navigate("/checkout", { state: { cart, quantities } });
    toast.success("Proceeding to checkout!");
  };

  const totalAmount = cart.reduce(
    (sum, c) => sum + c.item.price * (quantities[c.item._id] || c.quantity),
    0
  );
  const totalItems = cart.reduce(
    (sum, c) => sum + (quantities[c.item._id] || c.quantity),
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center text-orange-700 flex items-center justify-center gap-2">
        <FaShoppingCart /> Your Cart
      </h2>

      {user && (
        <div className="border p-4 rounded mb-6 bg-orange-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-orange-700">
              <FaUser /> User Details
            </h3>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            {user.address && (
              <p>
                <strong>Address:</strong>{" "}
                {typeof user.address === "object"
                  ? `${user.address.street || ""}, ${user.address.city || ""}, ${user.address.state || ""}, ${user.address.zip || ""}`
                  : user.address}
              </p>
            )}
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
          >
            Edit
          </button>
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((c) => (
              <div
                key={c.item._id}
                className="flex flex-col md:flex-row justify-between items-center border p-4 rounded gap-4 bg-white shadow hover:shadow-lg transition"
              >
                <img
                  src={c.item.image}
                  alt={c.item.name}
                  className="w-28 h-28 object-cover rounded"
                />
                <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full">
                  <div>
                    <h3 className="font-semibold text-lg text-orange-700">{c.item.name}</h3>
                    <p className="font-bold text-orange-600 mt-1">
                      ₹{c.item.price * quantities[c.item._id]}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(c.item._id)}
                      className="p-2 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
                    >
                      <FaMinus />
                    </button>
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded">
                      {quantities[c.item._id]}
                    </span>
                    <button
                      onClick={() => handleIncrease(c.item._id)}
                      className="p-2 bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition"
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:items-end">
                  <Link
                    to={`/item/${c.item._id}`}
                    className="flex items-center gap-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm md:text-base justify-center"
                  >
                    <FaEye /> View
                  </Link>
                  <button
                    onClick={() => handleRemove(c.item._id)}
                    className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm md:text-base justify-center"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Place Order */}
          <div className="mt-6 border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <p>
                <strong>Total Items:</strong> {totalItems}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{totalAmount}
              </p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-lg"
            >
              <FaShoppingCart /> Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
