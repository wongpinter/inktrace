# Deploying to GitHub Pages

This guide will help you deploy the Handwriting Worksheet Generator to GitHub Pages for free.

## Prerequisites

- A GitHub account
- Your code pushed to a GitHub repository

## Setup Steps

### 1. Update Repository Name in Config

Open `vite.config.ts` and update the `base` path with your actual repository name:

```typescript
base: mode === 'production' ? '/your-repo-name/' : '/',
```

Replace `your-repo-name` with your actual GitHub repository name.

### 2. Enable GitHub Pages

1. Go to your GitHub repository
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 3. Push Your Changes

```bash
git add .
git commit -m "chore: configure GitHub Pages deployment"
git push origin main
```

### 4. Automatic Deployment

The GitHub Actions workflow will automatically:
- Build your application
- Deploy to GitHub Pages
- Make it available at: `https://your-username.github.io/your-repo-name/`

## Manual Deployment (Alternative)

If you prefer manual deployment using gh-pages:

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Deploy

```bash
npm run deploy
```

This will build and deploy to the `gh-pages` branch.

### 3. Configure GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch and **/ (root)** folder
4. Click **Save**

## Verify Deployment

After deployment, your app will be available at:
```
https://your-username.github.io/your-repo-name/
```

## Troubleshooting

### 404 Error on Refresh

If you get 404 errors when refreshing pages, add a `404.html` file that redirects to `index.html`:

```bash
cp dist/index.html dist/404.html
```

### Assets Not Loading

Make sure the `base` path in `vite.config.ts` matches your repository name exactly.

### Build Fails

Check the Actions tab in your GitHub repository for error logs.

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Enable HTTPS in GitHub Pages settings

## Environment Variables

If you need environment variables:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets
3. Reference them in `.github/workflows/deploy.yml`

## Cost

GitHub Pages is **completely free** for public repositories with:
- 1 GB storage
- 100 GB bandwidth per month
- Automatic HTTPS
- Custom domain support

Perfect for this handwriting worksheet generator!
