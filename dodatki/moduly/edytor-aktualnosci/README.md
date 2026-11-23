# ZSP6. Edytor aktualności

Samodzielna, lokalna demonstracja przygotowywania aktualności z podglądem. Projekt został wydzielony z wizualizacji ZSP6 i działa niezależnie od pozostałych funkcjonalności.

## Co robi

Użytkownik edytuje tytuł, wybiera kategorię i pisze treść. Podgląd zmienia się na bieżąco, zachowuje akapity i pozwala sprawdzić układ przed przekazaniem treści do publikacji. Szkic można pobrać w formacie TXT z polskimi znakami. Można także przywrócić początkowy przykład.

Limity demonstracji to 110 znaków tytułu i 1500 znaków treści, liczone jako punkty kodowe Unicode. Logika nie przecina par składających się na emoji. Pusty tytuł lub treść blokują pobieranie szkicu. Wpisany HTML pozostaje tekstem, ponieważ renderowanie używa textContent, bez wstawiania treści użytkownika przez innerHTML.

Nie ma przycisku udającego publikację. Szkic jest przechowywany tylko w otwartym oknie, bez localStorage, konta, bazy danych i połączenia z systemami szkoły. Odświeżenie przywraca treść przykładową. Plik TXT zapisany przez użytkownika pozostaje na jego urządzeniu.

## Dlaczego się przyda

Redaktor może od razu zobaczyć, czy tytuł jest zbyt długi, tekst ma czytelne akapity i wybrano odpowiednią kategorię. Stały układ pomaga różnym autorom przygotowywać spójne wpisy bez ręcznego formatowania strony. Pobrany szkic można przekazać do korekty.

W docelowym CMS zmniejsza to liczbę przełączeń między edycją a podglądem. Nie deklarujemy konkretnej liczby zaoszczędzonych godzin, ponieważ zależy ona od sposobu pracy redakcji. Demonstracja służy ocenie interfejsu przed ustaleniem zakresu wdrożenia.

## Jak uruchomić

Z katalogu tego modułu:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`. Użyj HTTP, ponieważ skrypty są modułami JavaScript. Nie trzeba instalować npm, frameworka ani wykonywać buildu. Publikacja całego repozytorium zachowuje katalog `moduly/edytor-aktualnosci` i jego względne ścieżki. Sam moduł może też działać na oddzielnym hostingu statycznym.

## Testy automatyczne

Wymagany jest Node.js obsługujący standardowy moduł node:test.

```bash
node --test tests.mjs
node --check module.mjs
```

Testy obejmują puste wartości, normalizację końców linii, polskie znaki, limity i emoji, nieznane kategorie, nieprawidłowe typy oraz zachowanie HTML jako tekstu w eksporcie. Sprawdzono także zachowanie podglądu w przeglądarce. Wpisany HTML był dosłownym tekstem bez tworzenia elementów; wynik opisano w QA.md.

## Scenariusz testu interfejsu

1. Zmień tytuł na „Warsztaty projektowania”. Oczekiwany wynik: podgląd ma taki sam tytuł.
2. Wybierz „Projekty” i wpisz dwa akapity. Oczekiwany wynik: poprawna kategoria i podział tekstu w podglądzie.
3. Wpisz dosłownie `<strong>Przykład</strong>`. Oczekiwany wynik: znaczniki są widocznym tekstem, bez interpretacji HTML.
4. Wyczyść tytuł lub treść. Oczekiwany wynik: przycisk pobierania jest nieaktywny. Uzupełnij obie wartości, pobierz plik TXT i sprawdź zgodność z polami.
5. Wklej więcej niż 110 znaków do tytułu. Oczekiwany wynik: tekst zostaje ograniczony, a licznik nie przekracza 110.
6. Kliknij „Przywróć przykład”. Oczekiwany wynik: powrót treści demonstracyjnej i focus w polu tytułu. Sprawdź obsługę klawiaturą i układ przy 360 px.

Kluczowe selektory: #article-title, #article-category, #article-body, #preview-title, #preview-body, #download-draft, #reset-example, #editor-status.

## Zakres produkcyjnego wdrożenia

Pełny edytor wymaga CMS z logowaniem, rolami, zapisaniem szkiców, publikowaniem i kopiami zapasowymi. Należy ustalić kategorie, uprawnienia, sposób dodawania zdjęć i opisów alternatywnych. Opcjonalne rozszerzenia to akceptacja przez drugą osobę, historia zmian i harmonogram publikacji.

Wgranie zdjęć, publikacja, współpraca wielu redaktorów oraz synchronizacja nie są częścią tej demonstracji. Sposób pracy z materiałami i prawa do publikacji trzeba ustalić z redakcją szkoły.

## Materiały

Początkowa treść jest jawnie oznaczonym przykładem interfejsu. Nie pochodzi ze szkolnych aktualności i nie jest rzeczywistym ogłoszeniem. Oryginalne logo pochodzi z materiałów przekazanych do projektu ZSP6. Nie dodano zewnętrznych skryptów ani przypadkowych zdjęć.

[Wizualizacje głównej strony ZSP6](https://dobrestronynl-hub.github.io/ZSP6/)

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
