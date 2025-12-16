import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./Routes/chat.js"

const app = express();
const PORT = 8080;

 app.use(express.json());

app.use('/api',chatRoutes); 
// Every route inside chatRoutes will start with /api("/api/login")

app.use(cors({
  origin: "https://gem-op.vercel.app", // <-- your frontend URL
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
  connectDb();//calling the connectDb
});
 
// connecting to the database
//and if we add data to the db newly it will store in test file in the cluster
const connectDb = async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected with DataBase")
  }
  catch(err){
    console.log("Failed to connect to DB",err);
  }
}

// app.post("/test", async (req, res) => {
//   console.log("RAW req.body:", req.body);

//   const userMessage = req.body.message;

//   if (!userMessage) {
//     return res.status(400).send("message field is required");
//   }

//   const body = {
//     model: "gemini-2.5-flash",
//     messages: [
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: userMessage,   // ⬅ REQUIRED FORMAT
//           },
//         ],
//       },
//     ],
//   };

//   try {
//     const response = await fetch(
//       "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await response.json();
//     console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));

//     const reply =
//       data?.choices?.[0]?.message?.content?.[0]?.text ||
//       "No reply from Gemini";
//      console.log(reply);
//     res.send(reply);
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Something went wrong");
//   }
// });
