// HyperTube Modüler Dock & Panel Buton Veri Kaynağı (Kendi Bağımsız SVG'lerimiz)

const DOCK_BUTTONS_CONFIG = [
  {
    id: "home",
    title: "Ana Sayfa",
    url: "/",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`
  },
  {
    id: "shorts",
    title: "Shorts",
    url: "/shorts",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.77 10.32l-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25l1.2.5L6 14.93c-1.84.96-2.53 3.23-1.56 5.06 1 1.84 3.26 2.53 5.09 1.56l8.43-4.5c1.29-.68 2.07-2.04 2-3.49-.07-1.42-.93-2.67-2.22-3.25zM10 14.65V9.35L15 12l-5 2.65z"/></svg>`
  },
  {
    id: "subscriptions",
    title: "Abonelikler",
    url: "/feed/subscriptions",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20 8H4V6h16v2zm-2-4H6v2h12V4zm4 8v10c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V12c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-6 5l-6-3.5v7l6-3.5z"/></svg>`
  },
  {
    id: "library",
    title: "Kitaplık",
    url: "/feed/library",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z"/></svg>`
  },
  {
    id: "history",
    title: "Geçmiş",
    url: "/feed/history",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`
  }
];

function getDockButtons() {
  return DOCK_BUTTONS_CONFIG;
}