const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        typeof: String,
        default: ""
    },
    lastname: {
        typeof: String,
        default: ""
    },
    email: {
        typeof: String,
        default: ""
    },
    password: {
        typeof: String,
        default: ""
    },
    token: {
        typeof: String,

    },    
})

module.exports = mongoose.model("user", userSchema);