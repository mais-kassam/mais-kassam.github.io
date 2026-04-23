const express = require('express');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;
const DAIVID_API_KEY = process.env.DAIVID_API_KEY || '';
const DAIVID_BASE = 'api.daivid.co';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, daivid-api-key, x-target-url');
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
// Buffers the full body first so Content-Length can be set (required by S3)
app.put('/s3-upload', (req, res) => {
  const targetUrl = req.headers['x-target-url'];
  if (!targetUrl) return res.status(400).json({ message: 'Missing x-target-url header' });

  let parsed;
  try { parsed = new URL(targetUrl); } catch {
    return res.status(400).json({ message: 'Invalid x-target-url' });
  }

  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => {
    const body = Buffer.concat(chunks);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      method: 'PUT',
      headers: {
        'content-type': req.headers['content-type'] || 'application/octet-stream',
        'content-length': body.length,
      },
    };

    const s3req = https.request(options, (upstream) => {
      res.status(upstream.statusCode);
      upstream.pipe(res);
    });

    s3req.on('error', (err) => res.status(502).json({ message: err.message }));
    s3req.write(body);
    s3req.end();
  });
  req.on('error', (err) => res.status(500).json({ message: err.message }));
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => console.log(`Daivid proxy listening on port ${PORT}`));
