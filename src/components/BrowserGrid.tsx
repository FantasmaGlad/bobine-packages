import React from "react";

export default function BrowserGrid() {
  const browsers = [
    { id: "firefox", label: "Firefox", icon: "/icons/browsers/firefox.svg" },
    { id: "chrome", label: "Chrome", icon: "/icons/browsers/chrome.svg" },
    { id: "safari", label: "Safari", icon: "/icons/browsers/safari.svg" },
    { id: "edge", label: "Edge", icon: "/icons/browsers/edge.svg" },
    { id: "brave", label: "Brave", icon: "/icons/browsers/brave.svg" },
    { id: "opera", label: "Opera", icon: "/icons/browsers/opera.svg" },
    { id: "torbrowser", label: "Tor Browser", icon: "/icons/browsers/torbrowser.svg" },
  ];

  return (
    <div className="browser-grid" role="list">
      {browsers.map((browser) => (
        <div key={browser.id} className="browser-item" role="listitem">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-icon brand-icon--image"
            src={browser.icon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            loading="lazy"
          />
          <span className="browser-label">{browser.label}</span>
        </div>
      ))}
    </div>
  );
}
