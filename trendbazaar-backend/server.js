import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRoutes from './routes/userRoutes.js'
import itemsRoutes from './routes/itemsRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


//app config
const app= express()
const port =process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())


//api endpoints
app.use('/api/users', userRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/orders',orderRoutes);

app.get('/',(req,res)=>{
res.send('API WORKING ')
})

app.listen(port, ()=> console.log("Server Started", port))