# packages.bobine.fit — Dépôts de Paquets Linux Bobine

<p align="center">
  <b>Dépôts officiels et signés pour toutes les distributions Linux prises en charge par Bobine.</b><br>
  <sub>Debian & Ubuntu (APT), Fedora & dérivés RPM (DNF), Arch Linux & dérivés (Pacman). Architectures x86_64 et aarch64 (ARM64).</sub>
</p>

<p align="center">
  <sub>#video #streaming #fitness #gym #digital-signage #media-player #self-hosted #open-source #automation #kiosk #offline-first #nextjs #rust #tauri #linux #cross-platform #display #appliance #framework</sub>
</p>

<p align="center">
  <a href="https://packages.bobine.fit"><b>Portail web des paquets</b></a> &nbsp;·&nbsp;
  <a href="https://bobine.fit"><b>Site officiel Bobine</b></a> &nbsp;·&nbsp;
  <a href="https://frame.work/"><b>Framework Laptop</b></a> &nbsp;·&nbsp;
  <a href="https://github.com/FantasmaGlad/Bobine"><b>Dépôt applicatif Bobine</b></a> &nbsp;·&nbsp;
  <a href="README.md"><b>English</b></a>
</p>

---

## 1. Clé de signature OpenPGP commune

Tous les paquets, dépôts et bases de données publiés sur ce miroir sont signés avec la clé OpenPGP officielle de Bobine :
- **Fichier de clé publique** : `https://packages.bobine.fit/bobine.gpg`
- **Empreinte SHA-1 / V4** : `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- **Format** : Binaire OpenPGP compatible APT, DNF (RPM) et Pacman.

```bash
# Vérification de l'empreinte de la clé
curl -fsSL https://packages.bobine.fit/bobine.gpg | gpg --show-keys
```

---

## 2. Famille Debian & Ubuntu (Gestionnaire APT)

Prise en charge native de **Debian 12/13**, **Ubuntu 22.04/24.04 LTS**, **Linux Mint**, **Pop!_OS**, **Zorin OS** et **Raspberry Pi OS** (x86_64 et aarch64).

```bash
# 1. Importer la clé de signature dans le trousseau de clés officiel
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo tee /etc/apt/keyrings/bobine.gpg > /dev/null

# 2. Ajouter le dépôt Bobine (choisir stable, beta ou canary)
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list

# 3. Mettre à jour et installer
sudo apt update
sudo apt install bobine
```

---

## 3. Famille Fedora & Dérivés RPM (Gestionnaire DNF)

Prise en charge de **Fedora 39/40/41**, **Nobara Linux**, **RHEL**, **AlmaLinux**, **Rocky Linux** et **openSUSE** (x86_64 et aarch64).

```bash
# 1. Ajouter le fichier de configuration du dépôt
sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-stable.repo

# 2. Installer Bobine
sudo dnf install bobine
```

*Note pour RHEL / AlmaLinux / Rocky Linux (dnf 4)* :
```bash
sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf install bobine
```

---

## 4. Famille Arch Linux & Dérivés (Gestionnaire Pacman)

Prise en charge de **Arch Linux**, **EndeavourOS**, **CachyOS** et **Manjaro Linux** (x86_64 et aarch64).

```bash
# 1. Importer et signer la clé dans pacman
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A

# 2. Ajouter la section dans /etc/pacman.conf
sudo tee -a /etc/pacman.conf << 'EOF'

[bobine]
SigLevel = Required DatabaseOptional
Server = https://packages.bobine.fit/arch/stable/$arch
EOF

# 3. Synchroniser les bases et installer
sudo pacman -Sy bobine
```

---

## 5. Canaux de publication

- **Stable** : Versions de production durcies et auditées (`stable`).
- **Bêta** : Fonctionnalités validées par lots (`beta`).
- **Canary** : Reconstruit en continu à chaque commit sur `main` (`canary`).

---

## Licence

Ce dépôt et ses configurations sont distribués sous licence **GNU Affero General Public License v3.0 (AGPL-3.0)**.
Copyright (c) 2026 Bobine.
