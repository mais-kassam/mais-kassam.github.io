# GitHub Pages Deployment Guide - Commerce Media Demos

## Complete File Structure

Your GitHub.io repository should have the following structure:

```
your-username.github.io/
│
├── index.html                              # Main landing page (provided)
├── pubmatic-logo-white.svg                 # PubMatic logo (you need to add this)
│
├── tvnordef-regular-webfont.woff2         # Font files (provided)
├── tvnordef-bold.woff                     # Font files (provided)
├── tvnordef-black-webfont.woff2           # Font files (provided)
├── tvnordef-blackcon-webfont.woff2        # Font files (provided)
│
├── albertsons-demo/                        # Demo project folder
│   ├── index.html                         # Entry point for Albertsons demo
│   └── [all albertsons demo files]        # All assets, JS, CSS, etc.
│
├── coop-demo/                              # Demo project folder
│   ├── index.html                         # Entry point for Co-op demo
│   └── [all coop demo files]              # All assets, JS, CSS, etc.
│
├── grocery-site/                           # Demo project folder
│   ├── index.html                         # Entry point for Grocery Site demo
│   └── [all grocery-site files]           # All assets, JS, CSS, etc.
│
├── pubmatic-demo/                          # Demo project folder
│   ├── index.html                         # Entry point for PubMatic demo
│   └── [all pubmatic demo files]          # All assets, JS, CSS, etc.
│
├── pubmatic-video-demo/                    # Demo project folder
│   ├── index.html                         # Entry point for PubMatic Video demo
│   └── [all pubmatic-video demo files]    # All assets, JS, CSS, etc.
│
├── tesco-demo/                             # Demo project folder
│   ├── index.html                         # Entry point for Tesco demo
│   └── [all tesco demo files]             # All assets, JS, CSS, etc.
│
├── uber-demo/                              # Demo project folder
│   ├── index.html                         # Entry point for Uber demo
│   └── [all uber demo files]              # All assets, JS, CSS, etc.
│
└── walmart-demo/                           # Demo project folder
    ├── index.html                         # Entry point for Walmart demo
    └── [all walmart demo files]           # All assets, JS, CSS, etc.
```

## Step-by-Step Deployment Instructions

### 1. Setup Your GitHub Repository
- Repository name should be: `your-username.github.io`
- This will automatically enable GitHub Pages at `https://your-username.github.io/`

### 2. Add Files to Root Directory
Place these files directly in the root of your repository:
- `index.html` (the landing page I created)
- `pubmatic-logo-white.svg` (you need to provide this)
- `tvnordef-regular-webfont.woff2`
- `tvnordef-bold.woff`
- `tvnordef-black-webfont.woff2`
- `tvnordef-blackcon-webfont.woff2`

### 3. Create Demo Folders
For each demo project, create a folder with the exact name shown above:
- `albertsons-demo/`
- `coop-demo/`
- `grocery-site/`
- `pubmatic-demo/`
- `pubmatic-video-demo/`
- `tesco-demo/`
- `uber-demo/`
- `walmart-demo/`

### 4. Place Demo Projects
For each demo:
1. Take your entire demo project
2. Place all files inside the corresponding folder
3. **CRITICAL**: Each demo folder MUST have an `index.html` file as the entry point
4. Keep all relative paths within each demo intact

Example for Albertsons demo:
```
albertsons-demo/
├── index.html          # Main entry point
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── images/
│   └── logo.png
└── [any other files]
```

### 5. Link Structure
The landing page links are structured as:
- `./albertsons-demo/` → Goes to `albertsons-demo/index.html`
- `./grocery-site/` → Goes to `grocery-site/index.html`
- etc.

### 6. Test Locally (Optional)
Before pushing to GitHub, you can test locally:
```bash
# In your repository root
python3 -m http.server 8000
# Then open: http://localhost:8000
```

### 7. Push to GitHub
```bash
git add .
git commit -m "Add commerce media demo landing page"
git push origin main
```

### 8. Access Your Site
Your site will be live at:
- Landing page: `https://your-username.github.io/`
- Albertsons demo: `https://your-username.github.io/albertsons-demo/`
- Grocery Site: `https://your-username.github.io/grocery-site/`
- And so on...

## Important Notes

### Required Files You Need to Add:
1. **PubMatic Logo** (`pubmatic-logo-white.svg`)
   - Must be white/light colored for dark background
   - Place in root directory next to index.html

2. **Demo Projects**
   - Each must be in its own folder with exact naming
   - Each must have an index.html entry point

### Folder Naming Rules:
- Use lowercase
- Use hyphens (not underscores or spaces)
- Match exactly what's in the links: `albertsons-demo`, not `albertsons_demo` or `AlbertsonsDemo`

### GitHub Pages Settings:
1. Go to your repository Settings
2. Navigate to "Pages" section
3. Ensure Source is set to "Deploy from a branch"
4. Branch should be "main" (or "master")
5. Folder should be "/ (root)"

## Troubleshooting

**Landing page works but demos show 404:**
- Check folder names match exactly (case-sensitive)
- Ensure each demo has an `index.html` file
- Verify GitHub Pages is enabled in settings

**Fonts not loading:**
- Ensure all 4 .woff/.woff2 files are in root directory
- Check file names match exactly

**Logo not showing:**
- Add `pubmatic-logo-white.svg` to root directory
- Ensure it's a light-colored logo for dark background

**Styling looks different:**
- Clear browser cache
- Check all CSS is inline in index.html (it is)
- Verify fonts are accessible

## Files Provided to You

Located in your outputs:
1. `index.html` - Main landing page
2. `tvnordef-regular-webfont.woff2` - Regular font
3. `tvnordef-bold.woff` - Bold font
4. `tvnordef-black-webfont.woff2` - Black font
5. `tvnordef-blackcon-webfont.woff2` - Black condensed font

All ready to upload to your GitHub repository root!
