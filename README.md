# ZSP6 — dwie wizualizacje strony szkoły

Nieoficjalny projekt koncepcyjny dla Zespołu Szkół Ponadpodstawowych nr 6 im. Stanisława Wyspiańskiego w Tomaszowie Mazowieckim. Dwie odrębne kompozycje korzystają z rzeczywistych informacji, oryginalnego logo oraz materiałów opublikowanych przez szkołę.

## Wersje i adresy

| Widok | Plik | Adres GitHub Pages |
| --- | --- | --- |
| Pełnoekranowe, dwuskrzydłowe wrota | `index.html` | [Wybór wersji](https://dobrestronynl-hub.github.io/ZSP6/) |
| Wyspiański Editorial — jasny układ redakcyjny | `oficjalna.html` | [Wersja 1](https://dobrestronynl-hub.github.io/ZSP6/oficjalna.html) |
| Kreatywna Pracownia — kompozycja wystawy i portfolio | `kreatywna.html` | [Wersja 2](https://dobrestronynl-hub.github.io/ZSP6/kreatywna.html) |

Każda wersja ma odnośnik powrotu do wyboru. Wrota zachowują natywne odsyłacze, respektują ograniczenie ruchu i resetują stan po użyciu przycisku Wstecz. Powyższe adresy wskazują miejsce publikacji; wynik lokalnych testów nie potwierdza jeszcze publikacji konkretnego commita.

## Funkcje strony

W obu wariantach dostępne są: lokalna wyszukiwarka treści i opisów dokumentów, interaktywny katalog kierunków, galeria z filtrami i powiększaniem zdjęć, centrum rekrutacji, filtrowane aktualności, odnośniki dla uczniów i rodziców, dokumenty, opisy pracowni oraz kalendarz roku szkolnego 2026/2027. Kalendarz prezentuje sprawdzone terminy jako lokalną migawkę danych; nie pobiera późniejszych zmian z systemów szkoły.

Formularz kontaktowy sprawdza poprawność pól i wyraźnie informuje o demonstracyjnym charakterze. **Nie wysyła ani nie zapisuje wiadomości.** Pola nie mają nazw umożliwiających serializację danych do żądania formularza.

## Osobne demonstracje funkcjonalności

Na życzenie użytkownika usunięto panel dodatkowych funkcji z obu wizualizacji. Nagłówki hero mają prostą typografię bez kursywy, a treść wykorzystuje szerokość strony bez zarezerwowanego miejsca na sidebar.

Dodatkowe demonstracje rozwijane są jako osiem niezależnych projektów: asystent AI szkoły, asystent kierunku, checklista rekrutacji, dni otwarte, biblioteka dokumentów, portfolio, panel ucznia i rodzica oraz sprawy sekretariatu. Nie są ładowane przez tę stronę i nie mają wspólnego panelu wyceny. Każdy projekt ma własny opis działania, korzyści, granic demonstracji i scenariuszy testowania.

[Katalog interaktywnych dodatków](https://dobrestronynl-hub.github.io/ZSP6/dodatki/) jest publikowany w osobnym katalogu `dodatki/` tego hostingu. Każdy moduł ma własny adres i działa bez otwierania kodu na GitHubie. Źródła oraz dokumentacja są utrzymywane w osobnym repozytorium [Dodatki-ZSP6](https://github.com/dobrestronynl-hub/Dodatki-ZSP6). Katalog `dodatki/` jest kopią przygotowanego tam pakietu `dist/`, używaną wyłącznie do publikacji. Zmiany modułów należy wykonywać w repozytorium źródłowym, a następnie odświeżyć tę kopię. Dodatki nie tworzą sidebaru i nie są automatycznie dołączane do obu wizualizacji.

## Uruchomienie i build

Projekt wykorzystuje HTML, CSS i JavaScript bez frameworka, bundlera i zewnętrznych skryptów. Do kontroli potrzebne są Python 3 i Node.js; serwowanie strony nie wymaga Node.js.

Uruchom z katalogu repozytorium:

```bash
python3 scripts/check.py
python3 scripts/build.py
python3 -m http.server 8000
```

Podgląd lokalny: [http://localhost:8000/](http://localhost:8000/). Build kopiuje trzy strony, katalog `assets/` oraz obecną kopię `dodatki/` do `dist/`; nie publikuje strony. GitHub Pages może serwować statyczne pliki z katalogu głównego repozytorium zgodnie z istniejącą konfiguracją publikacji.

Główne zasoby to `assets/site.css` i `assets/site.js`. Oryginalny znak z wcześniejszych materiałów projektu wydzielono do `assets/logo.webp`; nie zastąpiono go nowym logo.

## Materiały i jakość

[Źródła i pochodzenie materiałów](docs/SOURCES.md) dokumentują treści, terminy, dokumenty, fotografie i ograniczenia dotyczące praw do ponownej publikacji. Zdjęcia są ładowane z serwera szkoły; ich dostępność zależy od tego serwera. Wizualizacja zachowuje `noindex,nofollow`.

[Raport QA](docs/QA.md) opisuje wykonane testy i ich granice. Po usunięciu sidebaru ponownie sprawdzono obie wersje przy szerokościach 360, 390, 768, 1024, 1440 i 1920 px. W każdym układzie potwierdzono brak poziomego przepełnienia, brak sidebaru i prosty krój wszystkich elementów nagłówka hero. Wcześniejsze interakcje szkolne pozostają w projekcie. Nie deklarujemy pełnej certyfikacji WCAG ani wizualnej walidacji wygenerowanego PDF.
