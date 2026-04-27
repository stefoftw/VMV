const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type: String,
        required:[true, 'Phone Number is required'],
        index: true // Add index for faster searches
    },
    information:{
        type: String
    },
    money:{
        type: Number
    },
    fixed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now,
        index: true // Add index for sorting
    }
})

module.exports = mongoose.model("Clients", clientSchema)