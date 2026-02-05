import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import BookingForm from "./components/BookingForm";
import BookingSuccess from "./pages/BookingSuccess";
import BookingFailure from "./pages/BookingFailure";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/payment-success" element={<BookingSuccess />} />
        <Route path="/payment-failure" element={<BookingFailure />} />
      </Routes>
    </Router>
  );
}

export default App;
