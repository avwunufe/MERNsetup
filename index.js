const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const userRouter = require("./routers/users")
const app = express();
app.use(bodyParser.json());
if(process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}
app.use("/users", userRouter)
mongoose.Promise = global.Promise
mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/mernsetup", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", ()=>{
    console.log("MongoDB is up and running")
}).on("error", ()=>{
    console.log("There has been an error")
})
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log("Now listening on port"+ PORT)
})