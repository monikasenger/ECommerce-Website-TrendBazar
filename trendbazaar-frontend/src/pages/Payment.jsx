import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  FaRupeeSign,
  FaArrowLeft,
  FaCreditCard,
  FaMoneyBillWave,
  FaQrcode,
} from "react-icons/fa";
import { toast } from "react-toastify";

const Payment = () => {
  const { state } = useLocation();
  const { createOrder } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const handlePayment = async () => {
    const orderData = {
      items: state.orderItems.map((c) => ({
        item: c.item._id,
        quantity: state.quantities[c.item._id] || c.quantity,
      })),
      totalAmount: state.totalAmount,
      paymentMethod,
    };

    try {
      await createOrder(orderData);
      toast.success("Payment successful! Order placed.");
      navigate("/orders");
    } catch (err) {
      toast.error("Payment failed. Please try again!");
      console.error(err);
    }
  };

  const paymentIcons = {
    "Credit Card": <FaCreditCard className="text-orange-600" />,
    UPI: <FaQrcode className="text-orange-600" />,
    "Cash on Delivery": <FaMoneyBillWave className="text-orange-600" />,
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-600 mb-4 hover:underline"
      >
        <FaArrowLeft /> Back
      </button>

      <h2 className="text-2xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        <FaRupeeSign /> Payment
      </h2>

      <div className="border p-4 rounded mb-6 bg-orange-50">
        <h3 className="font-semibold mb-2 text-orange-700">Order Total</h3>
        <p className="text-lg font-bold text-orange-600 flex items-center gap-1">
          <FaRupeeSign /> {state.totalAmount}
        </p>
      </div>

      <div className="border p-4 rounded mb-6 bg-white shadow-sm">
        <h3 className="font-semibold mb-2 text-orange-700">
          Select Payment Method
        </h3>
        <div className="flex flex-col gap-3">
          {["Credit Card", "UPI", "Cash on Delivery"].map((method) => (
            <label
              key={method}
              className="flex items-center gap-2 p-2 border rounded hover:bg-orange-50 cursor-pointer transition"
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2 accent-orange-500"
              />
              {paymentIcons[method]}
              <span className="text-orange-600 font-medium">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full md:w-auto px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
      >
        Complete Payment
      </button>
    </div>
  );
};

export default Payment;
