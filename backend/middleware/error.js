const ErrorHandler = require('../utils/errorHandler');
const errorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    //Wrong MOngoDB ID Error handling
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // Mongoose dupliacte key error
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered!!`;
        err = new ErrorHandler(message,400);
    }

    // Wrong JWt error
    if(err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try again!!";
        err = new ErrorHandler(message,400);
    }

    // JWT EXPIRE error
    if(err.name === "TokenExpiredError") {
        const message = "Json Web Token is expired, Try again!!";
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success: false,
        error: err.message
    })
}