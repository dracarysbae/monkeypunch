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

2. Set the `GEMINI_API_KEY` in [.env](.env) to your Gemini API key

3. Run the app:
   ```
   npm run dev
   ```
   This starts the Vite development server on port 3000.

4. (Optional) To run with the backend server:
   ```
   npm run dev:full
   ```
   This runs both Vite (port 3000) and the backend server (port 3001).

## Production Deployment

### Option 1: Using Node.js Server (Recommended for API calls)

1. Build the app:
   ```
   npm run build
   ```

2. Set environment variable on your hosting platform:
   - Add `GEMINI_API_KEY` with your Gemini API key
   - Add `PORT` (optional, defaults to 3001)

3. Run the server:
   ```
   npm run start
   ```

**Hosting options:** Vercel, Render, Railway, Heroku, AWS, etc.

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
