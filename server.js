const express = require("express");
const cors = require("cors");
const apiRoutes = require("./models/routes/api");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
// Enable CORS for your frontend domain
app.use(cors({
  origin: "https://trade-senal-mern-frontend.onrender.com", // Allow frontend
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // Allow cookies if needed
}));

app.use(express.json()); // Parse incoming JSON data

// Routes
app.use("/api", apiRoutes);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
