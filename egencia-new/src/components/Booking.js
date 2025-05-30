import { createElement as h } from "react";
import { useParams } from "react-router-dom";
export function Booking() {
  const { id } = useParams();
  return h('div', { className: "booking-page" }, [
    h('h2', {}, `Booking Details for #${id}`),
    h('div', {}, "Booking data will be displayed here.")
  ]);
}