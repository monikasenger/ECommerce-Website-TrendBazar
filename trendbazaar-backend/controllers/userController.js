import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import userModel from '../models/userModel.js';


// register
export const registerUser = async (req, res) => {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ success: false, message: 'Missing details' });
if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: 'Invalid email' });
if (password.length < 8) return res.status(400).json({ success: false, message: 'Password too short' });


const existing = await userModel.findOne({ email });
if (existing) return res.status(400).json({ success: false, message: 'Email already registered' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


const user = new userModel({ name, email, password: hashed });
await user.save();


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.status(201).json({ success: true, token });
};


// login
export const loginUser = async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ success: false, message: 'Missing credentials' });


const user = await userModel.findOne({ email }).select('+password');
if (!user) return res.status(400).json({ success: false, message: 'User does not exist' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ success: true, token });
};


// get profile
export const getProfile = async (req, res) => {
const userId = req.userId || req.body.userId;
if (!userId) return res.status(400).json({ success: false, message: 'User ID missing' });


const user = await userModel.findById(userId).select('-password');
if (!user) return res.status(404).json({ success: false, message: 'User not found' });


res.json({ success: true, userData: user });
};


// update profile
export const updateProfile = async (req, res) => {
const { name, phone, address, dob, gender } = req.body;
const userId = req.userId || req.body.userId;
if (!userId) return res.status(400).json({ success: false, message: 'User ID missing' });
if (!name || !phone || !dob || !gender) return res.status(400).json({ success: false, message: 'Missing fields' });


const updateData = { name, phone, dob, gender };
if (address) {
try { updateData.address = typeof address === 'string' ? JSON.parse(address) : address; } catch { updateData.address = address; }
}


await userModel.findByIdAndUpdate(userId, updateData);


if (req.file) {
const uploadRes = await cloudinary.uploader.upload(req.file.path, { resource_type: 'image' });
await userModel.findByIdAndUpdate(userId, { image: uploadRes.secure_url });
try { fs.unlinkSync(req.file.path); } catch {}
}


res.json({ success: true, message: 'Profile updated' });
};