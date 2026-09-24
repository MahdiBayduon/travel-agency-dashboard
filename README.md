# Travel Agency Dashboard

A travel platform project with a public trip experience and an admin dashboard. It uses React Router 7 in framework mode, React, TypeScript, Appwrite, Syncfusion, Tailwind CSS, and Google Generative AI.

## Features

- Trip browsing and booking flows
- Admin views for trips, users, and analytics
- AI-assisted itinerary generation
- Appwrite-backed data and authentication

## Local setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and provide your own service credentials. Never commit local environment files.
3. Run `npm run dev`. The repository's development script uses a Windows `set NODE_OPTIONS=...` command; on other systems, set that environment variable in your shell or adapt the script.
4. Run `npm run typecheck` and `npm run build` to validate changes.

**Security:** An earlier revision tracked local configuration. Rotate any real credentials from that version; removing a file from the current branch does not remove it from Git history. Keep secret keys server-side and never expose them through `VITE_` variables.

## Attribution

This project follows the [JavaScript Mastery travel agency tutorial](https://www.youtube.com/watch?v=xZ1ba-RLrjo). This repository documents this implementation; the original tutorial and assets belong to their respective creators.
