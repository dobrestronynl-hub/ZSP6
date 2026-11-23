# Dodatki ZSP6

Osiem interaktywnych demonstracji funkcjonalności dla Zespołu Szkół Ponadpodstawowych nr 6 w Tomaszowie Mazowieckim. Projekt pozwala otworzyć każdy dodatek, sprawdzić jego zastosowanie i wybrać rozwiązania przydatne szkole. Każdy moduł ma osobną stronę, opis zastosowania, instrukcję testowania i własne testy logiki.

Wszystkie demonstracje są w jednym repozytorium `Dodatki-ZSP6`. Katalogi `moduly/<nazwa>` zawierają samodzielny HTML, CSS, JavaScript i logo. Można je rozwijać, wyceniać i przenosić oddzielnie. Nie wymagają kodu głównych wizualizacji ani pozostałych modułów. W głównej wizualizacji ZSP6 dodatki nie są już prezentowane w sidebarze.

## Podgląd dodatków

[Katalog interaktywnych dodatków](https://dobrestronynl-hub.github.io/ZSP6/dodatki/)

Bieżący zestaw obejmuje asystenta AI oraz siedem pozostałych dodatków. Edytor aktualności został usunięty. Aktualny wynik publikacji jest utrzymywany w [repozytorium źródłowym Dodatki-ZSP6](https://github.com/dobrestronynl-hub/Dodatki-ZSP6).

Kod źródłowy i dokumentację utrzymujemy w osobnym repozytorium `Dodatki-ZSP6`. Gotowy pakiet statyczny trafia do katalogu `dodatki/` w repozytorium `ZSP6` i korzysta z jego istniejącej publikacji GitHub Pages. Dodatki otwierają się jako niezależne strony. Nie są wczytywane w sidebarze głównych wizualizacji.

## Wybierz funkcjonalność

| Moduł | Do czego służy | Pliki i dokumentacja |
| --- | --- | --- |
| Asystent AI szkoły | Pokazuje rozmowę o kierunkach, rekrutacji, dokumentach i codziennych sprawach, z odnośnikami do źródeł szkoły. | [Otwórz wizualizację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/asystent-ai/index.html) · [Opis i testy](moduly/asystent-ai/README.md) |
| Asystent wyboru kierunku | Prowadzi od zainteresowania do konkretnej oferty i zasad rekrutacji. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/asystent-kierunku/index.html) · [Opis i testy](moduly/asystent-kierunku/README.md) |
| Osobista checklista rekrutacji | Porządkuje kroki, zapamiętuje postęp dla obu szkół i eksportuje listę. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/checklista-rekrutacji/index.html) · [Opis i testy](moduly/checklista-rekrutacji/README.md) |
| Dni otwarte i spotkania | Pokazuje termin oraz pobiera plik ICS do osobistego kalendarza. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/dni-otwarte/index.html) · [Opis i testy](moduly/dni-otwarte/README.md) |
| Biblioteka dokumentów | Wyszukuje rzeczywiste materiały szkoły i filtruje je według odbiorcy. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/biblioteka-dokumentow/index.html) · [Opis i testy](moduly/biblioteka-dokumentow/README.md) |
| Portfolio uczniów | Filtruje prace według dziedziny i udostępnia powiększony podgląd. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/portfolio-uczniow/index.html) · [Opis i testy](moduly/portfolio-uczniow/README.md) |
| Panel ucznia i rodzica | Dostosowuje skróty do roli i pozwala przypinać potrzebne odnośniki. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/panel-ucznia-rodzica/index.html) · [Opis i testy](moduly/panel-ucznia-rodzica/README.md) |
| Sprawy sekretariatu | Wyjaśnia, jak przygotować się do wybranej sprawy, i pobiera instrukcję. | [Otwórz demonstrację](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/sprawy-sekretariatu/index.html) · [Opis i testy](moduly/sprawy-sekretariatu/README.md) |

Odnośniki „Otwórz demonstrację” prowadzą bezpośrednio do interfejsów pod ich docelowymi adresami publikacji. Odnośniki „Opis i testy” prowadzą do dokumentacji w repozytorium. Strona `index.html` jest wspólnym spisem funkcjonalności, a każdy moduł ma przycisk powrotu do katalogu.

## Jak ocenić funkcjonalności

Otwórz moduł i przejdź scenariusz opisany w jego instrukcji testowania. Sprawdź, czy ułatwia znalezienie informacji lub wykonanie konkretnej czynności. Dokumentacja odróżnia działanie demonstracji od przyszłych integracji z systemami szkoły.

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

