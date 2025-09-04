# Development Workflow

This document outlines the development workflow for the Maverick AI website.

## Branch Strategy

- **`main`** - Production branch (auto-deploys to production)
- **`development`** - Staging branch (auto-deploys to preview URL)  
- **`feature/*`** - Feature branches (auto-deploys to preview URLs)

## Environments

### Production
- **Branch**: `main`
- **URL**: https://maverick-ai-website-[hash].vercel.app
- **Database**: Production Supabase database
- **Use for**: Live website with real data

### Preview/Staging  
- **Branch**: `development` or any feature branch
- **URL**: https://maverick-ai-website-git-[branch-name]-[project].vercel.app
- **Database**: Same as production (or separate test database)
- **Use for**: Testing new features before going live

## Development Process

### Adding New Features

1. **Start from development branch:**
   ```bash
   git checkout development
   git pull origin development
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes and test locally:**
   ```bash
   npm run dev
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push -u origin feature/your-feature-name
   ```

5. **Test on preview URL:**
   - Vercel automatically creates preview URL
   - Check Vercel dashboard for the URL
   - Test all functionality

6. **Merge to development for staging:**
   ```bash
   git checkout development
   git merge feature/your-feature-name
   git push origin development
   ```

7. **When ready for production:**
   ```bash
   git checkout main
   git merge development  
   git push origin main
   ```

### Quick Fixes

For small changes, you can work directly on `development`:

```bash
git checkout development
# make changes
git add .
git commit -m "Fix: description"
git push origin development
# Test on preview URL, then merge to main when ready
```

## Environment Variables

- **Production**: Live API keys and database
- **Preview**: Can use same as production or separate test environment
- **Development**: Local development values

## Testing Checklist

Before merging to production:

- [ ] Feature works on preview URL
- [ ] AI assessment form works
- [ ] Contact forms work  
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance looks good

## URLs

- **Production**: [Your production URL]
- **Development Preview**: [Your development preview URL]
- **Vercel Dashboard**: https://vercel.com/dashboard

## Notes

- Every push to any branch creates a preview deployment
- Only pushes to `main` update the production site
- Preview deployments help you test before going live
- Database is shared between environments (be careful with test data)