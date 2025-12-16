import mongoose from "mongoose";


// this is the schema for the messages
const MessageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:["user","assistant"], // only these values are allowed
        required:true
    },
    content:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now
    },
});

 // we are assuming a single chat into a single thread with threadId,title,message,time,updatetime
// and this the schema for the thread
 const ThreadSchema = new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        default:"New chat",
    },
    messages:[MessageSchema],
    createdAt:{
        type: Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
 });

 export default mongoose.model("Thread",ThreadSchema);//Thread is the model name 