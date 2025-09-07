import { useApp } from "../context/AppContext";
import { useEffect } from "react";
import {
  FaBox,
  FaArrowLeft,
  FaCheckCircle,
  FaMoneyBillWave,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Orders = () => {
  const { orders, fetchOrders } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchOrders();
        toast.success("Orders loaded successfully!");
      } catch (error) {
        toast.error("Failed to load orders. Please try again!");
        console.error(error);
      }
    };

    loadOrders();
  }, []);

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
        <FaBox /> Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-4 rounded shadow hover:shadow-lg transition bg-white"
            >
              <p className="flex items-center gap-2">
                <strong>Order ID:</strong> {order._id}
              </p>
              <p className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />{" "}
                <strong>Status:</strong> {order.status}
              </p>
              <p className="flex items-center gap-2">
                <FaMoneyBillWave className="text-orange-500" />{" "}
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <p className="flex items-center gap-2">
                <FaRupeeSign className="text-orange-600" /> <strong>Total:</strong> ₹
                {order.totalAmount}
              </p>

              <div className="mt-4 space-y-3">
                {order.items.map((i) => (
                  <div
                    key={`${order._id}-${i.item._id}`}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={i.item.image}
                      alt={i.item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-orange-700">{i.item.name}</p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        Quantity: {i.quantity} | Price: ₹{i.item.price} | Total: ₹
                        {i.item.price * i.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
