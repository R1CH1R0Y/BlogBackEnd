const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./models/users")

let app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://Richi2001:R1CH1R0Y@cluster0.ulfkc.mongodb.net/blogAppDb?retryWrites=true&w=majority&appName=Cluster0")

app.post("/signup", async (req, res) => {
    let input = req.body
    let hashedPassword = bcrypt.hashSync(req.body.password, 10)
    req.body.password = hashedPassword
    userModel.find({ email: req.body.email }).then(
        (items) => {
            if (items.length > 0) {
                res.json({ "status": "email id already exists" })
            } else {
                let result = new userModel(input)
                result.save()
                res.json({ "status": "success" })
            }
        }
    )
})

app.post("/signin",async(req,res)=>{
    let input=req.body
    let result=userModel.find({email:req.body.email}).then(
        (items)=>{
            if (items.length>0){
                const passwordValidator=bcrypt.compareSync(req.body.password,items[0].password)
                if (passwordValidator){
                    jwt.sign({email:req.body.email},"blogApp",{expiresIn:"1d"},(error,token)=>{
                        if(error){
                            res.json({"status":"error","error":error})
                        }else{
                            res.json({"status":"success","token":token,"userId":items[0]._id})
                        }
                    })
                }else{
                    res.json({"status":"incorrect password"})
                }
            }else{
                res.json({"status":"invalid email id"})
            }
        }
    ).catch()
})

app.listen(3030, () => {
    console.log("Server started")
})