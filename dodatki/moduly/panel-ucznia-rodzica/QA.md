# Wykonane testy

Data testów lokalnych: 23.11.2026.

Raport dotyczy samodzielnej demonstracji sprawdzonej przed zebraniem modułów w repozytorium `Dodatki-ZSP6`. Jest zachowanym wynikiem konkretnej weryfikacji, a nie automatycznym raportem każdej późniejszej publikacji.

## Testy automatyczne

`node --test tests.mjs` oraz `node --check` dla plików MJS zakończone powodzeniem. Pełny wynik: [test-results.txt](test-results.txt).

## Testy przeglądarki

Chromium, podgląd HTTP. Sprawdzono rzeczywiste szerokości viewportu 360, 390, 768, 1024, 1440 i 1920 px, przy wysokości 820 px. Skalowano wyłącznie prezentację ramki. Wszystkie sześć układów bez poziomego przewijania dokumentu i z pojedynczym H1. [Pomiary](layout-results.json).

- Wybrano rolę rodzica i przypięto rekrutację.
- Po przeładowaniu pozostały rola rodzica, stan przypięcia aria-pressed=true i licznik 1.

## Granice sprawdzenia

Nie wykonano pełnego audytu WCAG ani testów na fizycznych telefonach, Safari, Firefox, NVDA i VoiceOver. Testy są sprawdzeniem demonstracji lokalnej, nie integracji z backendem szkoły. Dostępność i działanie konkretnej wersji publicznej wymagają sprawdzenia po jej wdrożeniu. Ten raport dokumentuje wyłącznie wykonane testy lokalne.


[Scenariusze wspólne i granice testów](../../docs/TESTOWANIE.md)
