# Funkcjonalności ZSP6: zakres do rozmowy i wyceny

Ten dokument pozwala ocenić każdą funkcjonalność osobno. Opisuje działającą demonstrację, jej zastosowanie i decyzje potrzebne do przygotowania wyceny. W repozytorium nie ma cen przykładowych ani mechanizmu, który udaje wiążącą ofertę.

Podstawowy interfejs może działać bez serwera aplikacyjnego. Jeżeli treści mają edytować pracownicy szkoły, trzeba dodatkowo uzgodnić panel administracyjny. Jeżeli użytkownicy mają składać wnioski, rezerwować miejsca lub korzystać z danych prywatnych, potrzebne są rzeczywiste usługi, uprawnienia i proces obsługi po stronie szkoły.

## Asystent AI szkoły

**Co robi demonstracja:** udostępnia okno rozmowy, w którym można zadać pytanie własnymi słowami lub wybrać podpowiedź. Przygotowane odpowiedzi obejmują kierunki, porównanie fotografii i grafiki, rekrutację, dokumenty, sprawy sekretariatu i kontakt. Krótkie dopowiedzenie może korzystać z tematu poprzedniego pytania. Odpowiedzi zawierają odnośniki do odpowiednich materiałów szkoły. Gdy lokalna baza nie zawiera potrzebnej informacji, asystent wskazuje źródło lub kontakt zamiast dopisywać odpowiedź.

**Tryb demonstracyjny:** obecne odpowiedzi wybiera mechanizm lokalny. Nie ma połączenia z modelem AI, automatycznego pobierania witryny ani zapisu rozmów na serwerze. Wizualizacja pozwala ocenić sposób korzystania z asystenta. Wersja produkcyjna z rzeczywistym modelem wymaga osobnej integracji.

**Dlaczego się przyda:** kandydat może zapytać o swoje zainteresowania i porównać kierunki bez znajomości nazw zawodów. Rodzic szybciej dociera do zasad rekrutacji i dokumentów. Uczeń znajduje właściwą procedurę lub dział strony. Sekretariat może otrzymywać mniej powtarzalnych pytań o informacje już opublikowane, a częściej pytania dotyczące konkretnej sprawy. Nie zakłada się z góry liczby zaoszczędzonych godzin.

**Docelowe działanie AI:** model otrzymuje pytanie oraz pasujące fragmenty zatwierdzonej bazy wiedzy szkoły. Odpowiedź powinna zawierać właściwe odnośniki, uwzględniać kontekst rozmowy i jasno wskazywać brak potwierdzonej informacji. Materiały rekrutacyjne muszą być przypisane do właściwego roku. Aktualizacje strony lub dokumentów trafiają do bazy zgodnie z uzgodnionym procesem. Sam chatbot nie podejmuje decyzji o przyjęciu, nie potwierdza złożenia wniosku ani nie uzyskuje dostępu do ocen.

**Minimum wdrożenia AI:** zatwierdzone źródła i zakres pytań, konfiguracja modelu, serwer obsługujący rozmowę, bezpieczne przechowywanie klucza usługi po stronie serwera oraz przygotowanie i aktualizacja bazy wiedzy. Należy ustalić obsługę niedostępności modelu, limity użycia, zasady historii rozmów i kontakt ze szkołą w sprawach wymagających pracownika. Interfejs można osadzić w obecnej stronie lub WordPressie jako otwierany panel.

**Co wpływa na zakres:** liczba i format dokumentów, sposób aktualizacji treści, obsługiwane języki, złożoność wyszukiwania źródeł, raporty jakości odpowiedzi i integracje. Korzystanie z modelu oraz hostingu może wiązać się z bieżącymi opłatami zależnymi od wybranej usługi i użycia. Konkretne usługi i kwoty wymagają ustalenia przed wdrożeniem.

