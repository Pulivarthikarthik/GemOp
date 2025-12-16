import express from "express";
import Thread from "../Models/Thread.js";
import getGemOpAPIResponse from "../Utils/gemop.js";
import {v1 as uuid} from "uuid"

const router = express.Router();

// router.post("/test", async (req, res) => {
//   try {
//     const thread = new Thread({
//       // here Thread is a model we created in model THread.js

//       threadId: "2",
//       title: "2nd Thread",
//     });
//     const response = await thread.save();
//     res.send(response);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ err: "Not connected to DB" });
//   }
// });

//Getting all threads(all chats)

router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    //getting all the threads in desc.. order to get most recent data on the top(by -1)
    return res.json(threads); //converting into string format
  } catch (err) {
    console.log(err);
    return  res.status(500).json({ err: "Failed to Fetch the threads" });
  }
});

//Getting a particular thread(chat)
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params; // getting the id
  try {
    let thread = await Thread.findOne({ threadId });

    // if thread(chat) is not found
    if (!thread) {
        return res.status(404).json({ err: "Thread not Found" });
    }
    return res.json(thread.messages);

    // when clicked on particular chat in history we need to see the chat(messages)
    // here we are making into readable format by json()
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "Failed to Fetch the thread" });
  }
});

//Deleting a particular thread(chat)

router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ err: "Unable to delete the thread" });
    }
   return res.status(200).json({ success: "Thread deleted successfully" }); // if thread deletd successfully
  } catch (err) {
    console.log(err);
    return res.status(404).json({ err: "Thread not Found" });
  }
});

// for POST the thread(chat),

/*yeah firstly for the posting the chart we have when we when the user want to chat in the existing thread firstly we have
 to validate the thread ID and also the message is present if the thread ID& msg is not there in the DB 
 we have to create a new thread and after that when the new thread is created it means the new chat is created 
 and after that we have to save the message that is the user message in the thread and we will get the AI response 
 and we will save that AI response to the database*/

router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;  
  // it is used to take the prompt from user at the frontend ChatWIndow.jsx from getReply() method

  if (!threadId || !message) { //validating the thread
    return res.status(404).json({ err: "missing required fields" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
 
  //if thread not exsists
    if (!thread) {
      thread = new Thread({ // creating new thread in DB 
        threadId:uuid(),
        title: message,
        messages: [{ role: "user", content: message }], //storing  
      });
    } else { // if thread exsists 
      thread.messages.push({ role: "user", content: message }); // then adding the users msg to the exsisting thread
    }

 // Getting the reply from the AI
    const assistantReply = await getGemOpAPIResponse(message); //generating the AI reply
    thread.messages.push({ role: "assistant", content: assistantReply }); //storing in DB
    thread.updatedAt = new Date();

    await thread.save();
    return res.json({ reply: assistantReply }); //Reply at frontend by .json right string format
  } catch (err) {
    console.log(err);
  //  return res.status(500).json({ err: "something went wrong" });
  }
});

export default router;
