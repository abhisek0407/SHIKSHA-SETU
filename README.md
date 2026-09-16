# Shiksha Setu

A digital learning portal built for HackOdisha — connecting students with study resources, a community Q&A forum, scholarships, and tutorials in one place.

**Live app:** [https://shiksha-setu-rose.vercel.app/](https://shiksha-setu-rose.vercel.app/)
**API:** [https://shiksha-setu-l5ho.onrender.com](https://shiksha-setu-l5ho.onrender.com)

## Features

- **Auth** — signup/login with JWT stored in an httpOnly cookie, passwords hashed with bcrypt
- **Q&A Forum** — post questions, answer others', delete your own questions/answers
- **Profile** — view your account details once logged in
- **Contact & Ideas** — a contact form and a separate "submit an idea" box, both emailed via Nodemailer
- **Scholarships, Notes, Live Tutorials** — static/informational content sections

## Tech Stack

**Frontend**
- Next.js 16 (App Router) + React 19 + TypeScript
- react-hook-form for form handling
- Deployed on Vercel

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose (hosted on MongoDB Atlas)
- JWT auth (`jsonwebtoken`) + `bcrypt` for password hashing
- Nodemailer for contact/idea emails
- Deployed on Render

## Project Structure

```
SHIKSHA-SETU/
├── backend/
│   ├── config/
│   │   └── emailConfig.js      # Nodemailer transporter (reads EMAIL_USER/EMAIL_PASS)
│   ├── controllers/
│   │   ├── db.js               # MongoDB connection
│   │   └── contact.js          # Contact form + idea submission handlers
│   ├── middlewares/
│   │   └── auth.js             # JWT verification middleware
│   ├── models/
│   │   ├── users.js
│   │   └── qna.js
│   ├── routes/
│   │   ├── signin.js           # POST /signin — create account
│   │   ├── login.js            # POST /login — authenticate, set cookie
│   │   ├── profile.js          # GET /profile — current user's details
│   │   ├── qna.js              # Q&A CRUD
│   │   └── contact.js          # Contact + idea routes
│   ├── index.js                # App entry point
│   └── package.json
│
└── frontend/
    └── app/
        ├── lib/api.ts           # Shared API_BASE_URL (reads NEXT_PUBLIC_API_URL)
        ├── login/
        ├── signup/
        ├── profile/
        ├── ask/                 # Post a new question
        ├── qna/                 # Question list + qna/[id] for a single thread
        ├── contact/
        ├── scholarships/
        ├── notes/
        ├── livetutorial/
        └── components/navbar.tsx
```

## Getting Started

### Prerequisites

- Node.js 20.9+
- A MongoDB Atlas cluster (or local MongoDB for development)
- A Gmail account with an [App Password](https://myaccount.google.com/apppasswords) for sending contact-form emails

### 1. Clone the repo

```bash
git clone https://github.com/abhisek0407/SHIKSHA-SETU.git
cd SHIKSHA-SETU
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` (never commit this file — it's already in `.gitignore`):

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/DigiPathshala?retryWrites=true&w=majority
PORT=3001
FRONTEND_URL=http://localhost:3000
AUTHPASS_JWT=<a long random string>
EMAIL_USER=<your gmail address>
EMAIL_PASS=<your gmail app password>
CONTACT_RECEIVER_EMAIL=<inbox to receive contact/idea emails>
```

Run it:

```bash
npm run dev    # with nodemon, auto-restarts on changes
# or
npm start      # plain node
```

The API runs on `http://localhost:3001` by default.

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Run it:

```bash
npm run dev
```

The app runs on `http://localhost:3000` by default.

## Environment Variables Reference

| Variable | Where | Description |
|---|---|---|
| `MONGODB_URI` | backend | MongoDB Atlas connection string |
| `PORT` | backend | Port the Express server listens on |
| `FRONTEND_URL` | backend | Allowed CORS origin(s); comma-separate for multiple |
| `AUTHPASS_JWT` | backend | Secret used to sign/verify JWTs |
| `EMAIL_USER` | backend | Gmail address used to send emails |
| `EMAIL_PASS` | backend | Gmail App Password (not your login password) |
| `CONTACT_RECEIVER_EMAIL` | backend | Inbox that receives contact/idea emails (defaults to `EMAIL_USER`) |
| `NODE_ENV` | backend | Set to `production` on the hosting platform — controls cookie `secure`/`sameSite` behavior |
| `NEXT_PUBLIC_API_URL` | frontend | Base URL the frontend calls for all API requests |

## API Overview

| Method | Route | Auth required | Description |
|---|---|---|---|
| POST | `/signin` | No | Create a new account |
| POST | `/login` | No | Authenticate, sets JWT cookie |
| GET | `/profile` | Yes | Get the logged-in user's details |
| GET | `/qna` | Yes | List all questions |
| POST | `/qna` | Yes | Post a new question |
| GET | `/qna/:id` | Yes | Get one question with its answers |
| DELETE | `/qna/:id` | Yes | Delete a question |
| POST | `/qna/:id/answers` | Yes | Post an answer to a question |
| DELETE | `/qna/:id/answers/:answerId` | Yes | Delete an answer |
| POST | `/api/contact` | No | Submit the contact form |
| POST | `/api/contact/submit-idea` | No | Submit an idea |

## Deployment

- **Backend** — deployed on [Render](https://render.com) as a Web Service, root directory `backend`, build command `npm install`, start command `npm start`.
- **Frontend** — deployed on [Vercel](https://vercel.com), root directory `frontend`.
- **Database** — [MongoDB Atlas](https://www.mongodb.com/atlas), with Network Access allowing Render's traffic.

Set each platform's environment variables to match the table above, with `FRONTEND_URL` (backend) and `NEXT_PUBLIC_API_URL` (frontend) pointing at each other's deployed URLs.

## Author

[@abhisek0407](https://github.com/abhisek0407)