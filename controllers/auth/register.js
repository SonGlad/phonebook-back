const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const {HttpError, ctrlWrapper} = require("../../helpers/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");


const { SECRET_KEY } = process.env;


const register = async(req, res) => {
    const {email, password} = req.body;
    console.log(req.body);
    

    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});

    const payload = {id: newUser._id};
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    const registeredUser = await User.findByIdAndUpdate(newUser._id, { token } );


    res.status(201).send({
        token,
        email: registeredUser.email,
        username: registeredUser.username,
    })
};


module.exports = {
    register: ctrlWrapper(register)
};