import { createElement as h } from "react";
import "../css/theme-toggle.css"
import "../css/index.css"

export function Trips() {
  return h('div', { className: "trips-page" }, [
    h('h2', {}, "Your Trips"),
    h('div', {}, "List of all your trips will be shown here.")
  ]);
}