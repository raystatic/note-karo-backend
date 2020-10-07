const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    color:{
        type:String,
        default:'#fff'
    },
    text:{
        type:String,
        default:""
    },
    author:{
        type:String
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Note',noteSchema);