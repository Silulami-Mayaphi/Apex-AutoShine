const handlePay = async () => {
  const res = await fetch("http://localhost:5000/api/payfast/pay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: 200, // replace with booking price
      name: "John Doe",
      email: "john@example.com",
    }),
  });
  const data = await res.json();
  window.location.href = data.url; // redirects to PayFast
};
