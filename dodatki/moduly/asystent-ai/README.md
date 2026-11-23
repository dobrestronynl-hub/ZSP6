# ZSP6: Asystent AI szkoły

## Otwórz wizualizację

[Zobacz asystenta i rozpocznij rozmowę](https://dobrestronynl-hub.github.io/ZSP6/dodatki/moduly/asystent-ai/index.html)

Okno rozmowy jest widoczne od razu. Możesz wybrać przykładowe pytanie albo napisać własne, przeczytać odpowiedź i przejść do właściwego źródła. Przycisk „Pokaż na stronie” przedstawia tę samą rozmowę jako otwierany panel osadzony przy stronie szkoły.

**Tryb demonstracyjny, bez połączenia z modelem AI.** Odpowiedzi wybiera lokalny mechanizm korzystający z przygotowanej bazy informacji. Wizualizacja pokazuje interfejs, sposób prowadzenia rozmowy i zastosowania przyszłego asystenta. Nie generuje odpowiedzi przy użyciu modelu językowego i nie pobiera na bieżąco strony szkoły.

## Co to robi

Asystent pomaga znaleźć informację bez wcześniejszej znajomości menu szkolnej strony. Rozmowę można zacząć od zainteresowania, konkretnego pytania o rekrutację lub codziennej sprawy. Odpowiedź prowadzi do odpowiednich materiałów szkoły, a podpowiedzi ułatwiają zadanie kolejnego pytania.

Demonstracyjna baza obejmuje:

- ofertę Liceum Sztuk Plastycznych i Technikum nr 5, w tym plastykę, grafikę i poligrafię cyfrową, fotografię i multimedia oraz usługi fryzjerskie;
- porównanie wybranych ścieżek, przykłady umiejętności i informacje o pracowniach;
- zasady przygotowania do rekrutacji i dotarcie do wymaganych dokumentów;
- materiały dla uczniów i rodziców, wybrane sprawy sekretariatu oraz kontakt ze szkołą;
- wskazanie oficjalnego źródła dla aktualnych terminów i wydarzeń.

Krótkie dopowiedzenie może korzystać z tematu poprzedniego pytania. Nie oznacza to dowolnego rozumienia języka przez model: demonstracja obsługuje przygotowane tematy i ich rozpoznawanie. Gdy nie zna odpowiedzi, informuje o tym i podpowiada, gdzie jej szukać. Nie dopisuje dat rekrutacji ani nie obiecuje wykonania czynności w systemie szkoły.

## Dlaczego się przyda

| Odbiorca | Przykładowa potrzeba | Pomoc asystenta |
| --- | --- | --- |
| Kandydat | „Lubię robić zdjęcia. Jaki kierunek sprawdzić?” | Łączy zainteresowanie z nazwą kierunku, objaśnia program i prowadzi do rekrutacji. |
| Rodzic | „Gdzie znajdę dokumenty i obowiązujące terminy?” | Wskazuje odpowiedni dział i źródło, które można samodzielnie sprawdzić. |
| Uczeń | „Jak przygotować się do sprawy w sekretariacie?” | Prowadzi do właściwej instrukcji lub kontaktu, bez udawania przyjęcia zgłoszenia. |
| Sekretariat i osoby prowadzące rekrutację | Powtarzalne pytania o publicznie dostępne informacje. | Może przejąć część nawigowania po materiałach i pomóc rozmówcy lepiej opisać sprawę wymagającą pracownika. |

Przydatność zależy od aktualności bazy i jakości odpowiedzi. Projekt nie przypisuje funkcji z góry określonej oszczędności czasu ani wyniku rekrutacji.

## Co można sprawdzić w interfejsie

- Rozmowę z własnym pytaniem i gotowymi propozycjami na start.
- Krótkie odpowiedzi, odnośniki do źródeł i podpowiedzi dalszej rozmowy.
- Zmianę tematu oraz wykorzystanie prostego kontekstu pytania.
- „Nową rozmowę”, która czyści bieżący wątek.
- „Zapisz rozmowę”, czyli lokalne pobranie pliku TXT z treścią i źródłami.
- „Pokaż na stronie”, czyli podgląd asystenta przy przykładowym widoku witryny. Panel można zamknąć i ponownie otworzyć przyciskiem „Zapytaj szkołę”.
- Objaśnienia w sekcji „AI oparte na wiedzy szkoły” oraz pod nagłówkiem „Co działa teraz, a co obejmuje wdrożenie AI?”.

Rozmowa pozostaje w pamięci otwartej karty. Nie jest zapisywana w bazie danych ani przesyłana do szkoły lub dostawcy modelu. Odświeżenie strony rozpoczyna nową sesję; pobrany TXT pozostaje plikiem użytkownika. Przejście do oficjalnego źródła jest zwykłym otwarciem zewnętrznego odnośnika.

## Jak działałby docelowy asystent AI

W wersji produkcyjnej model powinien odpowiadać na podstawie zatwierdzonych materiałów szkoły. Dla każdego pytania system najpierw wyszukuje pasujące fragmenty, a następnie przekazuje je modelowi wraz z kontekstem rozmowy. Odpowiedź powinna zawierać odnośniki, pozwalać sprawdzić źródło i sygnalizować brak potwierdzonej informacji.

Taka baza może obejmować programy kierunków, zasady rekrutacji, dokumenty, kalendarz i procedury. Materiały trzeba opisywać datą oraz rokiem szkolnym, aby dawne informacje nie stawały się odpowiedzią na pytanie o bieżący nabór. Zmiany w CMS lub dokumentach powinny aktualizować bazę według ustalonego procesu. Szkoła wskazuje osoby zatwierdzające treści i poprawki.

Do wdrożenia potrzebne są:

1. Zatwierdzone źródła i zakres spraw, w których asystent pomaga.
2. Serwer obsługujący model i wyszukiwanie w bazie. Klucz usługi pozostaje po stronie serwera, poza kodem dostarczanym przeglądarce.
3. Proces aktualizacji treści, kontroli odpowiedzi i wycofywania nieaktualnych informacji.
4. Limity użycia, obsługa błędów oraz czytelne przejście do kontaktu ze szkołą, gdy pytanie wymaga pracownika.
5. Ustalone zasady historii rozmów, danych użytkowników i raportów jakości.
6. Testy na pytaniach szkoły, obejmujące także brak danych, sprzeczne źródła i zmianę roku rekrutacji.

Można dodać inne języki, połączenie z CMS lub wskazywanie konkretnej sekcji dokumentu. Zakres tych funkcji wymaga osobnego uzgodnienia. Przedstawiony asystent nie ma dostępu do ocen, frekwencji ani indywidualnych danych uczniów. Nie składa wniosku, nie rezerwuje spotkania i nie podejmuje decyzji o przyjęciu do szkoły.

## Przetestuj sam

| Krok | Wpisz lub wykonaj | Oczekiwany wynik |
| --- | --- | --- |
| Zainteresowanie | „Interesuje mnie fotografia”. | Odpowiedź o techniku fotografii i multimediów oraz odnośnik do oficjalnego opisu. |
| Porównanie | „Porównaj fotografię i grafikę”. | Czytelne różnice między fotografią i multimediami a grafiką i poligrafią cyfrową, z odpowiednimi źródłami. |
| Dopowiedzenie | Po pytaniu o fotografię wpisz „A jakie dokumenty?”. | Odpowiedź wykorzystuje kontekst rekrutacyjny i prowadzi do właściwych informacji. |
| Aktualny termin | „Do kiedy można złożyć wniosek?”. | Brak wymyślonej daty; przejście do oficjalnych zasad i bieżącego harmonogramu. |
| Dokumenty | „Gdzie znajdę dokumenty dla ucznia?”. | Odnośnik do materiałów szkoły, nie pusty przycisk ani udawane pobranie. |
| Brak wiedzy | „Jaka będzie pogoda jutro?”. | Jasna informacja, że ta baza nie odpowiada na pytanie; brak zgadywania. |
| Nowy wątek | Wybierz „Nowa rozmowa”. | Poprzedni wątek i jego kontekst są wyczyszczone. |
| Panel na stronie | Wybierz „Pokaż na stronie”, zamknij panel i ponownie wybierz „Zapytaj szkołę”. | Widać, jak asystent może działać przy witrynie; zamknięcie panelu nie wysyła rozmowy ani nie tworzy zgłoszenia. |
| Eksport | Po krótkiej rozmowie wybierz „Zapisz rozmowę”. | Pobiera się TXT z oznaczeniem demonstracji, treścią i wykorzystanymi odnośnikami. |

Przejdź po elementach klawiszem Tab, sprawdź widoczny focus i zamykanie podglądu klawiszem Escape. Sprawdź także dłuższą rozmowę na ekranie 360 px: wiadomości powinny się mieścić, a pole pytania pozostawać dostępne. Używaj wyłącznie przykładowych danych.

## Uruchomienie i testy techniczne

Moduł działa jako statyczna strona z JavaScriptem typu module. Z katalogu repozytorium:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/moduly/asystent-ai/`. Nie jest potrzebna instalacja pakietów npm. Otwarcie HTML przez `file://` może blokować importy modułów.

Z katalogu modułu:

```bash
node --test tests.mjs
node --check logic.mjs
node --check module.mjs
```

`logic.mjs` eksportuje funkcję `answerQuestion(message, context)`. Zwraca rodzaj odpowiedzi, akapity, ewentualne punkty, źródła, działania, podpowiedzi i kontekst ograniczony do identyfikatorów tematu, kierunku oraz odbiorcy. Nie wykonuje wywołań sieciowych. Limit pojedynczego pytania wynosi 600 znaków.

Testy jednostkowe powinny sprawdzać rozpoznanie przygotowanych tematów, użycie kontekstu, odpowiedź przy braku wiedzy, błędne dane wejściowe oraz poprawność oficjalnych odnośników. Wynik polecenia dotyczy logiki tej demonstracji. Nie jest testem rzeczywistego modelu AI ani pełnym audytem dostępności. Weryfikację interfejsu i publikacji trzeba przeprowadzić osobno dla danej wersji.

## Źródła

Materiały sprawdzone podczas przygotowania demonstracji 23.11.2026:

- [Liceum Sztuk Plastycznych](https://zsp6tom.pl/?page_id=3467).
- [Technik grafiki i poligrafii cyfrowej](https://zsp6tom.pl/?page_id=3520).
- [Technik fotografii i multimediów](https://zsp6tom.pl/?page_id=23259).
- [Technik usług fryzjerskich](https://zsp6tom.pl/?page_id=23255).
- [Rekrutacja](https://zsp6tom.pl/?page_id=2537).
- [Materiały dla uczniów](https://zsp6tom.pl/?page_id=3042).
- [Materiały dla rodziców](https://zsp6tom.pl/?page_id=2906).
- [Kontakt ze szkołą](https://zsp6tom.pl/?page_id=318).

Logo pochodzi z materiałów istniejącego projektu ZSP6. Źródła zewnętrzne nie są automatycznie synchronizowane z demonstracją. Aktualne zasady i terminy należy sprawdzać w oficjalnych materiałach. Strona jest wizualizacją oznaczoną `noindex,nofollow`.

[Spis dodatków](../../README.md) · [Zakres wdrożenia](../../docs/ZAKRES-WYCENY.md) · [Wspólna instrukcja testowania](../../docs/TESTOWANIE.md)
