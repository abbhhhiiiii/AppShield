const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const waf = require("./middleware/waf");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = process.env.TARGET_URL || "http://localhost:4001";

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(cors());
app.use(express.json());

// WAF Middleware
app.use(waf.middleware.bind(waf));

// Status endpoint
app.get("/status", (req, res) => {
  res.json({ status: "AppShield is running" });
});

// Logs endpoint
app.get("/logs", (req, res) => {
  try {
    const logPath = path.join(__dirname, "logs", "attacks.log");

    // Create logs directory if it doesn't exist
    const logsDir = path.join(__dirname, "logs");
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Create or read the log file
    if (!fs.existsSync(logPath)) {
      fs.writeFileSync(logPath, "", "utf8");
      return res.json([]);
    }

    const content = fs.readFileSync(logPath, "utf8");
    const logs = content
      .split("\n")
      .filter((line) => line.trim())
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch (e) {
          console.error("Error parsing log line:", e);
          return null;
        }
      })
      .filter((log) => log !== null);

    res.json(logs);
  } catch (error) {
    console.error("Error reading logs:", error);
    res
      .status(500)
      .json({ error: "Error reading logs", details: error.message });
  }
});

// Rules reload endpoint
app.post("/rules/reload", (req, res) => {
  try {
    const rules = waf.reloadRules();
    res.json({ message: "Rules reloaded successfully", rules });
  } catch (error) {
    res.status(500).json({ error: "Error reloading rules" });
  }
});

// Proxy all other requests to target app
app.use(
  "/",
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    logLevel: "silent",
  })
);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`AppShield WAF running on port ${PORT}`);
  console.log(`Proxying requests to ${TARGET_URL}`);
});
