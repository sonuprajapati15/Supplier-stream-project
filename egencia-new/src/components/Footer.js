import { createElement as h } from "react";
import "../css/Footer.css"; // Assuming you have a CSS file for styling

export function Footer() {
  return h('footer', { className: "footer" }, [
    h('div', { className: "footer-links" }, [
      h('a', { href: "#" }, "Egencia.com"),
      h('a', { href: "#" }, "Privacy"),
      h('a', { href: "#" }, "Cookie policy"),
      h('a', { href: "#" }, "Egencia promise"),
      h('a', { href: "#" }, "Egencia LLC Terms of use"),
      h('a', { href: "#" }, "Mobile app"),
      h('a', { href: "#" }, "Customer support")
    ]),
    h('div', { className: "footer-logos" }, [
      h('img', {
        src: "/logo.png",
        alt: "Egencia logo",
        className: "footer-logo"
      }),
      h('img', {
        src: "/business-travel.png",
        alt: "Business Travel",
        className: "footer-logo"
      })
    ]),
    h('div', { className: "footer-legal" },
      "© 2025 GBT Travel Services UK Limited"
    ),
    h('div', { className: "footer-smallprint" },
      "GBT Travel Services UK Limited and its authorized sublicensees (including Ovation Travel Group and Egencia) use certain trademarks and service marks of American Express Company or its subsidiaries (American Express) in the American Express Global Business Travel and American Express GBT Meetings & Events brands and in connection with its business for permitted uses only under a limited license from American Express (Licensed Marks). The Licensed Marks are trademarks or service marks of, and the property of, American Express. GBT UK is a subsidiary of Global Business Travel Group, Inc. (NYSE: GBTG). American Express holds a minority interest in GBTG, which operates as a separate company from American Express."
    )
  ]);
}