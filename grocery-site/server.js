// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from 'public' directory

// PubMatic API endpoint
const PUBMATIC_API_URL = 'https://cmpbid.pubmatic.com/convert/sponsored';

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Proxy endpoint for PubMatic sponsored products
app.post('/api/sponsored-products', async (req, res) => {
    try {
        console.log('Received request for sponsored products');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        // Make request to PubMatic API
        const response = await fetch(PUBMATIC_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        // Check if response is ok
        if (!response.ok) {
            throw new Error(`PubMatic API returned status: ${response.status}`);
        }

        // Parse and return the response
        const data = await response.json();
        console.log('PubMatic response received successfully');

        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsored products:', error);
        res.status(500).json({
            error: 'Failed to fetch sponsored products',
            message: error.message,
        });
    }
});

// Serve the frontend HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api/sponsored-products`);
});