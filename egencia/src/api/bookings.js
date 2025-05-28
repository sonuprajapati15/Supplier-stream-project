// src/api/bookings.js
export async function fetchAllBookings(userId = "1234") {
  const res = await fetch(`/stream/all/booking?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return await res.json();
}

export async function makeBooking(bookingData) {
  const res = await fetch(`/makeBooking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData)
  });
  if (!res.ok) throw new Error("Failed to make booking");
  return await res.json();
}