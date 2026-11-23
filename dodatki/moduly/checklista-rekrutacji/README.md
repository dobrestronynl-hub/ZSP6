# ZSP6: Osobista checklista rekrutacji

Samodzielna demonstracja listy przygotowań dla kandydatów i rodziców. Moduł ma osobny interfejs w katalogu `moduly/checklista-rekrutacji` repozytorium `Dodatki-ZSP6` i działa niezależnie od głównej wizualizacji ZSP6.

## Co robi

Udostępnia ścieżkę Liceum Sztuk Plastycznych z pięcioma punktami oraz Technikum nr 5 z czterema punktami. Przy każdym kroku podaje krótkie wyjaśnienie i oficjalny odnośnik. Zaznaczenia aktualizują postęp. Lista zachowuje stan po odświeżeniu w tej samej przeglądarce, jeśli dostępny jest lokalny zapis. Można pobrać bieżący stan jako TXT i wyczyścić wybraną ścieżkę niezależnie od drugiej.

## Dlaczego się przyda

Kandydat nie musi pamiętać, które informacje już sprawdził. Rodzic może przejrzeć listę wspólnie z dzieckiem. Sekretariat i opiekun rekrutacji mogą odsyłać do uporządkowanej instrukcji, zamiast za każdym razem wyjaśniać cały przebieg przygotowań. Aktualizacja opisów i linków odbywa się w jednym miejscu. Nie podaje się niezweryfikowanych oszczędności czasu ani gwarancji skutecznej rekrutacji.

## Co działa teraz

- Oddzielne ścieżki i postęp, w tym dodatkowy punkt dotyczący egzaminu plastycznego w liceum.
- Odnośniki do rzeczywistych informacji szkoły.
- Zapamiętywanie wyłącznie identyfikatorów kroków i wybranej ścieżki w `localStorage`.
- Odrzucanie uszkodzonych, zduplikowanych i nieznanych zapisów.
- Działanie w pamięci strony, gdy trwały zapis jest zablokowany, z odpowiednim komunikatem.
- Pobranie TXT i reset bieżącej listy.

Klucz: `zsp6:standalone:recruitment-checklist:v1`. Nie zapisuje imion, e-maili ani dokumentów kandydata. Nie składa wniosku i nie potwierdza przyjęcia. Wyczyść obie listy albo dane witryny w przeglądarce, aby usunąć postęp.

## Wdrożenie w szkole

Podstawowa lista może działać statycznie, bez kont. Szkoła powinna zatwierdzić kroki, wskazać właściciela treści i aktualizować linki przy każdej rekrutacji. Terminy należy odczytywać w oficjalnych materiałach. Funkcje wymagające dodatkowego wdrożenia: synchronizacja między urządzeniami, logowanie, przypomnienia, status realnego wniosku, integracja z naborem lub panel CMS. Opisane opcje nie są atrapami aktywnych usług w tej demonstracji.

## Uruchomienie

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/` po uruchomieniu serwera w katalogu tego modułu. Moduły JavaScript wymagają HTTP zamiast `file://`. Nie ma frameworka, instalacji npm ani procesu budowania. W repozytorium `Dodatki-ZSP6` moduł jest publikowany z katalogu `moduly/checklista-rekrutacji`. Może również działać na osobnym hostingu statycznym.

## Testy

```bash
node --test tests.mjs
node --check module.mjs
```

Testy obejmują uszkodzony stan, duplikaty i nieznane kroki, różną długość ścieżek, niezależność postępu, odtworzenie z JSON, reset jednej ścieżki oraz zawartość eksportu. Nie udają pełnych testów w przeglądarce.

Scenariusz ręczny:

1. Liceum: zaznacz dwie pozycje. Oczekiwane `2 z 5`.
2. Odśwież. Przy dostępnym localStorage postęp pozostaje.
3. Technikum: zaznacz jedną pozycję. Oczekiwane `1 z 4`.
4. Wróć do liceum. Oczekiwane poprzednie `2 z 5`.
5. Pobierz TXT: właściwa nazwa ścieżki, `[x]` przy wybranych krokach, oficjalne odnośniki.
6. Wyzeruj liceum i sprawdź technikum: odpowiednio `0 z 5` i `1 z 4`.

Sprawdź także klawiaturę, wąski ekran 360 px i zachowanie przy zablokowanym zapisie. Uszkodzony JSON powinien dać pustą listę z komunikatem, bez błędu zatrzymującego stronę. Działania demo nie wysyłają danych do szkoły.

## Źródła i ograniczenia

Treść bazuje na materiałach zweryfikowanych podczas przygotowania projektu 23.11.2026: https://zsp6tom.pl/?page_id=2537 i https://zsp6tom.pl/?page_id=3467. Oryginalne logo pochodzi z wcześniejszych materiałów ZSP6. Nie są automatycznie pobierane nowe regulaminy ani terminy; wiążące są aktualne komunikaty szkoły. Nie jest to deklaracja pełnego audytu WCAG lub testów wszystkich przeglądarek.

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
