//  import "./App.css"
// import Sidebar from "./Sidebar.jsx";
// import ChatWindow from "./ChatWindow.jsx";
//  import { MyContext } from "./MyContext.jsx";
// import { useState } from "react";
// import {v1 as uuidv1} from "uuid";



// function App() {
//   const [prompt,setPrompt] = useState("");
//   const [reply,setReply] = useState(null);
//   const [currThreadId,setCurrThreadId] = useState(uuidv1); // creating the threadId for POST req for the function getReply() 
//  const [prevChats,setPrevChats] = useState([]) // stores all chats of current thread
//  const [newChat,setNewChat] = useState(true);// when we came to website newchat is given

// const providerValues = {
//   prompt,setPrompt,         // giving the prompt and updating the prompt by th user
//   reply , setReply ,
//   currThreadId, setCurrThreadId, // taking reply and updating reply from AI
//   prevChats, setPrevChats,
//   newChat,setNewChat,
// };   // passing values to Mycontext

//   return (
//     <div className='app'>

//       <MyContext.Provider value={providerValues}> {/*it is used as a container
//        which shares the data to its child components without giving props to  every component */} 
        
//         <Sidebar></Sidebar>
//         <ChatWindow></ChatWindow>


//        </MyContext.Provider>

//     </div>
//   )
// }

// export default App



import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  }; 

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </MyContext.Provider>
    </div>
  )
}

export default App
