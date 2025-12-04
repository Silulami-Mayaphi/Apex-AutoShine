import express from "express";
import Booking from "../models/booking.js";

const router = express.Router();

// Create new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, service, date, amount } = req.body;

    const booking = new Booking({ name, email, phone, service, date, amount });
    await booking.save();

    res.status(201).json({ booking, message: "Booking created. Proceed to payment." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
