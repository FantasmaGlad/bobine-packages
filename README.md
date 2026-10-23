# packages.bobine.fit — Bobine Linux Package Repositories

<p align="center">
  <b>Official, cryptographically signed package repositories for all Linux distributions supported by Bobine.</b><br>
  <sub>Debian & Ubuntu (APT), Fedora & RPM derivatives (DNF), Arch Linux & derivatives (Pacman). Architectures x86_64 and aarch64 (ARM64).</sub>
</p>

<p align="center">
  <sub>#video #streaming #fitness #gym #digital-signage #media-player #self-hosted #open-source #automation #kiosk #offline-first #nextjs #rust #tauri #linux #cross-platform #display #appliance #framework</sub>
</p>

<p align="center">
  <a href="https://packages.bobine.fit"><b>Web Package Hub</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit"><b>Official Bobine Site</b></a> &nbsp;·&nbsp;
  <a href="https://frame.work/"><b>Framework Laptop</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/FantasmaGlad/Bobine"><b>Bobine App Repository</b></a> &nbsp;·&nbsp;
  <a href="README.fr.md"><b>Français</b></a>
</p>

---

## 1. Unified OpenPGP Signing Key

All packages, repositories, and release metadata on this mirror are cryptographically signed using the official Bobine OpenPGP key:
- **Public key file**: `https://packages.bobine.fit/bobine.gpg`
- **Fingerprint (SHA-1 / V4)**: `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- **Format**: OpenPGP binary key format compatible with APT, DNF (RPM), and Pacman.

```bash
# Verify signing key fingerprint
curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys
```

---

## 2. Debian & Ubuntu Family (APT Package Manager)

Native support for **Debian 12/13**, **Ubuntu 22.04/24.04 LTS**, **Linux Mint**, **Pop!_OS**, **Zorin OS**, and **Raspberry Pi OS** (x86_64 & aarch64).

```bash
# 1. Import signing key to official system keyring
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo tee /etc/apt/keyrings/bobine.gpg > /dev/null

# 2. Add Bobine repository (choose stable, beta, or canary)
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list

# 3. Update index and install
sudo apt update
sudo apt install bobine
```

---

## 3. Fedora & RPM Family (DNF Package Manager)

Full support for **Fedora 39/40/41**, **Nobara Linux**, **RHEL**, **AlmaLinux**, **Rocky Linux**, and **openSUSE** (x86_64 & aarch64).

```bash
# 1. Add repository definition file
sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-stable.repo

# 2. Install Bobine
sudo dnf install bobine
```

*Note for RHEL / AlmaLinux / Rocky Linux (dnf 4)*:
```bash
sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf install bobine
```

---

## 4. Arch Linux Family & Derivatives (Pacman Package Manager)

Full support for **Arch Linux**, **EndeavourOS**, **CachyOS**, and **Manjaro Linux** (x86_64 & aarch64).

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

## 5. Release Channels

- **Stable**: Production-ready, fully verified releases (`stable`).
- **Beta**: Feature batches curated and released in increments (`beta`).
- **Canary**: Bleeding-edge automatic builds triggered on every commit to `main` (`canary`).

---

## License

This repository and packaging configurations are licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Copyright (c) 2026 Bobine.
