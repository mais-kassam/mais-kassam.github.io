# Commerce Media Demos - Landing Page Package

## 📦 What's Included

This package contains everything you need to deploy a professional landing page for your commerce media demos on GitHub Pages.

### ✅ Files Ready to Deploy:

**CRITICAL Configuration (Required for GitHub Pages):**
1. `_config.yml` - Jekyll configuration that prevents build errors
2. `.gitignore` - Prevents committing node_modules and build files

**Landing Page:**
3. `index.html` - Main landing page with PubMatic-themed design

**Fonts:**
4. `tvnordef-regular-webfont.woff2` - Font file (Regular)
5. `tvnordef-bold.woff` - Font file (Bold)
6. `tvnordef-black-webfont.woff2` - Font file (Black)
7. `tvnordef-blackcon-webfont.woff2` - Font file (Black Condensed)

### 📚 Documentation:
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment instructions
- `FILE_STRUCTURE.txt` - Visual folder structure reference
- `setup.sh` - Automated setup script
- `README.md` - This file

### ❌ What You Need to Add:
- `pubmatic-logo-white.svg` - PubMatic white logo for dark background
- Your 8 demo projects (albertsons-demo, coop-demo, grocery-site, pubmatic-demo, pubmatic-video-demo, tesco-demo, uber-demo, walmart-demo)

---

## 🚀 Quick Start (3 Easy Steps)

### Step 1: Setup Repository
```bash
# Clone or create your GitHub Pages repository
git clone https://github.com/your-username/your-username.github.io.git
cd your-username.github.io
```

### Step 2: Copy Files & Run Setup
```bash
# Copy all provided files to repository root
# CRITICAL: Include _config.yml and .gitignore
cp index.html _config.yml .gitignore tvnordef-*.woff* ./

# Run setup script to create folder structure
bash setup.sh

# Add your PubMatic logo
cp /path/to/pubmatic-logo-white.svg ./
```

### Step 3: Add Demo Projects
```bash
# Copy each demo project into its folder
# Example:
cp -r /path/to/your-albertsons-project/* albertsons-demo/
cp -r /path/to/your-grocery-site-project/* grocery-site/
# ... repeat for all 8 demos

# Each demo folder MUST have index.html as entry point
```

### Step 4: Deploy
```bash
git add .
git commit -m "Add commerce media demo landing page"
git push origin main
```

---

## 📁 Required Folder Structure

```
your-username.github.io/
├── index.html (✅ provided)
├── _config.yml (✅ provided - CRITICAL)
├── .gitignore (✅ provided - CRITICAL)
├── pubmatic-logo-white.svg (❌ you add this)
├── tvnordef-*.woff* (✅ provided - 4 files)
├── albertsons-demo/ (❌ you add your project here)
├── coop-demo/ (❌ you add your project here)
├── grocery-site/ (❌ you add your project here)
├── pubmatic-demo/ (❌ you add your project here)
├── pubmatic-video-demo/ (❌ you add your project here)
├── tesco-demo/ (❌ you add your project here)
├── uber-demo/ (❌ you add your project here)
└── walmart-demo/ (❌ you add your project here)
```

---

## 🌐 Your Live URLs

Once deployed, your demos will be accessible at:

- **Landing Page**: `https://your-username.github.io/`
- **Albertsons**: `https://your-username.github.io/albertsons-demo/`
- **Co-op**: `https://your-username.github.io/coop-demo/`
- **Grocery Site**: `https://your-username.github.io/grocery-site/`
- **PubMatic**: `https://your-username.github.io/pubmatic-demo/`
- **PubMatic Video**: `https://your-username.github.io/pubmatic-video-demo/`
- **Tesco**: `https://your-username.github.io/tesco-demo/`
- **Uber**: `https://your-username.github.io/uber-demo/`
- **Walmart**: `https://your-username.github.io/walmart-demo/`

---

## 🎨 Landing Page Features

- **PubMatic-themed design** with dark navy background (#0a2540)
- **Custom TV Nord fonts** for professional typography
- **Responsive layout** works on all devices
- **Organized sections**:
  - For Grocery Retail (5 demos: Albertsons, Grocery Site, Tesco, Walmart, Co-op)
  - For Platform Solutions (2 demos: PubMatic, PubMatic Video)
  - For Mobility & Delivery (1 demo: Uber)
- **Professional stats section** highlighting your demo portfolio
- **Smooth hover effects** and modern UI

---

## ⚠️ Critical Requirements

### Each Demo Folder Must:
1. Have an `index.html` file as the entry point
2. Use lowercase folder names with hyphens (no spaces or underscores)
3. Match the exact folder names: `albertsons-demo`, `coop-demo`, etc.

### Logo Requirements:
- Must be white or light-colored (for dark background)
- Must be named `pubmatic-logo-white.svg`
- Must be placed in root directory

### Font Files:
- All 4 font files must be in root directory
- Must have the exact names provided

---

## 🔧 Troubleshooting

**Landing page shows but demos return 404:**
- Verify folder names match exactly (case-sensitive)
- Ensure each demo has an `index.html` file
- Check GitHub Pages is enabled in repository settings

**Fonts not loading:**
- Confirm all 4 .woff/.woff2 files are in root
- Clear browser cache

**Logo not appearing:**
- Add `pubmatic-logo-white.svg` to root directory
- Ensure logo is light-colored for visibility on dark background

**Styling issues:**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check that index.html wasn't modified

---

## 📖 Need More Help?

Refer to:
- `DEPLOYMENT_GUIDE.md` - Detailed deployment instructions
- `FILE_STRUCTURE.txt` - Visual reference for folder organization
- Run `setup.sh` - Automated folder structure creation

---

## ✨ Credits

Built with PubMatic branding and TV Nord custom fonts.
Designed for GitHub Pages hosting.

---

**Ready to deploy? Follow the Quick Start steps above!** 🚀
