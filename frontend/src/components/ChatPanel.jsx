// // import { useState, useEffect } from "react";
// // import useSSE from "../hooks/useSSE";
// // import { marked } from "marked";

// // export default function ChatPanel({
// //   sessionId,
// //   provider,
// //   model,
// //   history,
// //   onUserSend,
// //   onAssistantDelta,
// //   onAssistantDone,
// // }) {
// //   const [input, setInput] = useState("");
// //   const [streaming, setStreaming] = useState(false);
// //   const [body, setBody] = useState(null);
// //   const [error, setError] = useState("");

// //   // Reset error when sessionId changes (switching chats)
// //   useEffect(() => {
// //     setError("");
// //   }, [sessionId]);

// //   useSSE({
// //     url: streaming
// //       ? `${
// //           import.meta.env.VITE_API_BASE || "http://localhost:8003"
// //         }/chat/${sessionId}/stream`
// //       : null,
// //     body,
// //     onDelta: (deltaOrError) => {
// //       if (typeof deltaOrError === "string") {
// //         onAssistantDelta(deltaOrError);
// //       } else if (deltaOrError && deltaOrError.error) {
// //         setError(deltaOrError.error);
// //       }
// //     },
// //     onDone: () => {
// //       setStreaming(false);
// //       onAssistantDone();
// //     },
// //     onError: (err) => {
// //       setStreaming(false);
// //       setError(err?.message || "Unknown error");
// //     },
// //   });

// //   const onSend = () => {
// //     if (!input.trim() || !sessionId) return;
// //     const msg = { role: "user", content: input, provider, model };
// //     const msgs = [...history, msg];
// //     onUserSend(msg);
// //     setBody({ messages: msgs, provider, model });
// //     setStreaming(true);
// //     setInput("");
// //   };

// //   return (
// //     <div className="flex flex-col h-full bg-gray-50">
// //       {/* Messages Area */}
// //       <div className="flex-1 overflow-y-auto p-6 space-y-4">
// //         {history.map((m, idx) => (
// //           <div
// //             key={idx}
// //             className={`flex items-start ${
// //               m.role === "user" ? "justify-end" : "justify-start"
// //             }`}
// //           >
// //             <div
// //               className={`max-w-lg px-4 py-2 rounded-xl shadow text-sm leading-relaxed prose ${
// //                 m.role === "user"
// //                   ? "bg-blue-500 text-white"
// //                   : "bg-white text-gray-800 border"
// //               }`}
// //               dangerouslySetInnerHTML={{
// //                 __html: marked.parse(m.content || ""),
// //               }}
// //             />
// //             <button
// //               className="ml-2 text-xs text-gray-400 hover:text-gray-600"
// //               onClick={() => navigator.clipboard.writeText(m.content || "")}
// //             >
// //               copy
// //             </button>
// //           </div>
// //         ))}

// //         {error && (
// //           <div className="flex items-center text-red-600 bg-red-100 px-4 py-2 rounded-lg shadow">
// //             <span className="flex-1 text-sm">{error}</span>
// //             <button
// //               className="ml-2 text-xs text-red-500 hover:text-red-700"
// //               onClick={() => navigator.clipboard.writeText(error)}
// //             >
// //               copy
// //             </button>
// //           </div>
// //         )}

// //         {streaming && (
// //           <div className="text-blue-500 animate-pulse font-mono">▍</div>
// //         )}
// //       </div>

// //       {/* Composer */}
// //       <div className="p-4 border-t bg-white flex gap-2">
// //         <input
// //           value={input}
// //           onChange={(e) => setInput(e.target.value)}
// //           placeholder="Ask anything..."
// //           className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
// //         />
// //         <button
// //           onClick={onSend}
// //           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
// //         >
// //           Send
// //         </button>
// //         {streaming && (
// //           <button
// //             onClick={() => setStreaming(false)}
// //             className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg shadow transition"
// //           >
// //             Stop
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }








// // import { useState, useEffect, useRef } from "react";
// // import useSSE from "../hooks/useSSE";
// // import { marked } from "marked";

