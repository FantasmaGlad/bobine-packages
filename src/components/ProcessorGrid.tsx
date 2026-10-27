import React from "react";

export default function ProcessorGrid() {
  const chips = [
    { id: "intel", label: "Intel", icon: "/icons/chips/intel.svg" },
    { id: "amd", label: "AMD", icon: "/icons/chips/amd.svg" },
    { id: "snapdragon", label: "Qualcomm Snapdragon", icon: "/icons/chips/snapdragon.svg" },
  ];

  return (
    <div className="processor-grid" role="list">
      {chips.map((chip) => (
        <div key={chip.id} className="processor-item" role="listitem">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="brand-icon brand-icon--image"
            src={chip.icon}
            alt=""
            aria-hidden="true"
            width={24}
            height={24}
            loading="lazy"
          />
          <span className="processor-label">{chip.label}</span>
        </div>
      ))}
    </div>
  );
}
