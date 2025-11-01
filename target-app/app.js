const express = require("express");
const app = express();
const PORT = 4001;

app.use(express.json());

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.json({ message: "Login endpoint (for testing)" });
});

// Search route
app.get("/search", (req, res) => {
  const { q } = req.query;
  res.json({
    message: "Search endpoint (for testing)",
    query: q,
  });
});

// Product route
app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  res.json({
    message: "Product endpoint (for testing)",
    id: id,
  });
});

app.listen(PORT, () => {
  console.log(`Target app running on port ${PORT}`);
});
