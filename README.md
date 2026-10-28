# SkillBridge Academy — Frontend Demo

A responsive React + Vite frontend for a free online learning platform. This package intentionally contains **no backend**.

## Requirements
- Node.js 20.19+ recommended
- npm
- VS Code

## Run in VS Code
1. Extract `SKILLBRIDGE-ACADEMY-FRONTEND.zip`.
2. Open the extracted `SKILLBRIDGE-ACADEMY-FRONTEND` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```powershell
npm install
npm run dev
```

5. Open the local URL Vite prints (usually http://localhost:5173).

To check a production build:

```powershell
npm run build
```

## Demo login
- Any valid email + password of at least 8 characters will enter the demo.
- To see the admin dashboard, use an email starting with `admin@`, for example `admin@example.com`, and any password of at least 8 characters.
- Google sign-in is simulated. No real OAuth is configured.

## Included
- Public landing page with 10 educational image slides, rotating every 3 seconds.
- English / Kiswahili UI language selection.
- Light / Dark theme preference.
- Demo registration and login pages.
- Private learner dashboard and protected frontend routes.
- Searchable/filterable free course catalog.
- Course lessons, knowledge checks, locked lesson progression, progress tracking.
- Demonstration final exam and certificate eligibility UI.
- Admin demo for adding and removing courses.
- Responsive layouts for mobile, tablet and desktop.
- Central mock service layer for future backend integration.

## Important limitations
- Authentication and authorization are simulated in the browser. This is not secure production authentication.
- Enrollment, progress, quizzes and custom courses are stored in browser localStorage for this demo only.
- Google OAuth, server-side course validation, durable database storage, exam integrity and verified certificates require a future backend.
- The course content is a starter curriculum and needs expansion/review before real learners use it as a complete professional training programme.
- Hero photos are loaded from Unsplash over the internet; an internet connection is required for those images.

## Next step
Build the backend separately, then replace `src/services/mockServices.js` and the mock context persistence with API requests. Enforce lesson locks, quiz results, admin access and certificate eligibility on the server.
