import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState, useEffect } from "react";
import { FaUser,FaArrowLeft, FaMapMarkerAlt, FaShoppingCart, FaArrowRight } from "react-icons/fa";

const Checkout = () => {
  const { state } = useLocation();
  const { cart, user } = useApp();
  const navigate = useNavigate();

  const [orderItems, setOrderItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const items = state?.cart || cart;
    const qty = state?.quantities || {};
    setOrderItems(items);
    setQuantities(qty);

    const total = items.reduce(
      (sum, c) => sum + c.item.price * (qty[c.item._id] || c.quantity),
      0
    );
    setTotalAmount(total);
  }, [state, cart]);

  const handleContinue = () => {
    navigate("/payment", { state: { orderItems, quantities, totalAmount } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-orange-700 flex items-center justify-center gap-2">
        <FaShoppingCart /> Order Summary
      </h2>

      {user && (
        <div className="border p-4 rounded mb-6 bg-orange-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-orange-700">
              <FaUser /> Shipping Details
            </h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            {user.address && (
              <p className="flex items-start gap-1">
                <FaMapMarkerAlt className="mt-1 text-orange-600" />
                <span>
                  <strong>Address:</strong>{" "}
                  {typeof user.address === "object"
                    ? `${user.address.street || ""}, ${user.address.city || ""}, ${user.address.state || ""}, ${user.address.zip || ""}`
                    : user.address}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-4 mb-6">
        {orderItems.map((c) => (
          <div
            key={c.item._id}
            className="flex flex-col md:flex-row justify-between items-center border p-4 rounded bg-white shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              <img
                src={c.item.image}
                alt={c.item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-orange-700">{c.item.name}</p>
                <p className="text-orange-600 font-semibold">Qty: {quantities[c.item._id] || c.quantity}</p>
              </div>
            </div>
            <p className="font-bold text-orange-700 text-lg mt-2 md:mt-0">
              ₹{c.item.price * (quantities[c.item._id] || c.quantity)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center border-t pt-4 mb-6 gap-4">
        <p className="font-semibold text-orange-700 text-lg">Total Amount:</p>
        <p className="font-bold text-2xl text-orange-600">₹{totalAmount}</p>
      </div>

      <button
        onClick={handleContinue}
        className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded hover:bg-orange-700 transition mx-auto md:mx-0 text-lg"
      >
        Continue to Payment <FaArrowRight />
      </button>
    </div>
  );
};

export default Checkout;
