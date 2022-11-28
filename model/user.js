const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        typeof: String
    },
    lastname: {
        typeof: String
    },
    email: {
        typeof: String,
    },
    password: {
        typeof: String,
    },
    token: {
        typeof: String,

    },    
})

module.exports = mongoose.model("user", userSchema);