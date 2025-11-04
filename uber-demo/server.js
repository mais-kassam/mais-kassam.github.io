// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Add security headers to allow PubMatic iframes
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "frame-src 'self' https://*.pubmatic.com https://commercecdn.pubmatic.com;");
    next();
});

app.use(express.static('public')); // Serve static files from 'public' directory

// PubMatic API endpoints
const PUBMATIC_SPONSORED_API_URL = 'https://cmpbid.pubmatic.com/convert/sponsored';
const PUBMATIC_ONSITE_API_URL = 'https://cmpbid.pubmatic.com/convert/onsite/multi';

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
        const response = await fetch(PUBMATIC_SPONSORED_API_URL, {
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
        console.log('Response data:', JSON.stringify(data, null, 2));

        res.json(data);
    } catch (error) {
        console.error('Error fetching sponsored products:', error);
        res.status(500).json({
            error: 'Failed to fetch sponsored products',
            message: error.message,
        });
    }
});

// New endpoint for PubMatic onsite/multi API
app.post('/api/onsite-bid', async (req, res) => {
    try {
        console.log('Received onsite bid request');
        console.log('Request body:', JSON.stringify(req.body, null, 2));

        // Make request to PubMatic onsite/multi API
        const response = await fetch(PUBMATIC_ONSITE_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req.body),
        });

        // Check if response is ok
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`PubMatic API returned status: ${response.status} - ${errorText}`);
        }

        // Parse and return the response
        const data = await response.json();
        console.log('PubMatic onsite bid response received successfully');
        console.log('Response data:', JSON.stringify(data, null, 2));

        res.json(data);
    } catch (error) {
        console.error('Error fetching onsite bid:', error);
        res.status(500).json({
            error: 'Failed to fetch onsite bid',
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
    console.log(`Sponsored Products API: http://localhost:${PORT}/api/sponsored-products`);
    console.log(`Onsite Bid API: http://localhost:${PORT}/api/onsite-bid`);
});