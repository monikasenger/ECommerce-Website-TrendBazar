import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
}, { timestamps: true });

const wishlistModel = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
export default wishlistModel;
