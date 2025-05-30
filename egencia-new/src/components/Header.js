import { createElement as h } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const navActive = (to) => location.pathname === to ? "active" : "";

  return h('header', { className: "header" }, [
    h('div', { className: "header-inner" }, [
      h(Link, { to: "/", className: "logo-area" },
        h('img', { src: "/logo.png", alt: "Egencia", className: "logo-img" })
      ),
      h('nav', { className: "main-nav" }, [
        h(Link, { to: "/", className: navActive("/") }, "Book"),
        h(Link, { to: "/trips", className: navActive("/trips") }, "Trips"),
        h('div', { className: "nav-dropdown" }, [
          h('span', {}, "Tools ▼"),
          h('div', { className: "dropdown-content" }, [
            h('a', { href: "#" }, "Option 1"),
            h('a', { href: "#" }, "Option 2")
          ])
        ])
      ]),
      h('div', { className: "header-right" }, [
        h('a', { href: "#", className: "help-link" }, "Help"),
        h('a', { href: "#", className: "feedback-link" }, "Feedback"),
        h('span', { className: "user-info" }, [
          h('span', {}, [
            "FlightUX Transformation",
            h('br'),
            "Sonu Prajapati"
          ]),
          h('span', { className: "user-avatar" }, "👤")
        ])
      ])
    ])
  ]);
}