import React from "react";
import type { PortalStrings } from "@/content/portal-content";

interface FooterProps {
  strings: PortalStrings;
}

export default function Footer({ strings }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>{strings.footerLead}</div>
        <nav className="footer-links" aria-label="Footer">
          {strings.footerLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              {...(href.startsWith("http") && !href.includes("bobine.fit")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
