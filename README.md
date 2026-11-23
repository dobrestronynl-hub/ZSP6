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

## Pomarańczowy panel funkcji do wyceny

Panel zawiera osiem działających demonstracji:

1. Asystent wyboru kierunku.
2. Osobista checklista rekrutacji.
3. Dni otwarte i spotkania z eksportem przykładowego wydarzenia `.ics`.
4. Biblioteka dokumentów z wyszukiwaniem i wyborem odbiorcy.
5. Portfolio uczniów z filtrowaniem i powiększeniem.
6. Panel ucznia i rodzica z przypinaniem odnośników.
7. Przewodnik po sprawach szkolnych.
8. Edytor aktualności z lokalnym podglądem i pobraniem szkicu.

Na szerokim ekranie panel znajduje się z prawej strony; na mniejszych ekranach otwiera się z przycisku. Można wypróbować moduł, dodać go do zakresu i wrócić do listy funkcji. **Nie podano cen** — podsumowanie służy ustaleniu zakresu wyceny i nie stanowi zamówienia.

Wybrane moduły są wspólne dla obu wersji dzięki `localStorage` w tej samej przeglądarce. Zapamiętywane są identyfikatory wyborów, zaznaczenia checklisty i ulubione odnośniki, bez danych osobowych. Przy zablokowanym zapisie działa pamięć bieżącej strony; nie zapewnia ona zachowania wyboru po przeładowaniu lub przejściu na inny adres. Zakres można pobrać jako TXT oraz przygotować do wydruku lub zapisu PDF przez przeglądarkę.

Demonstracje nie rezerwują miejsc, nie publikują aktualności i nie łączą się z e-dziennikiem. Konta, wysyłka, CMS, przechowywanie plików i integracje wymagają osobnego wdrożenia; zależności opisano przy każdym module.

## Uruchomienie i build

Projekt wykorzystuje HTML, CSS i JavaScript bez frameworka, bundlera i zewnętrznych skryptów. Do kontroli potrzebne są Python 3 i Node.js; serwowanie strony nie wymaga Node.js.

Uruchom z katalogu repozytorium:

```bash
python3 scripts/check.py
python3 scripts/build.py
python3 -m http.server 8000
```

Podgląd lokalny: [http://localhost:8000/](http://localhost:8000/). Build kopiuje trzy strony i katalog `assets/` do `dist/`; nie publikuje strony. GitHub Pages może serwować statyczne pliki z katalogu głównego repozytorium zgodnie z istniejącą konfiguracją publikacji.

Główne zasoby to `assets/site.css`, `assets/site.js`, `assets/features.css` i `assets/features.js`. Oryginalny znak z wcześniejszych materiałów projektu wydzielono do `assets/logo.webp`; nie zastąpiono go nowym logo. Parametr `?preview=gate` wyłącza panel dodatkowych modułów w podglądzie za wrotami.

## Materiały i jakość

[Źródła i pochodzenie materiałów](docs/SOURCES.md) dokumentują treści, terminy, dokumenty, fotografie i ograniczenia dotyczące praw do ponownej publikacji. Zdjęcia są ładowane z serwera szkoły; ich dostępność zależy od tego serwera. Wizualizacja zachowuje `noindex,nofollow`.

[Raport QA](docs/QA.md) opisuje wykonane testy i ich granice. Sprawdzono 18 układów w Chromium przy rzeczywistych szerokościach 360, 390, 768, 1024, 1440 i 1920 px, z załadowanymi fotografiami. Sprawdzono też interakcje, lokalny zapis oraz zawartość pobranych plików. Nie deklarujemy pełnej certyfikacji WCAG ani wizualnej walidacji wygenerowanego PDF.
