require('./database/database').connect();
const express = require('express');
const User = require('./model/user');
require('dotenv').config();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json);
app.use(cookieParser);
app.get("/", (req, resp) => {
    resp.send("<h1>server is working</h1>")
})

app.post("register", async (req, resp) => {
    try {
        // get data
        const { firstname, lastname, email, password } = req.body;
        if(!(firstname && lastname && email && password)) {
            resp.status(400).send("alll fields all mandatory")
        }
        // all data should exist
        const existingUser = await User.findOne({email})
        
        // check if user exists
        if(existingUser) {
            resp.status(401).send("user allready created")
        }
        // encrypt password
        const encPassword = await bcrypt.hash(password, 10)

        // save user in db
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: encPassword
        })

        // generate token for user and send it
        
        const token = jwt.sign({
            id: user._id,
            email
        }, process.env.SECRET, {
            expiresIn: "2h"
        } )

        user.token = token;
        user.password = undefined;

        resp.status(200).json(user)

        
    } catch (error) {
        console.log(error)
    }
})

app.post("login", async (req, resp) => {
    try {
        // get all data from user
        const {email, password} = req.body;
        // find user in db

        if(!(email && password)) {
            resp.status(400).send("send all mandatory fields")
        }
        // match password
        const user = await user.findOne({email});

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({id: user._id}, process.env.SECRET,{
                expiresIn: '2h'
            })
            user.token = token;
            user.password = undefined

            //send token in usercookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly
            }
            resp.status(200).cookie("token", token, options).json({
                succes: true,
                token,
            })
 
        }

    } catch(error) {
        console.log(error);
    }
})
module.exports = app;