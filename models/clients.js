const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:{
        type: String
    },
    phone:{
        type: String,
        required:[true, 'Phone Number is required']
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
        type: String,
        default: () => new Date().toLocaleString()
    }
})

module.exports = mongoose.model("Clients", clientSchema)