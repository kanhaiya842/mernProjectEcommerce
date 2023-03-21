const mongoose = require("mongoose");

const connectDB = () => {
    mongoose.connect(process.env.DB_URI, {}).then((data) => {
        console.log(`Mongo DB connected with server: ${data.connection.host} `)
    }).catch((err) => {
        console.log("Error while connecting DB is final and is",err);
    })
}

module.exports = connectDB;