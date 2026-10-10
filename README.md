# Reszta

Prosta aplikacja do wydawania reszty, pilnowania stanu kasy i liczenia napiwków. Działa na telefonie, także bez internetu.

## Co potrafi
- Liczy resztę i pokazuje, ile banknotów i monet wydać.
- Pilnuje stanu kasy (ilość każdego nominału) i ostrzega, gdy drobnych jest mało.
- Zapisuje napiwki i podlicza je za dziś, 7 dni i łącznie.
- Eksportuje dane (udostępnianie albo plik CSV).

## Prywatność
Wszystkie dane (kasa, napiwki) są zapisane tylko w pamięci telefonu. Aplikacja nie wysyła nic na serwery.

## Pliki
- `index.html`: cała aplikacja
- `manifest.webmanifest`, ikony: instalacja jako aplikacja
- `sw.js`: tryb offline

## Aktualizacja
Wystarczy podmienić `index.html` (i `sw.js`) w repozytorium. Telefon pobierze nową wersję przy następnym uruchomieniu z internetem.
