# ZSP6 — dwie nowe wizualizacje strony szkoły

Nieoficjalny projekt koncepcyjny dla Zespołu Szkół Ponadpodstawowych nr 6 im. Stanisława Wyspiańskiego w Tomaszowie Mazowieckim.

## Podgląd

- `index.html` — pełnoekranowe dwuskrzydłowe wrota 3D z wyborem wersji
- `oficjalna.html` — **Wyspiański Editorial**, układ inspirowany magazynem artystycznym
- `kreatywna.html` — **Kreatywna Pracownia**, nowoczesna przestrzeń wystawiennicza i portfolio

Wszystkie pliki na gałęzi `main`. Strony korzystają z `assets/site.css` i `assets/site.js`, bez frameworków i zewnętrznych skryptów.

## Demonstracje

Lokalne wyszukiwanie informacji, interaktywny wybór kierunków, filtry galerii i aktualności, kalendarz roku szkolnego, centrum rekrutacji z linkiem do oficjalnego naboru, szybkie odnośniki dla uczniów i rodziców, dokumenty (rzeczywisty PDF / oficjalne strony), opisy pracowni oraz formularz kontaktowy z walidacją. Formularz nie wysyła i nie zapisuje żadnych danych. Nie udajemy backendu szkoły.

## Źródła

Oficjalna witryna: https://zsp6tom.pl/
Kierunki: https://zsp6tom.pl/?page_id=3467 , https://zsp6tom.pl/?page_id=3520 , https://zsp6tom.pl/?page_id=23259 , https://zsp6tom.pl/?page_id=23255 .
Rekrutacja: https://zsp6tom.pl/?page_id=2537 .
Kalendarz: https://zsp6tom.pl/?page_id=3042 .
Erasmus+: https://zsp6tom.pl/?page_id=1749 .

Wykorzystano przekazane przez użytkownika oryginalne logo, osadzone w plikach HTML jako dane obrazu. Fotografie są ładowane z oryginalnych adresów szkoły, bez kopiowania zdjęć do repozytorium. Przed produkcyjnym wykorzystaniem fotografii i wizerunków uczniów należy uzgodnić stosowne prawa i zgody. Ich wyświetlanie wymaga dostępu do serwera szkoły.

## Testy

Chromium/Playwright, szerokości: **360, 390, 768, 1024, 1440, 1920 px**. Sprawdzono trzy widoki, poziome przewijanie (brak), błędy JS (brak) oraz lokalne interakcje: wyszukiwarka, filtrowanie galerii, kalendarz, wybór kierunku, walidację formularza. Test offline zastąpił zdjęcia zewnętrzne planszami. Nie wykonano pełnego niezależnego audytu WCAG 2.2 AA z czytnikami ekranu.

## Publikacja

W GitHub `Settings → Pages` wybierz `Deploy from a branch`, `main`, `/(root)`. Docelowy URL: https://dobrestronynl-hub.github.io/ZSP6/ . Dostępność publicznego hostingu należy zweryfikować osobno.
