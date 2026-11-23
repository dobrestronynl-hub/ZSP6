# ZSP6. Panel ucznia i rodzica

## Otwórz działającą demonstrację

[Przetestuj funkcję w przeglądarce](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/panel-ucznia-rodzica/index.html)

Publiczny podgląd pokazuje interfejs, opis zastosowania i instrukcję testowania. Nie wymaga pobierania kodu ani logowania.

Samodzielny punkt startowy do publicznych informacji szkoły. Odbiorca wybiera widok i przypina najczęściej używane odnośniki.

## Co to robi

Lista zmienia się po wybraniu Ucznia lub Rodzica. Przypięta pozycja trafia na początek; odpięta wraca do zwykłej kolejności. Widok oraz identyfikatory przypięć są zapisywane w `localStorage` pod kluczem `zsp6:standalone:panel:v1`. Przypięcie przeznaczone tylko dla rodzica pozostaje zapamiętane, ale nie pojawia się na liście ucznia. Licznik rozróżnia przypięcia w aktualnym widoku i łączną liczbę zapisanych pozycji.

Przycisk „Wyczyść ustawienia” usuwa zapis tego panelu i przywraca widok ucznia. Przy zablokowanym localStorage wybór działa w pamięci strony, a komunikat wyjaśnia brak zachowania po odświeżeniu. Nieznane identyfikatory i niepoprawna struktura ustawień są odrzucane. Zmiany pomiędzy kartami tej samej domeny są odczytywane przez zdarzenie `storage`.

## Dlaczego się przyda

Uczeń i rodzic otrzymują krótszą drogę do codziennych spraw. Szkoła może podawać jeden punkt startowy zamiast wielu osobnych linków. Administrator utrzymuje katalog adresów i przypisanie odbiorców w jednym miejscu. Użytkownik sam decyduje, co jest dla niego najważniejsze.

Na współdzielonym komputerze następna osoba może zobaczyć poprzedni wybór roli i skrótów. Dlatego czyszczenie ustawień jest widoczne w głównym interfejsie.

## Granice demonstracji i docelowe wdrożenie

Wybranie roli jest filtrem, nie logowaniem ani przyznaniem uprawnień. Panel nie łączy się z e-dziennikiem i nie wyświetla ocen, frekwencji lub prywatnej korespondencji. Nie zbiera danych ucznia, adresów e-mail i haseł.

Podstawowy zakres wdrożenia obejmuje katalog skrótów, role, ulubione i ustalenie właściciela aktualizacji. Konta, synchronizacja między urządzeniami i dostęp do prywatnych danych wymagają osobnego wdrożenia uwierzytelniania, uprawnień, backendu oraz uzgodnień z dostawcami integrowanych systemów.

## Przetestuj sam

1. Wybierz Rodzica. Powinny pojawić się rekrutacja i informacje dla rodziców; galeria fotograficzna nie należy do tego widoku.
2. Przypnij Informacje o rekrutacji. Pozycja trafia na początek, przycisk zmienia się na Odepnij, licznik rośnie.
3. Odśwież stronę. Przy działającym localStorage widok i przypięcie powinny pozostać.
4. Wybierz Ucznia. Rekrutacja znika z listy, ale łączny licznik zachowuje zapisane przypięcie. Wróć do Rodzica i sprawdź, że pozycja nadal jest przypięta.
5. Odepnij rekrutację, a następnie użyj Wyczyść ustawienia. Oczekiwany wynik: widok ucznia i brak przypięć.
6. Przejdź klawiszem Tab przez role, skróty i przyciski. Sprawdź widoczny focus oraz brak poziomego przewijania przy 360 px.

Automatyczne testy obejmują 12 przypadków: role, widoczność, kolejność przypięć, dodawanie/usuwanie, odrzucanie nieznanych identyfikatorów, uszkodzone ustawienia i unikalność danych.

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
