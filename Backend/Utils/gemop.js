import "dotenv/config";

const getGemOpAPIResponse = async(message)=>{
    
 
  if (!message) {
    throw new Error("message field is required");
  }

  const body = {
    model: "gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,   // ⬅ REQUIRED FORMAT
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2));
 // it is the AI's reply
    const reply =
      data?.choices?.[0]?.message?.content || "No reply from Gemini";
     console.log(reply);
      return reply; // we are getting the reply from the AI
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export default getGemOpAPIResponse;