// // export default function ChatPanel({
// //   sessionId,
// //   provider,
// //   model,
// //   history,
// //   onUserSend,
// //   onAssistantDelta,
// //   onAssistantDone,
// // }) {
// //   const [input, setInput] = useState("");
// //   const [streaming, setStreaming] = useState(false);
// //   const [body, setBody] = useState(null);
// //   const [error, setError] = useState("");
// //   const messagesEndRef = useRef(null);
// //   const textareaRef = useRef(null);

// //   // Reset error when sessionId changes (switching chats)
// //   useEffect(() => {
// //     setError("");
// //   }, [sessionId]);

// //   // Auto-scroll to bottom when messages change
// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [history, streaming]);

// //   // Auto-resize textarea
// //   useEffect(() => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = "auto";
// //       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
// //     }
// //   }, [input]);

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   };

// //   useSSE({
// //     url: streaming
// //       ? `${
// //           import.meta.env.VITE_API_BASE || "http://localhost:8003"
// //         }/chat/${sessionId}/stream`
// //       : null,
// //     body,
// //     onDelta: (deltaOrError) => {
// //       if (typeof deltaOrError === "string") {
// //         onAssistantDelta(deltaOrError);
// //       } else if (deltaOrError && deltaOrError.error) {
// //         setError(deltaOrError.error);
// //       }
// //     },
// //     onDone: () => {
// //       setStreaming(false);
// //       onAssistantDone();
// //     },
// //     onError: (err) => {
// //       setStreaming(false);
// //       setError(err?.message || "Unknown error");
// //     },
// //   });

// //   const onSend = () => {
// //     if (!input.trim() || !sessionId) return;
// //     const msg = { role: "user", content: input, provider, model };
// //     const msgs = [...history, msg];
// //     onUserSend(msg);
// //     setBody({ messages: msgs, provider, model });
// //     setStreaming(true);
// //     setInput("");
// //   };

// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       onSend();
// //     }
// //   };

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //   };

// //   return (
// //     <div className="chat-container">
// //       {/* Messages Area */}
// //       <div className="chat-messages">
// //         {history.map((m, idx) => (
// //           <div
// //             key={idx}
// //             className={`message ${m.role === "user" ? "user" : ""}`}
// //           >
// //             <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
// //               {m.role === "user" ? (
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
// //                   <circle cx="12" cy="7" r="4"></circle>
// //                 </svg>
// //               ) : (
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// //                 </svg>
// //               )}
// //             </div>
// //             <div 
// //               className="message-content"
// //               dangerouslySetInnerHTML={{
// //                 __html: marked.parse(m.content || ""),
// //               }}
// //             />
// //             {m.role === "assistant" && (
// //               <div className="message-actions">
// //                 <button
// //                   className="message-action-btn"
// //                   onClick={() => copyToClipboard(m.content || "")}
// //                   aria-label="Copy text"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
// //                     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
// //                   </svg>
// //                 </button>
// //                 <button
// //                   className="message-action-btn"
// //                   aria-label="Like response"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
// //                   </svg>
// //                 </button>
// //                 <button
// //                   className="message-action-btn"
// //                   aria-label="Dislike response"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
// //                   </svg>
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
        
// //         {error && (
// //           <div className="error-message">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <circle cx="12" cy="12" r="10"></circle>
// //               <line x1="12" y1="8" x2="12" y2="12"></line>
// //               <line x1="12" y1="16" x2="12.01" y2="16"></line>
// //             </svg>
// //             <span>{error}</span>
// //             <button
// //               className="message-action-btn"
// //               onClick={() => copyToClipboard(error)}
// //               aria-label="Copy error"
// //             >
// //               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
// //                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
// //               </svg>
// //             </button>
// //           </div>
// //         )}
        
// //         {streaming && (
// //           <div className="typing-indicator">
// //             <div className="typing-dot"></div>
// //             <div className="typing-dot"></div>
// //             <div className="typing-dot"></div>
// //           </div>
// //         )}
        
