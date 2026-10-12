# Post SV - Volleyballübungen

Statische Website mit Volleyballübungen und fertigen Trainings für Abende ohne Trainer. Jedes Training folgt dem Aufbau **A Erwärmung → B Einspielen → C Übungen → D Spiel**; jede Übung hat Stichworte, Spielerzahl, Skizze und Ablauf.

## Lokal starten

Voraussetzung: Ruby und Bundler.

```sh
bundle install          # einmalig
bundle exec jekyll serve --baseurl "" --livereload
```

Dann http://localhost:4000 öffnen. Änderungen an Übungen werden automatisch neu gebaut (Änderungen an `_config.yml` brauchen einen Neustart).

## Inhalte pflegen

- Übungen: `_uebungen/*.md` (Vorlage: `_uebungen/_vorlage.md`)
- Fertige Trainings: `_trainings/*.md`
- Bausteine (A–D) und Stichworte: `_data/bloecke.yml`, `_data/stichworte.yml`
- Anleitung für Nutzer: `/anleitung/`, Anleitung zum Anlegen: `/neue-uebung/`

## Veröffentlichen auf GitHub Pages

`baseurl` in `_config.yml` ist auf `/post-sv_uebungen` gesetzt (GitHub-Projektseite). Lokal mit `--baseurl ""` starten, dann läuft die Seite unter `http://localhost:4000/`.

## Credits

Bilder - [Winston Schilling](https://www.instagram.com/notsniwgnillisch)  
Design - [HTML5 UP](https://html5up.net)  
Jekyll integration - [Andrew Banchich](https://github.com/andrewbanchich)
