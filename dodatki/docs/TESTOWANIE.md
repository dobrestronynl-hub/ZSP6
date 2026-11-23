# Testowanie dodatków ZSP6

Dokument zawiera sposób uruchomienia, scenariusze odbioru i zakres już wykonanej weryfikacji. Każdy moduł można sprawdzić niezależnie. Testy nie wymagają danych prawdziwego kandydata i nie wysyłają wiadomości do szkoły.

## Uruchomienie

W katalogu głównym repozytorium:

```bash
python3 -m http.server 8000
```

Otwórz `http://localhost:8000/`, następnie wybierz demonstrację. Aby sprawdzić sam moduł, tę samą komendę można uruchomić w katalogu `moduly/<nazwa>`. Moduły JavaScript wymagają HTTP; otwarcie pliku HTML dwukrotnym kliknięciem może blokować interakcje.

## Automatyczna kontrola

Wymagane są Python 3 i Node.js obsługujący `node:test`. Instalacja pakietów nie jest potrzebna.

```bash
node --test moduly/*/tests.mjs
python3 scripts/check.py
python3 scripts/build.py
```

Testy logiki powinny zakończyć się kodem 0. Kontrola statyczna powinna wskazać brak błędów, a build przygotować pliki do publikacji w `dist/`. Wynik któregokolwiek sprawdzenia dotyczy tylko testowanego kodu. Nie dowodzi działania integracji, których demonstracje nie zawierają.

W wybranym katalogu modułu można również wykonać:

```bash
node --test tests.mjs
node --check module.mjs
node --check logic.mjs
```

## Scenariusze ręczne

| Moduł | Działanie | Oczekiwany wynik |
| --- | --- | --- |
| Asystent | Kliknij „Pokaż kierunek” bez zainteresowania, następnie wybierz fotografię i rekrutację. | Pusty wybór wymaga uzupełnienia. Poprawny wybór pokazuje technika fotografii i multimediów oraz oficjalny odnośnik do rekrutacji. Reset usuwa wynik. |
| Checklista | W liceum zaznacz dwie pozycje, w technikum jedną. Odśwież, wróć do liceum i pobierz TXT. | Stany wynoszą odpowiednio 2 z 5 i 1 z 4. Zapis zachowuje się w tej samej przeglądarce przy dostępnym localStorage. TXT odzwierciedla wybraną ścieżkę. Reset liceum nie zeruje technikum. |
| Dni otwarte | Ustaw 10.12.2026 o 10:00, pobierz ICS. Powtórz dla 10.07.2027 o 10:00. | W pierwszym pliku występuje `DTSTART:20261210T090000Z`, a w drugim `DTSTART:20270710T080000Z`. Oba pliki mają oznaczenie DEMO. Usunięcie daty blokuje eksport. |
| Biblioteka dokumentów | Wpisz `maloletnich`, następnie nieistniejącą frazę, a na końcu wyczyść filtry. | Wyniki kolejno: 1 z 8, 0 z 8 oraz pełne 8 z 8. Odnośnik materiału prowadzi do szkolnego źródła. |
| Portfolio | Wybierz Fotografia, otwórz pierwszą pracę, przejdź do następnej i zamknij Escape. | Widoczne są dwie prace. Podgląd porusza się wyłącznie w tej kategorii. Escape zamyka okno i przywraca focus do elementu, który je otworzył. |
| Panel ucznia i rodzica | Wybierz Rodzica, przypnij rekrutację i odśwież stronę. | Rola i przypięcie pozostają przy dostępnym localStorage. Przełączenie na Ucznia filtruje zawartość. „Wyczyść ustawienia” przywraca stan początkowy. |
| Sprawy sekretariatu | Wybierz duplikat świadectwa i pobierz instrukcję TXT. Następnie zmień temat na współpracę. | Instrukcja i eksport odpowiadają bieżącej sprawie. Dokument świadectwa pochodzi ze źródła szkoły. Zmiana tematu aktualizuje treść. Nie powstaje zgłoszenie. |
| Edytor aktualności | Zmień tytuł i treść, wpisując także `<strong>Przykład</strong>`. Pobierz TXT, a potem usuń tytuł. | Podgląd odpowiada polom, a znaczniki HTML pozostają tekstem. TXT zawiera szkic. Pusty tytuł blokuje pobranie. Przywrócenie przykładu odtwarza treść demonstracyjną. |

Szczegółowe scenariusze, selektory i przypadki brzegowe znajdują się w README każdego modułu. Występują także bezpośrednio w interfejsach, w sekcji „Przetestuj sam”. Import pliku ICS do własnego kalendarza jest dobrowolnym krokiem testującego. Pobranie pliku nie rezerwuje spotkania.

## Układ i obsługa

