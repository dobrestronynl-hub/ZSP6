# Weryfikacja publicznych demonstracji

Data: 23.11.2026. Chromium, publiczne adresy GitHub Pages.

[Katalog dodatków](https://dobrestronynl-hub.github.io/ZSP6/dodatki/) otwiera osiem niezależnych stron. Każda ma interfejs demonstracyjny, opis zastosowania, korzyści i instrukcję testowania.

Publikacja repozytorium ZSP6: commit `e0a853c3eb9b427583e27756a99d02eb8e659df1`. [Proces GitHub Pages](https://github.com/dobrestronynl-hub/ZSP6/actions/runs/45134963742) zakończył się wynikiem success. Kod modułów jest utrzymywany osobno w Dodatki-ZSP6. W ZSP6/dodatki opublikowano pakiet statyczny, bez przywracania sidebaru.

## Wykonane sprawdzenia online

| Moduł | Wykonana próba | Wynik |
| --- | --- | --- |
| Asystent kierunku | Fotografia i rekrutacja | Technik fotografii i multimediów, odnośnik do oficjalnych zasad. |
| Checklista | Odznaczenie kroku i przeładowanie | Postęp 1 z 5 zachowany. Własne zaznaczenie testowe cofnięte. |
| Dni otwarte | Data 10.12.2026, 10:00, 60 minut; pobranie ICS | Podgląd 10:00–11:00; plik zawiera DTSTART:20261210T090000Z i oznaczenie DEMO. |
| Dokumenty | Wyszukanie maloletnich | Jeden właściwy wynik spośród ośmiu materiałów. |
| Portfolio | Filtr fotografii, powiększenie i następna praca | Dwie fotografie, przejście 1 z 2 na 2 z 2, zamknięcie klawiszem Escape. Obrazy załadowane. |
| Panel | Rola rodzica, przypięcie rekrutacji, przeładowanie | Rola i przypięcie zachowane. Stan sprzed próby przywrócony. |
| Sekretariat | Wybór duplikatu świadectwa i eksport TXT | Właściwa instrukcja i odpowiadająca jej treść pobranego pliku. |
| Edytor | Zmiana tytułu i treści, podgląd, pobranie TXT | Podgląd i plik zgodne. HTML pozostał tekstem. Pusty tytuł blokował pobieranie. Przywrócono przykład. |

Dodatkowo pobrano i odczytano dokument zakresu wyceny z katalogu publicznego. Obie wizualizacje głównej strony otwierają się prawidłowo, mają prosty krój nagłówków hero i nie zawierają usuniętego sidebaru.

[Zapis wyników z przeglądarki](qa/publication-results.json)

## Zakres i ograniczenia

Sprawdzenie dotyczy demonstracji w przeglądarce, nie integracji z backendem szkoły. Nie wykonano pełnego audytu WCAG ani testów we wszystkich przeglądarkach i na fizycznych telefonach. Wcześniejsze pomiary sześciu szerokości oraz wyniki automatyczne zachowano w raportach integracji i dokumentacji modułów.
