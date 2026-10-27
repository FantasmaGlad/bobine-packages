"use client";

import React, { useState } from "react";
import type { PortalStrings } from "@/content/portal-content";
import { RELEASES_BASE } from "@/content/portal-content";

interface RepoConfiguratorProps {
  strings: PortalStrings;
}

export default function RepoConfigurator({ strings }: RepoConfiguratorProps) {
  const [distro, setDistro] = useState("debian");
  const [channel, setChannel] = useState("stable");
  const [arch, setArch] = useState("x86_64");
  const [dnfVersion, setDnfVersion] = useState("dnf5");
  const [copied, setCopied] = useState(false);

  const isFr = strings.lang === "fr";

  const getCommands = () => {
    if (distro === "debian") {
      return [
        {
          comment: isFr
            ? "# 1. Importer la clé de signature OpenPGP officielle dans le trousseau du système"
            : "# 1. Import the official OpenPGP signing key into the system keyring",
          cmd: "sudo install -m 0755 -d /etc/apt/keyrings\ncurl -fsSL https://packages.bobine.fit/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg",
        },
        {
          comment: isFr
            ? `# 2. Ajouter le dépôt APT signé (amd64 et arm64, canal ${channel})`
            : `# 2. Add the signed APT repository (amd64 and arm64, ${channel} channel)`,
          cmd: `echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian ${channel} main" | sudo tee /etc/apt/sources.list.d/bobine.list`,
        },
        {
          comment: isFr
            ? "# 3. Mettre à jour l'index des paquets et installer Bobine"
            : "# 3. Update the package index and install Bobine",
          cmd: "sudo apt update && sudo apt install bobine",
        },
      ];
    }
    if (distro === "fedora") {
      const add =
        dnfVersion === "dnf5"
          ? `sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-${channel}.repo`
          : `sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-${channel}.repo`;
      return [
        {
          comment: isFr
            ? `# 1. Ajouter le dépôt DNF signé (x86_64 et aarch64, canal ${channel})`
            : `# 1. Add the signed DNF repository (x86_64 and aarch64, ${channel} channel)`,
          cmd: add,
        },
        {
          comment: isFr
            ? "# 2. Installer Bobine (vérifier l'empreinte de la clé à la demande)"
            : "# 2. Install Bobine (verify key fingerprint when prompted)",
          cmd: "sudo dnf install bobine",
        },
        {
          comment: isFr
            ? "# 3. Recommandé sur Fedora : ffmpeg complet via RPM Fusion"
            : "# 3. Recommended on Fedora: full ffmpeg via RPM Fusion",
          cmd: "sudo dnf swap ffmpeg-free ffmpeg --allowerasing",
        },
      ];
    }
    return [
      {
        comment: isFr
          ? "# 1. Importer et signer localement la clé OpenPGP dans le trousseau pacman"
          : "# 1. Import and locally sign the OpenPGP key in the pacman keyring",
        cmd: "curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -\nsudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A",
      },
      {
        comment: isFr
          ? `# 2. Ajouter la section [bobine] à /etc/pacman.conf (canal ${channel})`
          : `# 2. Add the [bobine] section to /etc/pacman.conf (${channel} channel)`,
        cmd: `sudo tee -a /etc/pacman.conf << 'EOF'\n\n[bobine]\nSigLevel = Required DatabaseOptional\nServer = https://packages.bobine.fit/arch/${channel}/$arch\nEOF`,
      },
      {
        comment: isFr
          ? "# 3. Synchroniser les bases et installer Bobine"
          : "# 3. Sync repository databases and install Bobine",
        cmd: "sudo pacman -Syu bobine",
      },
    ];
  };

  const getDirectDownload = () => {
    const isArm = arch === "arm64";
    const version = "5.0.5";
    const tag = channel === "stable" ? `V${version}` : channel;
    const ver = channel === "stable" ? version : channel;

    if (distro === "debian") {
      const a = isArm ? "arm64" : "amd64";
      return {
        ext: ".deb",
        archLabel: a,
        meta: isFr ? "Installation hors ligne : sudo apt install ./fichier.deb" : "Offline install: sudo apt install ./file.deb",
        btnText: isFr ? "Télécharger le .deb" : "Download .deb",
        url: `${RELEASES_BASE}/${tag}/bobine_${ver}_${a}.deb`,
      };
    }
    const n = isArm ? "aarch64" : "x86_64";
    if (distro === "fedora") {
      const infix = channel === "stable" ? "-1." : ".";
      return {
        ext: ".rpm",
        archLabel: n,
        meta: isFr ? "Installation hors ligne : sudo dnf install ./fichier.rpm" : "Offline install: sudo dnf install ./file.rpm",
        btnText: isFr ? "Télécharger le .rpm" : "Download .rpm",
        url: `${RELEASES_BASE}/${tag}/bobine-${ver}${infix}${n}.rpm`,
      };
    }
    const infix = channel === "stable" ? "-1-" : "-";
    return {
      ext: ".pkg.tar.zst",
      archLabel: n,
      meta: isFr ? "Installation hors ligne : sudo pacman -U ./fichier.pkg.tar.zst" : "Offline install: sudo pacman -U ./file.pkg.tar.zst",
      btnText: isFr ? "Télécharger le .pkg.tar.zst" : "Download .pkg.tar.zst",
      url: `${RELEASES_BASE}/${tag}/bobine-${ver}${infix}${n}.pkg.tar.zst`,
    };
  };

  const handleCopy = () => {
    const fullText = getCommands()
      .map((step) => `${step.comment}\n${step.cmd}`)
      .join("\n\n");
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const commands = getCommands();
  const direct = getDirectDownload();

  const distroNames: Record<string, string> = {
    debian: isFr ? "Dépôt APT (Debian / Ubuntu)" : "APT repository (Debian / Ubuntu)",
    fedora: isFr ? "Dépôt DNF (Fedora / RHEL)" : "DNF repository (Fedora / RHEL)",
    arch: isFr ? "Dépôt Pacman (Arch Linux)" : "Pacman repository (Arch Linux)",
  };

  const channelNames: Record<string, string> = {
    stable: isFr ? "Canal Stable" : "Stable channel",
    beta: isFr ? "Canal Bêta" : "Beta channel",
    canary: isFr ? "Canal Canary" : "Canary channel",
  };

  return (
    <div className="conf glass card" aria-label={strings.confLabel}>
      <div className="conf__filters">
        {/* Choix famille */}
        <div className="filter-group">
          <label className="filter-group__label">{strings.family}</label>
          <div className="distro-list" role="tablist">
            {strings.families.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`distro ${distro === f.id ? "is-active" : ""}`}
                data-distro={f.id}
                aria-pressed={distro === f.id}
                onClick={() => setDistro(f.id)}
              >
                <span className="distro__title">{f.title}</span>
                <span className="distro__sub">{f.sub}</span>
                <span className="distro__chips">
                  {f.chips.map(([ic, label]) => (
                    <span key={ic}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="brand-icon brand-icon--image"
                        src={`/icons/distros/${ic}.svg`}
                        alt=""
                        aria-hidden="true"
                        width={24}
                        height={24}
                        loading="lazy"
                      />
                      {label}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Choix canal */}
        <div className="filter-group">
          <label className="filter-group__label">{strings.channel}</label>
          <div className="segmented-control" role="group">
            {strings.channels.map(([chId, label, badge]) => (
              <button
                key={chId}
                type="button"
                data-channel={chId}
                aria-pressed={channel === chId}
                onClick={() => setChannel(chId)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="channel-badge" src={badge} alt="" width={20} height={20} loading="lazy" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Choix architecture */}
        <div className="filter-group">
          <label className="filter-group__label">{strings.arch}</label>
          <div className="segmented-control" role="group">
            {strings.archs.map(([aId, label]) => (
              <button
                key={aId}
                type="button"
                data-arch={aId}
                aria-pressed={arch === aId}
                onClick={() => setArch(aId)}
              >
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* DNF versions switcher if fedora */}
        {distro === "fedora" && (
          <div className="filter-group" id="dnfTabs">
            <label className="filter-group__label">{strings.dnfLabel}</label>
            <div className="segmented-control" role="group">
              {strings.dnfTabs.map(([dId, label]) => (
                <button
                  key={dId}
                  type="button"
                  data-dnf={dId}
                  aria-pressed={dnfVersion === dId}
                  onClick={() => setDnfVersion(dId)}
                >
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Terminal de commande */}
      <div className="terminal">
        <div className="terminal__bar">
          <div className="terminal__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="terminal__title" id="terminalTitle">
            bash · {distroNames[distro]} · {channelNames[channel]}
          </span>
          <button
            type="button"
            className="copy-btn"
            id="copyBtn"
            aria-label={strings.copy}
            onClick={handleCopy}
          >
            {copied ? (isFr ? "Copié !" : "Copied!") : strings.copy}
          </button>
        </div>
        <div className="terminal__body" id="terminalSteps">
          {commands.map((s, idx) => (
            <div key={idx} className="step">
              <div className="step__comment">{s.comment}</div>
              <pre className="step__cmd">{s.cmd}</pre>
            </div>
          ))}
        </div>
      </div>

      {/* Téléchargement direct offline */}
      <div className="direct-box">
        <div className="direct-box__info">
          <div className="direct-box__title" id="dlTitle">
            {isFr
              ? `Paquet direct (${direct.ext}, ${direct.archLabel})`
              : `Direct package (${direct.ext}, ${direct.archLabel})`}
          </div>
          <div className="direct-box__meta" id="dlMeta">
            {direct.meta}
          </div>
        </div>
        <a className="btn btn--secondary" id="dlLink" href={direct.url}>
          <span id="dlBtnText">{direct.btnText}</span>
        </a>
      </div>
    </div>
  );
}
