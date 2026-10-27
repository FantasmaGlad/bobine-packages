import React from "react";

interface ChannelBadgeProps {
  channel: "stable" | "beta" | "canary";
  label: string;
}

const BADGES = {
  stable: "/assets/channels/bobine-stable.webp",
  beta: "/assets/channels/bobine-beta.webp",
  canary: "/assets/channels/bobine-canary.webp",
};

export default function ChannelBadges({ channel, label }: ChannelBadgeProps) {
  return (
    <span className="channel-badge-container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="channel-badge"
        src={BADGES[channel]}
        alt=""
        width={20}
        height={20}
        loading="lazy"
      />
      <span>{label}</span>
    </span>
  );
}
