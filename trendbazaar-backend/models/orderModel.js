import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Failed"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