Pliki `QA.md`, `test-results.txt` i `layout-results.json` w dotychczasowych modułach zawierają wcześniejsze wyniki lokalnego sprawdzenia z 23.11.2026. Historyczna weryfikacja obejmowała osiem ówczesnych modułów i 48 kontroli układu w Chromium. Nie obejmuje nowego asystenta AI. Bieżący [raport kontroli asystenta i katalogu](moduly/asystent-ai/QA.md) obejmuje 32 zaliczone testy automatyczne (w tym 22 asystenta), 18 kontroli układu oraz interakcje w przeglądarce. Scenariusze znajdują się w [README modułu](moduly/asystent-ai/README.md). Publikowaną wersję należy sprawdzić po wdrożeniu.

[Historyczny raport integracji katalogu](docs/QA-INTEGRACJA.md) dokumentuje dziewięć stron, nawigację, sześć szerokości katalogu i osiem ówczesnych modułów na małym ekranie. Po zmianie zestawu dodatków potrzebna jest osobna kontrola nowej wersji.

## Publikacja w GitHub Pages

Repozytorium `Dodatki-ZSP6` pozostaje źródłem kodu, dokumentacji i testów. Po kontroli oraz wykonaniu `python3 scripts/build.py` zawartość `dist/` jest kopiowana do `dodatki/` w repozytorium `ZSP6`. Jego istniejący proces GitHub Pages publikuje katalog pod adresem `https://dobrestronynl-hub.github.io/ZSP6/dodatki/`.

Ten sposób publikacji nie wymaga włączania GitHub Pages dla `Dodatki-ZSP6`. W katalogu `ZSP6/dodatki/` znajduje się kopia wynikowa do hostingu. Zmiany funkcjonalności należy wprowadzać w repozytorium źródłowym, a następnie ponownie przygotować i opublikować pakiet.

Workflow `Sprawdzenie dodatkow ZSP6` sprawdza pliki, odnośniki, składnię, logikę i build po zmianach w `main` oraz w pull requestach. Nie publikuje samodzielnie kopii w drugim repozytorium. [Instrukcja wdrożenia](docs/WDROZENIE.md) opisuje kolejność pracy i kontrolę po publikacji.

Sam zapis plików w repozytorium albo wynik testów lokalnych nie potwierdza dostępności konkretnej wersji publicznego podglądu. Weryfikacja po publikacji obejmuje także nowe adresy i usunięcie wycofanych modułów.

## Co działa lokalnie, a co wymaga integracji

Wyszukiwanie, filtrowanie, dobór kierunku, demonstracyjna rozmowa asystenta oraz eksporty TXT i ICS działają w przeglądarce. Asystenta można sprawdzić także jako otwierany panel przy podglądzie strony i zapisać rozmowę do TXT. Checklista i panel skrótów mogą zapisywać ustawienia w `localStorage`; nie synchronizują ich między urządzeniami. Zewnętrzne materiały otwierają rzeczywiste źródła szkoły.

Asystent AI pokazuje interfejs rozmowy i odpowiedzi z przygotowanej lokalnej bazy. W tej demonstracji nie ma połączenia z modelem AI, serwerem rozmów ani bieżącą indeksacją strony. Kontekst służy do doprecyzowania kolejnego pytania i pozostaje w otwartej stronie. Docelowe wdrożenie z modelem AI, zatwierdzoną bazą wiedzy i aktualizacją treści opisano w dokumentacji modułu.

Demonstracje nie składają wniosków, nie rezerwują miejsc, nie zakładają kont i nie wysyłają formularzy. Funkcje wymagające tych działań są opisane w zakresie docelowego wdrożenia. Materiały przykładowe są oznaczone jako demonstracyjne. Strony mają `noindex,nofollow`.

## Materiały i utrzymanie

Logo pochodzi z materiałów przekazanych do projektu ZSP6. Informacje i odnośniki stanowią migawkę materiałów szkoły sprawdzonych podczas przygotowania projektu 23.11.2026. Nie ma automatycznej synchronizacji z oficjalną witryną. Źródła i ograniczenia są opisane w README modułów oraz, tam gdzie występuje katalog materiałów, w `SOURCES.md`.

Fotografie portfolio są ładowane z serwera szkoły. Przed docelową publikacją należy uzgodnić prawo do wykorzystania materiałów, podpisy i zakres zgód. Projekt nie stwierdza uzyskania takich zgód.

[Główne wizualizacje ZSP6](https://dobrestronynl-hub.github.io/ZSP6/) · [Oficjalna strona szkoły](https://zsp6tom.pl/)
