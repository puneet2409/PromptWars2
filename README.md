# 🗳️ Chunav Saathi — Election Companion

> **Your AI companion for understanding Indian elections**
> चुनाव साथी — भारतीय चुनावों को समझने का आपका साथी

## Chosen Vertical
**Civic Education Assistant**

## What is Chunav Saathi?

Chunav Saathi is a bilingual (Hindi + English) civic education web app that helps Indian citizens understand how elections work, explore constituency data, and learn about the democratic process through an interactive AI chat interface powered by the Gemini API.

## Features

| Feature | Description |
|---------|-------------|
| 💬 **AI Chat** | Ask questions about elections, candidates, and voting procedures in Hindi or English (Powered by Gemini) |
| 🗺️ **Interactive Map** | SVG India map color-coded by ruling party — click any state for constituency details |
| 📅 **Election Timeline** | Interactive stepper showing key 2024 election milestones |
| 🧠 **Quiz** | 8-question bilingual quiz to test election knowledge |
| 🌐 **Bilingual** | Full Hindi/English toggle — auto-detects language from user input |

## Approach and Logic
Our approach is to provide a highly accessible, fast, and visually engaging civic education platform. The logic centers around breaking down complex election information into digestible chunks (timeline, interactive map, and an intelligent chat assistant). We chose the Gemini API for the chat to provide dynamic, smart, and context-aware responses in both English and Hindi based on election data.

## How the Solution Works
1. **Frontend**: The user accesses the Vite + React frontend and can seamlessly switch between Hindi and English.
2. **Interactive Elements**: Users can explore the Election Timeline or Interactive Map locally in the browser.
3. **Smart Assistant**: When the user asks a question in the chat, the message is sent to our Express backend `/api/chat`.
4. **Gemini API Integration**: The backend constructs a prompt using our domain-specific election knowledge and queries the `gemini-3-flash-preview` model, requesting a strictly structured JSON response.
5. **Response Delivery**: The AI response is streamed back to the user interface, generating smart and context-aware follow-up actions dynamically.

## Assumptions Made
- Users have basic internet connectivity but may benefit from a lightweight app (hence the small < 1MB repository size).
- Users may not be fluent in English, requiring seamless Hindi support.
- API keys (like the Gemini API key) are injected securely via environment variables (`.env`) in the production environment.

## Architecture

```
Frontend (Vite + React)     →  Express.js Production Server  →  Cloud Run
     ↓                              ↓
Election Data               Gemini API (via @google/genai)
```

## Tech Stack

- **Frontend**: React 18 + Vite, Vanilla CSS, Lucide Icons
- **Backend**: Express 5 + Helmet + CORS
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Deployment**: Docker → Google Cloud Run
- **Database**: AlloyDB-ready (PostgreSQL-compatible schema in `seed/`)

## Quick Start

```bash
npm install
# Ensure you create a .env file with GEMINI_API_KEY=your_key
npm run dev       # Start Vite dev server
npm run build     # Build for production
npm start         # Start production server
npm test          # Run tests
```

## Data Sources

- [data.gov.in](https://data.gov.in) — ECI open datasets (voter rolls, results)
- [datameet GitHub](https://github.com/datameet) — Constituency GeoJSON boundaries
- [Election Commission of India](https://eci.gov.in) — Official election schedules

## Repo Size

The repository intentionally stays under **10 MB** as per the hackathon rules. Election data is never committed — the `seed/` folder contains scripts that fetch CSVs from data.gov.in at deploy time and insert them into AlloyDB.

## Deployment

```bash
# Build and deploy to Cloud Run
docker build -t chunav-saathi .
# Or use the Cloud Run MCP deploy tool
```

## License

Built for PromptWars Hackathon 2026
