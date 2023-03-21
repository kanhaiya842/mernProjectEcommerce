const app = require('./app');

const connectDB = require('./config/database');
const cloudinary = require("cloudinary");

// Handling Uncaught Exception -- this type of error includes using a variable without declaring it..
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


/* Config */
if(process.env.NODE_ENV !== "PRODUCTION"){
    require('dotenv').config({ path: "backend/config/config.env" }) // dotenv is downloaded to congfigure env file..
}

//Connecting to DB
connectDB();

//Setting up the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`)
})

//Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error : ${err.message}`);
    console.log("Closing the server due to unhandled Promise Rejection!!");

    server.close(() => {
        process.exit(1);
    })
})