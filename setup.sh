#!/bin/bash

# GitHub.io Commerce Media Demos - Setup Script
# This script creates the folder structure for your GitHub Pages site

echo "🚀 Setting up Commerce Media Demos folder structure..."
echo ""

# Create demo folders
echo "📁 Creating demo folders..."
mkdir -p albertsons-demo
mkdir -p coop-demo
mkdir -p grocery-site
mkdir -p pubmatic-demo
mkdir -p pubmatic-video-demo
mkdir -p tesco-demo
mkdir -p uber-demo
mkdir -p walmart-demo

echo "✅ Created 8 demo folders"
echo ""

# Create placeholder index.html files in each demo folder
echo "📝 Creating placeholder index.html files..."
for folder in albertsons-demo coop-demo grocery-site pubmatic-demo pubmatic-video-demo tesco-demo uber-demo walmart-demo; do
    cat > "$folder/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo - Coming Soon</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #0a2540;
            color: white;
            text-align: center;
        }
        .container {
            max-width: 600px;
            padding: 2rem;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        a {
            color: #00bcd4;
            text-decoration: none;
            font-weight: bold;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚧 Demo Coming Soon</h1>
        <p>This demo is currently being set up. Please check back later!</p>
        <a href="/">← Back to Home</a>
    </div>
</body>
</html>
EOF
done

echo "✅ Created placeholder index.html in each folder"
echo ""

echo "📋 Folder structure created successfully!"
echo ""
echo "Next steps:"
echo "1. Replace each placeholder index.html with your actual demo project"
echo "2. Add pubmatic-logo-white.svg to the root directory"
echo "3. Ensure index.html and all font files are in the root directory"
echo "4. Push to GitHub and enable GitHub Pages"
echo ""
echo "📁 Current structure:"
echo ""
tree -L 2 -I 'node_modules|.git' || ls -la

echo ""
echo "✨ Setup complete! Happy deploying!"
