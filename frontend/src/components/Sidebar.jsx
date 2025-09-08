// export default function Sidebar({ sessions, onNew, onPick, currentId }) {
//   return (
//     <aside className="w-64 bg-white shadow-md flex flex-col p-4">
//       {/* New Chat Button */}
//       <button
//         onClick={onNew}
//         className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
//       >
//         + New Chat
//       </button>

//       {/* Chat Sessions List */}
//       <ul className="flex-1 space-y-2 overflow-y-auto">
//         {sessions.map((s) => (
//           <li key={s.id}>
//             <button
//               onClick={() => onPick(s.id)}
//               className={`w-full text-left px-3 py-2 rounded-lg transition ${
//                 s.id === currentId
//                   ? "bg-blue-100 text-blue-700 font-medium"
//                   : "hover:bg-gray-100 text-gray-700"
//               }`}
//             >
//               {s.title || "Untitled"}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </aside>
//   );
// }



// 



// import { useState } from "react";
// import ModelSwitcher from "./ModelSwitcher";

// export default function Sidebar({ 
//   sessions, 
//   onNew, 
//   onPick, 
//   currentId, 
//   collapsed, 
//   onToggle,
//   theme,
//   onThemeToggle,
//   modelConfig,
//   onModelChange
// }) {
//   return (
//     <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//           </svg>
//           <span>ChatBot AI</span>
//         </div>
//         <button 
//           className="sidebar-toggle" 
//           onClick={onToggle}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? (
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           )}
//         </button>
//       </div>
      
//       <button className="new-chat-btn" onClick={onNew}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <line x1="12" y1="5" x2="12" y2="19"></line>
//           <line x1="5" y1="12" x2="19" y2="12"></line>
//         </svg>
//         <span>New Chat</span>
//       </button>
      
//       <div className="model-switcher">
//         <ModelSwitcher 
//           value={modelConfig}
//           onChange={onModelChange}
//         />
//       </div>
      
//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//           </svg>
//           <span>Chat History</span>
//         </h3>
//         <ul className="chat-history-list">
//           {sessions.length === 0 ? (
//             <li className="chat-history-placeholder">
//               <span>No chats yet</span>
//             </li>
//           ) : (
//             sessions.map((session) => (
//               <li key={session.id} className="chat-history-item">
//                 <button
//                   className={`chat-history-btn ${session.id === currentId ? "active" : ""}`}
//                   onClick={() => onPick(session.id)}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                   </svg>
//                   <span>{session.title}</span>
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
      
//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <circle cx="12" cy="12" r="3"></circle>
//             <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24m-8.48 8.48l-4.24 4.24M20 12h-6m-6 0H2m16.66-4.34l-4.24-4.24m-8.48 8.48l-4.24 4.24"></path>
//           </svg>
//           <span>Settings</span>
//         </h3>
//         <ul className="settings-list">
//           <li className="settings-item">
//             <button className="settings-btn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//               <span>Account</span>
//             </button>
//           </li>
//           <li className="settings-item">
//             <button className="settings-btn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//               </svg>
//               <span>Customize</span>
//             </button>
//           </li>
//           <li className="settings-item">
//             <div className="theme-toggle" onClick={onThemeToggle}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="5"></circle>
//                 <line x1="12" y1="1" x2="12" y2="3"></line>
//                 <line x1="12" y1="21" x2="12" y2="23"></line>
//                 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//                 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
//                 <line x1="1" y1="12" x2="3" y2="12"></line>
//                 <line x1="21" y1="12" x2="23" y2="12"></line>
//                 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//                 <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//               </svg>
//               <span>Dark Mode</span>
//               <div className="theme-switch"></div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// }


import { useState } from "react";
// import ModelSwitcher from "./ModelSwitcher";

// export default function Sidebar({ 
//   sessions, 
//   onNew, 
//   onPick, 
//   currentId, 
//   collapsed, 
//   onToggle,
//   theme,
//   onThemeToggle,
//   modelConfig,
//   onModelChange
// }) {
//   return (
//     <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//       <div className="sidebar-header">
//         <div className="sidebar-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//           </svg>
//           <span>ChatBot AI</span>
//         </div>
//         <button 
//           className="sidebar-toggle" 
//           onClick={onToggle}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           {collapsed ? (
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="9 18 15 12 9 6"></polyline>
//             </svg>
//           ) : (
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <polyline points="15 18 9 12 15 6"></polyline>
//             </svg>
//           )}
//         </button>
//       </div>
      
//       <button className="new-chat-btn" onClick={onNew}>
//         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//           <line x1="12" y1="5" x2="12" y2="19"></line>
//           <line x1="5" y1="12" x2="19" y2="12"></line>
//         </svg>
//         <span>New Chat</span>
//       </button>
      
//       <div className="model-switcher">
//         <ModelSwitcher 
//           value={modelConfig}
//           onChange={onModelChange}
//         />
//       </div>
      
//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//           </svg>
//           <span>Chat History</span>
//         </h3>
//         <ul className="chat-history-list">
//           {sessions.length === 0 ? (
//             <li className="chat-history-placeholder">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//               </svg>
//               <span>No chats yet</span>
//             </li>
//           ) : (
//             sessions.map((session) => (
//               <li key={session.id} className="chat-history-item">
//                 <button
//                   className={`chat-history-btn ${session.id === currentId ? "active" : ""}`}
//                   onClick={() => onPick(session.id)}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                   </svg>
//                   <span>{session.title}</span>
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
      
