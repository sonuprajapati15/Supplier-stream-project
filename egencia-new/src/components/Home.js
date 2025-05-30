import { createElement as h, useState } from "react";
import { FlightSearch } from "./FlightSearch";
import "../css/theme-toggle.css"
import "../css/home-page.css"
import "../css/home-widgets.css"
import "../css/tabs.css"
import "../css/variables.css"
import "../css/index.css"

export function Home() {
  const [tab, setTab] = useState("flights");

  function tabBtn(name, label) {
    return h('button', {
      className: `tab-btn${tab === name ? " active" : ""}`,
      onClick: () => setTab(name)
    }, label);
  }

  return h('div', { className: "home-page" }, [
    h('div', { className: "tabs" }, [
      tabBtn("flights", "Flights"),
      tabBtn("hotels", "Hotels"),
      tabBtn("trains", "Trains"),
      tabBtn("cars", "Cars")
    ]),
    h('div', { className: "tab-content" }, [
      tab === "flights" && h(FlightSearch),
      tab !== "flights" && h('div', { className: "not-implemented" }, "Coming soon...")
    ]),
    h('div', { className: "home-widgets" }, [
      h('section', { className: "upcoming-trips" }, [
        h('h2', {}, "Upcoming trips"),
        // Example trip cards
        h('div', { className: "trip-cards" }, [
          h('div', { className: "trip-card" }, [
            h('img', { src: "/trip1.jpg", alt: "Portland" }),
            h('div', {}, [
              h('strong', {}, "Portland"),
              h('div', {}, "Fri, May 30, 2025"),
              h('button', {}, "Add to trip")
            ])
          ]),
          h('div', { className: "trip-card" }, [
            h('img', { src: "/trip2.jpg", alt: "Mexico City" }),
            h('div', {}, [
              h('strong', {}, "Mexico City"),
              h('div', {}, "Wed, Sep 10, 2025"),
              h('button', {}, "Add to trip")
            ])
          ])
        ])
      ]),
      h('section', { className: "recommended" }, [
        h('h2', {}, "Recommended for you"),
        h('div', { className: "recommendation" }, [
          h('span', { className: "rec-icon" }, "🟡"),
          h('div', {}, [
            h('strong', {}, "New Group Trips feature"),
            h('div', {}, "This feature helps organize travel for small groups in your organization."),
            h('a', { href: "#" }, "Check it out")
          ])
        ]),
        h('div', { className: "recommendation" }, [
          h('span', { className: "rec-icon" }, "🟡"),
          h('div', {}, [
            h('strong', {}, "Travel with confidence"),
            h('div', {}, "See the latest travel advisories, restrictions and news updates."),
            h('a', { href: "#" }, "Visit the Egencia Travel Advisor")
          ])
        ])
      ])
    ])
  ]);
}