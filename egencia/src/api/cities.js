// src/api/cities.js
export async function fetchCitySuggestions({ keyword, from }) {
  const params = new URLSearchParams({ keyword });
  if (from) params.append("from", from);
  const res = await fetch(`/stream/all/cities?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch city suggestions");
  return await res.json();
}