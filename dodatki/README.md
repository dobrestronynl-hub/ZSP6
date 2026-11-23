# Dodatki ZSP6

Osiem działających demonstracji funkcjonalności dla Zespołu Szkół Ponadpodstawowych nr 6 w Tomaszowie Mazowieckim. Projekt służy wspólnemu sprawdzeniu pomysłów i ustaleniu zakresu wdrożenia oraz wyceny. Każdy moduł ma osobną stronę, opis zastosowania, instrukcję testowania i własne testy logiki.

Wszystkie demonstracje są w jednym repozytorium `Dodatki-ZSP6`. Katalogi `moduly/<nazwa>` zawierają samodzielny HTML, CSS, JavaScript i logo. Można je rozwijać, wyceniać i przenosić oddzielnie. Nie wymagają kodu głównych wizualizacji ani pozostałych modułów. W głównej wizualizacji ZSP6 dodatki nie są już prezentowane w sidebarze.

## Podgląd dodatków

[Katalog interaktywnych dodatków](https://dobrestronynl-hub.github.io/ZSP6/dodatki/)

Bieżący status publikacji i aktualna dokumentacja są utrzymywane w [repozytorium źródłowym Dodatki-ZSP6](https://github.com/dobrestronynl-hub/Dodatki-ZSP6). Ten katalog zawiera pakiet przeznaczony do hostingu.

Kod źródłowy i dokumentację utrzymujemy w osobnym repozytorium `Dodatki-ZSP6`. Gotowy pakiet statyczny trafia do katalogu `dodatki/` w repozytorium `ZSP6` i korzysta z jego istniejącej publikacji GitHub Pages. Dodatki otwierają się jako niezależne strony. Nie są wczytywane w sidebarze głównych wizualizacji.

## Wybierz funkcjonalność

| Moduł | Do czego służy | Pliki i dokumentacja |
| --- | --- | --- |
| Asystent wyboru kierunku | Prowadzi od zainteresowania do konkretnej oferty i zasad rekrutacji. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/asystent-kierunku/index.html) · [Opis i testy](moduly/asystent-kierunku/README.md) |
| Osobista checklista rekrutacji | Porządkuje kroki, zapamiętuje postęp dla obu szkół i eksportuje listę. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/checklista-rekrutacji/index.html) · [Opis i testy](moduly/checklista-rekrutacji/README.md) |
| Dni otwarte i spotkania | Pokazuje termin oraz pobiera plik ICS do osobistego kalendarza. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/dni-otwarte/index.html) · [Opis i testy](moduly/dni-otwarte/README.md) |
| Biblioteka dokumentów | Wyszukuje rzeczywiste materiały szkoły i filtruje je według odbiorcy. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/biblioteka-dokumentow/index.html) · [Opis i testy](moduly/biblioteka-dokumentow/README.md) |
| Portfolio uczniów | Filtruje prace według dziedziny i udostępnia powiększony podgląd. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/portfolio-uczniow/index.html) · [Opis i testy](moduly/portfolio-uczniow/README.md) |
| Panel ucznia i rodzica | Dostosowuje skróty do roli i pozwala przypinać potrzebne odnośniki. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/panel-ucznia-rodzica/index.html) · [Opis i testy](moduly/panel-ucznia-rodzica/README.md) |
| Sprawy sekretariatu | Wyjaśnia, jak przygotować się do wybranej sprawy, i pobiera instrukcję. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/sprawy-sekretariatu/index.html) · [Opis i testy](moduly/sprawy-sekretariatu/README.md) |
| Edytor aktualności | Pokazuje podgląd wpisu i eksportuje szkic do korekty. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/edytor-aktualnosci/index.html) · [Opis i testy](moduly/edytor-aktualnosci/README.md) |

Odnośniki „Otwórz demonstrację” prowadzą bezpośrednio do interfejsów pod ich docelowymi adresami publikacji. Odnośniki „Opis i testy” prowadzą do dokumentacji w repozytorium. Strona `index.html` jest wspólnym spisem funkcjonalności, a każdy moduł ma przycisk powrotu do katalogu.

## Jak ocenić zakres i wycenę

Najpierw otwórz moduł, wykonaj instrukcję „Przetestuj sam” i sprawdź, czy rozwiązuje rzeczywistą potrzebę szkoły. Następnie ustal, czy potrzebna jest tylko funkcja widoczna w demonstracji, czy także panel edycji, konta, powiadomienia lub połączenia z innymi systemami.

[Zakres do wyceny](docs/ZAKRES-WYCENY.md) opisuje dla każdego modułu działanie, korzyści, wymagania wdrożenia i rozszerzenia. Nie zawiera automatycznie naliczanych ani przykładowych cen. [Instrukcja testowania](docs/TESTOWANIE.md) zbiera scenariusze z oczekiwanymi wynikami.

