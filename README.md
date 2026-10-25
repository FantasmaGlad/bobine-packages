# packages.bobine.fit — Bobine Official Linux Package Repositories

<p align="center">
  <img src="logo_bobine_entier.png" alt="Bobine" width="220"><br><br>
  <b>Official, cryptographically signed package repositories for all Linux distributions supported by Bobine.</b><br>
  <sub>Debian &amp; Ubuntu (APT), Fedora &amp; RPM derivatives (DNF), Arch Linux &amp; derivatives (Pacman) — Native x86_64 and aarch64 (ARM64).</sub>
</p>

<p align="center">
  <img src="icons/distros/debian.svg" alt="Debian" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/ubuntu.svg" alt="Ubuntu" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/linuxmint.svg" alt="Linux Mint" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/popos.svg" alt="Pop!_OS" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/fedora.svg" alt="Fedora" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/rhel.svg" alt="RHEL" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/almalinux.svg" alt="AlmaLinux" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/rockylinux.svg" alt="Rocky Linux" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/arch.svg" alt="Arch Linux" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/endeavouros.svg" alt="EndeavourOS" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/cachyos.svg" alt="CachyOS" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/manjaro.svg" alt="Manjaro" width="22" height="22">&nbsp;&nbsp;
  <img src="icons/distros/raspberrypi.svg" alt="Raspberry Pi OS" width="22" height="22">
</p>

<p align="center">
  <a href="https://packages.bobine.fit"><b>Web Package Hub</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/en"><b>Official Bobine Site</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/en/linux"><b>Linux Showcase</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/en/computer"><b>PCs &amp; Processors</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/FantasmaGlad/Bobine"><b>Bobine Source Repository</b></a> &nbsp;·&nbsp;
  <a href="README.fr.md"><b>Français</b></a>
</p>

---

## 1. Unified OpenPGP Signing Key

All packages, repository indices (`InRelease`, `repomd.xml.asc`, `bobine.db.sig`), and release metadata published on `packages.bobine.fit` are cryptographically signed using the official Bobine OpenPGP RSA 4096-bit key:

- **Public key URL**: `https://packages.bobine.fit/bobine.gpg`
- **Fingerprint (SHA-1 / V4)**: `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- **Format**: OpenPGP binary key compatible with APT, DNF (RPM), and Pacman.

```bash
# Verify signing key fingerprint
curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys
```

---

## 2. Debian & Ubuntu Family (APT Package Manager — `.deb`)

<p>
  <img src="icons/distros/debian.svg" width="16" height="16" alt=""> <b>Debian 12 / 13</b> &nbsp;·&nbsp;
  <img src="icons/distros/ubuntu.svg" width="16" height="16" alt=""> <b>Ubuntu 22.04 / 24.04 LTS</b> &nbsp;·&nbsp;
  <img src="icons/distros/linuxmint.svg" width="16" height="16" alt=""> <b>Linux Mint 21 / 22</b> &nbsp;·&nbsp;
  <img src="icons/distros/popos.svg" width="16" height="16" alt=""> <b>Pop!_OS</b> &nbsp;·&nbsp;
  <img src="icons/distros/zorin.svg" width="16" height="16" alt=""> <b>Zorin OS</b> &nbsp;·&nbsp;
  <img src="icons/distros/raspberrypi.svg" width="16" height="16" alt=""> <b>Raspberry Pi OS</b>
</p>

```bash
# 1. Import signing key to official system keyring
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg

# 2. Add Bobine APT repository (choose stable, beta, or canary)
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list

# 3. Update index and install
sudo apt update && sudo apt install bobine
```

---

## 3. Fedora & Enterprise Linux Family (DNF Package Manager — `.rpm`)

<p>
  <img src="icons/distros/fedora.svg" width="16" height="16" alt=""> <b>Fedora 39 / 40 / 41+</b> &nbsp;·&nbsp;
  <img src="icons/distros/nobara.svg" width="16" height="16" alt=""> <b>Nobara Linux</b> &nbsp;·&nbsp;
  <img src="icons/distros/rhel.svg" width="16" height="16" alt=""> <b>RHEL 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/almalinux.svg" width="16" height="16" alt=""> <b>AlmaLinux 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/rockylinux.svg" width="16" height="16" alt=""> <b>Rocky Linux 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/opensuse.svg" width="16" height="16" alt=""> <b>openSUSE</b>
</p>

```bash
# 1. Add repository definition file (Fedora 41+ / DNF 5)
sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-stable.repo

