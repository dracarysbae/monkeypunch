<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ea61215f-650e-41b5-b3b9-b0bb09b4ba1c

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with at least the following variables:
   ```env
   GEMINI_API_KEY=your_gemini_key_here
   # Optional in development; backend default port is 3001.
   PORT=3001
   # If your frontend is served separately from the API, set its origin:
   VITE_API_URL=https://api.punchthemacaque.org
   ```

3. Run the app locally:
   ```
   npm run dev
   ```
   This starts the Vite development server on port 3000 by default.

4. (Optional) To run the React client together with the backend server:
   ```
   npm run dev:full
   ```
   This runs both Vite (port 3000) and the backend server (port 3001).

   If you prefer to launch them separately:
   ```bash
   npm run dev          # frontend
   npm run server       # backend
   ```

## Production Deployment

### Option 1: Using Node.js Server (Recommended for API calls)

1. Build the app:
   ```
   npm run build
   ```

2. Make sure your hosting environment serves both the static files and the
   backend code, or deploy them separately. The backend must be available at
   the origin referenced by `VITE_API_URL` (ignored if the client and server
   are on the same host). On platforms like Vercel/Netlify you can use a
   serverless function or a separate node service.

3. Set the following environment variables in production:
   - `GEMINI_API_KEY` – **required**
   - `PORT` – (optional, default 3001)
   - `VITE_API_URL` – the base URL of the backend if it differs from the
     frontend origin, e.g. `https://api.punchthemacaque.org`

4. Start the server:
   ```
   npm run start
   ```

**Hosting options:** Vercel, Render, Railway, Heroku, AWS, etc. If you are
statically hosting the front-end only, remember the `/api` path will not exist
and requests will fail with a 404 page; you will need a proxy or separate API
service to handle them.

### Option 2: Static Hosting (Netlify, GitHub Pages, etc.)

⚠️ **Important:** This approach requires moving API calls to a backend proxy service to protect your API key.

1. Build the app:
   ```
   npm run build
   ```

2. Deploy the `dist` folder to your static hosting.

**⚠️ Security Note:** Never commit `.env` files or expose `GEMINI_API_KEY` in client-side code.

## Architecture

- **Frontend:** React + TypeScript + Vite
- **Backend:** Express.js Node.js server
- **API:** Calls to Google Gemini API (proxied through backend for security)

## Troubleshooting

### API Key Error
- Ensure `GEMINI_API_KEY` is set in `.env`
- On hosting platforms, set it as an environment variable (not in code)
- The backend server handles the API key securely

### Port Already in Use
- Change `PORT` environment variable
- Or kill the process using the port
