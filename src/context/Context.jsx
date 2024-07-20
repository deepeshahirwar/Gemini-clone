import { createContext, useState } from "react";
import run from "../config/gemini";
import DOMPurify from 'dompurify'; // Add this library for sanitizing HTML

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const formatResponse = (response) => {
        // Replace **bold** with <strong>bold</strong>
        let formatted = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        // Replace *italic* with <em>italic</em>
        formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");
        // Replace ## Heading ## with <h2>Heading</h2>
        formatted = formatted.replace(/##(.*?)##/g, "<h2>$1</h2>");
        // Replace <br> with line breaks
        formatted = formatted.replace(/\n/g, "<br>");

        // Sanitize the HTML
        return DOMPurify.sanitize(formatted);
    };

    const deleyPara = (text) => {
        let index = -1;
        setResultData(""); // Reset result data
        const interval = setInterval(() => {
            if (index < text.length) {
                setResultData(prev => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, 1); // Adjust delay as needed (50ms for example)
    };
 
    
   
    const onSend = async (prompt) => {
        setShowResult(true); 
        setLoading(true); 
        
        // For retrieving the data from recent tab
        let response;
        if (prompt !== undefined) { 
            response = await run(prompt); 
            setRecentPrompt(prompt);
        } else {  
            setPrevPrompts(prev => [...prev, input]); 
            setRecentPrompt(input); 
            response = await run(input);
        }

        const formattedResponse = formatResponse(response);
        deleyPara(formattedResponse);
         
        setLoading(false);
        setInput("");
    }  

     // Function to strip HTML tags
     const stripHtmlTags = (html) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

// for text copy from output section 
const copyToClipboard = () => { 
    const CopyedData = stripHtmlTags(resultData);
    navigator.clipboard.writeText(CopyedData)
        .then(() => {
            console.log('Text copied to clipboard');
        })
        .catch(err => {
            console.error('Error copying text: ', err);
        });
}

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        onSend,
        copyToClipboard
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;
