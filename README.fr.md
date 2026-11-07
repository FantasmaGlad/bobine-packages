# packages.bobine.fit

Dépôts APT, DNF et Pacman signés pour [Bobine](https://github.com/FantasmaGlad/Bobine), en x86_64 et aarch64. English: [README.md](README.md).

- Clé de signature : https://packages.bobine.fit/bobine.gpg
- Empreinte : `B77D 96D7 2F84 F36A CAA3 F872 9CBF 497D 829E E15A`
- Canaux : `stable`, `beta`, `canary` (remplacez `stable` dans les commandes ci-dessous)

```bash
# Debian, Ubuntu (APT)
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo gpg --dearmor --yes -o /etc/apt/keyrings/bobine.gpg
echo "deb [signed-by=/etc/apt/keyrings/bobine.gpg] https://packages.bobine.fit/debian stable main" | sudo tee /etc/apt/sources.list.d/bobine.list
sudo apt update && sudo apt install bobine
```

```bash
# Fedora 41+, RHEL 10 (DNF 5)
sudo dnf config-manager addrepo --from-repofile=https://packages.bobine.fit/fedora/bobine-stable.repo
# Fedora 39 et 40 (DNF 4)
sudo dnf config-manager --add-repo https://packages.bobine.fit/fedora/bobine-stable.repo
sudo dnf install bobine
```

```bash
# Arch Linux (Pacman)
curl -fsSL https://packages.bobine.fit/bobine.gpg | sudo pacman-key --add -
sudo pacman-key --lsign-key B77D96D72F84F36ACAA3F8729CBF497D829EE15A
```

```ini
# /etc/pacman.conf, puis : sudo pacman -Syu bobine
[bobine]
SigLevel = Required DatabaseOptional
Server = https://packages.bobine.fit/arch/stable/$arch
```

## Ce dépôt

- `index.html` et `fr/index.html` sont générés par `node scripts/build-portal.mjs` ; `node scripts/check-portal.mjs` les contrôle.
- Les paquets et leurs index signés sont sur la branche `gh-pages`, publiés par les workflows du dépôt Bobine.
- `.github/workflows/verify-repo.yml` vérifie la clé et les signatures, puis copie les pages du portail dans `gh-pages`.

Licence : consultation seule, tous droits réservés (voir [LICENSE](LICENSE)). Les contributions vont à [Bobine](https://github.com/FantasmaGlad/Bobine) ([CONTRIBUTING.md](CONTRIBUTING.md)). Sécurité : [SECURITY.md](SECURITY.md).
