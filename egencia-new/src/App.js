import { createElement as h } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Listing } from "./components/Listing";
import { Trips } from "./components/Trips";
import { Booking } from "./components/Booking";

export function App() {
  return h(ThemeProvider, {}, 
    h(BrowserRouter, {},
      h('div', { className: "app-shell" }, [
        h(Header),
        h('main', { className: "main-content" }, 
          h(Routes, {}, [
            h(Route, { path: "/", element: h(Home) }),
            h(Route, { path: "/listing", element: h(Listing) }),
            h(Route, { path: "/trips", element: h(Trips) }),
            h(Route, { path: "/booking/:id", element: h(Booking) })
          ])
        ),
        h(Footer)
      ])
    )
  );
}