**Do ustalenia ze szkołą:** kto zatwierdza bazę wiedzy, kto reaguje na błędne lub nieaktualne odpowiedzi, jakie pytania chatbot ma obsługiwać i do kogo kierować sprawy indywidualne. Dostęp do danych uczniów nie jest częścią tej koncepcji.

[Wizualizacja i testowanie](../moduly/asystent-ai/README.md)

## Asystent wyboru kierunku

**Co robi teraz:** po wyborze jednego z czterech obszarów zainteresowań pokazuje kierunek, objaśnienie i uzasadnienie. Drugi wybór prowadzi do programu albo zasad rekrutacji. Działa walidacja, reset i przejście do oficjalnych informacji.

**Dlaczego się przyda:** kandydat zaczyna od znanych mu zainteresowań, a następnie poznaje formalną nazwę kierunku. Rodzic może sprawdzić uzasadnienie i źródła. Osoba prowadząca rekrutację otrzymuje wspólny materiał do wyjaśniania oferty.

**Minimum wdrożenia:** zatwierdzone pytania, opisy, reguły oraz odnośniki; dostosowanie do strony szkoły; wskazanie osoby aktualizującej treści. Podstawowa wersja działa statycznie. W WordPressie można umieścić ją jako osobny moduł strony, a edycję treści przez pracowników oprzeć na polach CMS.

**Co wpływa na wycenę:** liczba pytań i kierunków, porównanie kilku propozycji, przygotowanie tekstów, edycja reguł w panelu, obsługa wielu języków i uzgodnione statystyki użycia. Rozszerzenie nie powinno być przedstawiane jako profesjonalny test predyspozycji bez osobno opracowanej metodologii.

**Do ustalenia ze szkołą:** czy wystarcza proste wskazanie programu, czy potrzebne jest porównanie kilku ścieżek; kto zatwierdza reguły i kiedy sprawdza ich aktualność.

[Opis i testowanie](../moduly/asystent-kierunku/README.md)

## Osobista checklista rekrutacji

**Co robi teraz:** udostępnia pięć kroków dla liceum i cztery dla technikum, z opisami i odnośnikami. Oblicza postęp, zachowuje go w tej samej przeglądarce, pobiera listę TXT i resetuje każdą ścieżkę niezależnie.

**Dlaczego się przyda:** kandydat i rodzic widzą, co już sprawdzili i do czego powinni wrócić. Opiekun rekrutacji może kierować wszystkich do jednej uporządkowanej instrukcji. Aktualizacja linków i objaśnień jest skupiona w jednym module.

**Minimum wdrożenia:** zatwierdzenie kroków, uzupełnianie ich przy każdej rekrutacji, odnośniki do obowiązujących zasad i określenie osoby odpowiedzialnej. Wersja lokalna nie potrzebuje kont ani bazy danych. CMS może umożliwić edycję listy i jej treści.

**Co wpływa na wycenę:** liczba ścieżek i etapów, harmonogram roczny, panel aktualizacji, przypomnienia, synchronizacja między urządzeniami, logowanie i integracja z systemem naboru. Status zaznaczony przez użytkownika jest jego notatką, nie statusem wniosku w sekretariacie.

**Do ustalenia ze szkołą:** czy ma to być lista przygotowań, czy element rzeczywistego procesu rekrutacyjnego; czy użytkownik ma mieć konto i dostęp do postępu na różnych urządzeniach.

[Opis i testowanie](../moduly/checklista-rekrutacji/README.md)

## Dni otwarte i spotkania

**Co robi teraz:** pozwala wybrać przykładowy temat, datę, godzinę i czas trwania. Pokazuje podsumowanie i pobiera poprawnie datowany plik ICS z oznaczeniem DEMO. Nie rezerwuje miejsca.

**Dlaczego się przyda:** kandydat lub rodzic może zachować termin w swoim kalendarzu bez przepisywania szczegółów. Organizator i sekretariat mogą odsyłać do jednego opisu wydarzenia. Wspólny katalog ogranicza rozproszenie terminów w aktualnościach.

