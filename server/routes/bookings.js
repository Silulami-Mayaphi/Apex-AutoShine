const express = require("express");
const router = express.Router();
const { createBooking, getBookings } = require("../controllers/bookingsController");

// GET all bookings (for admin/testing)
router.get("/", getBookings);

// POST new booking
router.post("/", createBooking);

module.exports = router;