// //         <div ref={messagesEndRef} />
// //       </div>
      
// //       {/* Composer */}
// //       <div className="chat-input-container">
// //         <div className="chat-input-wrapper">
// //           <textarea
// //             ref={textareaRef}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={handleKeyDown}
// //             placeholder="Ask anything..."
// //             className="chat-input"
// //             rows={1}
// //             disabled={streaming}
// //           />
// //           <button
// //             onClick={onSend}
// //             className="chat-send-btn"
// //             disabled={!input.trim() || streaming}
// //             aria-label="Send message"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <line x1="22" y1="2" x2="11" y2="13"></line>
// //               <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
// //             </svg>
// //           </button>
// //           {streaming && (
// //             <button
// //               onClick={() => setStreaming(false)}
// //               className="chat-stop-btn"
// //               aria-label="Stop generation"
// //             >
// //               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="6" y="6" width="12" height="12"></rect>
// //               </svg>
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // import { useState, useEffect, useRef } from "react";
// // import useSSE from "../hooks/useSSE";
// // import { marked } from "marked";

// // export default function ChatPanel({
// //   sessionId,
// //   provider,
// //   model,
// //   history,
// //   onUserSend,
// //   onAssistantDelta,
// //   onAssistantDone,
// // }) {
// //   const [input, setInput] = useState("");
// //   const [streaming, setStreaming] = useState(false);
// //   const [body, setBody] = useState(null);
// //   const [error, setError] = useState("");
// //   const messagesEndRef = useRef(null);
// //   const textareaRef = useRef(null);
// //   const messagesContainerRef = useRef(null);

// //   // Reset error when sessionId changes (switching chats)
// //   useEffect(() => {
// //     setError("");
// //   }, [sessionId]);

// //   // Auto-scroll to bottom when messages change
// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [history, streaming]);

// //   // Auto-resize textarea
// //   useEffect(() => {
// //     if (textareaRef.current) {
// //       textareaRef.current.style.height = "auto";
// //       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
// //     }
// //   }, [input]);

// //   const scrollToBottom = () => {
// //     if (messagesContainerRef.current && messagesEndRef.current) {
// //       messagesContainerRef.current.scrollTo({
// //         top: messagesContainerRef.current.scrollHeight,
// //         behavior: "smooth"
// //       });
// //     }
// //   };

// //   useSSE({
// //     url: streaming
// //       ? `${
// //           import.meta.env.VITE_API_BASE || "http://localhost:8003"
// //         }/chat/${sessionId}/stream`
// //       : null,
// //     body,
// //     onDelta: (deltaOrError) => {
// //       if (typeof deltaOrError === "string") {
// //         onAssistantDelta(deltaOrError);
// //       } else if (deltaOrError && deltaOrError.error) {
// //         setError(deltaOrError.error);
// //       }
// //     },
// //     onDone: () => {
// //       setStreaming(false);
// //       onAssistantDone();
// //     },
// //     onError: (err) => {
// //       setStreaming(false);
// //       setError(err?.message || "Unknown error");
// //     },
// //   });

// //   const onSend = () => {
// //     if (!input.trim() || !sessionId) return;
// //     const msg = { role: "user", content: input, provider, model };
// //     const msgs = [...history, msg];
// //     onUserSend(msg);
// //     setBody({ messages: msgs, provider, model });
// //     setStreaming(true);
// //     setInput("");
// //   };

// //   const handleKeyDown = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       onSend();
// //     }
// //   };

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //   };

