import itemModel from '../models/itemModel.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


export const getItems = async (req, res) => {
const { category, minPrice, maxPrice, q } = req.query;
const filter = {};
if (category) filter.category = category;
if (minPrice || maxPrice) filter.price = {};
if (minPrice) filter.price.$gte = Number(minPrice);
if (maxPrice) filter.price.$lte = Number(maxPrice);
if (q) filter.name = { $regex: q, $options: 'i' };


const items = await itemModel.find(filter);
res.json(items);
};


export const getItemById = async (req, res) => {
const item = await itemModel.findById(req.params.id);
if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
res.json(item);
};


export const createItem = async (req, res) => {
const data = req.body;
if (req.file) {
const upload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
data.image = upload.secure_url;
try { fs.unlinkSync(req.file.path); } catch {}
}


const item = new itemModel(data);
await item.save();
res.status(201).json(item);
};


export const updateItem = async (req, res) => {
const data = req.body;
if (req.file) {
const upload = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
data.image = upload.secure_url;
try { fs.unlinkSync(req.file.path); } catch {}
}
const item = await itemModel.findByIdAndUpdate(req.params.id, data, { new: true });
res.json(item);
};


export const deleteItem = async (req, res) => {
await Item.findByIdAndDelete(req.params.id);
res.json({ success: true, message: 'Item deleted' });
};