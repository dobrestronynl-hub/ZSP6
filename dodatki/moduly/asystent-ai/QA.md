# Kontrola asystenta AI i aktualizacji katalogu

Data: 23.11.2026. Środowisko: Node.js, Python oraz Chromium. Dotyczy kodu asystenta i katalogu przygotowanych w tej zmianie.

## Wyniki lokalne

- `python3 scripts/check.py`: PASS, 9 stron HTML, 8 modułów, 98 odnośników lokalnych, 24 kontrole składni JavaScript.
- Testy Node: 32 PASS, 0 FAIL. W tym 22 testy logiki nowego asystenta.
- `python3 scripts/build.py`: PASS, statyczny pakiet przygotowany bez instalacji zależności.
- Układ sprawdzony w przeglądarce w szerokościach 360, 390, 768, 1024, 1440 i 1920 px. Trzy widoki: rozmowa, widżet na stronie, katalog dodatków. 18 sprawdzeń bez poziomego przewijania i elementów wychodzących poza szerokość. [Wyniki pomiarów](layout-results.json).
- Przegląd wizualny desktop oraz mobilnego iframe 390 px: czytelne teksty, pole pytania, przyciski, spójna identyfikacja szkoły. Poprawiono łamanie nagłówka i skrócono powitanie. [Podgląd widżetu](preview-desktop.jpg).

## Interakcje sprawdzone w przeglądarce

| Przypadek | Wynik |
| --- | --- |
| Pytanie startowe o grafikę i fotografię | Porównanie, źródła obu programów, odnośniki i następne pytania. |
| Fotografia, następnie „A jakie dokumenty?” | Zachowany kierunek fotografii i multimediów w odpowiedzi o rekrutacji. |
| Podpowiedź z wcześniejszej odpowiedzi po zmianie tematu | Korzysta z kontekstu odpowiedzi, do której należy. |
| Pytanie o kolejny dzień otwarty | Informacja o braku potwierdzonej daty; oficjalne ogłoszenia i kontakt. |
| Wpisanie fragmentu HTML w pytaniu | Wyświetlony zwykły tekst. Zero elementów obrazka utworzonych z treści użytkownika. |
| Pytanie spoza zakresu | Stan `unknown`, bez wymyślonej odpowiedzi. |
| Shift + Enter / Enter | Nowy wiersz bez wysłania / jedno wysłane pytanie. |
| Nowa rozmowa | Usunięte wiadomości i kontekst, eksport wyłączony do następnego pytania. |
| Pokaż na stronie | Ta sama rozmowa przeniesiona do okna przy podglądzie strony. |
| Escape i przycisk „Zapytaj szkołę” | Zamknięcie, poprawne `aria-expanded`, ponowne otwarcie i zachowanie wątku. |
| Zapisz rozmowę | Rzeczywisty TXT odczytany po pobraniu; treść rozmowy, oznaczenie demonstracji i oficjalne odnośniki. |
| Katalog | Osiem modułów, brak obu usuniętych sekcji i linków do edytora. |

Konsola aplikacji nie zgłosiła błędów podczas sprawdzenia. W logach środowiska pojawiały się komunikaty rozszerzenia przeglądarki, niezwiązane ze skryptami strony.

## Zakres i ograniczenia

To demonstracja lokalnej bazy odpowiedzi, bez modelu AI i zaplecza serwerowego. Testy dotyczą tej logiki i interfejsu. Nie są walidacją odpowiedzi modelu, formalnym audytem WCAG ani testem na fizycznym urządzeniu. Mobilny układ sprawdzono w responsywnym iframe przeglądarki, bez symulacji klawiatury systemu telefonu. Podgląd nie przechowuje rozmowy po odświeżeniu i nie aktualizuje automatycznie informacji szkoły.

Wynik publikacji na GitHub Pages jest dokumentowany osobno po wdrożeniu. Historyczny raport wcześniejszej publikacji katalogu nie jest wynikiem testów tej aktualizacji.
