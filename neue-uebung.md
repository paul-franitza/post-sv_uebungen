---
layout: page
title: Neue Übung anlegen
permalink: /neue-uebung/
---

Du brauchst **kein Programmierwissen**. Eine Übung ist eine einzelne Textdatei. Du kopierst die Vorlage, füllst sie aus und speicherst sie im richtigen Ordner. Die Seite baut sich dann automatisch neu.

## Schritt für Schritt

1. **Vorlage kopieren.** Die Vorlage liegt im Ordner `_uebungen` und heißt `_vorlage.md`. Unten auf dieser Seite ist sie auch abgedruckt.
2. **Neue Datei anlegen** im Ordner `_uebungen`, zum Beispiel `annahme-dreieck.md`.
   Dateiname: nur Kleinbuchstaben, keine Umlaute, keine Leerzeichen (Bindestriche nehmen), Endung `.md`.
   Aus dem Dateinamen wird die Adresse der Seite: `/uebungen/annahme-dreieck/`.
3. **Kopf ausfüllen.** Der Teil zwischen den beiden `---`-Zeilen sind die Angaben, die auf der Karte und im Filter landen. Was die Felder bedeuten, steht als Kommentar (`#`) daneben.
4. **Text schreiben.** Unter dem zweiten `---` kommt die Beschreibung. Am besten mit den drei Überschriften **So geht's**, **Varianten**, **Tipps**. Schreib so, dass es jemand versteht, der die Übung noch nie gesehen hat. Kurze Sätze, nummerierte Schritte.
5. **Speichern und hochladen.** Direkt auf GitHub: Ordner `_uebungen` öffnen, „Add file" → „Create new file", Text einfügen, unten „Commit changes". Nach ein bis zwei Minuten ist die Übung online.

## Die Felder im Kopf

| Feld | Was reinkommt |
|---|---|
| `title` | Name der Übung, so wie er angezeigt wird |
| `block` | Einer von `erwaermung`, `einspielen`, `uebung`, `spiel` - das ist der Baustein A, B, C oder D |
| `kurz` | Ein Satz für die Karte in der Übersicht |
| `stichworte` | Liste in eckigen Klammern, z. B. `[annahme, zuspiel]`. Erlaubt sind: {% for s in site.data.stichworte %}`{{ s.key }}`{% unless forloop.last %}, {% endunless %}{% endfor %} |
| `spieler_min` / `spieler_max` | Mit wie vielen Leuten die Übung geht. Das nutzt der Filter „Wie viele seid ihr?" |
| `spieler_ideal` | Optional, z. B. `6–8` |
| `dauer` | Minuten, nur die Zahl |
| `trainer_spielt_mit` | `true`, wenn die Übung ohne jemanden von außen läuft. `false`, wenn einer anwerfen oder anschlagen muss |
| `material` | Optional: Bälle, Hütchen, Kasten … |
| `rollen` | Optional: Liste, wer gebraucht wird |
| `skizze` | Optional: die Skizze, siehe unten |
| `bild` | Optional: Pfad zu einem Foto, z. B. von der Tafel. Bild in `assets/post_images/` ablegen |

## Die Skizze

Die Skizze ist ein Blick von oben auf das Feld. Du gibst nur an, **wo** jemand steht - gezeichnet wird automatisch.

- **Koordinaten in Metern.** `x` geht von `0` (linke Grundlinie) bis `18` (rechte Grundlinie), das Netz ist bei `9`. `y` geht von `0` (obere Seitenlinie) bis `9` (untere Seitenlinie). Werte außerhalb sind erlaubt, z. B. `x: -0.8` für den Aufschläger hinter der Grundlinie.
- `ansicht: halb` zeigt nur die linke Feldhälfte (x von 0 bis 9), `ansicht: voll` das ganze Feld. Für Übungen auf einer Seite ist `halb` besser lesbar.
- `spieler`: ein Kreis pro Zeile. `name` ist der Buchstabe im Kreis (1 bis 2 Zeichen). `name: "T"` wird rot (Trainer/Anwerfer), `team: b` wird lila (anderes Team), `anzahl: 3` zeichnet eine Warteschlange aus drei Kreisen.
- `baelle`: gelbe Punkte.
- `pfeile`: `art: ball` ist ein gelber Pfeil (Ballweg), `art: lauf` ein gestrichelter (Laufweg). `von` und `bis` sind je `[x, y]`.
- `zonen`: gelb gestricheltes Rechteck mit `x`, `y` (linke obere Ecke), `breite`, `hoehe` und `name`.

Als Orientierung die Positionen 1 bis 6 auf der linken Seite: Position 1 (hinten rechts) ist etwa `{x: 2, y: 7.5}`, Position 6 (hinten Mitte) `{x: 2, y: 4.5}`, Position 5 (hinten links) `{x: 2, y: 1.5}`, Position 4 (vorne links) `{x: 7.5, y: 1.5}`, Position 3 (vorne Mitte) `{x: 7.5, y: 4.5}`, Position 2 (vorne rechts) `{x: 7.5, y: 7.5}`.

Zu kompliziert? Dann mach ein **Foto von der Tafel** und trag es unter `bild:` ein. Oder lass die Skizze weg - der Text ist wichtiger.

## Die Vorlage

Zum Kopieren. Alles hinter einem `#` ist nur Erklärung und kann gelöscht werden.

```yaml
{% capture vorlage %}{% include_relative _uebungen/_vorlage.md %}{% endcapture %}{{ vorlage }}
```

## Ein fertiges Training anlegen

Trainings liegen im Ordner `_trainings`. Sie bestehen nur aus einem Kopf mit dem Ablauf und einem kurzen Text. Unter `uebungen` stehen die **Dateinamen** der Übungen (ohne `.md`).

```yaml
---
title: Mein Training
kurz: Ein Satz, worum es geht.
spieler_min: 6
spieler_max: 12
dauer: 120
schwerpunkt: Annahme
ablauf:
  - block: erwaermung
    dauer: 15
    uebungen: [fangen-mit-pass]
  - block: einspielen
    dauer: 20
    uebungen: [pritschen-baggern]
  - block: uebung
    dauer: 50
    uebungen: [aufschlag-ziel, annahme-riegel, butterfly]
    hinweis: Je etwa 15 Minuten.
  - block: spiel
    dauer: 35
    uebungen: [koenigsball]
---

Hier ein paar Sätze, für wen das Training gedacht ist.
```

## Eine bestehende Übung ändern

Datei im Ordner `_uebungen` öffnen, auf den Stift (Bearbeiten) klicken, ändern, unten „Commit changes". Das war's. Kaputtmachen kann man nichts, was sich nicht rückgängig machen lässt.

## Neues Stichwort oder neuer Baustein

Die Stichworte stehen in `_data/stichworte.yml`, die Bausteine in `_data/bloecke.yml`. Dort einfach einen Eintrag nach dem gleichen Muster ergänzen.
