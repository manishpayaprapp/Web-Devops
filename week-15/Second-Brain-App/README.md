# Brainly

Brainly is a small second-brain app for collecting YouTube videos and X/Twitter posts. The React frontend talks to an Express API backed by MongoDB.

## Requirements

- Node.js 20.19+ (or 22.12+)
- MongoDB, local or hosted

## Run locally

1. Start MongoDB.
2. In `Backend`, create `.env` from `.env.example` and set a private `JWT_PASSWORD` (at least 32 characters) and your `MONGODB_URI`.
3. In one terminal:

   ```powershell
   cd Backend
   npm install
   npm run dev
   ```

4. In a second terminal:

   ```powershell
   cd Frontend
   npm install
   npm run dev
   ```

5. Open the Vite URL shown in the frontend terminal (normally `http://localhost:5173`), create an account, and sign in.

The frontend defaults to `http://localhost:3000` for the API. Set `VITE_BACKEND_URL` in `Frontend/.env` if the API is hosted elsewhere. Set `FRONTEND_URL` in the backend environment to the exact frontend origin when deploying.

## Production builds

Run `npm run build` in both `Backend` and `Frontend`. Start the compiled backend with `npm start` from `Backend`; serve `Frontend/dist` with a static web server configured to route unknown paths to `index.html`.

The API health endpoint is `GET /api/v1/health`. Backend startup fails explicitly if the database connection or required environment settings are unavailable.
