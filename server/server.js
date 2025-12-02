const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON request bodies

// Routes
const bookingsRoute = require("./routes/bookings");
app.use("/api/bookings", bookingsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Apex AutoShine Backend Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
