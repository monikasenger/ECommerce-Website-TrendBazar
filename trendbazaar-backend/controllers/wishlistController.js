import wishlistModel from '../models/wishlistModel.js';


export const getWishlist = async (req, res) => {
let wishlist = await wishlistModel.findOne({ user: req.userId }).populate('items');
if (!wishlist) wishlist = await wishlistModel.create({ user: req.userId, items: [] });
res.json(wishlist);
};


export const addToWishlist = async (req, res) => {
const { itemId } = req.body;
let wishlist = await wishlistModel.findOne({ user: req.userId });
if (!wishlist) wishlist = await wishlistModel.create({ user: req.userId, items: [] });


if (!wishlist.items.map(i => i.toString()).includes(itemId)) wishlist.items.push(itemId);
await wishlist.save();
wishlist = await wishlist.populate('items');
res.json(wishlist);
};


export const removeFromWishlist = async (req, res) => {
const { itemId } = req.params;
let wishlist = await wishlistModel.findOne({ user: req.userId });
if (!wishlist) return res.status(404).json({ success: false, message: 'Wishlist not found' });


wishlist.items = wishlist.items.filter(i => i.toString() !== itemId);
await wishlist.save();
wishlist = await wishlist.populate('items');
res.json(wishlist);
};