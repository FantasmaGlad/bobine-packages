import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RepoConfigurator from "@/components/RepoConfigurator";
import ProcessorGrid from "@/components/ProcessorGrid";
import BrowserGrid from "@/components/BrowserGrid";
import { PORTAL_DATA, SIGNING_KEY_FINGERPRINT } from "@/content/portal-content";

export function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export default async function PortalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale === "fr" ? "fr" : "en";
  const strings = PORTAL_DATA[locale];

  return (
    <>
      <a className="skip-link" href="#main">
        {strings.skip}
      </a>
      <Header strings={strings} langLinks={["/", "/fr/"]} />

      <main id="main" className="container">
        <Hero title={strings.heroTitle} text={strings.heroText} />

        <section id="configurator" className="glass workspace" aria-label={strings.confLabel}>
          <RepoConfigurator strings={strings} />
        </section>

        {/* Architectures */}
        <section className="section" id="architectures">
          <div className="section__eyebrow">{strings.archSection[0]}</div>
          <h2>{strings.archSection[1]}</h2>
          <p className="section__desc">{strings.archSection[2]}</p>
          <div className="grid-2">
            {strings.archCards.map((card, i) => (
              <article key={i} className="glass card">
                <h3>
                  {card.chips.map((ic) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={ic}
                      className="brand-icon brand-icon--image"
                      src={`/icons/${["intel", "amd", "snapdragon"].includes(ic) ? "chips" : "distros"}/${ic}.svg`}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  ))}
                  {card.title}
                </h3>
                <p>{card.desc}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-md)" }}>
            <ProcessorGrid />
          </div>
          <p className="section__desc" style={{ marginTop: "var(--space-md)" }}>
            {strings.archSection[3]} <a href={strings.archLink[0]}>{strings.archLink[1]}</a>.
          </p>
        </section>

        {/* Sécurité */}
        <section className="section" id="security">
          <div className="section__eyebrow">{strings.secSection[0]}</div>
          <h2>{strings.secSection[1]}</h2>
          <p className="section__desc">{strings.secSection[2]}</p>
          <div className="grid-2">
            <article className="glass card">
              <h3>{strings.fpTitle}</h3>
              <p>{strings.fpText}</p>
              <div className="gpg">
                <code id="gpgFp">{SIGNING_KEY_FINGERPRINT}</code>
              </div>
              <p style={{ marginTop: "var(--space-sm)" }}>
                {strings.inspect}{" "}
                <code>curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys</code>
              </p>
            </article>
            <article className="glass card">
              <h3>{strings.notes}</h3>
              <ul>
                {strings.notesList.map(([title, text], i) => (
                  <li key={i}>
                    <strong>{title} :</strong> {text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        {/* Écosystème */}
        <section className="section" id="ecosystem">
          <div className="section__eyebrow">{strings.ecoSection[0]}</div>
          <h2>{strings.ecoSection[1]}</h2>
          <p className="section__desc">{strings.ecoSection[2]}</p>
          <div className="grid-2">
            {strings.eco.map((item, i) => (
              <a key={i} className="glass card" href={item.link}>
                <h3>
                  {item.chips.map((ic) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={ic}
                      className="brand-icon brand-icon--image"
                      src={`/icons/${
                        ["windows", "apple", "android", "androidtv"].includes(ic)
                          ? "os"
                          : "browsers"
                      }/${ic}.svg`}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      loading="lazy"
                    />
                  ))}
                  {item.title}
                </h3>
                <p>{item.desc}</p>
              </a>
            ))}
          </div>
          <div style={{ marginTop: "var(--space-md)" }}>
            <BrowserGrid />
          </div>
        </section>
      </main>

      <Footer strings={strings} />
    </>
  );
}
