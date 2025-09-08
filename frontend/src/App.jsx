// import { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar";
// import ChatPanel from "./components/ChatPanel";
// import "./styles.css";
// import ModelSwitcher from "./components/ModelSwitcher";

// export default function App() {
//   const [sessions, setSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     return savedTheme || "light";
//   });

//   const [modelConfig, setModelConfig] = useState({
//     provider: "",
//     model: ""
//   });

//   // Apply theme to document
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // load existing sessions for user on mount
//   useEffect(() => {
//   fetch("http://localhost:8003/sessions?user_id=user123")
//       .then((r) => r.json())
//       .then((arr) => {
//         if (Array.isArray(arr)) {
//           setSessions(arr.map(s => ({ id: s.id, title: s.title, messages: [] })));
//           if (arr.length > 0) setCurrentSessionId(arr[0].id);
//         }
//       })
//       .catch(() => {});
//   }, []);

//   // Fetch available models from the backend
//   useEffect(() => {
//   fetch("http://localhost:8003/models")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         // choose a sensible default provider and model from backend response
//         const providers = Object.keys(data || {});
//         if (providers.length > 0) {
//           const defaultProvider = providers[0];
//           const defaultModel = (data[defaultProvider] && data[defaultProvider][0]) || "";
//           setModelConfig((prev) => ({
//             ...prev,
//             provider: defaultProvider,
//             model: defaultModel,
//           }));
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch models:", err);
//         alert("Failed to fetch models. Please check your backend server.");
//       });
//   }, []);

//   const handleNewChat = () => {
//     const localId = crypto.randomUUID(); // temporary local id until server returns
//     const newSession = { id: localId, title: "Untitled Chat", messages: [] };

//     // Persist the session in the backend and use the server-generated id
//     const headers = { "Content-Type": "application/json" };
//     fetch("http://localhost:8003/sessions", {
//       method: "POST",
//       headers,
//       body: JSON.stringify({ title: newSession.title })
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to create session: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         // backend returns { session_id }
//         const serverId = data?.session_id || localId;
//         const sessionToStore = { ...newSession, id: serverId };
//         setSessions((prev) => [sessionToStore, ...prev]);
//         setCurrentSessionId(serverId);
//       })
//       .catch((err) => {
//         console.error("Failed to create session:", err);
//         alert("Failed to create new chat session");
//       });
//   };

//   const handleSelectChat = (id) => {
//     setCurrentSessionId(id);
//   };

//   const handleUserSend = (message) => {
//     if (!currentSessionId) return;

//     // Ensure the message has the correct role
//     const userMessage = { role: "user", content: message.content };

//     setSessions((prevSessions) => {
//       const updatedSessions = [...prevSessions];
//       const sessionIndex = updatedSessions.findIndex((s) => s.id === currentSessionId);

//       if (sessionIndex !== -1) {
//         // Append user message and an empty assistant placeholder so streaming deltas
//         // have an assistant message to update immediately.
//         const newMessages = [...updatedSessions[sessionIndex].messages, userMessage, { role: "assistant", content: "" }];
//         updatedSessions[sessionIndex] = {
//           ...updatedSessions[sessionIndex],
//           messages: newMessages
//         };

//         if (updatedSessions[sessionIndex].messages.length === 1) {
//           const title =
//             message.content.length > 30
//               ? message.content.substring(0, 30) + "..."
//               : message.content;
//           updatedSessions[sessionIndex].title = title;
//         }
//       }

//       return updatedSessions;
//     });
//   };

//   const handleAssistantDelta = (delta) => {
//     if (!currentSessionId) return;

//     setSessions((prevSessions) => {
//       const updatedSessions = [...prevSessions];
//       const sessionIndex = updatedSessions.findIndex((s) => s.id === currentSessionId);

//       if (sessionIndex !== -1) {
//         const lastMessageIndex = updatedSessions[sessionIndex].messages.length - 1;

