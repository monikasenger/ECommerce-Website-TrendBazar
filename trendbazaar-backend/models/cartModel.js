import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [   
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, default: 1 }
    }
  ]
}, { timestamps: true });

const cartModel = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default cartModel;