// //   return (
// //     <div className="chat-container">
// //       {/* Messages Area */}
// //       <div className="chat-messages" ref={messagesContainerRef}>
// //         {history.map((m, idx) => (
// //           <div
// //             key={idx}
// //             className={`message ${m.role === "user" ? "user" : ""}`}
// //           >
// //             <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
// //               {m.role === "user" ? (
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
// //                   <circle cx="12" cy="7" r="4"></circle>
// //                 </svg>
// //               ) : (
// //                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
// //                 </svg>
// //               )}
// //             </div>
// //             <div 
// //               className="message-content"
// //               dangerouslySetInnerHTML={{
// //                 __html: marked.parse(m.content || ""),
// //               }}
// //             />
// //             {m.role === "assistant" && (
// //               <div className="message-actions">
// //                 <button
// //                   className="message-action-btn"
// //                   onClick={() => copyToClipboard(m.content || "")}
// //                   aria-label="Copy text"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
// //                     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
// //                   </svg>
// //                 </button>
// //                 <button
// //                   className="message-action-btn"
// //                   aria-label="Like response"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
// //                   </svg>
// //                 </button>
// //                 <button
// //                   className="message-action-btn"
// //                   aria-label="Dislike response"
// //                 >
// //                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
// //                   </svg>
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         ))}
        
// //         {error && (
// //           <div className="error-message">
// //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <circle cx="12" cy="12" r="10"></circle>
// //               <line x1="12" y1="8" x2="12" y2="12"></line>
// //               <line x1="12" y1="16" x2="12.01" y2="16"></line>
// //             </svg>
// //             <span>{error}</span>
// //             <button
// //               className="message-action-btn"
// //               onClick={() => copyToClipboard(error)}
// //               aria-label="Copy error"
// //             >
// //               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
// //                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
// //               </svg>
// //             </button>
// //           </div>
// //         )}
        
// //         {streaming && (
// //           <div className="typing-indicator">
// //             <div className="typing-dot"></div>
// //             <div className="typing-dot"></div>
// //             <div className="typing-dot"></div>
// //           </div>
// //         )}
        
// //         <div ref={messagesEndRef} />
// //       </div>
      
// //       {/* Composer */}
// //       <div className="chat-input-container">
// //         <div className="chat-input-wrapper">
// //           <textarea
// //             ref={textareaRef}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={handleKeyDown}
// //             placeholder="Ask anything..."
// //             className="chat-input"
// //             rows={1}
// //             disabled={streaming}
// //           />
// //           <button
// //             onClick={onSend}
// //             className="chat-send-btn"
// //             disabled={!input.trim() || streaming}
// //             aria-label="Send message"
// //           >
// //             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //               <line x1="22" y1="2" x2="11" y2="13"></line>
// //               <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
// //             </svg>
// //           </button>
// //           {streaming && (
// //             <button
// //               onClick={() => setStreaming(false)}
// //               className="chat-stop-btn"
// //               aria-label="Stop generation"
// //             >
// //               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="6" y="6" width="12" height="12"></rect>
// //               </svg>
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useState, useEffect, useRef } from "react";
// import useSSE from "../hooks/useSSE";
// import { marked } from "marked";

// export default function ChatPanel({
//   sessionId,
//   provider,
//   model,
//   history,
//   onUserSend,
//   onAssistantDelta,
//   onAssistantDone,
// }) {
//   const [input, setInput] = useState("");
//   const [streaming, setStreaming] = useState(false);
//   const [body, setBody] = useState(null);
//   const [error, setError] = useState("");
//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);
//   const messagesContainerRef = useRef(null);

//   // Reset error when sessionId changes (switching chats)
//   useEffect(() => {
//     setError("");
//   }, [sessionId]);

//   // Auto-scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [history, streaming]);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [input]);

//   const scrollToBottom = () => {
//     if (messagesContainerRef.current && messagesEndRef.current) {
//       messagesContainerRef.current.scrollTo({
//         top: messagesContainerRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   };

//   useSSE({
//     url: streaming
//       ? `${
//           import.meta.env.VITE_API_BASE || "http://localhost:8003"
//         }/chat/${sessionId}/stream`
//       : null,
//     body,
//     onDelta: (deltaOrError) => {
//       if (typeof deltaOrError === "string") {
//         onAssistantDelta(deltaOrError);
//       } else if (deltaOrError && deltaOrError.error) {
//         setError(deltaOrError.error);
//       }
//     },
//     onDone: () => {
//       setStreaming(false);
//       onAssistantDone();
//     },
//     onError: (err) => {
//       setStreaming(false);
//       setError(err?.message || "Unknown error");
//     },
//   });

