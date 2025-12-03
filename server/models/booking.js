import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  date: Date,
  status: { type: String, default: "pending" },
  payfast_m_payment_id: String,
});

// Use existing model if it exists, otherwise create a new one
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
