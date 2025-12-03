import express from "express";
import Booking from "../models/Booking.js";
import axios from "axios";

const router = express.Router();

// PayFast credentials from .env
const { PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASS_PHRASE, SERVER_URL } = process.env;

// Utility to generate PayFast signature
function generateSignature(data) {
  const qs = Object.keys(data)
    .sort()
    .map((key) => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  // Append passphrase if defined
  return PAYFAST_PASS_PHRASE ? qs + `&passphrase=${encodeURIComponent(PAYFAST_PASS_PHRASE)}` : qs;
}

// Create payment
router.post("/create", async (req, res) => {
  try {
    const { bookingId, amount, name, email, service } = req.body;

    // Find the booking
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const paymentData = {
      merchant_id: PAYFAST_MERCHANT_ID,
      merchant_key: PAYFAST_MERCHANT_KEY,
      return_url: `${SERVER_URL}/payment-success`,
      cancel_url: `${SERVER_URL}/payment-cancel`,
      notify_url: `${SERVER_URL}/api/admin/payfast/notify`,
      name_first: name,
      email_address: email,
      amount: amount.toFixed(2),
      item_name: service,
    };

    const signature = generateSignature(paymentData);
    paymentData.signature = signature;

    res.json({ paymentUrl: `https://www.payfast.co.za/eng/process?${new URLSearchParams(paymentData)}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// PayFast IPN notification
router.post("/notify", async (req, res) => {
  try {
    const data = req.body;

    // Validate signature (optional: you can implement PayFast validation)
    // Example: POST back to PayFast to verify

    const booking = await Booking.findById(data.m_payment_id);
    if (!booking) return res.status(404).send("Booking not found");

    // Update booking status
    booking.status = data.payment_status === "COMPLETE" ? "paid" : "failed";
    booking.payfast_m_payment_id = data.m_payment_id;
    await booking.save();

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing IPN");
  }
});

export default router;
