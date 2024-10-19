const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers/index");


// const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegexp = /^[0-9()+\s-]+$/;


const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false,
    },
}, {versionKey: false, timestamps: true});


contactSchema.post("save", handleMongooseError);

const addAdminPanelContactSchema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
        "string.min": "Name must be at least 2 characters long.",
        "string.max": "Name must be at most 30 characters long.",
        "any.required": "Name is required.",
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "string.pattern.base": "Invalid phone number",
        "any.required": "phone number is required.",
    }),
});


const updateSchema = Joi.object({
    name: Joi.string().min(2).max(30).required().messages({
        "string.min": "Name must be at least 2 characters long.",
        "string.max": "Name must be at most 30 characters long.",
        "any.required": "Name is required.",
    }),
    phone: Joi.string().pattern(phoneRegexp).required().messages({
        "string.pattern.base": "Invalid phone number",
        "any.required": "phone number is required.",
    }),
});


const Contact = model("contacts", contactSchema);
const schemas = { 
    addAdminPanelContactSchema, 
    updateSchema, 
};

module.exports = {Contact, schemas};