## Uruchomienie lokalne

Projekt jest statyczny. Podgląd wymaga serwera HTTP, ponieważ interakcje używają modułów JavaScript. Nie wymaga instalacji pakietów npm, bazy danych ani frameworka.

Z katalogu głównego repozytorium:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`. Aby uruchomić tylko jeden moduł, wykonaj tę samą komendę w jego katalogu, na przykład `moduly/asystent-kierunku`. Wtedy moduł otworzy się pod głównym adresem serwera. Odnośnik do wspólnego katalogu dodatków wymaga publikacji całego repozytorium.

## Kontrola i przygotowanie publikacji

W katalogu głównym, z dostępnym Pythonem 3 oraz Node.js obsługującym `node:test`:

```bash
node --test moduly/*/tests.mjs
python3 scripts/check.py
python3 scripts/build.py
```

Pierwsza komenda uruchamia testy logiki wszystkich ośmiu modułów. Kontrola projektu sprawdza strukturę i zależności statyczne, a build przygotowuje katalog `dist/` do publikacji. Komendy nie tworzą kont szkolnych, nie wysyłają wiadomości i nie zapisują danych kandydatów na serwerze.

W każdym module dostępne są `QA.md`, `test-results.txt` i `layout-results.json`. Zawierają wcześniejsze wyniki lokalnego sprawdzenia z 23.11.2026: osiem zestawów testów logiki, główne interakcje i 48 kontroli układu w Chromium. Te raporty nie są potwierdzeniem dostępności dowolnej późniejszej wersji opublikowanej na GitHub Pages. Publikowaną wersję należy sprawdzić po wdrożeniu.

[Raport integracji nowego katalogu](docs/QA-INTEGRACJA.md) zawiera aktualne sprawdzenie dziewięciu stron, nawigacji, sześciu szerokości katalogu i wszystkich ośmiu modułów na małym ekranie, wraz z pomiarami i podglądem.

## Publikacja w GitHub Pages

Repozytorium `Dodatki-ZSP6` pozostaje źródłem kodu, dokumentacji i testów. Po kontroli oraz wykonaniu `python3 scripts/build.py` zawartość `dist/` jest kopiowana do `dodatki/` w repozytorium `ZSP6`. Jego istniejący proces GitHub Pages publikuje katalog pod adresem `https://dobrestronynl-hub.github.io/ZSP6/dodatki/`.

Ten sposób publikacji nie wymaga włączania GitHub Pages dla `Dodatki-ZSP6`. W katalogu `ZSP6/dodatki/` znajduje się kopia wynikowa do hostingu. Zmiany funkcjonalności należy wprowadzać w repozytorium źródłowym, a następnie ponownie przygotować i opublikować pakiet.

Workflow `Sprawdzenie dodatkow ZSP6` sprawdza pliki, odnośniki, składnię, logikę i build po zmianach w `main` oraz w pull requestach. Nie publikuje samodzielnie kopii w drugim repozytorium. [Instrukcja wdrożenia](docs/WDROZENIE.md) opisuje kolejność pracy i kontrolę po publikacji.

Status bieżącego wdrożenia pozostaje oznaczony powyżej. Sam zapis plików w repozytorium albo zielony wynik testów nie potwierdza jeszcze dostępności publicznego podglądu.

## Co działa lokalnie, a co wymaga integracji

Wyszukiwanie, filtrowanie, dobór kierunku, podgląd wpisu oraz eksporty TXT i ICS działają w przeglądarce. Checklista i panel skrótów mogą zapisywać ustawienia w `localStorage`; nie synchronizują ich między urządzeniami. Zewnętrzne materiały otwierają rzeczywiste źródła szkoły.

Demonstracje nie składają wniosków, nie rezerwują miejsc, nie zakładają kont, nie wysyłają formularzy i nie publikują wpisów. Funkcje wymagające tych działań są opisane w zakresie docelowego wdrożenia. Materiały przykładowe są oznaczone jako demonstracyjne. Strony mają `noindex,nofollow`.

## Materiały i utrzymanie

Logo pochodzi z materiałów przekazanych do projektu ZSP6. Informacje i odnośniki stanowią migawkę materiałów szkoły sprawdzonych podczas przygotowania projektu 23.11.2026. Nie ma automatycznej synchronizacji z oficjalną witryną. Źródła i ograniczenia są opisane w README modułów oraz, tam gdzie występuje katalog materiałów, w `SOURCES.md`.

Fotografie portfolio są ładowane z serwera szkoły. Przed docelową publikacją należy uzgodnić prawo do wykorzystania materiałów, podpisy i zakres zgód. Projekt nie stwierdza uzyskania takich zgód.

[Główne wizualizacje ZSP6](https://dobrestronynl-hub.github.io/ZSP6/) · [Oficjalna strona szkoły](https://zsp6tom.pl/)
