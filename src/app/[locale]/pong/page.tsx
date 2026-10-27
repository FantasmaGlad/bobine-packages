import React from "react";
import Header from "@/components/Header";
import { PORTAL_DATA } from "@/content/portal-content";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function PongPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale === "fr" ? "fr" : "en";
  const strings = PORTAL_DATA[locale];
  const p = strings.pong;

  return (
    <div className="pong-page">
      <a className="skip-link" href="#gameArea">
        {strings.skip}
      </a>
      <Header strings={strings} langLinks={["/pong/", "/fr/pong/"]} />

      <main className="pong-main" id="gameArea">
        <h1 className="sr-only">{p.h1}</h1>
        <div className="pong-score" aria-label={`${p.player} / ${p.robot}`}>
          <div className="pong-score__box">
            <span className="pong-score__label">{p.player}</span>
            <span className="pong-score__val" id="scorePlayer">
              0
            </span>
          </div>
          <span className="pong-score__colon" aria-hidden="true">
            :
          </span>
          <div className="pong-score__box">
            <span className="pong-score__label">{p.robot}</span>
            <span className="pong-score__val" id="scoreBot">
              0
            </span>
          </div>
        </div>

        <canvas id="pongCanvas" aria-label="Pong" />

        <div
          className="pong-overlay"
          id="overlay"
          role="dialog"
          aria-modal="false"
          aria-labelledby="overlayTitle"
        >
          <h2 id="overlayTitle">{p.winTitle}</h2>
          <p id="overlayText">{p.winText}</p>
          <button type="button" className="btn btn--primary" id="overlayBtn">
            {p.again}
          </button>
        </div>

        <noscript>
          <p className="pong-noscript">JavaScript required.</p>
        </noscript>
      </main>

      <footer className="site-footer site-footer--compact">
        <div className="site-footer__inner">
          <a href={locale === "fr" ? "/fr/" : "/"}>{p.back}</a>
          <span>
            {p.footer}{" "}
            <a href="mailto:clement.barillot@bobine.fit">
              {p.contribute} clement.barillot@bobine.fit
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
