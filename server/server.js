import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import payfastRoutes from "./routes/payfast.js";

dotenv.config();

import bookingsRoute from "./routes/bookings.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bookings", bookingsRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/payfast", payfastRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Apex AutoShine Backend Running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
