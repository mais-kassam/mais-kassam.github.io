// tiny.js — zero deps
const http = require("http");

const HOST = "0.0.0.0";  // accept on all; we’ll curl 127.0.0.1
const PORT = 8081;

const server = http.createServer((req, res) => {
    console.log(`[tiny] ${req.method} ${req.url}`);
    if (req.url === "/healthz") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("ok");
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`<!doctype html><html><body><h1>Tiny server ✅</h1></body></html>`);
});

server.listen(PORT, HOST, () => {
    console.log(`✅ Tiny server at http://127.0.0.1:${PORT}`);
});
