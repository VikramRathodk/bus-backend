const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || '9f55d3e85a15e0f15ecc14bda166af4bc28791bd4dfaea271917c23b4989dfcdddc665f5101b6e968d370c175a36d25c0d4c89a216fd75e9139c13d2a2efc562';

 const generateToken = (userId) =>{
     return jwt.sign({userId}, SECRET_KEY, {expiresIn: "1h"});
 }

 const verifyToken = (token) =>{
     return jwt.verify(token, SECRET_KEY);
 }

 module.exports = {
     generateToken,
     verifyToken
 }