//   const onSend = () => {
//     if (!input.trim() || !sessionId) return;
//     const msg = { role: "user", content: input, provider, model };
//     const msgs = [...history, msg];
//     onUserSend(msg);
//     setBody({ messages: msgs, provider, model });
//     setStreaming(true);
//     setInput("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="chat-container">
//       {/* Messages Area */}
//       <div className="chat-messages" ref={messagesContainerRef}>
//         {history.map((m, idx) => (
//           <div
//             key={idx}
//             className={`message ${m.role === "user" ? "user" : ""}`}
//           >
//             <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
//               {m.role === "user" ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="12" cy="7" r="4"></circle>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                 </svg>
//               )}
//             </div>
//             <div 
//               className="message-content"
//               dangerouslySetInnerHTML={{
//                 __html: marked.parse(m.content || ""),
//               }}
//             />
//             {m.role === "assistant" && (
//               <div className="message-actions">
//                 <button
//                   className="message-action-btn"
//                   onClick={() => copyToClipboard(m.content || "")}
//                   aria-label="Copy text"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                     <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//                   </svg>
//                 </button>
//                 <button
//                   className="message-action-btn"
//                   aria-label="Like response"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
//                   </svg>
//                 </button>
//                 <button
//                   className="message-action-btn"
//                   aria-label="Dislike response"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
//                   </svg>
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
        
//         {error && (
//           <div className="error-message">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <circle cx="12" cy="12" r="10"></circle>
//               <line x1="12" y1="8" x2="12" y2="12"></line>
//               <line x1="12" y1="16" x2="12.01" y2="16"></line>
//             </svg>
//             <span>{error}</span>
//             <button
//               className="message-action-btn"
//               onClick={() => copyToClipboard(error)}
//               aria-label="Copy error"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
//                 <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
//               </svg>
//             </button>
//           </div>
//         )}
        
//         {streaming && (
//           <div className="typing-indicator">
//             <div className="typing-dot"></div>
//             <div className="typing-dot"></div>
//             <div className="typing-dot"></div>
//           </div>
//         )}
        
//         <div ref={messagesEndRef} />
//       </div>
      
//       {/* Composer */}
//       <div className="chat-input-container">
//         <div className="chat-input-wrapper">
//           <textarea
//             ref={textareaRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask anything..."
//             className="chat-input"
//             rows={1}
//             disabled={streaming}
//           />
//           <button
//             onClick={onSend}
//             className="chat-send-btn"
//             disabled={!input.trim() || streaming}
//             aria-label="Send message"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <line x1="22" y1="2" x2="11" y2="13"></line>
//               <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//             </svg>
//           </button>
//           {streaming && (
//             <button
//               onClick={() => setStreaming(false)}
//               className="chat-stop-btn"
//               aria-label="Stop generation"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="6" y="6" width="12" height="12"></rect>
//               </svg>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useState, useEffect, useRef } from "react";
// import useSSE from "../hooks/useSSE";
// import { marked } from "marked";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8003";

// export default function ChatPanel({
//   sessionId,
//   provider,
//   model,
//   history,
//   onUserSend,
//   onAssistantDelta,
//   onAssistantDone,
// }) {
//   const [input, setInput] = useState("");
//   const [streaming, setStreaming] = useState(false);
//   const [body, setBody] = useState(null);
//   const [error, setError] = useState("");
//   const messagesEndRef = useRef(null);
//   const textareaRef = useRef(null);
//   const messagesContainerRef = useRef(null);

//   useEffect(() => {
//     setError("");
//   }, [sessionId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [history, streaming]);

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [input]);

//   const scrollToBottom = () => {
//     if (messagesContainerRef.current && messagesEndRef.current) {
//       messagesContainerRef.current.scrollTo({
//         top: messagesContainerRef.current.scrollHeight,
//         behavior: "smooth"
//       });
//     }
//   };

