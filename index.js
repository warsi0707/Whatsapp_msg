const express = require("express")
const app = express();
const path = require("path")
const port = 8080;

const mongoose = require('mongoose');

const Chat = require("./models/chat.js")

const methodOverride = require("method-override")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

//this will help to send post method
app.use(express.urlencoded({extended:true}))

//It help to over-ride the post method to put or delete method
app.use(methodOverride("_method"))

main()
    .then(()=>{
        console.log("Databse conncected successfully")
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


//Index route
app.get("/chats", async(req, res) =>{
    let chats = await Chat.find()
    console.log(chats)
    res.render("index.ejs", {chats})
})

// New route
app.get("/chats/new", (req, res) =>{
    res.render("new.ejs")
})

// create route
app.post("/chats", (req, res) =>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from : from,
        to : to,
        msg : msg,
        created_at : new Date()
    })
    newChat
        .save()
        .then((res) =>{
            console.log("chat was saved")
        }).catch((err) =>{
            console.log(err)
        })
    res.redirect("/chats")
})

//Edit route
app.get("/chats/:id/edit", async(req, res) =>{
    let { id } = req.params;
    let chat = await Chat.findById(id)
    res.render("edit.ejs", {chat})
})
//Update route
app.put("/chats/:id", async(req, res) =>{
    let {id} = req.params;
    let {msg : newMsg} = req.body
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg : newMsg},
        {runValidators : true, new : true}
    )
    res.redirect("/chats")
})

//Destroy route
app.delete("/chats/:id", async (req, res) =>{
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id)
    console.log(deleteChat)
    res.redirect("/chats")
})


app.listen(port, () =>{
    console.log("Wroking on port 8080")
})

