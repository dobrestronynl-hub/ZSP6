# ZSP6: Dni otwarte i spotkania

## Otwórz działającą demonstrację

[Przetestuj funkcję w przeglądarce](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/dni-otwarte/index.html)

Publiczny podgląd pokazuje interfejs, opis zastosowania i instrukcję testowania. Nie wymaga pobierania kodu ani logowania.

Samodzielna demonstracja wyboru terminu i pobrania pliku kalendarza. Nie zawiera opublikowanych przez szkołę terminów ani systemu rezerwacji. Każda wygenerowana pozycja jest oznaczona jako DEMO.

## Co robi

Pozwala wybrać temat przykładowego spotkania, datę, godzinę w Polsce i czas trwania. Pokazuje podsumowanie oraz tworzy rzeczywisty plik ICS. Plik można zaimportować do osobistego kalendarza. Czasy są przeliczane ze strefy Europe/Warsaw na UTC, z uwzględnieniem czasu letniego i zimowego. Zmiana ustawień aktualizuje podgląd. Nieprawidłowa data blokuje eksport.

## Dlaczego się przyda i jak ułatwia pracę

Kandydat lub rodzic może zachować termin bez ręcznego przepisywania daty i godziny. Szkoła może zebrać dni otwarte, konsultacje i spotkania w jednym miejscu, zamiast rozpraszać je między wieloma aktualnościami. Organizator przygotowuje jeden opis, do którego sekretariat i nauczyciele mogą odsyłać zainteresowanych. Docelowy panel CMS może udostępnić edycję wydarzeń osobom odpowiedzialnym za ich organizację.

To korzyści organizacyjne, a nie gwarancja liczby zapisów lub oszczędności czasu. Pobranie pliku nie rezerwuje miejsca.

## Działająca demonstracja

- Trzy jawnie przykładowe tematy, data i godziny 10:00, 12:00 lub 16:00.
- Czas trwania 30, 60 lub 90 minut.
- Aktualizacja podsumowania, walidacja dat i rzeczywisty eksport ICS.
- Poprawne czasy UTC, zakończenia linii CRLF oraz zawijanie według 75 bajtów UTF-8.
- Tytuł `DEMO`, opis braku rezerwacji i status `TENTATIVE` w pliku.
- Brak danych osobowych, zapisu w localStorage, wysyłki zaproszeń i modyfikowania cudzych kalendarzy.

Import do kalendarza wykonuje użytkownik osobno. Pobrany plik jest jednorazową kopią; późniejsza zmiana daty na stronie nie aktualizuje automatycznie istniejącego wpisu w kalendarzu.

## Co obejmuje docelowe wdrożenie

Szkoła zatwierdza rzeczywiste wydarzenia, daty, opisy, miejsce i osoby kontaktowe. Prosty wykaz oraz eksport ICS mogą działać statycznie. CMS wymaga panelu edycji treści. Limity miejsc, zapisy, potwierdzenia e-mail, lista uczestników, odwoływanie zapisów i przypomnienia wymagają serwera oraz ustalenia sposobu obsługi danych. Subskrybowany kalendarz automatycznie aktualizujący terminy jest osobnym rozszerzeniem.

W repozytorium nie ma fikcyjnych dostępnych miejsc, udawanej rezerwacji ani zmyślonych cen.

## Uruchomienie

```bash
python3 -m http.server 8000
```

Po uruchomieniu serwera w katalogu tego modułu otwórz `http://localhost:8000/`. Moduły JavaScript wymagają HTTP zamiast `file://`. Nie są potrzebne zależności npm ani build. W repozytorium `Dodatki-ZSP6` moduł jest publikowany z katalogu `moduly/dni-otwarte`. Może również działać na osobnym hostingu statycznym.

## Testowanie

```bash
node --test tests.mjs
node --check module.mjs
```

Testy logiki sprawdzają czas zimowy i letni, granice zmiany czasu, nieistniejącą i dwuznaczną godzinę, nieprawidłową datę, tematy, długość spotkania, znaki specjalne oraz zawijanie polskiego tekstu w ICS. Nie zastępują importu do konkretnych aplikacji kalendarza.

Scenariusz ręczny:

1. Ustaw 10.12.2026, 10:00, 60 minut. Podgląd powinien wskazać 10:00–11:00 w Polsce.
2. Zmień temat. Tytuł podglądu powinien zmienić się i zachować DEMO.
3. Pobierz plik. W edytorze tekstowym sprawdź `DTSTART:20261210T090000Z`.
4. Ustaw 10.07.2027 o 10:00. Oczekiwane `DTSTART:20270710T080000Z`.
5. Wyczyść datę i spróbuj pobrać. Eksport powinien zostać zatrzymany.
6. Dobrowolnie zaimportuj plik do własnego kalendarza. Sprawdź lokalną godzinę i oznaczenie DEMO, a następnie usuń testowy wpis.

Sprawdź także klawiaturę oraz szerokości 360 i 1440 px. Nie zapisuj się na rzeczywiste spotkanie w ramach tego testu.

## Źródła i ograniczenia

Rzeczywiste informacje szkoły: https://zsp6tom.pl/?page_id=2537 i https://zsp6tom.pl/?page_id=3042. Źródła projektu zweryfikowano 23.11.2026; demonstracja nie pobiera nowych terminów. Logo pochodzi z wcześniejszych materiałów ZSP6. Obliczenia strefy czasu używają bazy `Intl` przeglądarki lub Node.js. Reguły stref czasowych dla odległych dat zależą od aktualności tej bazy. Nie deklaruje się pełnego audytu WCAG ani testów wszystkich kalendarzy i przeglądarek.

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
