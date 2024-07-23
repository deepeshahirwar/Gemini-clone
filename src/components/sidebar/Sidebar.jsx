import React, { useState, useContext } from 'react';
import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { Context } from '../../context/Context';

export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSend, recentPrompt, setRecentPrompt, prevPrompts, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSend(prompt);
  };

  return (
    <div className={`sidebar ${extended ? 'extended' : ''}`}>
      <div className="top">
        <img
          onClick={() => setExtended(!extended)}
          className='manu'
          src={assets.menu_icon}
          alt="menu icon"
        />
        {extended && (
          <>
            <div onClick={() => newChat()} className="new-chat">
              <img src={assets.plus_icon} alt="plus icon" />
              <p>New Chat</p>
            </div>
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item, index) => (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="message icon" />
                  <p>{item.slice(0, 20)}...</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {extended && (
        <div className="bottom">
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="question icon" />
            <p>Help</p>
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="history icon" />
            <p>Activity</p>
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="setting icon" />
            <p>Settings</p>
          </div>
        </div>
      )}
    </div>
  );
};
