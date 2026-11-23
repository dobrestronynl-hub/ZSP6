# Kontrola po usunięciu sidebaru i kursywy

Data: 23.11.2026. Zmiana na życzenie użytkownika po wersji `7cfda5181c6a5b046c4d57a79c96f45a65eae8e1`.

## Zakres zmiany

- Nagłówki hero w obu wersjach używają prostego kroju. Usunięto elementy `em` w tych nagłówkach.
- Usunięto ładowanie panelu funkcjonalności, jego przycisku mobilnego oraz obu plików `features.*`.
- Usunięto reguły rezerwujące miejsce dla sidebaru. Pełna nawigacja jest ponownie widoczna przy 1440 px.
- Podstawowe funkcje strony szkoły i ekran dwuskrzydłowych drzwi zostały zachowane.

## Wykonane sprawdzenia

Obie strony otwarto w Chromium w ramce o rzeczywistych szerokościach 360, 390, 768, 1024, 1440 i 1920 px, wysokości 820 px. Skalowana była wyłącznie prezentacja ramki, nie viewport. To 12 układów sprawdzonych po tej zmianie.

W każdym przypadku:

- `scrollWidth` nie przekracza szerokości viewportu;
- wszystkie elementy w `h1` mają obliczony `font-style: normal`;
- brak węzłów `#fx-sidebar` i `.fx-trigger`;
- jeden nagłówek `h1`;
- menu dostępne przy wąskich szerokościach, pełna nawigacja przy 1440 i 1920 px.

Surowe wyniki: [layout-clean.json](qa/layout-clean.json).

Kontrola `python3 scripts/check.py` oraz build `python3 scripts/build.py` zakończyły się powodzeniem. Kontrola obejmuje 3 strony, 53 lokalne linki, 14 odwołań do zasobów, unikalne ID, etykiety i powiązania ARIA, wymiary i opisy obrazów oraz składnię `site.js`.

## Podglądy

- [Editorial bez sidebaru](qa/editorial-clean.jpg)
- [Kreatywna bez sidebaru](qa/creative-clean.jpg)

## Granice weryfikacji

Kontrola dotyczy opisanej zmiany i nie jest pełnym audytem WCAG. Nie obejmuje fizycznych telefonów, VoiceOver/NVDA ani wszystkich przeglądarek. Wyniki wcześniejszych testów drzwi, galerii, wyszukiwania, dokumentów i formularza pozostają w historii repozytorium. Dodatkowe moduły są testowane w ich odrębnych projektach.
