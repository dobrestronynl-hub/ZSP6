# ZSP6. Biblioteka dokumentów

Samodzielna demonstracja przeszukiwalnego katalogu dokumentów i informacji szkoły. Osiem rzeczywistych odnośników jest dostępnych bez powiązania z kodem głównej wizualizacji.

## Co to robi

Użytkownik wpisuje temat i wybiera odbiorcę: wszystkich, kandydata, ucznia, rodzica albo absolwenta. Wyniki powstają z tytułów, opisów i typu materiału. Wiele słów jest łączonych warunkiem „wszystkie muszą wystąpić”, niezależnie od kolejności. Wyszukiwanie ignoruje wielkość liter i polskie znaki, w tym `ł`. Dokumenty wspólne pozostają widoczne w każdym widoku. Przycisk „Wyczyść filtry” przywraca pełny katalog.

Odnośnik otwiera rzeczywisty plik PDF/DOCX lub oficjalną stronę szkoły w nowej karcie. Bez JavaScript wszystkie osiem odnośników nadal pozostaje dostępnych.

## Dlaczego się przyda

Uczeń i rodzic mogą znaleźć dokument według sprawy, bez znajomości struktury serwisu. Sekretariat dostaje jeden stały adres katalogu, który może podawać w korespondencji. Redaktor utrzymuje opisy i wersje materiałów w jednym miejscu. To przewidywana korzyść organizacyjna, bez deklaracji niezmierzonego procentowego oszczędzania czasu.

## Co obejmuje docelowe wdrożenie

Podstawowy zakres to inwentaryzacja dokumentów, kategorie, odbiorcy, opisy, wyszukiwanie i ustalenie odpowiedzialności za aktualność. Połączenie z CMS może dodać panel przesyłania plików, status aktualnej wersji i archiwum.

Wyszukiwanie wewnątrz PDF, historia wersji i dokumenty wymagające logowania są oddzielnymi rozszerzeniami. Demo nie kopiuje plików na własny serwer, nie przeszukuje zawartości PDF i niczego nie wysyła. Hasła wyszukiwania nie są zapisywane.

## Przetestuj sam

1. Wpisz `maloletnich`. Oczekiwany wynik: jeden dokument, polityka ochrony małoletnich.
2. Wyczyść filtry, wybierz Kandydaci i wpisz `rekrutacja`. Oczekiwany wynik: odnośnik rekrutacyjny.
3. Zmień odbiorcę na Uczniowie przy tym samym haśle. Oczekiwany wynik: czytelny komunikat o braku wyników.
4. Wyczyść i porównaj `duplikatu świadectwa` z `świadectwa duplikatu`. Wynik powinien być taki sam.
5. Otwórz PDF. Nowa karta powinna wskazywać serwer `zsp6tom.pl`; katalog powinien pozostać otwarty.
6. Użyj Tab oraz Enter. Pola i odnośniki muszą być dostępne, a focus widoczny. Przy 360 px nie powinno być poziomego przewijania.

Automatyczne testy obejmują 12 przypadków: polskie znaki, wiele słów, brak wyników, dokumenty wspólne, role, nieprawidłową rolę, unikalność identyfikatorów i domenę źródłową.

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

Pełny wykaz użytych odnośników: [SOURCES.md](SOURCES.md).

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
