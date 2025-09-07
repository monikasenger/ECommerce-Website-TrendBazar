import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import auth from '../middlerwares/auth.js';


const wishlistRoutes = express.Router();
wishlistRoutes.get('/', auth, getWishlist);
wishlistRoutes.post('/', auth, addToWishlist);
wishlistRoutes.delete('/:itemId', auth, removeFromWishlist);

export default wishlistRoutes;
