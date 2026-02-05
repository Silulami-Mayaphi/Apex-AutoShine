import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    date: String,
    area: String,
    address: String,
    vehicleType: String,
    services: [String],   // multi-service support
    amount: Number,
    status: {
      type: String,
      default: "pending payment",
    },
  },
  { timestamps: true }
);

// 🔥 CRITICAL FIX — prevents overwrite error
const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