//       <div className="sidebar-section">
//         <h3 className="sidebar-section-title">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <circle cx="12" cy="12" r="3"></circle>
//             <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24m-8.48 8.48l-4.24 4.24M20 12h-6m-6 0H2m16.66-4.34l-4.24-4.24m-8.48 8.48l-4.24 4.24"></path>
//           </svg>
//           <span>Settings</span>
//         </h3>
//         <ul className="settings-list">
//           <li className="settings-item">
//             <button className="settings-btn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                 <circle cx="12" cy="7" r="4"></circle>
//               </svg>
//               <span>Account</span>
//             </button>
//           </li>
//           <li className="settings-item">
//             <button className="settings-btn">
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                 <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//               </svg>
//               <span>Customize</span>
//             </button>
//           </li>
//           <li className="settings-item">
//             <div className="theme-toggle" onClick={onThemeToggle}>
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="12" cy="12" r="5"></circle>
//                 <line x1="12" y1="1" x2="12" y2="3"></line>
//                 <line x1="12" y1="21" x2="12" y2="23"></line>
//                 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
//                 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
//                 <line x1="1" y1="12" x2="3" y2="12"></line>
//                 <line x1="21" y1="12" x2="23" y2="12"></line>
//                 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
//                 <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
//               </svg>
//               <span>Dark Mode</span>
//               <div className="theme-switch"></div>
//             </div>
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// }


/*import ModelSwitcher from "./ModelSwitcher";
export default function Sidebar({ 
  sessions, 
  onNew, 
  onPick, 
  currentId, 
  collapsed, 
  onToggle,
  theme,
  onThemeToggle,
  modelConfig,
  onModelChange
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>ChatBot AI</span>
        </div>
        <button 
          className="sidebar-toggle" 
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          )}
        </button>
      </div>
      
      <button className="new-chat-btn" onClick={onNew}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>New Chat</span>
      </button>
      
      <div className="model-switcher">
        <ModelSwitcher 
          value={modelConfig}
          onChange={onModelChange}
        />
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Chat History</span>
        </h3>
        <ul className="chat-history-list">
          {sessions.length === 0 ? (
            <li className="chat-history-placeholder">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>No chats yet</span>
            </li>
          ) : (
            sessions.map((session) => (
              <li key={session.id} className="chat-history-item">
                <button
                  className={`chat-history-btn ${session.id === currentId ? "active" : ""}`}
                  onClick={() => onPick(session.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{session.title}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24m-8.48 8.48l-4.24 4.24M20 12h-6m-6 0H2m16.66-4.34l-4.24-4.24m-8.48 8.48l-4.24 4.24"></path>
          </svg>
          <span>Settings</span>
        </h3>
        <ul className="settings-list">
          <li className="settings-item">
            <button className="settings-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Account</span>
            </button>
          </li>
          <li className="settings-item">
            <button className="settings-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Customize</span>
            </button>
          </li>
          <li className="settings-item">
            <div className="theme-toggle-wrapper">
              <div className={`theme-toggle ${collapsed ? "collapsed" : ""}`} onClick={onThemeToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>Dark Mode</span>
                <div className="theme-switch"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  );
}*/

import ModelSwitcher from "./ModelSwitcher";

export default function Sidebar({
  sessions,
  onNew,
  onPick,
  currentId,
  collapsed,
  onToggle,
  modelConfig,
  onModelChange,
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>ChatBot AI</span>
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          )}
        </button>
      </div>

      {/* Moved to top */}
      <button className="new-chat-btn" onClick={onNew}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>New Chat</span>
      </button>

      {/* Model Switcher moved to top */}
      <div className="model-switcher-section"> {/* Added a wrapper div */}
        <p className="sidebar-section-title">Provider</p> {/* Added a title for Provider */}
        <div className="model-switcher">
          {/* Assuming you have a Provider selection here as well, otherwise this will just be the ModelSwitcher */}
          {/* For now, just placing the ModelSwitcher here, assuming it handles Provider/Model */}
          <ModelSwitcher
            value={modelConfig}
            onChange={onModelChange}
          />
        </div>
      </div>
      
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Chat History</span>
        </h3>
        <ul className="chat-history-list">
          {sessions.length === 0 ? (
            <li className="chat-history-placeholder">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>No chats yet</span>
            </li>
          ) : (
            sessions.map((session) => (
              <li key={session.id} className="chat-history-item">
                <button
                  className={`chat-history-btn ${session.id === currentId ? "active" : ""}`}
                  onClick={() => onPick(session.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>{session.title}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Settings section is commented out as per previous request */}
      {/*
      <div className="sidebar-section">
        <h3 className="sidebar-section-title">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24m-8.48 8.48l-4.24 4.24M20 12h-6m-6 0H2m16.66-4.34l-4.24-4.24m-8.48 8.48l-4.24 4.24"></path>
          </svg>
          <span>Settings</span>
        </h3>
        <ul className="settings-list">
          <li className="settings-item">
            <button className="settings-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Account</span>
            </button>
          </li>
          <li className="settings-item">
            <button className="settings-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Customize</span>
            </button>
          </li>
          <li className="settings-item">
            <div className="theme-toggle-wrapper">
              <div className={`theme-toggle ${collapsed ? "collapsed" : ""}`} onClick={onThemeToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span>Dark Mode</span>
                <div className="theme-switch"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      */}
    </aside>
  );
}