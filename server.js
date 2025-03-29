const express = require("express");
const cors = require("cors");
const apiRoutes = require("./models/routes/api");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// Enable CORS for your frontend domain with proper headers
const corsOptions = {
  origin: "https://tradesenal.com",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allow cookies & authorization headers
  optionsSuccessStatus: 200, // Handle preflight requests
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable CORS for all OPTIONS requests

app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/api", apiRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
