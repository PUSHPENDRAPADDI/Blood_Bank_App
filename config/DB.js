const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to DB ${mongoose.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`Mongodb Databae Error ${error}`.bgRed.white);
    }
}

module.exports = connectDB