**Minimum wdrożenia:** rzeczywiste wydarzenia, zatwierdzone daty, miejsca, opisy i kontakty. Lista wydarzeń oraz eksport do kalendarza mogą działać statycznie. W WordPressie wydarzenia można prowadzić jako treści z datą i godziną.

**Co wpływa na wycenę:** powtarzalne wydarzenia, podział według odbiorców, synchronizowany kalendarz, limity miejsc, zapisy, rezygnacje, listy uczestników, przypomnienia i potwierdzenia e-mail. Zapisy wymagają backendu i wskazania osoby, która je obsługuje. Plik ICS pobrany jednorazowo nie aktualizuje się sam po zmianie terminu.

**Do ustalenia ze szkołą:** czy potrzebna jest wyłącznie prezentacja terminów, czy rzeczywista rezerwacja; kto publikuje, zmienia i odwołuje spotkania.

[Opis i testowanie](../moduly/dni-otwarte/README.md)

## Biblioteka dokumentów

**Co robi teraz:** przeszukuje osiem rzeczywistych odnośników według tytułu, opisu i rodzaju materiału, z filtrem odbiorcy. Rozpoznaje polskie znaki i ich zapis bez znaków diakrytycznych. Otwiera materiały ze źródła, nie przeszukuje treści PDF.

**Dlaczego się przyda:** użytkownik szuka dokumentu według sprawy, bez znajomości struktury szkolnej witryny. Sekretariat może podać jeden adres. Redaktor ma uporządkowaną listę materiałów, ich opisów i odbiorców.

**Minimum wdrożenia:** przegląd dokumentów, wskazanie aktualnych wersji, kategorie, odbiorcy, opisy i odpowiedzialność za utrzymanie. Panel WordPressa może umożliwić dodawanie pliku, tytułu i metadanych. Osobno należy ocenić dostępność samych dokumentów.

**Co wpływa na wycenę:** liczba dokumentów do uporządkowania, poprawa PDF, migracja plików, archiwum, wersjonowanie, terminy obowiązywania, wyszukiwanie wewnątrz PDF i dokumenty za logowaniem. Funkcja wyszukiwania po opisach ma inny zakres niż pełna indeksacja zawartości plików.

**Do ustalenia ze szkołą:** ile materiałów wymaga przeniesienia i uporządkowania, które mają pozostać w archiwum oraz kto zatwierdza aktualność.

[Opis i testowanie](../moduly/biblioteka-dokumentow/README.md)

## Portfolio uczniów

**Co robi teraz:** prezentuje osiem rzeczywistych prac z podziałem na dziedziny. Otwiera powiększony podgląd z podpisem i źródłem, pozwala przechodzić między pracami w wybranej kategorii oraz zamykać podgląd klawiaturą.

**Dlaczego się przyda:** kandydat ocenia rezultaty nauki na konkretnych przykładach. Nauczyciel może prezentować dorobek pracowni, a redakcja korzystać z jednego uporządkowanego katalogu podczas rekrutacji i dni otwartych.

**Minimum wdrożenia:** wybór materiałów, uzgodnione prawa i zgody, podpisy, teksty alternatywne, kategorie oraz przygotowanie plików o odpowiedniej jakości i wielkości. W CMS potrzebna jest edycja prac i ich opisów. Obecne obrazy demonstracyjne są odczytywane z serwera szkoły.

**Co wpływa na wycenę:** liczba materiałów i zakres ich obróbki, filtry według techniki lub roku, profile autorów, multimedia, dodawanie przez uczniów, zatwierdzanie przez nauczyciela i moderacja. Konta oraz przesyłanie plików wymagają backendu i uprawnień.

**Do ustalenia ze szkołą:** kto wybiera prace, kto może je dodawać i zatwierdzać, czy autorzy będą podpisywani oraz gdzie będą przechowywane pliki.

[Opis i testowanie](../moduly/portfolio-uczniow/README.md)

## Panel ucznia i rodzica

