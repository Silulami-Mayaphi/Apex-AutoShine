// backend/routes/yoco.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
const Booking = require("../models/Booking"); // if using DB
const nodemailer = require("nodemailer");

// POST /api/yoco/checkout
router.post("/checkout", async (req, res) => {
  const { name, email, phone, service, amount } = req.body;

  if (!name || !email || !amount) {
    return res.status(400).json({ message: "Required booking info missing" });
  }

  try {
    // OPTIONAL: create booking in DB first (status = pending)
    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      amount,
      status: "pending",
    });

    // Create Yoco checkout session
    const response = await axios.post(
      "https://online.yoco.com/v1/checkout",
      {
        amountInCents: amount, // e.g., 1000 = R10
        currency: "ZAR",
        reference: `booking-${booking.id}`,
        successUrl: `http://localhost:3000/payment-success?bookingId=${booking.id}`,
        cancelUrl: `http://localhost:3000/payment-failure?bookingId=${booking.id}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send checkout URL to frontend
    res.status(200).json({ checkoutUrl: response.data.checkoutUrl });
  } catch (error) {
    console.error("Yoco checkout error:", error.response?.data || error.message);
    res.status(500).json({ message: "Payment initialization failed", error: error.response?.data || error.message });
  }
});

// Optional: endpoint to update booking status after payment (if using webhook or success page)
router.post("/update-status", async (req, res) => {
  const { bookingId, status } = req.body;

  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status; // 'paid' or 'failed'
    await booking.save();

    // Send confirmation email if paid
    if (status === "paid") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: '"Apex Autoshine" <noreply@apexautoshine.com>',
        to: booking.email,
        subject: "Booking & Payment Confirmation",
        html: `<h1>Thank you ${booking.name}!</h1><p>Your payment of R${booking.amount / 100} was successful.</p>`,
      });
    }

    res.json({ message: "Booking status updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update booking status" });
  }
});

module.exports = router;
