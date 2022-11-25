const express = require('express')
require('dotenv').config();

const app = express();
app.get("/", (req, resp) => {
    resp.send("<h1>server is working</h1>")
})
module.exports = app;