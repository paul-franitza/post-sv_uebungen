---
# Dateiname: nur Kleinbuchstaben, Bindestriche statt Leerzeichen, Endung .md
# z. B. _uebungen/annahme-dreieck.md  (dann heißt die Seite /uebungen/annahme-dreieck/)
title: Name der Übung
block: uebung                 # erwaermung | einspielen | uebung | spiel
kurz: Ein Satz, worum es geht - erscheint auf der Karte.
stichworte: [annahme, zuspiel] # siehe _data/stichworte.yml
spieler_min: 4
spieler_max: 12
spieler_ideal: 6–8            # optional
dauer: 15                     # Minuten, Richtwert
trainer_spielt_mit: true      # true = läuft ohne jemanden von außen, false = einer muss anwerfen/anschlagen
material: 4 Bälle, 2 Hütchen  # optional
rollen:                       # optional
  - 1 Zuspieler
  - 2 Annehmer
  - Rest schlägt auf
skizze:                       # optional, Koordinaten in Metern. x: 0–18 (Netz bei 9), y: 0–9
  ansicht: halb               # halb = nur eine Feldhälfte, voll = ganzes Feld
  spieler:
    - {x: 3, y: 4.5, name: "N"}          # Kreis mit Beschriftung. "T" = Trainer wird rot.
    - {x: 7.5, y: 3, name: "Z"}
    - {x: 0, y: 1, name: "A", anzahl: 3} # anzahl = mehrere Kreise (Warteschlange)
    - {x: 5, y: 7, name: "G", team: b}   # team: b = anderes Team (lila)
  baelle:
    - {x: 3.5, y: 4.5}
  pfeile:
    - {von: [3.5, 4.5], bis: [7, 3.2], art: ball}   # Ballweg (gelb)
    - {von: [3, 5], bis: [6, 7], art: lauf}          # Laufweg (gestrichelt)
  zonen:
    - {x: 6, y: 0, breite: 3, hoehe: 3, name: "Ziel"}  # Rechteck, z. B. Zielzone
  text: Kurze Erklärung zur Skizze.
# bild: assets/post_images/meine-uebung.jpg   # statt skizze geht auch ein Foto von der Tafel
---

## So geht's

1. Erster Schritt - wer steht wo.
2. Zweiter Schritt - was passiert mit dem Ball.
3. Dritter Schritt - wann wird gewechselt.

## Varianten

- Leichter: …
- Schwerer: …
- Bei wenig Leuten: …

## Tipps

- Worauf achten?
- Häufigster Fehler?
