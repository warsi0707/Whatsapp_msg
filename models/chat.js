const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from : {
        type : String,
        required : true
    },
    to : {
        type : String,
        required : true
    },
    msg : {
        type : String
    },
    created_at :{
        type : Date,
        required : true
    }
})

//Create model
const Chat = mongoose.model("Chat", chatSchema)

//export the file to index
module.exports = Chat;