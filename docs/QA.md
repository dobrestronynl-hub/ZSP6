# ZSP6 — raport wykonanych sprawdzeń

**Data: 23.11.2026.** Raport dotyczy lokalnego kandydata do publikacji przygotowanego po bazowym commicie `8f676e03e4af4f3ca6a498724369d6ad5b53adab`. Nie jest potwierdzeniem publicznego wdrożenia tego kandydata.

## Środowisko i sposób pomiaru

Testy wizualne i interakcyjne wykonano w Chromium przez interfejs CUA. Każdą stronę otwierano w ramce o rzeczywistym viewporcie o zadanej szerokości i wysokości **820 px**. Skalowanie obrazu ramki służyło wyłącznie prezentacji; nie zmieniało szerokości używanej do obliczenia układu i media queries.

Fotografie z witryny szkoły zostały załadowane i obejrzane. W tych testach nie zastępowano ich planszami offline. Test ramki w Chromium nie jest testem fizycznego telefonu.

## Układy i przewijanie

| Szerokość viewportu | Wrota | Editorial | Kreatywna |
| --- | --- | --- | --- |
| 360 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |
| 390 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |
| 768 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |
| 1024 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |
| 1440 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |
| 1920 px | Bez poziomego przepełnienia | Bez poziomego przepełnienia | Bez poziomego przepełnienia |

Łącznie: **18 układów**. Przy 1440 i 1920 px widoczny jest prawy panel funkcji; przy mniejszych szerokościach dostępny jest przycisk otwierający panel.

Dodatkowy pomiar przy szerokości strony 360 px:

- Panel listy funkcji: szerokość zewnętrzna 345 px; `scrollWidth = clientWidth = 329 px`.
- Okno pojedynczego modułu: szerokość zewnętrzna 325 px; `scrollWidth = clientWidth = 308 px`.

Surowe wyniki: [layout-results.json](qa/layout-results.json).

## Sprawdzone interakcje strony

| Obszar | Wykonane sprawdzenie | Wynik |
| --- | --- | --- |
| Wrota | Wejście do obu wersji i powrót przyciskiem Wstecz | Oba odsyłacze prowadzą do właściwych stron; stan wrót resetuje się i umożliwia kolejny wybór |
| Nawigacja i wyszukiwanie | Otwarcie wyszukiwarki, hasło `duplikat`, zamknięcie Escape | Wynik dokumentu jest dostępny; Escape zamyka nakładkę |
| Katalog kierunków | Wybór fotografii | Szczegóły kierunku aktualizują się |
| Galeria | Filtr Fotografia, powiększenie, następne zdjęcie, Escape | Dwa materiały fotograficzne; nawigacja i zamknięcie powiększenia działają |
| Aktualności | Filtr Projekty | Jedna pozycja dotycząca Erasmus+ |
| Kalendarz | Przejście do grudnia i wybór 23.12.2026 | Wyświetlana jest zimowa przerwa świąteczna |
| Kontakt | Poprawne wypełnienie formularza i sprawdzenie pól | Pojawia się komunikat o braku wysyłki; adres strony nie zmienia się |

## Sprawdzone demonstracje w panelu

Otworzono wszystkie osiem modułów. Sprawdzono dopasowanie kierunku, zaznaczanie i ponowne odczytanie checklisty, wybór spotkania, wyszukiwanie dokumentu hasłem `maloletnich`, filtrowanie portfolio do dwóch fotografii i ich powiększenie, przypinanie odnośnika w widoku rodzica, zmianę tematu sprawy w sekretariacie oraz aktualizację podglądu edytora podczas pisania.

Sprawdzono także dodawanie modułów do zakresu i odczytanie tego samego wyboru w drugiej wersji strony. To zapis lokalny dla tej samej przeglądarki i originu, bez synchronizacji między urządzeniami.

### Pobrane pliki

Pobrano i odczytano rzeczywiste pliki wygenerowane przez interfejs:

| Plik | Sprawdzona zawartość |
| --- | --- |
| Podsumowanie zakresu TXT | Dwa wybrane moduły, ich zakres oraz informacja o ustaleniu wyceny; brak wymyślonych cen |
| Szkic aktualności TXT | Tytuł i treść zgodne z tekstem wpisanym do edytora; oznaczenie demonstracji |
| Przykładowe wydarzenie ICS | Data 10.12.2026, godzina 10:00 w Polsce zapisana jako `DTSTART:20261210T090000Z`; oznaczenie DEMO |

**Druk/PDF:** sprawdzono wygenerowaną strukturę podsumowania przeznaczoną do druku. Zdalny Chromium nie pokazał natywnego okna drukowania. Nie potwierdzono wizualnie końcowego PDF ani wydruku — poprawny DOM nie jest równoważny takiej walidacji.

## Kontrola statyczna i build

Wykonano:

```bash
python3 scripts/check.py
python3 scripts/build.py
```

Kontrola strukturalna zakończyła się powodzeniem: trzy strony, 53 lokalne odnośniki i 18 odwołań do lokalnych zasobów; brak zduplikowanych identyfikatorów i uszkodzonych kotwic; poprawne powiązania ARIA i etykiet; obrazy mają `alt` i wymiary. Formularze demonstracyjne nie mają nazwanych pól ani natywnych przycisków wysyłania. Sprawdzenie składni obu plików JavaScript przez `node --check` oraz build do `dist/` zakończyły się powodzeniem.

Przegląd wykrył i usunął dwa błędy CSS: rozbieżność nazw selektorów kalendarza z HTML oraz niewystarczający kontrast przycisku w stanie focus. Dla poprawionego jasnego tekstu na tle `#b9470b` obliczono kontrast **5,29:1**. Ten wynik dotyczy wskazanej pary kolorów, nie całej strony.

## Materiał wizualny

- [Editorial — desktop](qa/editorial-desktop.jpg)
- [Kreatywna — desktop](qa/creative-desktop.jpg)
- [Editorial — mobile](qa/editorial-mobile.jpg)
- [Panel funkcji — mobile](qa/sidebar-mobile.jpg)
- [Kreatywna — mobile](qa/creative-mobile.jpg)
- [Wrota — mobile](qa/gate-mobile.jpg)

## Granice weryfikacji

Obsługę `prefers-reduced-motion` sprawdzono w kodzie; nie przełączano ustawienia ograniczenia ruchu w systemie podczas testów wizualnych. Nie wykonano testów z NVDA lub VoiceOver, na fizycznych telefonach, w Safari ani Firefox. Nie przeprowadzono pełnego audytu WCAG 2.2 AA, pomiaru Lighthouse ani wizualnej walidacji PDF.

Wyniki opisują wykonane sprawdzenia, a nie gwarancję braku każdego możliwego błędu. Publiczna dostępność trzech adresów oraz zgodność opublikowanej wersji z właściwym commitem wymagają sprawdzenia po publikacji. Pochodzenie treści, materiałów i stan potwierdzenia praw opisuje [SOURCES.md](SOURCES.md).
