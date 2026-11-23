# ZSP6. Sprawy sekretariatu

Samodzielna demonstracja przewodnika po sprawach szkolnych, wydzielona z wcześniejszej wizualizacji ZSP6. Nie wymaga pozostałych modułów ani serwera aplikacyjnego.

## Co robi

Użytkownik wybiera jeden z pięciu tematów: rekrutacja, zaświadczenie lub inny dokument, duplikat świadectwa, duplikat legitymacji albo współpraca ze szkołą. Strona pokazuje instrukcję, źródłowy odnośnik i przykład pytania. Przycisk pobierania tworzy lokalny plik TXT zawierający aktualnie wybraną ścieżkę i dane kontaktowe szkoły.

To przewodnik informacyjny. Nie zakłada kont, nie przyjmuje zgłoszeń i załączników, nie nadaje numerów spraw ani nie wysyła wiadomości. Nie zbiera danych osobowych. Wybór tematu znika po odświeżeniu strony.

## Dlaczego się przyda

Na zwykłej stronie kontaktowej różne osoby trafiają pod ten sam numer telefonu, często bez wiedzy, jaki dokument lub informacja będzie potrzebna. Przewodnik pozwala najpierw uporządkować temat. Sekretariat może wskazać jedną ścieżkę, a osoba kontaktująca się ze szkołą może zachować instrukcję i zadać bardziej konkretne pytanie.

Nie deklarujemy liczbowej oszczędności czasu. Efekt zależy od tego, czy szkoła zatwierdzi treści, obejmie nimi rzeczywiste powtarzające się sprawy i będzie je aktualizować.

## Jak uruchomić

Z katalogu tego modułu:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`. Jest to projekt statyczny z modułami JavaScript, dlatego należy użyć HTTP zamiast otwierać HTML bezpośrednio z dysku. Nie trzeba instalować pakietów npm ani wykonywać buildu. Publikacja całego repozytorium zachowuje katalog `moduly/sprawy-sekretariatu` i jego względne ścieżki. Sam moduł może też działać na oddzielnym hostingu statycznym.

## Testy automatyczne

Wymagany jest Node.js obsługujący standardowy moduł node:test.

```bash
node --test tests.mjs
node --check module.mjs
```

Testy sprawdzają odrzucanie nieznanych i prototypowych kluczy, dobór właściwego dokumentu, rozdzielenie treści eksportów oraz bezpieczny zakres odnośników do szkoły. Nie zastępują testowania interfejsu i dostępności w przeglądarce.

## Scenariusz testu interfejsu

1. Wybierz „Duplikat świadectwa”. Oczekiwany wynik: instrukcja dotyczy świadectwa i prowadzi do oficjalnego PDF.
2. Wybierz „Propozycja współpracy ze szkołą”. Oczekiwany wynik: treść zmienia się na przygotowanie celu, odbiorców i terminu.
3. Kliknij „Pobierz instrukcję TXT” i otwórz plik. Oczekiwany wynik: temat odpowiada bieżącemu wyborowi, są polskie znaki, odnośniki i jawne oznaczenie DEMO.
4. Obsłuż wybór i pobranie klawiaturą. Oczekiwany wynik: widoczny focus, logiczna kolejność i brak pułapki klawiaturowej.
5. Sprawdź szerokości 360, 390, 768 i 1440 px. Oczekiwany wynik: brak poziomego przewijania.
6. Odśwież stronę. Oczekiwany wynik: początkowy temat rekrutacji, bez utworzonego zgłoszenia.

Kluczowe selektory: #office-topic, #office-result, #office-status, #download-instructions.

## Zakres docelowego wdrożenia

Szkoła powinna zatwierdzić nazwy spraw i instrukcje, aktualne dokumenty, kontakty oraz osobę odpowiedzialną za aktualizacje. Wersja docelowa może korzystać z CMS do edycji treści. Przyjmowanie zgłoszeń, załączników i powiadomień wymaga odrębnego backendu, autoryzacji, uprawnień i ustalenia zasad przechowywania danych. Nie jest częścią tej demonstracji.

Moduł celowo nie podaje niepotwierdzonych opłat, godzin pracy ani terminów wydania dokumentów. Bieżącą procedurę potwierdza sekretariat.

## Źródła i stan danych

Stan źródeł wykorzystanych z projektu ZSP6: 23.11.2026. Strona nie synchronizuje późniejszych zmian.

- [Oficjalny kontakt](https://zsp6tom.pl/?page_id=318)
- [Rekrutacja](https://zsp6tom.pl/?page_id=2537)
- [Informacje dla uczniów](https://zsp6tom.pl/?page_id=3042)
- [Podanie o duplikat świadectwa, PDF](https://zsp6tom.pl/wp-content/uploads/2023/01/Podanie-o-wydanie-duplikatu-swiadectwa.pdf)
- [Podanie o duplikat legitymacji, DOC](https://zsp6tom.pl/wp-content/uploads/2023/09/Podanie-o-wydanie-duplikatu-legitymacji.doc)

PDF świadectwa był wcześniej odczytany w audycie źródeł. Dla DOC legitymacji potwierdzono odnośnik i typ pliku, bez odczytu treści binarnego dokumentu. Kontakty pochodzą ze szkolnej witryny. Logo pochodzi z materiałów przekazanych do projektu i nie zostało zastąpione nowym znakiem.

[Wizualizacje głównej strony ZSP6](https://dobrestronynl-hub.github.io/ZSP6/)

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
