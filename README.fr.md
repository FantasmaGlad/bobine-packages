<p align="center">
  <img src="https://raw.githubusercontent.com/FantasmaGlad/Bobine/main/Assets/Icons/os/linux.svg" width="96" height="96" alt="Linux">
</p>

<h1 align="center">bobine-packages</h1>

<p align="center">
  <b>Dépôts APT, DNF et Pacman signés pour Bobine et Bobine Deploy.</b>
</p>

<p align="center">
  <a href="https://packages.bobine.fit/fr/"><b>packages.bobine.fit</b></a> &nbsp;·&nbsp;
  <a href="https://packages.bobine.fit/bobine.gpg"><b>Clé de signature</b></a> &nbsp;·&nbsp;
  <a href="README.md"><b>English</b></a>
</p>

<p align="center">
  <a href="https://github.com/FantasmaGlad/bobine-packages/actions/workflows/verify-repo.yml"><img src="https://github.com/FantasmaGlad/bobine-packages/actions/workflows/verify-repo.yml/badge.svg?branch=main" alt="Verify"></a>
</p>

---

## Clé et canaux

- Clé de signature : https://packages.bobine.fit/bobine.gpg
- Empreinte : `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- Canaux : `stable`, `beta`, `canary` (remplacez `stable` dans les commandes ci-dessous)

## <img src="https://raw.githubusercontent.com/FantasmaGlad/Bobine/main/Assets/Icons/distros/debian.svg" width="20" height="20" valign="middle" alt="Debian"> Debian, Ubuntu (APT)

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg \
  | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] \
https://packages.bobine.fit/debian stable main" \
  | sudo tee /etc/apt/sources.list.d/bobine.list
sudo apt update && sudo apt install bobine
```

## <img src="https://raw.githubusercontent.com/FantasmaGlad/Bobine/main/Assets/Icons/distros/fedora.svg" width="20" height="20" valign="middle" alt="Fedora"> Fedora 41+, RHEL 10 (DNF 5)

```bash
repo=https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf config-manager addrepo --from-repofile="$repo"
sudo dnf install bobine
```

Fedora 39 et 40 (DNF 4) : `sudo dnf config-manager --add-repo "$repo"`.

## <img src="https://raw.githubusercontent.com/FantasmaGlad/Bobine/main/Assets/Icons/distros/arch.svg" width="20" height="20" valign="middle" alt="Arch Linux"> Arch Linux (pacman)

```bash
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A
```

Puis ajoutez à `/etc/pacman.conf` :

```ini
[bobine]
SigLevel = Required DatabaseOptional
Server = https://packages.bobine.fit/arch/stable/$arch
```

`sudo pacman -Syu bobine`. Bobine Deploy (installation à distance) est servi par les mêmes dépôts : remplacez `bobine` par `bobine-deploy`.

## Ce dépôt

- `index.html` et `fr/index.html` sont générés par `node scripts/build-portal.mjs` ; `node scripts/check-portal.mjs` les contrôle.
- Les paquets et leurs index signés sont sur la branche `gh-pages`, publiés par les workflows du dépôt Bobine.
- `.github/workflows/verify-repo.yml` vérifie la clé et les signatures, puis copie les pages du portail dans `gh-pages`.

---

Licence : consultation seule, tous droits réservés ([LICENSE](LICENSE)) · Sécurité : [SECURITY.md](SECURITY.md) · Contribuer : [CONTRIBUTING.md](CONTRIBUTING.md)

<sub>Dépôts liés : [Bobine](https://github.com/FantasmaGlad/Bobine) (application) · [bobine-deploy](https://github.com/FantasmaGlad/bobine-deploy) (installation à distance) · [BobineWeb](https://github.com/FantasmaGlad/BobineWeb) (site) · [homebrew-bobine](https://github.com/FantasmaGlad/homebrew-bobine) (tap Homebrew) · Politique de sécurité : [security.bobine.fit](https://security.bobine.fit/fr/), [`/.well-known/security.txt`](https://bobine.fit/.well-known/security.txt)</sub>