//         if (lastMessageIndex >= 0 && updatedSessions[sessionIndex].messages[lastMessageIndex].role === "assistant") {
//           updatedSessions[sessionIndex].messages[lastMessageIndex] = {
//             ...updatedSessions[sessionIndex].messages[lastMessageIndex],
//             content:
//               updatedSessions[sessionIndex].messages[lastMessageIndex].content + delta
//           };
//         } else {
//           // Add a new assistant message if none exists
//           updatedSessions[sessionIndex].messages.push({ role: "assistant", content: delta });
//         }
//       }

//       return updatedSessions;
//     });
//   };

//   const handleAssistantDone = () => {
//     console.log("Assistant done");
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const handleModelChange = (newModelConfig) => {
//     setModelConfig(newModelConfig);
//   };

//   const currentSession = sessions.find((s) => s.id === currentSessionId);
//   const messages = currentSession ? currentSession.messages : [];

//   return (
//     <div className="app-container">
//       <Sidebar
//         sessions={sessions}
//         onNew={handleNewChat}
//         onPick={handleSelectChat}
//         currentId={currentSessionId}
//         collapsed={sidebarCollapsed}
//         onToggle={toggleSidebar}
//         theme={theme}
//         onThemeToggle={toggleTheme}
//         modelConfig={modelConfig}
//         onModelChange={handleModelChange}
//       />

//       <main className="main-content">
//         {currentSession ? (
//           <ChatPanel
//             sessionId={currentSessionId}
//             provider={modelConfig.provider}
//             model={modelConfig.model}
//             history={messages}
//             onUserSend={handleUserSend}
//             onAssistantDelta={handleAssistantDelta}
//             onAssistantDone={handleAssistantDone}
//           />
//         ) : (
//           <div className="empty-state">
//             <div className="empty-state-content">
//               <h2>Welcome to ChatBot AI</h2>
//               <p>Start a new conversation by clicking the "New Chat" button</p>
//               <button onClick={handleNewChat}>New Chat</button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


// import { useState, useEffect } from "react";
// import Sidebar from "./components/Sidebar";
// import ChatPanel from "./components/ChatPanel";
// import "./styles.css";
// import ModelSwitcher from "./components/ModelSwitcher";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8003";

// export default function App() {
//   const [sessions, setSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     return savedTheme || "light";
//   });

//   const [modelConfig, setModelConfig] = useState({
//     provider: "",
//     model: ""
//   });

//   // Apply theme to document
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // load existing sessions for user on mount
//   useEffect(() => {
//     fetch(`${API_BASE}/sessions?user_id=user123`)
//       .then((r) => r.json())
//       .then((arr) => {
//         if (Array.isArray(arr)) {
//           setSessions(arr.map(s => ({ id: s.id, title: s.title, messages: [] })));
//           if (arr.length > 0) setCurrentSessionId(arr[0].id);
//         }
//       })
//       .catch(() => {});
//   }, []);

//   // Fetch available models from the backend
//   useEffect(() => {
//     fetch(`${API_BASE}/models`)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const providers = Object.keys(data || {});
//         if (providers.length > 0) {
//           const defaultProvider = providers[0];
//           const defaultModel = (data[defaultProvider] && data[defaultProvider][0]) || "";
//           setModelConfig({
//             provider: defaultProvider,
//             model: defaultModel,
//           });
//         }
//       })
//       .catch((err) => {
//         console.error("Failed to fetch models:", err);
//         alert("Failed to fetch models. Please check your backend server.");
//       });
//   }, []);

//   const handleNewChat = () => {
//     const localId = crypto.randomUUID();
//     const newSession = { id: localId, title: "Untitled Chat", messages: [] };

//     fetch(`${API_BASE}/sessions`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title: newSession.title })
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Failed to create session: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         const serverId = data?.session_id || localId;
//         const sessionToStore = { ...newSession, id: serverId };
//         setSessions((prev) => [sessionToStore, ...prev]);
//         setCurrentSessionId(serverId);
//       })
//       .catch((err) => {
//         console.error("Failed to create session:", err);
//         alert("Failed to create new chat session");
//       });
//   };

//   const handleSelectChat = (id) => {
//     setCurrentSessionId(id);
//   };

//   const handleUserSend = (message) => {
//     if (!currentSessionId) return;

//     const userMessage = { role: "user", content: message.content };

//     setSessions((prevSessions) => {
//       const updatedSessions = [...prevSessions];
//       const sessionIndex = updatedSessions.findIndex((s) => s.id === currentSessionId);

//       if (sessionIndex !== -1) {
//         const newMessages = [...updatedSessions[sessionIndex].messages, userMessage, { role: "assistant", content: "" }];
//         updatedSessions[sessionIndex] = {
//           ...updatedSessions[sessionIndex],
//           messages: newMessages
//         };

//         if (updatedSessions[sessionIndex].messages.length === 1) {
//           const title =
//             message.content.length > 30
//               ? message.content.substring(0, 30) + "..."
//               : message.content;
//           updatedSessions[sessionIndex].title = title;
//         }
//       }

//       return updatedSessions;
//     });
//   };

//   const handleAssistantDelta = (delta) => {
//     if (!currentSessionId) return;

//     setSessions((prevSessions) => {
//       const updatedSessions = [...prevSessions];
//       const sessionIndex = updatedSessions.findIndex((s) => s.id === currentSessionId);

//       if (sessionIndex !== -1) {
//         const lastMessageIndex = updatedSessions[sessionIndex].messages.length - 1;

//         if (lastMessageIndex >= 0 && updatedSessions[sessionIndex].messages[lastMessageIndex].role === "assistant") {
//           updatedSessions[sessionIndex].messages[lastMessageIndex] = {
//             ...updatedSessions[sessionIndex].messages[lastMessageIndex],
//             content:
//               updatedSessions[sessionIndex].messages[lastMessageIndex].content + delta
//           };
//         } else {
//           updatedSessions[sessionIndex].messages.push({ role: "assistant", content: delta });
//         }
//       }

//       return updatedSessions;
//     });
//   };

//   const handleAssistantDone = () => {
//     console.log("Assistant done");
//   };

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const handleModelChange = (newModelConfig) => {
//     setModelConfig(newModelConfig);
//   };

//   const currentSession = sessions.find((s) => s.id === currentSessionId);
//   const messages = currentSession ? currentSession.messages : [];

//   return (
//     <div className="app-container">
//       <Sidebar
//         sessions={sessions}
//         onNew={handleNewChat}
//         onPick={handleSelectChat}
//         currentId={currentSessionId}
//         collapsed={sidebarCollapsed}
//         onToggle={toggleSidebar}
//         theme={theme}
//         onThemeToggle={toggleTheme}
//         modelConfig={modelConfig}
//         onModelChange={handleModelChange}
//       />

//       <main className="main-content">
//         {currentSession ? (
//           <ChatPanel
//             sessionId={currentSessionId}
//             provider={modelConfig.provider}
//             model={modelConfig.model}
//             history={messages}
//             onUserSend={handleUserSend}
//             onAssistantDelta={handleAssistantDelta}
//             onAssistantDone={handleAssistantDone}
//           />
//         ) : (
//           <div className="empty-state">
//             <div className="empty-state-content">
//               <h2>Welcome to ChatBot AI</h2>
//               <p>Start a new conversation by clicking the "New Chat" button</p>
//               <button onClick={handleNewChat}>New Chat</button>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }


/*import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import "./styles.css";
import ModelSwitcher from "./components/ModelSwitcher";
import { getModels, createSession, listSessions } from "./api/client";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  const [modelConfig, setModelConfig] = useState({
    provider: "",
    model: ""
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load sessions
  useEffect(() => {
    listSessions("user123")
      .then((arr) => {
        if (Array.isArray(arr)) {
          setSessions(arr.map(s => ({ id: s.id, title: s.title, messages: [] })));
          if (arr.length > 0) setCurrentSessionId(arr[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch models
  useEffect(() => {
    getModels()
      .then((data) => {
        const providers = Object.keys(data || {});
        if (providers.length > 0) {
          const defaultProvider = providers[0];
          const defaultModel = (data[defaultProvider] && data[defaultProvider][0]) || "";
          setModelConfig({ provider: defaultProvider, model: defaultModel });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch models:", err);
        alert("Failed to fetch models. Please check your backend server.");
      });
  }, []);

  const handleNewChat = () => {
    const localId = crypto.randomUUID();
    const newSession = { id: localId, title: "Untitled Chat", messages: [] };

    createSession("user123", newSession.title)
      .then((data) => {
        const serverId = data?.session_id || localId;
        const sessionToStore = { ...newSession, id: serverId };
        setSessions((prev) => [sessionToStore, ...prev]);
        setCurrentSessionId(serverId);
      })
      .catch((err) => {
        console.error("Failed to create session:", err);
        alert("Failed to create new chat session");
      });
  };

  const handleSelectChat = (id) => setCurrentSessionId(id);

  const handleUserSend = (message) => {
    if (!currentSessionId) return;
    const userMessage = { role: "user", content: message.content };

    setSessions((prevSessions) => {
      const updated = [...prevSessions];
      const idx = updated.findIndex((s) => s.id === currentSessionId);

      if (idx !== -1) {
        const newMessages = [...updated[idx].messages, userMessage, { role: "assistant", content: "" }];
        updated[idx] = { ...updated[idx], messages: newMessages };

        if (updated[idx].messages.length === 1) {
          updated[idx].title =
            message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content;
        }
      }

      return updated;
    });
  };

  const handleAssistantDelta = (delta) => {
    if (!currentSessionId) return;

    setSessions((prevSessions) => {
      const updated = [...prevSessions];
      const idx = updated.findIndex((s) => s.id === currentSessionId);

      if (idx !== -1) {
        const lastIdx = updated[idx].messages.length - 1;
        if (lastIdx >= 0 && updated[idx].messages[lastIdx].role === "assistant") {
          updated[idx].messages[lastIdx] = {
            ...updated[idx].messages[lastIdx],
            content: updated[idx].messages[lastIdx].content + delta
          };
        } else {
          updated[idx].messages.push({ role: "assistant", content: delta });
        }
      }

      return updated;
    });
  };

  const handleAssistantDone = () => console.log("Assistant done");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleModelChange = (newModelConfig) => setModelConfig(newModelConfig);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession ? currentSession.messages : [];

  return (
    <div className="app-container">
      <Sidebar
        sessions={sessions}
        onNew={handleNewChat}
        onPick={handleSelectChat}
        currentId={currentSessionId}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        theme={theme}
        onThemeToggle={toggleTheme}
        modelConfig={modelConfig}
        onModelChange={handleModelChange}
      />

      <main className="main-content">
        {currentSession ? (
          <ChatPanel
            sessionId={currentSessionId}
            provider={modelConfig.provider}
            model={modelConfig.model}
            history={messages}
            onUserSend={handleUserSend}
            onAssistantDelta={handleAssistantDelta}
            onAssistantDone={handleAssistantDone}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <h2>Welcome to ChatBot AI</h2>
              <p>Start a new conversation by clicking the "New Chat" button</p>
              <button onClick={handleNewChat}>New Chat</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
*/

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import ChatPanel from "./components/ChatPanel";
import SparkleCursor from "./components/SparkleCursor"; // 1. Import SparkleCursor
import "./styles.css";
import { getModels, createSession, listSessions } from "./api/client";

export default function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "dark"; // Defaulting to dark theme as per your UI
  });

  const [modelConfig, setModelConfig] = useState({
    provider: "",
    model: ""
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Load sessions
  useEffect(() => {
    listSessions("user123")
      .then((arr) => {
        if (Array.isArray(arr)) {
          setSessions(arr.map(s => ({ id: s.id, title: s.title, messages: [] })));
          if (arr.length > 0) setCurrentSessionId(arr[0].id);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch models
  useEffect(() => {
    getModels()
      .then((data) => {
        const providers = Object.keys(data || {});
        if (providers.length > 0) {
          const defaultProvider = providers[0];
          const defaultModel = (data[defaultProvider] && data[defaultProvider][0]) || "";
          setModelConfig({ provider: defaultProvider, model: defaultModel });
        }
      })
      .catch((err) => {
        console.error("Failed to fetch models:", err);
        alert("Failed to fetch models. Please check your backend server.");
      });
  }, []);

  const handleNewChat = () => {
    const localId = crypto.randomUUID();
    const newSession = { id: localId, title: "Untitled Chat", messages: [] };

    createSession("user123", newSession.title)
      .then((data) => {
        const serverId = data?.session_id || localId;
        const sessionToStore = { ...newSession, id: serverId };
        setSessions((prev) => [sessionToStore, ...prev]);
        setCurrentSessionId(serverId);
      })
      .catch((err) => {
        console.error("Failed to create session:", err);
        alert("Failed to create new chat session");
      });
  };

  const handleSelectChat = (id) => setCurrentSessionId(id);

  const handleUserSend = (message) => {
    if (!currentSessionId) return;
    const userMessage = { role: "user", content: message.content };

    setSessions((prevSessions) => {
      const updated = [...prevSessions];
      const idx = updated.findIndex((s) => s.id === currentSessionId);

      if (idx !== -1) {
        const newMessages = [...updated[idx].messages, userMessage, { role: "assistant", content: "" }];
        updated[idx] = { ...updated[idx], messages: newMessages };

        if (updated[idx].messages.length === 1) {
          updated[idx].title =
            message.content.length > 30 ? message.content.substring(0, 30) + "..." : message.content;
        }
      }

      return updated;
    });
  };

  const handleAssistantDelta = (delta) => {
    if (!currentSessionId) return;

    setSessions((prevSessions) => {
      const updated = [...prevSessions];
      const idx = updated.findIndex((s) => s.id === currentSessionId);

      if (idx !== -1) {
        const lastIdx = updated[idx].messages.length - 1;
        if (lastIdx >= 0 && updated[idx].messages[lastIdx].role === "assistant") {
          updated[idx].messages[lastIdx] = {
            ...updated[idx].messages[lastIdx],
            content: updated[idx].messages[lastIdx].content + delta
          };
        } else {
          updated[idx].messages.push({ role: "assistant", content: delta });
        }
      }

      return updated;
    });
  };

  const handleAssistantDone = () => console.log("Assistant done");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleModelChange = (newModelConfig) => setModelConfig(newModelConfig);

  const currentSession = sessions.find((s) => s.id === currentSessionId);
  const messages = currentSession ? currentSession.messages : [];

  return (
    <div className="app-container">
      <SparkleCursor />
      <Sidebar
        sessions={sessions}
        onNew={handleNewChat}
        onPick={handleSelectChat}
        currentId={currentSessionId}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        theme={theme}
        onThemeToggle={toggleTheme}
        modelConfig={modelConfig}
        onModelChange={handleModelChange}
      />

      <main className="main-content">
        {currentSession ? (
          <ChatPanel
            sessionId={currentSessionId}
            provider={modelConfig.provider}
            model={modelConfig.model}  // <-- THIS IS THE CORRECTED LINE
            history={messages}
            onUserSend={handleUserSend}
            onAssistantDelta={handleAssistantDelta}
            onAssistantDone={handleAssistantDone}
          />
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <h2>Welcome to ChatBot AI</h2>
              <p>Start a new conversation by clicking the "New Chat" button.</p>
              <button onClick={handleNewChat}>New Chat</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}