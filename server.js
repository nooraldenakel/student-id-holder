// server.js
import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Proxy /student/** with proper query forwarding
app.use(
    "/student",
    createProxyMiddleware({
        target: "https://student-id-info-back-production.up.railway.app",
        changeOrigin: true,
        pathRewrite: { "^/student": "/student" },
        logLevel: "debug", // 🪵 Helps you see the forwarded path
        onProxyReq: (proxyReq, req, res) => {
            console.log(`➡️ Forwarding: ${req.method} ${req.url}`);
        },
    })
);

// ✅ Serve frontend
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`✅ App running at http://localhost:${PORT}`);
});