**Co robi teraz:** zmienia publiczne skróty według wybranej roli. Pozwala przypinać odnośniki i zachować wybór lokalnie. Czyszczenie ustawień przywraca widok początkowy. Wybór roli nie jest logowaniem.

**Dlaczego się przyda:** uczeń i rodzic mają krótszą drogę do codziennych informacji. Administrator utrzymuje katalog skrótów i przypisanie odbiorców w jednym miejscu. Użytkownik sam wybiera najpotrzebniejsze pozycje.

**Minimum wdrożenia:** ustalony zestaw odnośników dla obu ról, poprawne adresy i osoba odpowiedzialna za ich aktualizację. Wersja z ustawieniami tylko w przeglądarce może działać statycznie. CMS może udostępnić zarządzanie katalogiem skrótów.

**Co wpływa na wycenę:** dodatkowe grupy odbiorców, personalizacja, synchronizacja ustawień, konta, komunikaty dla wybranych grup i integracja z zewnętrznymi usługami. Dostęp do ocen lub frekwencji zależy od możliwości i zasad dostawcy e-dziennika; nie jest częścią obecnej demonstracji.

**Do ustalenia ze szkołą:** czy potrzebny jest publiczny punkt startowy, czy prywatny portal po zalogowaniu; które integracje są rzeczywiście dostępne.

[Opis i testowanie](../moduly/panel-ucznia-rodzica/README.md)

## Sprawy sekretariatu

**Co robi teraz:** po wyborze jednego z pięciu tematów pokazuje instrukcję, odpowiedni odnośnik i przykład pytania. Pobiera tę instrukcję do TXT. Nie rejestruje zgłoszenia.

**Dlaczego się przyda:** osoba kontaktująca się ze szkołą może wcześniej sprawdzić, co przygotować. Sekretariat otrzymuje bardziej konkretnie opisane pytania i może kierować do stałych instrukcji dla powtarzających się spraw.

**Minimum wdrożenia:** lista rzeczywistych spraw, zatwierdzone instrukcje, dokumenty, kontakty i właściciel treści. Przewodnik może być statyczny albo edytowany w CMS. Opłaty i terminy można podawać dopiero po ich potwierdzeniu przez szkołę.

**Co wpływa na wycenę:** liczba procedur, przygotowanie treści, formularze zgłoszeń, załączniki, numer sprawy, statusy, kolejka pracowników, powiadomienia i archiwum. Elektroniczna obsługa spraw wymaga serwera, uprawnień oraz ustalonego sposobu przechowywania danych.

**Do ustalenia ze szkołą:** które sprawy można wyjaśnić samą instrukcją, które wymagają formularza i kto obsługuje przesłane zgłoszenia.

[Opis i testowanie](../moduly/sprawy-sekretariatu/README.md)

## Wspólne ustalenia przed ofertą

| Decyzja | Co należy określić |
| --- | --- |
| Wybrane funkcjonalności | Które moduły wchodzą do zamówienia i w jakim wariancie. |
| Treści | Kto dostarcza i zatwierdza teksty, dokumenty, terminy oraz materiały wizualne. |
| Edycja | Które informacje pracownicy mają zmieniać samodzielnie w CMS. |
| Użytkownicy | Czy wystarczy dostęp publiczny i zapis lokalny, czy są potrzebne konta i role. |
| Integracje | Jakie systemy szkoła już posiada i czy udostępniają potrzebne możliwości techniczne. |
| Materiały | Zakres migracji, obróbki, podpisów oraz potwierdzenie praw do wykorzystania. |
| Odbiór | Scenariusze, urządzenia, przeglądarki i zakres testów dostępności. |
| Utrzymanie | Właściciel aktualizacji, kopie zapasowe, wsparcie i szkolenie redakcji. |

Wycena powinna odnosić się do wybranego zakresu, danych i integracji. Obecne demonstracje pokazują interakcje oraz pomagają wybrać funkcje; nie zastępują ustaleń wdrożeniowych.
