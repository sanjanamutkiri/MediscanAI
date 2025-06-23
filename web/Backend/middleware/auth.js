const ErrorHander = require('../utils/errorHander');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    let token;
    
    // Check cookies first
    if (req.cookies.token) {
        token = req.cookies.token;
    }
    // Then check Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorHander("Please login to access this feature", 401));
    }
    
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    
    next();
})

exports.authorizeRoles = (...roles) => {
    return catchAsyncError(async(req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(`Role: ${req.user.role} is not allowed to access this resource`, 403)
            )
        }
        next();
    })
    console.log("Received token:", req.headers.authorization);

}