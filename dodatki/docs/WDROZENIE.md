# Wdrożenie podglądów dodatków ZSP6

## Źródło i miejsce publikacji

- Repozytorium źródłowe: `dobrestronynl-hub/Dodatki-ZSP6`.
- Katalog wynikowy: `dist/`, przygotowany przez `scripts/build.py`.
- Repozytorium hostujące: `dobrestronynl-hub/ZSP6`.
- Miejsce na kopię wynikową: `ZSP6/dodatki/`.
- Docelowy katalog podglądów: https://dobrestronynl-hub.github.io/ZSP6/dodatki/ .

Aktualny status publikacji oraz wyniki sprawdzenia są dostępne w [repozytorium źródłowym Dodatki-ZSP6](https://github.com/dobrestronynl-hub/Dodatki-ZSP6). Ten plik jest kopią instrukcji dostarczoną z pakietem publikacyjnym.

Repozytorium dodatków pozostaje oddzielne. Przechowuje kod do rozwijania, opisy funkcji, zakres wyceny oraz testy. Repozytorium ZSP6 przechowuje kopię wynikową potrzebną istniejącemu hostingowi GitHub Pages. Moduły są osobnymi stronami, a główne wizualizacje nie ładują ich w sidebarze.

## Przygotowanie pakietu

W katalogu głównym repozytorium `Dodatki-ZSP6`:

```bash
python3 scripts/check.py
python3 scripts/build.py
```

Kontrola musi zakończyć się powodzeniem. Build przygotowuje `dist/` z katalogiem dodatków, ośmioma modułami, zasobami oraz dokumentacją. Nie trzeba instalować pakietów npm ani zmieniać technologii projektu.

## Publikacja kopii wynikowej

1. Sprawdź aktualną gałąź `main` repozytorium `ZSP6` i ewentualne cudze zmiany. Zachowaj wszystkie niepowiązane pliki oraz główne wizualizacje.
2. Skopiuj **zawartość** `Dodatki-ZSP6/dist/` do katalogu `dodatki/` w checkoutcie repozytorium `ZSP6`. Wynik powinien zawierać `ZSP6/dodatki/index.html`, `ZSP6/dodatki/assets/`, `ZSP6/dodatki/moduly/` i `ZSP6/dodatki/docs/`. Nie twórz dodatkowego poziomu `dodatki/dist/`.
3. Sprawdź różnice. Aktualizuj tylko pakiet dodatków i ewentualną obsługę tego katalogu w istniejącym buildzie. Jeśli usunięto pliki źródłowe, usuń z kopii wynikowej wyłącznie ich rozpoznane, nieaktualne odpowiedniki.
4. Zapisz i wyślij zmiany do gałęzi `main` repozytorium `ZSP6`. Istniejące GitHub Pages publikujące katalog główny tej gałęzi udostępni również podkatalog `dodatki/`.
5. Poczekaj na zakończenie procesu `pages build and deployment` dla właściwego commita, a potem wykonaj kontrolę publicznych adresów.

Nie jest potrzebne włączenie GitHub Pages w repozytorium `Dodatki-ZSP6`. Workflow walidacyjny tego repozytorium nie synchronizuje automatycznie kodu z repozytorium hostującym. Po kolejnych zmianach trzeba ponownie sprawdzić źródła, zbudować pakiet i opublikować kopię wynikową.

## Kontrola po publikacji

Otwórz katalog dodatków i wszystkie osiem pozycji. Bezpośredni adres każdego modułu ma postać `https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/<nazwa>/index.html`.

Sprawdź:

- czy katalog i moduły otwierają interfejsy, a nie pliki źródłowe lub komunikat 404;
- czy logo, style i skrypty ładują się z poprawnych ścieżek;
- czy przycisk „Wróć do dodatków” otwiera wspólny katalog;
- czy wybór kierunku, filtry, lokalny zapis ustawień i podgląd szkicu działają;
- czy pliki TXT oraz ICS można pobrać;
- czy układ jest czytelny na małym ekranie i nie przewija się poziomo;
- czy główne wizualizacje nadal otwierają się pod dotychczasowymi adresami.

Szczegółowe scenariusze znajdują się w [instrukcji testowania](TESTOWANIE.md) i README poszczególnych modułów. Po sprawdzeniu zapisz rzeczywisty wynik i zaktualizuj status publikacji w README.

## Granice demonstracji

Publiczny hosting nie dodaje integracji z WordPressem, serwera, kont użytkowników ani usług wysyłki. Moduły zachowują opisany zakres demonstracyjny. Zaznaczenie checklisty nie składa wniosku, plik kalendarza nie rezerwuje miejsca, a szkic aktualności nie jest publikowany do CMS szkoły.
