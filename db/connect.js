const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url, {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false // Disable mongoose buffering
        })
        console.log(`Connected to Database : ${url}`)
    } catch (error) {
        console.error(`Connection error to Database: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
}

module.exports = connectDB