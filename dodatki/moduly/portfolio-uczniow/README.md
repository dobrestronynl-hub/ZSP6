# ZSP6. Portfolio uczniów

## Otwórz działającą demonstrację

[Przetestuj funkcję w przeglądarce](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/portfolio-uczniow/index.html)

Publiczny podgląd pokazuje interfejs, opis zastosowania i instrukcję testowania. Nie wymaga pobierania kodu ani logowania.

Samodzielna galeria ośmiu rzeczywistych prac z oficjalnych materiałów szkoły. Nie odczytuje galerii z DOM innej strony i nie wymaga głównej wizualizacji ZSP6.

## Co to robi

Użytkownik filtruje prace według dziedziny: plastyka, fotografia, grafika lub fryzjerstwo. Kliknięcie otwiera natywne okno `dialog` z obrazem, podpisem, pozycją w zbiorze oraz odnośnikami do pliku i źródła. Poprzednia/następna praca i klawisze strzałek poruszają się tylko w wybranej kategorii. Escape zamyka podgląd, a focus wraca do użytego odnośnika. Przy pojedynczej pracy nawigacja jest wyłączona.

Obrazy zachowują proporcje i nie są przycinane. Miniatury mają wymiary i tekst alternatywny, korzystają z lazy loading. Przy braku obrazu podgląd pokazuje komunikat i pozostawia odnośniki źródłowe. Bez JavaScript wszystkie prace są widoczne, a kliknięcie otwiera plik obrazu.

## Dlaczego się przyda

Kandydaci mogą ocenić warsztat szkoły przez konkretne realizacje. Nauczyciel może kierować do wybranej dziedziny zamiast przesyłać wiele osobnych zdjęć. Redakcja może uporządkować dorobek pracowni i wykorzystywać ten sam katalog podczas dni otwartych. Opis i kontekst przy pracy pomagają uniknąć galerii anonimowych obrazków.

## Co obejmuje docelowe wdrożenie

Podstawą są uzgodnione dziedziny, jakość plików, podpisy i zasady publikacji. CMS może zapewnić dodawanie prac, oznaczenie techniki i roku, profile autorów oraz zatwierdzanie przez nauczyciela. Konta uczniów, przesyłanie plików, przechowywanie i moderacja wymagają backendu oraz procedur obsługi.

Ta demonstracja nie ma kont, publikowania lub panelu przesyłania. Nie dodano fikcyjnych autorów. Podpisy nie zawsze identyfikują autora, ponieważ źródło nie zawsze udostępnia taką informację.

## Materiały i prawa

Obrazy są ładowane z oficjalnych adresów szkoły. Nie kopiowano ich plików do repozytorium. Publiczna dostępność, hotlinkowanie i wskazanie źródła nie stanowią potwierdzenia prawa do ponownej publikacji. Przed oficjalnym wdrożeniem należy uzgodnić ze szkołą prawa do zdjęć i prac oraz odpowiedni zakres zgód na rozpowszechnianie wizerunków. Dokument nie stwierdza, że zgody zostały już udzielone. Dokładny wykaz znajduje się w [SOURCES.md](SOURCES.md).

## Przetestuj sam

1. Wybierz Fotografia. Oczekiwany wynik: dwie prace, status `2 z 8`.
2. Otwórz pierwszą fotografię. Podgląd pokazuje podpis oraz `Praca 1 z 2`.
3. Kliknij Następna praca i naciśnij strzałkę w prawo. Podgląd powinien wrócić do pierwszej fotografii, bez przejścia do innej dziedziny.
4. Naciśnij Escape. Podgląd zamyka się, focus wraca do otwartej wcześniej pracy.
5. Wybierz Fryzjerstwo i otwórz jedyną pracę. Przyciski nawigacji powinny być nieaktywne.
6. Wróć do Wszystkie. Osiem prac powinno być dostępnych. Sprawdź Tab/Enter i brak poziomego przewijania przy 360 px.

Automatyczne testy obejmują 12 przypadków: liczebność kategorii, nieznaną kategorię, cykliczne przejście w obie strony, zbiór pusty i jednoelementowy oraz integralność danych źródłowych.

## Uruchomienie demonstracji

Projekt jest samodzielną stroną HTML/CSS/JavaScript. Nie wymaga instalacji pakietów, bundlera ani bazy danych. Do lokalnego podglądu użyj serwera HTTP, ponieważ skrypty są modułami ESM.

Z katalogu tego modułu:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`. Samo dwukrotne kliknięcie `index.html` może blokować moduły JavaScript przez reguły przeglądarki. W repozytorium `Dodatki-ZSP6` moduł jest publikowany jako osobny katalog pod `moduly/`. Po skopiowaniu samych jego plików można również serwować jego `index.html` jako niezależną stronę. Nie ma etapu kompilacji; dostępność opublikowanej wersji należy sprawdzić po wdrożeniu.

## Struktura plików

- `index.html`: pełny interfejs, opis korzyści, zakres wdrożenia i instrukcja ręcznych testów.
- `module.mjs`: zachowanie interfejsu w przeglądarce.
- `logic.mjs`: dane oraz logika niezależna od DOM.
- `module.css`: style właściwe dla tej funkcji.
- `assets/base.css`: wspólna typografia, formularze i układ demonstracji.
- `assets/logo.webp`: oryginalne logo z materiałów projektu ZSP6.
- `tests.mjs`: testy logiki uruchamiane bez dodatkowych zależności.

## Testy automatyczne

Wymagany Node.js z obsługą modułów ESM:

```bash
node --test tests.mjs
node --check module.mjs
node --check logic.mjs
```

Testy logiki oraz kontrola składni zostały wykonane z powodzeniem 23.11.2026. Następnie wykonano kontrolę sześciu szerokości i interakcji w Chromium; zakres i wyniki opisano w QA.md. Zgodność opublikowanej wersji wymaga sprawdzenia po publikacji. Nie deklarujemy pełnego audytu WCAG, testów z czytnikami ekranu ani testów na fizycznych telefonach.

## Pochodzenie i utrzymanie

Dane i odnośniki są migawką źródeł sprawdzanych w projekcie ZSP6 na 23.11.2026. Nie ma automatycznej synchronizacji z witryną szkoły. Dostępność plików zewnętrznych zależy od jej serwera. Przed docelowym wdrożeniem szkoła powinna wskazać właściciela treści i uzgodnić cykl aktualizacji.

[Wizualizacje strony ZSP6](https://dobrestronynl-hub.github.io/ZSP6/) · [Oficjalna witryna szkoły](https://zsp6tom.pl/)

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
