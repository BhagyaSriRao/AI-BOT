# 🤖 AI-BOT 

A cutting-edge, full-stack chatbot platform featuring  **real-time streaming**, **authentication**, **database persistence**, and **multi-model provider support**.

---

## ✨ Core Features

- ⚡ **Live Streaming**: Token-by-token response rendering via SSE  
- 🔑 **Authentication**: JWT-based login & session handling  
- 💾 **Database Integration**: Postgres with SQLAlchemy ORM  
- 🔄 **Session Persistence**: Store & retrieve chat history  
- 🌐 **Multi-Provider Switching**: OpenAI, Anthropic, Gemini 
- 🎨 **Modern UI**: React + Vite frontend styled like ChatGPT  
- 📊 **Rate Limiting**: Configurable token caps for cost control  

---

## 🏛 Architecture Overview

```txt
Frontend (React + Vite) ⇄ Backend (FastAPI) ⇄ AI Providers
                                   ↓

                            Postgres Database
```

---

## 🚀 Quick Start

- 1️⃣ Clone & Setup
  ``` bash
    git clone <your-repo>
    cd AI-BOT
  ```
- 2️⃣ Backend Setup
  ``` bash
     cd backend-express
     python -m venv .venv
     source .venv/bin/activate     # On Windows: .venv\Scripts\activate
     pip install -r requirements.txt
  ```

- 3️⃣ Database Setup
## Start Postgres using Docker
 ``` bash
     docker compose up -d
 ```

### OR connect to your own Postgres instance
### Remember to update DATABASE_URL in .env

- 4️⃣ Configure Environment
  ``` bash
      cp env.example .env
  ```
### Fill in your API keys and database credentials

- 5️⃣ Start Backend Server
  ``` bash 
      cd backend-express
      uvicorn app:app --host 0.0.0.0 --port 8000 --reload
  ```

- 6️⃣ Start Frontend
  ``` bash
      cd frontend
      npm install
      npm run dev
  ```

## 👉 Open your browser at: http://localhost:5173

- ⚙️ Configuration
- 🔑 Environment Variables

    - OPENAI_API_KEY — OpenAI credentials

    - ANTHROPIC_API_KEY — Anthropic Claude API key

    - GEMINI_API_KEY — Google Gemini key

    - MAX_OUTPUT_TOKENS — Token limit per response

- 🤝 Supported Providers

   - OpenAI: GPT-4o-mini, GPT-4o-translate

   - Anthropic: Claude 3.5 Haiku

   - Gemini: Gemini 1.5 Flash


- 🔐 Authentication

  - Login: POST /auth/login → { email, password }

  - Verify: GET /auth/verify → Token validation

   - Frontend Integration: Token stored in localStorage, sent with every request (Authorization: Bearer <token>).

---

## 🧪 Testing

## SSE Chat Stream
``` bash
curl -N -H "Accept: text/event-stream" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}],"provider":"openai","model":"gpt-4o-mini"}' \
  http://localhost:8000/chat/<session_id>/stream
```
---

## API Endpoints

 - GET /models → List providers & models

 - POST /sessions → Create a new chat session

 - GET /sessions → Retrieve all sessions

 - GET /sessions/{id} → Load chat history

 - POST /chat/{id}/stream → Stream AI responses
   
---
## 🗂 Project Structure
ai-bot/
├─ backend/                     # FastAPI backend 
│  ├─ app.py                    # Main API routes 
│  ├─ providers/                # Provider logic
│  ├─ models.py                 # Database models 
│  ├─ schemas.py                # Pydantic schemas
│  ├─ auth/                     # JWT authentication logic
│  └─ requirements.txt          # Python dependencies
├─ frontend/                    # React + Vite frontend
│  ├─ src/components/           # UI components
│  ├─ src/hooks/                # Custom React hooks
│  ├─ src/api/                  # API client
│  └─ package.json              # Node dependencies
├─ docker-compose.yml           # Postgres setup
├─ env.example                  # Env template
└─ .github/workflows/deploy.yml # CI/CD workflow

---
## 🎯 Assignment Requirements

### This project meets all mandatory requirements:

- ✅ SSE Streaming — Real-time token-by-token responses
- ✅ Session Management — User sessions & persistent history
- ✅ Multi-Provider Switching — OpenAI + Anthropic/Gemini/Ollama
- ✅ Modern UI/UX — ChatGPT-like React interface
- ✅ Database Persistence — Postgres with SQLAlchemy
- ✅ Authentication — JWT-based login & token verification
- ✅ Rate Limiting — Configurable token caps
- ✅ Environment Security — .env for API keys


⚠️ Current login is demo-only (no user DB/password hashing). Replace with a secure system before production.
