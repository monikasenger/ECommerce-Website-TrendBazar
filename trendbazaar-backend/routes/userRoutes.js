import express  from 'express';
import { getProfile, loginUser, registerUser, updateProfile  } from '../controllers/userController.js';
import auth from '../middlerwares/auth.js';
import upload from '../middlerwares/multer.js';

const userRoutes =express.Router()
userRoutes.post('/register', registerUser );
userRoutes.post('/login', loginUser);
userRoutes.get('/profile', auth, getProfile);
userRoutes.put('/profile', auth, upload.single("image"), updateProfile);
export default userRoutes