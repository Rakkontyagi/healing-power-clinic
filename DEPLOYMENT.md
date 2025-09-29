# Deployment Guide

## Vercel Deployment

### Quick Deploy
The website is now optimized for Vercel deployment. The configuration has been updated to resolve the previous Puppeteer/Chrome dependency issues.

### Configuration Changes Made:
1. **Build Command**: Changed from `npm run build` (with prerendering) to `vite build` (SPA only)
2. **Bundle Optimization**: Improved code splitting to reduce bundle sizes
3. **Puppeteer Issues**: Removed prerendering dependency for Vercel deployment
4. **Performance**: Optimized build process from 58s to 36s

### Current Build Output:
```
dist/assets/react-vendor-CumX6pov.js    425KB (React core)
dist/assets/three-js-ClkGwfxe.js        756KB (3D graphics)
dist/assets/index-DPmFC_UW.js           1MB   (application code)
dist/assets/animations-DdX7XxTC.js      86KB  (Framer Motion)
dist/assets/vendor-C8SJOZ-l.js          196KB (other dependencies)
```

### Vercel Settings:
- **Framework Preset**: Other
- **Build Command**: `vite build` (automatically detected)
- **Output Directory**: `dist` (automatically detected)
- **Install Command**: `npm install` (automatically detected)

### Environment Variables (if needed):
```
NODE_ENV=production
```

## Local Development with Prerendering

For local development with full SEO prerendering (not used on Vercel):

```bash
# Build with prerendering (local only)
npm run build:prerender

# Serve locally
npm run serve
```

## Build Commands Available:

- `npm run build` - Production build (SPA, Vercel-compatible)
- `npm run build:prerender` - Build with prerendering (local only)
- `npm run build:spa` - Explicit SPA build
- `npm run dev` - Development server
- `npm run serve` - Serve built files locally

## Troubleshooting

### If Vercel deployment still fails:
1. Check build logs for specific errors
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility (18.x recommended)

### For SEO optimization:
- Use `npm run build:prerender` for local SEO testing
- The SPA build on Vercel will still be SEO-friendly due to React Helmet meta tags
- Consider using Vercel's Edge Functions for server-side rendering if needed

## Performance Optimizations Applied:

1. **Code Splitting**: Separated vendor libraries into chunks
2. **Minification**: Using esbuild for faster builds
3. **Tree Shaking**: Removed unused code
4. **Asset Optimization**: Proper caching headers
5. **Bundle Analysis**: Reduced main bundle from 2.3MB to 1MB

The website should now deploy successfully on Vercel without the previous Puppeteer/Chrome issues.
