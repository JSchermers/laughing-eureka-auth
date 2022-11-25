const mongoose = require('mongoose');

const MONGODB_URL = process.env

exports.connect = () => {
    mongoose.connect(MONGODB_URL, 
        {
            useNewUrlParser: true,
            UseUnifiedTopology: true
        }).then().catch((e) => {
            console.log("connection failed");
            console.log(error);
            process.exit(1)

        })
}