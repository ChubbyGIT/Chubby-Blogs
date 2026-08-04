# Chubby Blogs

A Next.js blog app deployed on Render at **chubbyblock.com**.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Tech Stack

- [Next.js](https://nextjs.org) — React framework
- [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) — MDX rendering
- [Framer Motion](https://www.framer.com/motion/) — Animations
- [Tailwind CSS](https://tailwindcss.com) — Styling

## Deploying on Render

This project is configured for deployment on [Render](https://render.com) via `render.yaml`.

### Manual Setup (first time)

1. Push this repo to GitHub.
2. Go to [https://dashboard.render.com](https://dashboard.render.com) and click **New → Web Service**.
3. Connect your GitHub repo.
4. Render will auto-detect `render.yaml` and fill in the settings.
5. Set **Build Command**: `npm install && npm run build`
6. Set **Start Command**: `npm run start`
7. Click **Create Web Service**.

### Custom Domain (chubbyblock.com)

After your service is live:

1. Go to your service on Render → **Settings → Custom Domains**.
2. Add `chubbyblock.com` (and optionally `www.chubbyblock.com`).
3. Render will show you DNS records to add at your domain registrar.
4. Add a **CNAME** or **A record** as instructed.
5. Wait for DNS propagation (up to 24–48 hours).
6. Render handles SSL automatically via Let's Encrypt.
