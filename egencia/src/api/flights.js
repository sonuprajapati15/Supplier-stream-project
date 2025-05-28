// src/api/flights.js
// Search flights using Server-Sent Events (SSE)
export function streamFlightsSearch({ from, to }, onEvent, onComplete, onError) {
  const url = `/stream/flights/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const eventSource = new EventSource(url);
  eventSource.onmessage = (event) => {
    if (event.data.includes("Flight stream completed")) {
      eventSource.close();
      onComplete && onComplete();
    } else if (!event.data.startsWith("event:")) {
      try {
        onEvent && onEvent(JSON.parse(event.data));
      } catch (e) {
        // ignore non-json events
      }
    }
  };
  eventSource.onerror = (e) => {
    eventSource.close();
    onError && onError(e);
  };
  return eventSource; // so you can close it if needed
}