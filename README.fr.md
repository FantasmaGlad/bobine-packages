# packages.bobine.fit — Dépôts Officiels de Paquets Linux Bobine

<p align="center">
  <img src="logo_bobine_entier.png" alt="Bobine" width="220"><br><br>
  <b>Dépôts officiels signés cryptographiquement pour toutes les distributions Linux prises en charge par Bobine.</b><br>
  <sub>Debian &amp; Ubuntu (APT), Fedora &amp; dérivés RPM (DNF), Arch Linux &amp; dérivés (Pacman) — Architectures natives x86_64 et aarch64 (ARM64).</sub>
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
  <a href="https://packages.bobine.fit/fr/"><b>Portail Web des Paquets</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/fr"><b>Site Officiel Bobine</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/fr/linux"><b>Vitrine Linux</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit/fr/ordinateur"><b>PC &amp; Processeurs</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/FantasmaGlad/Bobine"><b>Dépôt Source Bobine</b></a> &nbsp;·&nbsp;
  <a href="README.md"><b>English</b></a>
</p>

---

## 1. Clé de Signature OpenPGP Commune

Tous les paquets, index de dépôts (`InRelease`, `repomd.xml.asc`, `bobine.db.sig`) et métadonnées publiés sur `packages.bobine.fit` sont signés avec la clé officielle OpenPGP RSA 4096 bits de Bobine :

- **Fichier de clé publique** : `https://packages.bobine.fit/bobine.gpg`
- **Empreinte SHA-1 / V4** : `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- **Format** : Binaire OpenPGP compatible APT, DNF (RPM) et Pacman.

```bash
# Vérification de l'empreinte de la clé
curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys
```

---

## 2. Famille Debian & Ubuntu (Gestionnaire APT — `.deb`)

<p>
  <img src="icons/distros/debian.svg" width="16" height="16" alt=""> <b>Debian 12 / 13</b> &nbsp;·&nbsp;
  <img src="icons/distros/ubuntu.svg" width="16" height="16" alt=""> <b>Ubuntu 22.04 / 24.04 LTS</b> &nbsp;·&nbsp;
  <img src="icons/distros/linuxmint.svg" width="16" height="16" alt=""> <b>Linux Mint 21 / 22</b> &nbsp;·&nbsp;
  <img src="icons/distros/popos.svg" width="16" height="16" alt=""> <b>Pop!_OS</b> &nbsp;·&nbsp;
  <img src="icons/distros/zorin.svg" width="16" height="16" alt=""> <b>Zorin OS</b> &nbsp;·&nbsp;
  <img src="icons/distros/raspberrypi.svg" width="16" height="16" alt=""> <b>Raspberry Pi OS</b>
</p>

```bash
# 1. Importer la clé de signature dans le trousseau système officiel
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo tee /etc/apt/keyrings/bobine.gpg > /dev/null

# 2. Ajouter le dépôt APT Bobine (choisir stable, beta ou canary)
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list

# 3. Mettre à jour et installer
sudo apt update && sudo apt install bobine
```

---

## 3. Famille Fedora & Enterprise Linux (Gestionnaire DNF — `.rpm`)

<p>
  <img src="icons/distros/fedora.svg" width="16" height="16" alt=""> <b>Fedora 39 / 40 / 41+</b> &nbsp;·&nbsp;
  <img src="icons/distros/nobara.svg" width="16" height="16" alt=""> <b>Nobara Linux</b> &nbsp;·&nbsp;
  <img src="icons/distros/rhel.svg" width="16" height="16" alt=""> <b>RHEL 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/almalinux.svg" width="16" height="16" alt=""> <b>AlmaLinux 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/rockylinux.svg" width="16" height="16" alt=""> <b>Rocky Linux 9</b> &nbsp;·&nbsp;
  <img src="icons/distros/opensuse.svg" width="16" height="16" alt=""> <b>openSUSE</b>
</p>

```bash
# 1. Ajouter le fichier de dépôt (Fedora 41+ / DNF 5)
sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-stable.repo

