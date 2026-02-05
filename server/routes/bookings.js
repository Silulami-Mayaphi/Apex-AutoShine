import express from "express";
import Booking from "../models/booking.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      date,
      area,
      address,
      vehicleType,
      services,
      amount,
    } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !date ||
      !area ||
      !address ||
      !vehicleType ||
      !services ||
      !Array.isArray(services) ||
      services.length === 0
    ) {
      return res.status(400).json({
        message: "All fields are required and at least one service must be selected.",
      });
    }

    // 1️⃣ Save booking
    const booking = new Booking({
      name,
      email,
      phone,
      date,
      area,
      address,
      vehicleType,
      services,
      amount,
      status: "pending payment",
    });

    await booking.save();

    // 2️⃣ Create Yoco transaction
    const yocoResponse = await fetch("https://online.yoco.com/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.YOCO_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amountInCents: amount * 100, // in cents
        currency: "ZAR",
        customerEmail: email,
        description: `Booking for ${name}`,
      }),
    });

    const yocoData = await yocoResponse.json();

    if (!yocoResponse.ok) {
      console.error("Yoco Payment Error:", yocoData);
      return res.status(500).json({ message: yocoData.message || "Failed to create Yoco payment" });
    }

    // 3️⃣ Send payment URL to frontend
    res.status(201).json({
      booking,
      paymentUrl: yocoData.checkoutUrl,
      message: "Booking created successfully. Redirecting to payment...",
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
