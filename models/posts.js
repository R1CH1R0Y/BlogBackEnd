const mongoose = require("mongoose")
const postschema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users"
        },
        Message: String,
        postedDate: {
            type: Date,
            default: Date.now
        }
    }
)

var postModel=mongoose.model("posts",postschema)
module.exports=postModel