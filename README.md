AI Chat API with WebSocket Context Memory
A real-time WebSocket-based chat API that maintains conversation context using short-term memory storage. Supports both streaming and complete responses from OpenAI's GPT models.

Features
🚀 WebSocket-based real-time communication

🧠 Context-aware conversations with 5-message memory

⚡ Dual response modes: Streaming & Complete responses

💾 PostgreSQL storage with Prisma ORM

✅ Input validation with class-validator DTOs

🔌 OpenAI Integration with GPT-4o-mini model

Prerequisites
Node.js 18+

PostgreSQL database

OpenAI API account and API key

Quick Start
1. Installation
bash
# Clone the repository
git clone <your-repo-url>
cd ai-chat-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
2. Environment Configuration
Edit your .env file:

bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ai_chat_db"

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Server port (optional)
PORT=3000
3. Database Setup
bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Optional: Verify database connection
npx prisma db push
4. Running the Application
bash
# Development mode with hot reload
npm run start:dev

# Production build
npm run build
npm run start:prod
