import cartModel from "../models/cartModel.js";
import orderModel from "../models/orderModel.js";

// ================= Create Order =================
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Cart is empty" });
    }

    // Create order
    const order = await orderModel.create({
      user: req.userId,
      items,
      totalAmount,
      paymentMethod,
      status: paymentMethod === "Cash on Delivery" ? "Completed" : "Pending",
    });

    // Agar order complete ho gaya, cart clear kar do
    if (order.status === "Completed") {
      await cartModel.findOneAndUpdate({ user: req.userId }, { items: [] });
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= Get User Orders =================
export const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.userId })
      .populate("items.item"); // populate item details

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ================= Get Single Order (Optional) =================
export const getOrderById = async (req, res) => {
  try {
    const order = await orderModel
      .findOne({ _id: req.params.id, user: req.userId })
      .populate("items.item");

    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
