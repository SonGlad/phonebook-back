const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");


const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const userSchema = new Schema ({
    username: {
        type: String,
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Set password for the user"],
    },
    token: {
        type: String,
        default: null,
    },

}, {versionKey:false, timestamps: true});


userSchema.post("save", handleMongooseError);


const registerSchema = Joi.object({
    username: Joi.string().min(2).max(30).required().messages({
        "string.min": "Name must be at least 2 characters long.",
        "string.max": "Name must be at most 30 characters long.",
        "any.required": "Name is required.",
    }),
    email: Joi.string().pattern(emailRegexp).required().messages({
        "string.pattern.base": "Invalid email address.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long.",
        "any.required": "Password is required.",
    }),
});


const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        "string.pattern.base": "Invalid email address.",
        "any.required": "Email is required.",
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long.",
        "any.required": "Password is required.",
    }),
});



const schemas = { 
    registerSchema, 
    loginSchema, 
};
const User = model("users", userSchema);


module.exports = {schemas, User};