Sprawdź strony przy szerokościach 360, 390, 768, 1024, 1440 i 1920 px. Treść powinna pozostawać czytelna bez poziomego przewijania dokumentu. Zwróć uwagę na długie tytuły, etykiety formularzy, przyciski i powiększone fotografie.

Przejdź klawiszem Tab przez aktywne elementy. Focus powinien być widoczny, kolejność logiczna, a przyciski i odnośniki dostępne z klawiatury. Sprawdź zamykanie galerii Escape i powrót do elementu otwierającego. Przy zablokowanym localStorage checklista i panel powinny działać w pamięci otwartej strony i wyjaśniać brak trwałego zapisu.

## Wykonane sprawdzenia lokalne

Podczas przygotowania samodzielnych modułów 23.11.2026 zakończono powodzeniem osiem zestawów testów logiki oraz kontrole składni JavaScript. W Chromium wykonano 48 kontroli układu: osiem modułów na sześciu wymienionych szerokościach, przy wysokości 820 px. We wszystkich sprawdzonych układach stwierdzono brak poziomego przewijania dokumentu i pojedynczy nagłówek H1.

Sprawdzono główne interakcje, zapis checklisty i przypięć po odświeżeniu, filtrowanie dokumentów i prac, zamykanie galerii oraz podgląd edytora. Rzeczywiście pobrano i odczytano pliki TXT oraz ICS. W edytorze potwierdzono, że wpisane znaczniki HTML nie tworzą elementów w podglądzie.

| Moduł | Raport i pomiary |
| --- | --- |
| Asystent kierunku | [QA](../moduly/asystent-kierunku/QA.md) · [Testy logiki](../moduly/asystent-kierunku/test-results.txt) · [Pomiary układu](../moduly/asystent-kierunku/layout-results.json) |
| Checklista rekrutacji | [QA](../moduly/checklista-rekrutacji/QA.md) · [Testy logiki](../moduly/checklista-rekrutacji/test-results.txt) · [Pomiary układu](../moduly/checklista-rekrutacji/layout-results.json) |
| Dni otwarte | [QA](../moduly/dni-otwarte/QA.md) · [Testy logiki](../moduly/dni-otwarte/test-results.txt) · [Pomiary układu](../moduly/dni-otwarte/layout-results.json) |
| Biblioteka dokumentów | [QA](../moduly/biblioteka-dokumentow/QA.md) · [Testy logiki](../moduly/biblioteka-dokumentow/test-results.txt) · [Pomiary układu](../moduly/biblioteka-dokumentow/layout-results.json) |
| Portfolio uczniów | [QA](../moduly/portfolio-uczniow/QA.md) · [Testy logiki](../moduly/portfolio-uczniow/test-results.txt) · [Pomiary układu](../moduly/portfolio-uczniow/layout-results.json) |
| Panel ucznia i rodzica | [QA](../moduly/panel-ucznia-rodzica/QA.md) · [Testy logiki](../moduly/panel-ucznia-rodzica/test-results.txt) · [Pomiary układu](../moduly/panel-ucznia-rodzica/layout-results.json) |
| Sprawy sekretariatu | [QA](../moduly/sprawy-sekretariatu/QA.md) · [Testy logiki](../moduly/sprawy-sekretariatu/test-results.txt) · [Pomiary układu](../moduly/sprawy-sekretariatu/layout-results.json) |
| Edytor aktualności | [QA](../moduly/edytor-aktualnosci/QA.md) · [Testy logiki](../moduly/edytor-aktualnosci/test-results.txt) · [Pomiary układu](../moduly/edytor-aktualnosci/layout-results.json) |

## Weryfikacja po publikacji

Po opublikowaniu konkretnej wersji należy otworzyć spis funkcjonalności i wszystkie osiem demonstracji z publicznego adresu. Sprawdzenie powinno objąć ładowanie CSS, modułów JavaScript i logo, przejście do modułu i powrót, co najmniej jedną główną interakcję każdego modułu oraz pobieranie plików w opublikowanej witrynie.

Dotychczasowe raporty lokalne nie stanowią potwierdzenia publikacji repozytorium ani włączenia GitHub Pages. Status wdrożenia i jego zweryfikowany adres należy podawać dopiero po zakończeniu tego etapu.

## Ograniczenia weryfikacji

Nie wykonano pełnego audytu WCAG 2.2 AA ani testów na fizycznych telefonach, Safari, Firefox, NVDA i VoiceOver. Nie sprawdzano zapisu w CMS, wysyłki formularzy, rezerwacji lub uprawnień kont, ponieważ tych usług nie ma w demonstracjach. Zewnętrzne dokumenty i fotografie zależą od dostępności oficjalnego serwera szkoły. Testy lokalne nie zastępują odbioru przyszłego wdrożenia produkcyjnego.
