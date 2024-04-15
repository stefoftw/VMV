const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        await mongoose.connect(url)
        console.log(`Connected to Database : ${url}`)
    } catch (error) {
        console.error(`Connection error to Database: ${error.stack} on Worker process: ${process.pid}`)
        process.exit(1)
    }
}

module.exports = connectDB