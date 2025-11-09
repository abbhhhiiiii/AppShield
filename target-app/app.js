const express = require("express");
const path = require("path");
const app = express();
const PORT = 4001;

app.use(express.json());

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Login route
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

// Search route
app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "search.html"));
});

// Product route
app.get("/product/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "product.html"));
});

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Target app running on http://localhost:${PORT}`);
});
