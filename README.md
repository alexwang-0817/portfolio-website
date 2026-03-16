<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/10fd5724-f49e-4dd9-90ea-d7c24728adac

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

1. Create GitHub repository settings for Pages:
   - **Settings → Pages → Build and deployment**
   - Source: **GitHub Actions**

2. Add repository variables/secrets:
   - **Settings → Secrets and variables → Actions → Variables**
     - `VITE_BASE` = `/<your-repo-name>/`
     - `APP_URL` = `https://<your-account>.github.io/<your-repo-name>/`
   - **Settings → Secrets and variables → Actions → Secrets**
     - `GEMINI_API_KEY` = your Gemini API key (from `.env.example`)

3. Push to `main`. The workflow `.github/workflows/deploy-gh-pages.yml` will build and deploy.

4. Optional local build test:
   `VITE_BASE=/<your-repo-name>/ npm run build`
