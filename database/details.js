const mongoose = require('mongoose');

const  details = new mongoose.Schema({
    author: String,
    title: {
        type: String,
        index: 1
    },
    content: String,
    contents: String,
    pic:{
        type: String,
    },
    looknum:{
        type:Number,
        default: 0,
    }
}, {versionKey:false,timestamps:{createAt: "createTime",updateAt: "updateTime"}})

module.exports = mongoose.model("details",details)