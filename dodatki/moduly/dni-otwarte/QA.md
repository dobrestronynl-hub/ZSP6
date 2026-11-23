# Wykonane testy

Data testów lokalnych: 23.11.2026.

Raport dotyczy samodzielnej demonstracji sprawdzonej przed zebraniem modułów w repozytorium `Dodatki-ZSP6`. Jest zachowanym wynikiem konkretnej weryfikacji, a nie automatycznym raportem każdej późniejszej publikacji.

## Testy automatyczne

`node --test tests.mjs` oraz `node --check` dla plików MJS zakończone powodzeniem. Pełny wynik: [test-results.txt](test-results.txt).

## Testy przeglądarki

Chromium, podgląd HTTP. Sprawdzono rzeczywiste szerokości viewportu 360, 390, 768, 1024, 1440 i 1920 px, przy wysokości 820 px. Skalowano wyłącznie prezentację ramki. Wszystkie sześć układów bez poziomego przewijania dokumentu i z pojedynczym H1. [Pomiary](layout-results.json).

- Pobrano i odczytano dwa pliki ICS przez przycisk demonstracji.
- 10.12.2026 godz. 10:00 w Polsce: DTSTART:20261210T090000Z.
- 10.07.2027 godz. 10:00 w Polsce: DTSTART:20270710T080000Z.
- Pliki zawierały oznaczenie DEMO i informację o braku rezerwacji.

## Granice sprawdzenia

Nie wykonano pełnego audytu WCAG ani testów na fizycznych telefonach, Safari, Firefox, NVDA i VoiceOver. Testy są sprawdzeniem demonstracji lokalnej, nie integracji z backendem szkoły. Dostępność i działanie konkretnej wersji publicznej wymagają sprawdzenia po jej wdrożeniu. Ten raport dokumentuje wyłącznie wykonane testy lokalne.


[Scenariusze wspólne i granice testów](../../docs/TESTOWANIE.md)
