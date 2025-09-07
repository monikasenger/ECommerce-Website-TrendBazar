import express  from 'express';

import { getItems, createItem, updateItem, deleteItem, getItemById } from '../controllers/itemController.js';
import auth from '../middlerwares/auth.js';
import upload from '../middlerwares/multer.js';


const itemsRoutes =express.Router()
itemsRoutes.get('/', getItems);
itemsRoutes.get('/:id', getItemById);
itemsRoutes.post('/', auth, upload.single('image'), createItem);
itemsRoutes.put('/:id', auth, upload.single('image'), updateItem);
itemsRoutes.delete('/:id', auth, deleteItem);

export default itemsRoutes
