import axios from "axios";
import { useState } from "react";

function MaterialsBot() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    async function generateresponse() {
        setAnswer("Thinking...");
        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDJ8tHxFIuUv39DSrNGX8i1nRUjqFeM7RA",
            method: "post",
            data: {
                contents: [
                    { parts: [{ text: question }] },
                ],
            },
        });

        setAnswer(response.data.candidates[0].content.parts[0].text);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-extrabold mb-8">IOCL Expert Advisor</h1>
            <textarea 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                className="w-full max-w-lg p-4 mb-4 border border-gray-700 bg-gray-800 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                placeholder="Type your question here..."
                rows="10"
            ></textarea>
            <button 
                onClick={generateresponse} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 ease-in-out"
            >
                Ask our IOCL chatbot anything :)
            </button>
            <div className="w-full max-w-lg p-4 border border-gray-700 bg-gray-800 rounded-md">
                <p className="text-lg">{answer}</p>
            </div>
        </div>
    );
}

export default MaterialsBot;













/*import axios from "axios";
import { useState } from "react";

function MaterialsBot() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    async function generateresponse() {
        setAnswer("Thinking...");
        const response = await axios ({
            url : "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDJ8tHxFIuUv39DSrNGX8i1nRUjqFeM7RA",
            method : "post", 
            data : {
                contents:[
                    { parts:[{ text:question}]},
                ],
            },
        });

        setAnswer(response['data']['candidates'][0]['content']['parts'][0]['text']);
    }

    return (
        <>
        <h1>IOCL Expert Advisor</h1>
        <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} cols="30" rows="10"></textarea>
        <button onClick={generateresponse}>Ask our IOCL chatbot anything :)</button>

        <p> {answer} </p>
        </>
        
    );
}

export default MaterialsBot;
*/
