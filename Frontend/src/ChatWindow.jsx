// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import { MyContext } from "./MyContext.jsx";
// import { useState, useEffect, useContext } from "react";
// import { PuffLoader } from "react-spinners";

// // Define the color constant outside the component or export it from another file
// // const GOOGLE_BLUE = "#4285F4"; // Define GOOGLE_BLUE

// function ChatWindow() {
//     const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats } = useContext(MyContext);
//     // It extracts values from your Context Provider:MyContext

//     // 1. Define the loading state
//     // const [loading, setLoading] = useState(false);

//       const [loading, setLoading] = useState(false);
//     const [isOpen, setIsOpen] = useState(false);
//     // Function to get the reply from the backend
//     // It is used to give the reply taking prompt from input and by fetch() calling
//     // the backend POST route to get reply from the threadid and message(req.body)
//     const getReply = async () => {
//         setLoading(true); // 2a. Set loading to true before the API call
//         console.log("message:", prompt, "threadId:", currThreadId);

//         const options = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 threadId: currThreadId,
//                 message: prompt
//             })
//         };

//         try {
//             // fetch() is used to send the user’s prompt to the backend server
//             // and receive the AI reply (Backend -> Routes -> chat.js)
//             const response = await fetch("http://localhost:8086/api/chat", options);
//             const res = await response.json(); // converting the reply
            
//             setReply(res.reply); // visible in UI res.reply i.e., reply (its the AI reply)
//             console.log(res);
//         } catch (err) {
//             console.error("Error fetching reply:", err);
//             // Optionally set an error message in state here
//         }

//         setLoading(false); // 2b. Set loading to false after the API call
//     }

//     // Append new chats to previous chats using useEffect
//     useEffect(() => {
//         if (prompt && reply) { // if previous chats exist
//             setPrevChats(prevChats => ( // appending new chats 
//                 [
//                     ...prevChats, // using spread operator for input
//                     {
//                         role: "user",
//                         content: prompt, // user input
//                     },
//                     {
//                         role: "assistant",
//                         content: reply, // AI reply
//                     }
//                 ]
//             ));
//         }
//         setPrompt(""); // making input box empty
//     }, [reply]);

//      const handleProfileClick = () => {
//         setIsOpen(!isOpen);
//     }


//     return (
//         <div className="chatWindow">

//             {/* Navbar */}
//             <div className="navbar">
//                 <span>GemOp <i className="fa-solid fa-angle-down"></i></span>
//                 <div className="userIconDiv"  onClick={handleProfileClick}>
//                     <span className="userIcon"> <i className="fa-regular fa-user"></i> </span>
//                     <span className="Menu"> <i className="fa-solid fa-ellipsis"></i> </span>
//                 </div>
//             </div>
//              {
//                 isOpen && 
//                 <div className="dropDown">
//                     <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
//                     <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
//                     <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
//                 </div>
//             }

//             {/* Main Chat Area: Show chat always, loader on top */}
//             {/* <div className="chatContentArea" style={{ position: 'relative' }}>
//                 <Chat /> {/* Always render chat so previous messages stay visible */}

//             {/*    {loading && (
//                     <div 
//                         style={{
//                             position: 'absolute',
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             display: 'flex',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                              pointerEvents:'none',
//                             zIndex: 10,
//                         }}
//                     >
//                         <PuffLoader
//                             color={GOOGLE_BLUE} // loader color
//                             loading={loading}
//                             size={50}           // loader size
//                             aria-label="Loading Spinner"
//                             data-testid="loader"
//                         />
//                     </div>
//                 )}
//             </div> */}

//              <Chat></Chat>

//             <ScaleLoader color="#fff" loading={loading}>
//             </ScaleLoader>

//             {/* User Input */}
//             <div className="chatInput">
//                 <div className="inputBox">
//                     <input
//                         placeholder="Ask GemOp or Do Something"
//                         value={prompt} // storing the user's prompt in value
//                         onChange={(e) => setPrompt(e.target.value)} // tracking every change
//                         onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''} 
//                         // if we press Enter then call getReply()
//                     />
//                     <div id="submit" onClick={getReply}>
//                         {/* when clicked calling the getReply() to get the reply from AI */}
//                         <i className="fa-solid fa-paper-plane"></i>
//                     </div>
//                 </div>
//                 <p className="info">
//                     GemOp can make mistakes. Check important info. See Cookie Preferences.
//                 </p>
//             </div>

//         </div>
//     );
// }

// export default ChatWindow;



import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from "react-spinners";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        setLoading(true);
        setNewChat(false);

        console.log("message ", prompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: prompt,
                threadId: currThreadId
            })
        };

        try {
            const response = await fetch("http://localhost:8080/api/chat", options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    //Append new chat to prevChats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                },{
                    role: "assistant",
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>GemOp <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
            
            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask GemOp or Do Something"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    >
                           
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                <p className="info">
                    GemOp can make mistakes, so double-check it
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;