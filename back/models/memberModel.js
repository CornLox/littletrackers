const mongoose = require("mongoose")

const Schema = mongoose.Schema

const memberSchema = new Schema({
    forename_el: {
        type: String,
        required: true
    },
    forename_en: {
        type: String,
        required: true
    },
    surname_el: {
        type: String,
        required: true
    },
    surname_en: {
        type: String,
        required: true
    },
    role_el:{
        type: String,
        required: false
    },
    role_en:{
        type: String,
        required: false
    },
    
    cv_el:{
        type: String,
        required: true
    },
    cv_en:{
        type: String,
        required: true
    },
    
    photo:{
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    

},{timestamps: true})

module.exports = mongoose.model("Member",memberSchema)
