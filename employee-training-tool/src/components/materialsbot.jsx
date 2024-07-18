import axios from "axios";
import { useState } from "react";
import IndianOilLogo from '../assets/IndianOilLogo.png';
import "./materialsbot.css";

console.log(import.meta.env.VITE_API_URL);

function MaterialsBot() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    async function generateresponse() {
        setAnswer("Thinking...");
        try {
            const response = await axios({
                url: import.meta.env.VITE_API_URL,
                method: "post",
                data: {
                    contents: [
                        { parts: [{ text: question }] },
                    ],
                },
            });
            setAnswer(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            setAnswer("Sorry, I couldn't fetch a response. Please try again.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#d0eaff] text-white font-orbitron p-4">
            <header className="bg-[#0D0B49] w-full shadow-md mb-8 py-4 px-6 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={IndianOilLogo} alt="Logo" className="w-16 h-16 object-contain" />
                    <h1 className="ml-4 font-bold text-xl">IOCL Internal Onboarding</h1>
                </div>
            </header>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl w-full">
                <h1 className="text-3xl font-extrabold mb-6 text-center">IOCL Expert Advisor</h1>
                <textarea 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    className="w-full p-4 mb-4 border border-gray-700 bg-gray-900 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Type your question here..."
                    rows="6"
                ></textarea>
                <button 
                    onClick={generateresponse} 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 ease-in-out"
                >
                    Ask our IOCL chatbot anything :)
                </button>
                <div className="w-full p-4 border border-gray-700 bg-gray-900 rounded-md">
                    <p className="text-lg">{answer}</p>
                </div>
            </div>
        </div>
    );
}

export default MaterialsBot;



















// import axios from "axios";
// import { useState } from "react";


// console.log (import.meta.env.VITE_API_URL);


// function MaterialsBot() {
//     const [question, setQuestion] = useState("");
//     const [answer, setAnswer] = useState("");

//     async function generateresponse() {
//         setAnswer("Thinking...");
//         const response = await axios({
//             url: import.meta.env.VITE_API_URL,
//             method: "post",
//             data: {
//                 contents: [
//                     { parts: [{ text: question }] },
//                 ],
//             },
//         });

//         setAnswer(response.data.candidates[0].content.parts[0].text);
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
//             <h1 className="text-4xl font-display font-extrabold mb-8">IOCL Expert Advisor</h1>
//             <textarea 
//                 value={question} 
//                 onChange={(e) => setQuestion(e.target.value)} 
//                 className="w-full max-w-lg p-4 mb-4 border border-gray-700 bg-gray-800 rounded-md text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
//                 placeholder="Type your question here..."
//                 rows="10"
//             ></textarea>
//             <button 
//                 onClick={generateresponse} 
//                 className="bg-orange-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300 ease-in-out"
//             >
//                 Ask our IOCL chatbot anything :)
//             </button>
//             <div className="w-full max-w-lg p-4 border border-gray-700 bg-gray-800 rounded-md">
//                 <p className="text-lg">{answer}</p>
//             </div>
//         </div>
//     );
// }

// export default MaterialsBot;