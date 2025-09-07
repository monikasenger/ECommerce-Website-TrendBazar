import express  from 'express';

import { getCart, addToCart, removeFromCart, updateCartItem } from '../controllers/cartController.js';
import auth from '../middlerwares/auth.js';



const cartRoutes =express.Router()
cartRoutes.get('/', auth, getCart);
cartRoutes.post('/', auth, addToCart);
cartRoutes.put('/:itemId',auth,updateCartItem);
cartRoutes.delete('/:itemId', auth, removeFromCart);

export default cartRoutes
