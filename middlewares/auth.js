const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("./catchAsync");
const cookieParser = require('cookie-parser');


// exports.isAuthenticated = catchAsync(async (req, res, next) => {
//   const { token } = req.cookies;
 
//   console.log("Token in cookie:", token);
//   if (!token) {
//     return next(new ErrorHandler("Please Login/Signup to Access", 401));
//   }

//   const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await User.findById(decodedData.id);
//   next();
// });
exports.isAuthenticated = catchAsync(async (req, res, next) => {
  // Get token from authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
      return next(new ErrorHandler("Please  Login/SignUp to access", 401));
  }
  const token = authHeader.split(' ')[1]; // Extract token without 'Bearer ' prefix
  
  try {
      // Verify token
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedData.id);
      next();
  } catch (error) {
      return next(new ErrorHandler("Invalid Credentials", 401));
  }
});