# Wykonane testy

Data testów lokalnych: 23.11.2026.

Raport dotyczy samodzielnej demonstracji sprawdzonej przed zebraniem modułów w repozytorium `Dodatki-ZSP6`. Jest zachowanym wynikiem konkretnej weryfikacji, a nie automatycznym raportem każdej późniejszej publikacji.

## Testy automatyczne

`node --test tests.mjs` oraz `node --check` dla plików MJS zakończone powodzeniem. Pełny wynik: [test-results.txt](test-results.txt).

## Testy przeglądarki

Chromium, podgląd HTTP. Sprawdzono rzeczywiste szerokości viewportu 360, 390, 768, 1024, 1440 i 1920 px, przy wysokości 820 px. Skalowano wyłącznie prezentację ramki. Wszystkie sześć układów bez poziomego przewijania dokumentu i z pojedynczym H1. [Pomiary](layout-results.json).

- Zaznaczono dwa etapy w liceum: 2 z 5. Po zmianie na technikum i zaznaczeniu jednego etapu: 1 z 4.
- Po przeładowaniu zachowano 2 z 5 dla liceum. Reset liceum dał 0 z 5 i zachował 1 z 4 w technikum.
- Pobrano i odczytano TXT. Zawierał właściwą ścieżkę, dwa zaznaczone kroki i źródłowe odnośniki.

## Granice sprawdzenia

Nie wykonano pełnego audytu WCAG ani testów na fizycznych telefonach, Safari, Firefox, NVDA i VoiceOver. Testy są sprawdzeniem demonstracji lokalnej, nie integracji z backendem szkoły. Dostępność i działanie konkretnej wersji publicznej wymagają sprawdzenia po jej wdrożeniu. Ten raport dokumentuje wyłącznie wykonane testy lokalne.


[Scenariusze wspólne i granice testów](../../docs/TESTOWANIE.md)
