const mongoose = require("mongoose")

const Schema = mongoose.Schema

const programmeSchema = new Schema({
    title_el: {
        type: String,
        required: true
    },
    title_en: {
        type: String,
        required: true
    },
    subtitle_el:{
        type: String,
        required: false
    },
    subtitle_en:{
        type: String,
        required: false
    },
    director_el:{
        type: String,
        required: false
    },
    director_en:{
        type: String,
        required: false
    },
    description_el:{
        type: String,
        required: true
    },
    description_en:{
        type: String,
        required: true
    },
    genre_el:{
        type: String,
        required: false
    },
    genre_en:{
        type: String,
        required: false
    },
    
    dates_el: {
        type: String,
        required: true
    },
    dates_en: {
        type: String,
        required: true
    },
    promo:{
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    openingDate: {
    type: Date,
    required: true
},

},{timestamps: true})

module.exports = mongoose.model("Programme",programmeSchema)
