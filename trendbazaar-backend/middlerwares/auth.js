import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {
try {
const authHeader = req.headers['authorization'];
if (!authHeader) return res.status(401).json({ success: false, message: 'Not authorized' });


const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ success: false, message: 'Token missing' });


const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.userId = decoded.id;
next();
} catch (error) {
console.error(error);
return res.status(401).json({ success: false, message: 'Invalid Token' });
}
};


export default auth;