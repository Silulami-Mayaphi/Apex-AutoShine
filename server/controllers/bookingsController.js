// Temporary in-memory storage
let bookings = [];

exports.getBookings = (req, res) => {
  res.json(bookings);
};

exports.createBooking = (req, res) => {
  const { name, email, phone, service, date } = req.body;

  if (!name || !email || !phone || !service || !date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBooking = {
    id: bookings.length + 1,
    name,
    email,
    phone,
    service,
    date,
    createdAt: new Date(),
  };

  bookings.push(newBooking);

  res.status(201).json({ message: "Booking created", booking: newBooking });
};
