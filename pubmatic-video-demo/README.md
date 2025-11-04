# PubMatic Sponsored Products Demo

A complete demo application showing how to integrate PubMatic's sponsored products API with a Node.js backend and frontend.

## 📁 Project Structure

```
pubmatic-demo/
├── server.js           # Node.js Express backend
├── package.json        # NPM dependencies
├── public/
│   └── index.html     # Frontend application
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Create the project directory:**
```bash
mkdir pubmatic-demo
cd pubmatic-demo
```

2. **Create the files:**

Create `server.js` (the backend code I provided)

Create `package.json` (the package.json I provided)

Create a `public` folder and put `index.html` inside it:
```bash
mkdir public
```

3. **Install dependencies:**
```bash
npm install
```

### Running the Application

1. **Start the server:**
```bash
cd /Users/maisamkassam/PubMatic/pubmatic-demo
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

2. **Open your browser:**
Navigate to `http://localhost:3000`

3. **Test the integration:**
Click "Fetch Sponsored Products" to make a real API call to PubMatic via your backend server.

## 🔧 Configuration

### Change Server Port

Edit `server.js` and modify the PORT constant:
```javascript
const PORT = process.env.PORT || 3000;
```

Or set an environment variable:
```bash
PORT=8080 npm start
```

### Customize Request Payload

Edit the `requestPayload` object in `public/index.html` to customize:
- User ID
- Site information
- Bid floor
- Product preferences
- Targeting parameters

## 📡 API Endpoints

### Backend Server

- `GET /` - Serves the frontend application
- `GET /api/health` - Health check endpoint
- `POST /api/sponsored-products` - Proxies requests to PubMatic API

### Request Format

```json
{
  "id": "BidRequestIDd_01_00234",
  "site": {
    "id": "commercepartner_abc",
    "domain": "www.commercepartner_abc.com",
    "publisher": {
      "id": "161"
    }
  },
  "user": {
    "id": "eedww123qed121212413321unique"
  },
  "imp": [{
    "id": "ImpID1331",
    "bidfloor": 0.1,
    "ext": {
      "commerce": {
        "slots_requested": 1,
        "preferred": [{"pid": "18"}]
      }
    }
  }]
}
```

## 🎯 Features

- ✅ **No CORS Issues**: Backend server proxies API calls
- ✅ **Real-time Tracking**: Impression and click tracking
- ✅ **Product Display**: Renders sponsored products with badges
- ✅ **Tracking Log**: Visual log of all tracking events
- ✅ **Error Handling**: Comprehensive error messages
- ✅ **Response Viewer**: View full API responses

## 🔍 How It Works

1. **Frontend** makes a request to `/api/sponsored-products`
2. **Backend** receives the request and forwards it to PubMatic's API
3. **PubMatic** returns sponsored product bids
4. **Backend** returns the response to the frontend
5. **Frontend** renders products with productid "18" as Kinder Bueno
6. **Tracking pixels** fire on impression and click events

## 🐛 Troubleshooting

### Server won't start
- Make sure port 3000 is not already in use
- Check that all dependencies are installed: `npm install`

### API calls failing
- Verify your PubMatic credentials are correct
- Check server logs for detailed error messages
- Ensure you have internet connectivity

### Products not displaying
- Check browser console for errors
- Verify the API response contains productid "18"
- Check the tracking log for events

## 📝 Production Deployment

For production deployment:

1. Set environment variables:
```bash
export NODE_ENV=production
export PORT=80
```

2. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start server.js --name pubmatic-demo
```

3. Set up a reverse proxy (nginx) for SSL/HTTPS

4. Add proper authentication and rate limiting

## 📄 License

ISC