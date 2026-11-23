# ZSP6: Asystent wyboru kierunku

## Otwórz działającą demonstrację

[Przetestuj funkcję w przeglądarce](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/asystent-kierunku/index.html)

Publiczny podgląd pokazuje interfejs, opis zastosowania i instrukcję testowania. Nie wymaga pobierania kodu ani logowania.

Samodzielna, działająca demonstracja funkcjonalności. Nie jest częścią sidebaru ani kompletną stroną szkoły. Zawiera własny interfejs, instrukcję testowania i opis docelowego wdrożenia.

## Co robi

Użytkownik wybiera zainteresowanie i informację, do której chce przejść. Moduł pokazuje właściwy kierunek, krótkie objaśnienie, jawne uzasadnienie dopasowania i odnośnik do programu albo rekrutacji. Obsługuje plastykę, grafikę i poligrafię cyfrową, fotografię i multimedia oraz usługi fryzjerskie. Zmiana odpowiedzi unieważnia poprzedni wynik, a reset pozwala zacząć od nowa.

## Dlaczego się przyda i komu ułatwia pracę

Ósmoklasista może zacząć od znanego zainteresowania, zamiast zgadywać znaczenie formalnej nazwy zawodu. Rodzic otrzymuje czytelne uzasadnienie i właściwe źródło informacji. Sekretariat oraz osoby zajmujące się rekrutacją mogą odsyłać do jednego materiału, zamiast za każdym razem wyjaśniać podstawowe różnice między kierunkami. Reguły i opisy mogą być uzgodnione ze szkołą i utrzymywane w jednym miejscu.

Nie obiecuje to określonej liczby zaoszczędzonych godzin ani większego naboru. Praktyczny efekt zależy od jakości treści i używania modułu przez kandydatów.

## Co działa teraz

- Cztery realne kierunki i osiem kombinacji zainteresowanie/kolejny krok.
- Wymagany wybór zainteresowania, komunikaty wyniku i reset.
- Uzasadnienie dopasowania oraz działające odnośniki do szkoły.
- Obsługa klawiatury, etykiety pól i komunikaty `role=status`.
- Brak zapisu odpowiedzi, kont, analityki i wysyłki formularzy.

To prosty, jawny mechanizm regułowy. Nie jest testem psychologicznym, pomiarem zdolności ani automatyczną decyzją o przyjęciu.

## Zakres docelowego wdrożenia

Podstawowy moduł może działać statycznie na stronie szkoły. Potrzebne jest zatwierdzenie nazw, pytań, reguł i treści oraz wskazanie osoby aktualizującej informacje. Panel edycji dla pracowników wymaga integracji z CMS. Osobno można uzgodnić większą liczbę pytań, porównanie kilku kierunków lub statystyki. W repozytorium nie ma fikcyjnej wyceny ani ukrytego backendu.

## Uruchomienie

Potrzebny jest zwykły serwer plików statycznych. Z katalogu tego modułu:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`. Nie otwieraj `index.html` przez `file://`, ponieważ skrypt korzysta z modułów JavaScript. Nie są potrzebne pakiety npm ani proces budowania. W repozytorium `Dodatki-ZSP6` moduł jest publikowany razem z pozostałymi katalogami. Można go także skopiować do osobnego katalogu hostingu statycznego.

## Testowanie

Test logiki wymaga Node.js:

```bash
node --test tests.mjs
node --check module.mjs
```

Testy sprawdzają kierunki, oba rodzaje odnośników, błędne i odziedziczone klucze oraz brak modyfikacji katalogu przez wynik. Nie zastępują testów w przeglądarce.

Ręcznie: spróbuj pustego wyboru, wybierz fotografię i program, zmień cel na rekrutację, sprawdź pozostałe kierunki, wykonaj reset. Oczekiwane wyniki opisano również bezpośrednio na stronie. Sprawdź szerokości 360 i 1440 px oraz obsługę klawiszem Tab. Otwarcie odnośnika powinno pokazać oficjalną stronę szkoły w nowej karcie.

## Źródła i ograniczenia

Stan treści: 23.11.2026. Użyto informacji zweryfikowanych podczas przygotowania wizualizacji ZSP6:

- https://zsp6tom.pl/?page_id=3467
- https://zsp6tom.pl/?page_id=3520
- https://zsp6tom.pl/?page_id=23259
- https://zsp6tom.pl/?page_id=23255
- https://zsp6tom.pl/?page_id=2537

Logo pochodzi z materiałów wcześniejszego projektu ZSP6 i nie zostało przerysowane. Interfejs jest koncepcją do konsultacji, oznaczoną `noindex,nofollow`. Nie zastępuje oficjalnych zasad rekrutacji. Aktualizacje źródeł nie są automatycznie pobierane. Nie deklaruje się pełnego audytu WCAG ani zgodności ze wszystkimi przeglądarkami bez osobnej weryfikacji.

## Wyniki sprawdzeń

[Wykonane testy przeglądarki i logiki](QA.md) obejmują sześć szerokości ekranu oraz opisany przebieg demonstracji. Pełny wynik automatyczny: [test-results.txt](test-results.txt).


[Spis wszystkich dodatków](../../README.md) · [Zakres do wyceny](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
