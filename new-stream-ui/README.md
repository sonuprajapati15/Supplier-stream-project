# Flight Search UI Clone

This project is a React-based clone of the ixigo flight search UI, designed to display flight results in an interactive, card-based format. It consumes an EventStream API (`http://localhost:9000/supplier/stream/flights`) and visually mimics the provided reference image.

## Features

- **Flight Cards:** Each flight is shown in a card. On hover, the card lifts up. On click, detailed info is shown in a modal.
- **Fetching Bar:** A loading bar at the top is shown while results are being fetched.
- **Sorted by Price:** Results are sorted by price once fetching is complete.
- **Responsive Filters:** Filters for stops, price range, and departure time (UI only, logic optional).
- **Modern UI:** Matches the reference image style (ixigo) as closely as possible.

## Technologies

- React (Vite recommended)
- TypeScript
- CSS (or styled-components/tailwind)
- [Optional] Material UI or Chakra UI for fast prototyping

---

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

2. Start the app:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Make sure your API is running at `http://localhost:9000/supplier/stream/flights`.

---

## File Structure

- `src/App.tsx` — Main layout and routing
- `src/components/FlightSearchPage.tsx` — Top-level page for search results
- `src/components/FlightCard.tsx` — UI for each flight card
- `src/components/FlightDetailModal.tsx` — Modal for expanded flight info
- `src/components/FiltersPanel.tsx` — Sidebar filters (UI only)
- `src/components/FetchingBar.tsx` — Top loading bar
- `src/types/Flight.ts` — TypeScript types for flight data

---

## Customization

- To fully replicate ixigo, apply styles from the reference image (see `public/image1.png`) to cards, buttons, fonts, and layout.
- The fetching bar should animate while results are streaming and disappear when done.

---

## Notes

- This is a front-end only project and does not handle authentication.
- The API is expected to respond with a JSON stream (see `src/types/Flight.ts` for structure).