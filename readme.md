# 🏔️ Alpenglow Learning

A full-stack learning platform where teachers build self-paced **playlists** of
resources and students work through them independently, with mastery checks
along the way.

Most classroom tools (like Google Classroom) are built around assigning the same
work to the whole class on the same day. Alpenglow is built around students
moving at their own pace: each student sees every course they're enrolled in,
their progress through each playlist, and what to work on next.

## Features

**For teachers**
- Create courses and class sections, then share an enroll code with students
- Build playlists of objectives and resources, and reorder them with drag-and-drop
- Sort playlists by type:
  - **Essential**: the highest-leverage standards
  - **Standard**: supporting standards
  - **Challenge**: material beyond grade level
- Add co-teachers as course contributors
- Review and approve students' quiz requests, then record scores
- See class-wide and per-student progress views

**For students**
- Sign in with Google and join a class with a code
- See progress bars across all playlists and courses
- Request the end-of-playlist quiz when ready, and get notified in real time
  when the teacher approves it
- View grades by class

## Architecture

```
frontend/   Next.js (React, TypeScript in places) + Apollo Client
backend/    Express + Apollo Server (GraphQL) + MongoDB/Mongoose
```

- **GraphQL API** with ~25 queries and ~40 mutations covering courses, classes,
  playlists, objectives, resources, quizzes, scores, and approval requests
  (`backend/gqlSchema.js`)
- **Real-time updates**: a GraphQL subscription (`requestApproved`) over
  WebSockets pushes quiz approvals to the student
- **Auth**: Google Sign-In ID tokens are verified server-side with
  `google-auth-library`, then exchanged for app-issued JWT access and refresh
  tokens in httpOnly cookies, with silent refresh in Express middleware
- **Role-based permissions** for `STUDENT`, `TEACHER`, `ADMIN`, and `SUPER_ADMIN`
  (`backend/lib/hasPermission.js`)
- **UI**: Emotion for styling, Framer Motion for animation,
  react-beautiful-dnd for reordering, react-hook-form for forms
- Component tests with Jest

## Running locally

Requires Node and a MongoDB database (local or Atlas).

```bash
# backend: needs a .env with the Mongo connection string and JWT secrets
cd backend && yarn && yarn dev

# frontend
cd frontend && yarn && yarn dev
```

## Status

Built 2020–2021 and not currently deployed.