//   useSSE({
//     url: streaming ? `${API_BASE}/chat/${sessionId}/stream` : null,
//     body,
//     onDelta: (deltaOrError) => {
//       if (typeof deltaOrError === "string") {
//         onAssistantDelta(deltaOrError);
//       } else if (deltaOrError && deltaOrError.error) {
//         setError(deltaOrError.error);
//       }
//     },
//     onDone: () => {
//       setStreaming(false);
//       onAssistantDone();
//     },
//     onError: (err) => {
//       setStreaming(false);
//       setError(err?.message || "Unknown error");
//     },
//   });

//   const onSend = () => {
//     if (!input.trim() || !sessionId) return;
//     const msg = { role: "user", content: input, provider, model };
//     const msgs = [...history, msg];
//     onUserSend(msg);
//     setBody({ messages: msgs, provider, model });
//     setStreaming(true);
//     setInput("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       onSend();
//     }
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-messages" ref={messagesContainerRef}>
//         {history.map((m, idx) => (
//           <div key={idx} className={`message ${m.role === "user" ? "user" : ""}`}>
//             <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
//               {m.role === "user" ? (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//                   <circle cx="12" cy="7" r="4"></circle>
//                 </svg>
//               ) : (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
//                 </svg>
//               )}
//             </div>
//             <div
//               className="message-content"
//               dangerouslySetInnerHTML={{ __html: marked.parse(m.content || "") }}
//             />
//             {m.role === "assistant" && (
//               <div className="message-actions">
//                 <button
//                   className="message-action-btn"
//                   onClick={() => copyToClipboard(m.content || "")}
//                   aria-label="Copy text"
//                 >
//                   📋
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}

//         {error && (
//           <div className="error-message">
//             ❌ <span>{error}</span>
//             <button onClick={() => copyToClipboard(error)}>📋</button>
//           </div>
//         )}

//         {streaming && (
//           <div className="typing-indicator">
//             <div className="typing-dot"></div>
//             <div className="typing-dot"></div>
//             <div className="typing-dot"></div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chat-input-container">
//         <div className="chat-input-wrapper">
//           <textarea
//             ref={textareaRef}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Ask anything..."
//             className="chat-input"
//             rows={1}
//             disabled={streaming}
//           />
//           <button
//             onClick={onSend}
//             className="chat-send-btn"
//             disabled={!input.trim() || streaming}
//           >
//             ➤
//           </button>
//           {streaming && (
//             <button onClick={() => setStreaming(false)} className="chat-stop-btn">
//               ⏹
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

/*import { useState, useEffect, useRef } from "react";
import useSSE from "../hooks/useSSE";
import { marked } from "marked";
import { API_BASE } from "../api/client";

export default function ChatPanel({
  sessionId,
  provider,
  model,
  history,
  onUserSend,
  onAssistantDelta,
  onAssistantDone,
}) {
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [body, setBody] = useState(null);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => setError(""), [sessionId]);
  useEffect(() => scrollToBottom(), [history, streaming]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useSSE({
    url: streaming ? `${API_BASE}/chat/${sessionId}/stream` : null,
    body,
    onDelta: (deltaOrError) => {
      if (typeof deltaOrError === "string") {
        onAssistantDelta(deltaOrError);
      } else if (deltaOrError?.error) {
        setError(deltaOrError.error);
      }
    },
    onDone: () => {
      setStreaming(false);
      onAssistantDone();
    },
    onError: (err) => {
      setStreaming(false);
      setError(err?.message || "Unknown error");
    },
  });

  const onSend = () => {
    if (!input.trim() || !sessionId) return;
    const msg = { role: "user", content: input, provider, model };
    const msgs = [...history, msg];
    onUserSend(msg);
    setBody({ messages: msgs, provider, model });
    setStreaming(true);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={messagesContainerRef}>
        {history.map((m, idx) => (
          <div key={idx} className={`message ${m.role === "user" ? "user" : ""}`}>
            <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
              {m.role === "user" ? "👤" : "🤖"}
            </div>
            <div
              className="message-content"
              dangerouslySetInnerHTML={{ __html: marked.parse(m.content || "") }}
            />
            {m.role === "assistant" && (
              <div className="message-actions">
                <button
                  className="message-action-btn"
                  onClick={() => copyToClipboard(m.content || "")}
                >
                  📋
                </button>
              </div>
            )}
          </div>
        ))}

        {error && (
          <div className="error-message">
            ❌ <span>{error}</span>
            <button onClick={() => copyToClipboard(error)}>📋</button>
          </div>
        )}

        {streaming && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="chat-input"
            rows={1}
            disabled={streaming}
          />
          <button
            onClick={onSend}
            className="chat-send-btn"
            disabled={!input.trim() || streaming}
          >
            ➤
          </button>
          {streaming && (
            <button onClick={() => setStreaming(false)} className="chat-stop-btn">
              ⏹
            </button>
          )}
        </div>
      </div>
    </div>
  );
}*/

