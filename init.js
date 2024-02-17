const mongoose = require('mongoose');
const Chat = require("./models/chat.js")

main()
    .then(()=>{
        console.log("Databse conncected successfully")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


let allChats = [
    {
        from: "neha", 
        to: "priya",
        msg: "send me your notes",
        created_at: new Date()
    },
    {
        from: "samir", 
        to: "sam",
        msg: "send me your project ideas",
        created_at: new Date()
    },
    {
        from: "samir", 
        to: "sam",
        msg: "send me your project ideas",
        created_at: new Date()
    },
]

Chat.insertMany(allChats)

//After successfully connection u have to this file from the node then data will be saved
//Command : - node init.js (data will be saved)