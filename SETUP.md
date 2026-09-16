# Portfolio Setup & Launch Guide

## Install & Run (3 steps)

Open a terminal in your portfolio folder, then run:

```bash
# 1. Install all dependencies
npm install

# 2. Start the dev server
npm run dev
```

That's it! Open http://localhost:5173 in your browser.

## ⚠️ Important: Copy your profile image

Before running, copy your profile photo to the public folder:

```
FROM:  img/profile.jpeg
TO:    public/img/profile.jpeg
```

PowerShell command:
```powershell
New-Item -ItemType Directory -Force -Path public\img
Copy-Item img\profile.jpeg public\img\profile.jpeg
```

Also copy your resume:
```powershell
Copy-Item resume.pdf public\resume.pdf
```

## Tech Stack
- React 18 + Vite 5
- Tailwind CSS v3
- Framer Motion v11

## Build for Production
```bash
npm run build
```
Output goes to `dist/` — deploy that folder anywhere.