import { useState, useEffect, useRef } from "react";
import useSSE from "../hooks/useSSE";
import { API_BASE } from "../api/client";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Custom Component for rendering code blocks with a copy button
const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const [copyText, setCopyText] = useState('Copy');
  const match = /language-(\w+)/.exec(className || '');
  const codeString = String(children).replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000); // Reset after 2 seconds
    });
  };

  return !inline && match ? (
    <div className="code-block-wrapper">
      <SyntaxHighlighter
        style={vscDarkPlus} // You can choose different themes here
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
      <button className="copy-button" onClick={handleCopy}>
        {copyText}
      </button>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};


export default function ChatPanel({
  sessionId,
  provider,
  model,
  history,
  onUserSend,
  onAssistantDelta,
  onAssistantDone,
}) {
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [body, setBody] = useState(null);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => setError(""), [sessionId]);
  useEffect(() => scrollToBottom(), [history, streaming]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useSSE({
    url: streaming ? `${API_BASE}/chat/${sessionId}/stream` : null,
    body,
    onDelta: (deltaOrError) => {
      if (typeof deltaOrError === "string") {
        onAssistantDelta(deltaOrError);
      } else if (deltaOrError?.error) {
        setError(deltaOrError.error);
      }
    },
    onDone: () => {
      setStreaming(false);
      onAssistantDone();
    },
    onError: (err) => {
      setStreaming(false);
      setError(err?.message || "Unknown error");
    },
  });

  const onSend = () => {
    if (!input.trim() || !sessionId) return;
    const msg = { role: "user", content: input, provider, model };
    const msgs = [...history, msg];
    onUserSend(msg);
    setBody({ messages: msgs, provider, model });
    setStreaming(true);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const copyToClipboard = (text) => navigator.clipboard.writeText(text);

  return (
    <div className="chat-container">
      <div className="chat-messages" ref={messagesContainerRef}>
        {history.map((m, idx) => (
          <div key={idx} className={`message ${m.role === "user" ? "user" : ""}`}>
            <div className={`message-avatar ${m.role === "user" ? "user-avatar" : "ai-avatar"}`}>
              {m.role === "user" ? "👤" : "🤖"}
            </div>
            {/* THIS IS THE UPDATED PART */}
            <div className="message-content">
              <ReactMarkdown
                components={{
                  code: CodeBlock, // Use our custom CodeBlock component
                }}
              >
                {m.content || ""}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {error && (
          <div className="error-message">
            ❌ <span>{error}</span>
            <button onClick={() => copyToClipboard(error)}>📋</button>
          </div>
        )}

        {streaming && (
          <div className="typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="chat-input"
            rows={1}
            disabled={streaming}
          />
          <button
            onClick={onSend}
            className="chat-send-btn"
            disabled={!input.trim() || streaming}
          >
            ➤
          </button>
          {streaming && (
            <button onClick={() => setStreaming(false)} className="chat-stop-btn">
              ⏹
            </button>
          )}
        </div>
      </div>
    </div>
  );
}