# 2. Installer Bobine
sudo dnf install bobine
```

*Pour Fedora 39/40, RHEL 9, AlmaLinux 9 et Rocky Linux 9 (DNF 4)* :
```bash
sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf install bobine
```

---

## 4. Famille Arch Linux & Dérivés (Gestionnaire Pacman — `.pkg.tar.zst`)

<p>
  <img src="icons/distros/arch.svg" width="16" height="16" alt=""> <b>Arch Linux</b> &nbsp;·&nbsp;
  <img src="icons/distros/endeavouros.svg" width="16" height="16" alt=""> <b>EndeavourOS</b> &nbsp;·&nbsp;
  <img src="icons/distros/cachyos.svg" width="16" height="16" alt=""> <b>CachyOS</b> &nbsp;·&nbsp;
  <img src="icons/distros/manjaro.svg" width="16" height="16" alt=""> <b>Manjaro Linux</b>
</p>

```bash
# 1. Importer et signer localement la clé dans pacman
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A

# 2. Ajouter la section [bobine] dans /etc/pacman.conf
sudo tee -a /etc/pacman.conf << 'EOF'

[bobine]
SigLevel = Required DatabaseOptional
Server = https://packages.bobine.fit/arch/stable/$arch
EOF

# 3. Synchroniser les bases et installer
sudo pacman -Sy bobine
```

---

## 5. Processeurs, Puces (SoC) & Matériels Pris en Charge

| Architecture | Familles de Processeurs & Puces | Appareils de Référence & Accélération Vidéo |
| :--- | :--- | :--- |
| **`x86_64` (`amd64`)** | <img src="icons/chips/intel.svg" width="14" height="14" alt=""> **Intel** : Core Ultra (Séries 1 & 2), Core i3–i9 (8e–14e gén.), Processor **N100 / N200 / N95 / N305**, Celeron **J4105 / J4125 / N5105**<br><img src="icons/chips/amd.svg" width="14" height="14" alt=""> **AMD** : **Ryzen 5000 / 6000 / 7000 / 8000 / AI 300** (Zen 3, Zen 4, Zen 5) | Dell Wyse 5070 Thin Client, Beelink Mini S12 Pro / SER5 / SER8, Minisforum UN100 / UM780, Framework Laptop 13 & 16, Intel/ASUS NUC, HP EliteDesk Mini.<br>*Décodage matériel : Intel QuickSync VA-API (`iHD`/`i965`), AMD Radeon VA-API (`radeonsi`), NVIDIA NVDEC.* |
| **`aarch64` (`arm64`)** | <img src="icons/chips/snapdragon.svg" width="14" height="14" alt=""> **Qualcomm Snapdragon** : **Snapdragon X Elite** (`X1E`), **Snapdragon X Plus** (`X1P`), **Snapdragon 8 Gen 2** (`SM8550`), **Snapdragon 8 Gen 3** (`SM8650`), **Snapdragon 8 Elite** (`SM8750`)<br><img src="icons/os/apple.svg" width="14" height="14" alt=""> **Apple Silicon** : **M1, M2, M3, M4** (Pro / Max / Ultra)<br><img src="icons/distros/raspberrypi.svg" width="14" height="14" alt=""> **Broadcom / Rockchip / NVIDIA / MediaTek / Tensor** : BCM2712, RK3588, Grace Blackwell GB10, Jetson Orin, Dimensity 9300+, Tensor G2–G4 | Lenovo ThinkPad T14s Gen 6, Yoga Slim 7x, Surface Laptop 7, Samsung Galaxy Tab S9 / S9 Ultra, Xiaomi Pad 6S Pro, Apple Mac mini / MacBook (Asahi Linux / VM / macOS), Raspberry Pi 5 (8 Go), Orange Pi 5, Radxa Rock 5B, NVIDIA DGX Spark.<br>*Décodage matériel : V4L2, VA-API, VideoToolbox, MediaCodec.* |

---

## 6. Canaux de Publication

- **Stable (`stable`)** : Versions de production auditées et recommandées pour l'exploitation 24/7 en salle.
- **Bêta (`beta`)** : Lots de fonctionnalités et correctifs validés par paliers.
- **Canary (`canary`)** : Reconstruit en continu automatiquement à chaque push sur `main`.

---

## Licence

Ce dépôt et ses configurations de paquets sont distribués sous licence **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Copyright (c) 2026 Bobine.
