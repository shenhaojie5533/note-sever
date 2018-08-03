const mongoose = require('mongoose');

const  swiper = new mongoose.Schema({

    title: {
        type: String,
        index: 1
    },
    pic:{
        type:String
    }
}, {versionKey:false})

module.exports = mongoose.model("swiper",swiper)