# 2. Install Bobine
sudo dnf install bobine
```

*For Fedora 39/40, RHEL 9, AlmaLinux 9, and Rocky Linux 9 (DNF 4)*:
```bash
sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf install bobine
```

---

## 4. Arch Linux Family & Derivatives (Pacman Package Manager — `.pkg.tar.zst`)

<p>
  <img src="icons/distros/arch.svg" width="16" height="16" alt=""> <b>Arch Linux</b> &nbsp;·&nbsp;
  <img src="icons/distros/endeavouros.svg" width="16" height="16" alt=""> <b>EndeavourOS</b> &nbsp;·&nbsp;
  <img src="icons/distros/cachyos.svg" width="16" height="16" alt=""> <b>CachyOS</b> &nbsp;·&nbsp;
  <img src="icons/distros/manjaro.svg" width="16" height="16" alt=""> <b>Manjaro Linux</b>
</p>

```bash
# 1. Import and locally sign the key in pacman
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A

# 2. Add repository section to /etc/pacman.conf
sudo tee -a /etc/pacman.conf << 'EOF'

[bobine]
SigLevel = Required DatabaseOptional
Server = https://packages.bobine.fit/arch/stable/$arch
EOF

# 3. Synchronize database and install
sudo pacman -Sy bobine
```

---

## 5. Supported Processors, SoCs & Hardware Platforms

| Architecture | Processor & SoC Families | Representative Devices & Accelerators |
| :--- | :--- | :--- |
| **`x86_64` (`amd64`)** | <img src="icons/chips/intel.svg" width="14" height="14" alt=""> **Intel**: Core Ultra (Series 1 & 2), Core i3–i9 (8th–14th Gen), Processor **N100 / N200 / N95 / N305**, Celeron **J4105 / J4125 / N5105**<br><img src="icons/chips/amd.svg" width="14" height="14" alt=""> **AMD**: **Ryzen 5000 / 6000 / 7000 / 8000 / AI 300** (Zen 3, Zen 4, Zen 5) | Dell Wyse 5070 Thin Client, Beelink Mini S12 Pro / SER5 / SER8, Minisforum UN100 / UM780, Framework Laptop 13 & 16, Intel/ASUS NUC, HP EliteDesk Mini.<br>*Hardware decode: Intel QuickSync VA-API (`iHD`/`i965`), AMD Radeon VA-API (`radeonsi`), NVIDIA NVDEC.* |
| **`aarch64` (`arm64`)** | <img src="icons/chips/snapdragon.svg" width="14" height="14" alt=""> **Qualcomm Snapdragon**: **Snapdragon X Elite** (`X1E`), **Snapdragon X Plus** (`X1P`), **Snapdragon 8 Gen 2** (`SM8550`), **Snapdragon 8 Gen 3** (`SM8650`), **Snapdragon 8 Elite** (`SM8750`)<br><img src="icons/os/apple.svg" width="14" height="14" alt=""> **Apple Silicon**: **M1, M2, M3, M4** (Pro / Max / Ultra)<br><img src="icons/distros/raspberrypi.svg" width="14" height="14" alt=""> **Broadcom / Rockchip / NVIDIA / MediaTek / Tensor**: BCM2712, RK3588, Grace Blackwell GB10, Jetson Orin, Dimensity 9300+, Tensor G2–G4 | Lenovo ThinkPad T14s Gen 6, Yoga Slim 7x, Surface Laptop 7, Samsung Galaxy Tab S9 / S9 Ultra, Xiaomi Pad 6S Pro, Apple Mac mini / MacBook (Asahi Linux / VM / macOS), Raspberry Pi 5 (8 GB), Orange Pi 5, Radxa Rock 5B, NVIDIA DGX Spark.<br>*Hardware decode: V4L2, VA-API, VideoToolbox, MediaCodec.* |

---

## 6. Release Channels

- **Stable (`stable`)**: Production-ready, fully verified releases recommended for 24/7 studio operation.
- **Beta (`beta`)**: Curated feature batches and pre-release candidates.
- **Canary (`canary`)**: Continuous rolling builds triggered automatically on every push to `main`.

---

## License

This repository and its packaging configurations are licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Copyright (c) 2026 Bobine.

## Shared visual identity

The portal uses the Bobine site's language and theme controls, with the same 16 themes and shared preference. Brand SVGs retain their colors and proportions. To synchronize a BobineWeb checkout:

```sh
node scripts/sync-branding.mjs ../BobineWeb
node scripts/build-portal.mjs
node scripts/check-portal.mjs
```

See [assets/NOTICE.md](assets/NOTICE.md) for credits and provenance. CI checks generated files, their source revision, 40 layouts and 12 open palettes in Chromium.
