import React from "react";

interface HeroProps {
  title: string;
  text: string;
}

export default function Hero({ title, text }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="heroTitle">
      <h1 id="heroTitle" className="hero__title">
        {title}
      </h1>
      <p className="hero__lead">
        {text}
      </p>
    </section>
  );
}
