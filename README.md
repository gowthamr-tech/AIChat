# AIChat

NestJS chat backend with WebSocket messaging, OpenAI-powered responses, and Prisma/PostgreSQL persistence for short-term conversation context.

## What It Does

- Accepts chat messages over a WebSocket endpoint at `/ws`
- Supports two response modes: `Complete` and `Stream`
- Stores sessions and messages in PostgreSQL with Prisma
- Reuses the latest 5 messages from a session as context for each new response

## Tech Stack

- NestJS
- WebSockets via `@nestjs/platform-ws`
- OpenAI Node SDK
- Prisma ORM
- PostgreSQL
- Jest for unit and e2e tests

## Project Structure

```text
src/
  ai/       OpenAI integration
  chat/     WebSocket gateway, DTOs, and chat orchestration
  prisma/   Prisma service/module
  shared/   Shared enums/types
prisma/
  schema.prisma
  migrations/
test/
  app.e2e-spec.ts
```

## Requirements

- Node.js 18+
- npm
- PostgreSQL database
- OpenAI API key

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
OPENAI_API_KEY="your_openai_api_key"
PORT=3000
```

Do not commit real secrets to the repository.

## Installation

```bash
npm install
```

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Apply migrations:

```bash
npx prisma migrate dev
```

## Running The App

Development:

```bash
npm run start:dev
```

Production:

```bash
npm run build
npm run start:prod
```

The HTTP server listens on `PORT` or `3000` by default.

## API Surface

### HTTP

- `GET /` returns the default NestJS hello response

### WebSocket

- Path: `/ws`
- Event: `message`

Example payload:

```json
{
  "messageId": "msg-001",
  "sessionId": "session-123",
  "message": "Tell me a joke",
  "mode": "Complete"
}
```

Valid `mode` values:

- `Complete`
- `Stream`

Response shape sent back to the client:

```json
{
  "sessionId": "session-123",
  "messageId": "msg-001",
  "response": "..."
}
```

In `Stream` mode, the server sends multiple partial responses as tokens arrive.

## Scripts

```bash
npm run build
npm run start
npm run start:dev
npm run start:debug
npm run start:prod
npm run lint
npm run test
npm run test:watch
npm run test:cov
npm run test:e2e
```

## Notes

- Chat context currently uses the latest 5 messages in a session
- The configured model in the current codebase is `gpt-4o-mini`
- Prisma schema defines `Session` and `Message` tables with cascade delete
