import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets'; 
import { Context } from '../../context/Context';

export const Main = () => {  
  const [isCopy, setIsCopy] = useState(false);
  const [extended, setExtended] = useState(false);
  const { onSend, recentPrompt, showResult, loading, resultData, setInput, input, copyToClipboard } = useContext(Context);

  const handleCopyClick = () => {
    copyToClipboard();
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 2000); // Reset copy status after 2 seconds
  };

  return (
    <div className="main">
      <div className="nav"> 
       
        <p>ChatNext</p>
        <img src={assets.user_icon} alt="" />
      </div> 

      <div className="main-container"> 
        {!showResult
          ?<> 
            <div className="greet">
              <p><span>Hello, World.</span></p>
              <p>How can I help you today?</p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest an organized list of the best food spots in a city</p>
                <img src={assets.compass_icon} alt="" />
              </div>

              <div className="card">
                <p>Help explain a concept in a kid-friendly way</p>
                <img src={assets.bulb_icon} alt="" />
              </div>

              <div className="card" id='suggest'>
                <p>Suggest beaches to visit in a city, including details</p>
                <img src={assets.message_icon} alt="" />
              </div>

              <div className="card" id='suggest'>
                <p>Write a product description for a new type of toothbrush</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>  
          </> 
          : <div className="result">
            <div className="result-title">  
              <img src={assets.user_icon} alt="" />
              <p className='question'>{recentPrompt}</p>
            </div> 

            <div className="result-data"> 
              <img src={assets.gemini_icon} alt="" />  
              {loading
                ? <div className="loader"> 
                    <hr />
                    <hr />
                    <hr />
                  </div>
                : <div>
                    <p dangerouslySetInnerHTML={{__html: resultData}}></p>
                    <button 
                      className="copy-icon" 
                      onClick={handleCopyClick}
                    >
                      {isCopy ? "Copied" : "Copy"}
                    </button>
                  </div>
              }
            </div>
          </div>
        }

        <div className="main-bottom">
          <div className="search-box"> 
            <input 
              onChange={(e) => setInput(e.target.value)} 
              value={input}
              type="text" 
              placeholder="Enter a prompt here.." 
            />
            <div> 
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input && <img  
                onClick={() => onSend()}
                src={assets.send_icon} 
                alt="" 
              />}
            </div>
          </div>  
          <p className="bottom-info"> 
            ChatNext may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
}
