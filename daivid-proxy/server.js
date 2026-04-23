const express = require('express');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const DAIVID_API_KEY = process.env.DAIVID_API_KEY || '';
const DAIVID_BASE = 'api.daivid.co';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, daivid-api-key');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/v1', (req, res) => {
  const options = {
    hostname: DAIVID_BASE,
    path: '/v1' + req.url,
    method: req.method,
    headers: {
      ...req.headers,
      host: DAIVID_BASE,
      'daivid-api-key': DAIVID_API_KEY,
    },
  };
  delete options.headers['content-length'];

  const proxy = https.request(options, (upstream) => {
    res.status(upstream.statusCode);
    Object.entries(upstream.headers).forEach(([k, v]) => {
      if (k !== 'access-control-allow-origin') res.setHeader(k, v);
    });
    upstream.pipe(res);
  });

  proxy.on('error', (err) => res.status(502).json({ message: err.message }));
  req.pipe(proxy);
});

// Proxy a PUT to an arbitrary presigned S3 URL
// Frontend sends: PUT /s3-upload with x-target-url header and raw file body
app.put('/s3-upload', (req, res) => {
  const targetUrl = req.headers['x-target-url'];
  if (!targetUrl) return res.status(400).json({ message: 'Missing x-target-url header' });

  let parsed;
  try { parsed = new URL(targetUrl); } catch {
    return res.status(400).json({ message: 'Invalid x-target-url' });
  }

  const options = {
    hostname: parsed.hostname,
    path: parsed.pathname + parsed.search,
    method: 'PUT',
    headers: {
      'content-type': req.headers['content-type'] || 'application/octet-stream',
    },
  };

  const proxy = https.request(options, (upstream) => {
    res.status(upstream.statusCode);
    upstream.pipe(res);
  });

  proxy.on('error', (err) => res.status(502).json({ message: err.message }));
  req.pipe(proxy);
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Daivid proxy listening on port ${PORT}`));
