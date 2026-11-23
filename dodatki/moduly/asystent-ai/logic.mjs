// Local, deterministic demonstration. No model/API call, storage or user data collection.
// Official source pages were checked on 23 November 2026. Dates remain in their source.
export const MAX_MESSAGE_LENGTH = 600;

const source = (label, id) => Object.freeze({ label, url: `https://zsp6tom.pl/?page_id=${id}` });
const SOURCES = Object.freeze({
  school: Object.freeze({ label: 'Oficjalna strona ZSP6', url: 'https://zsp6tom.pl/' }),
  recruitment: source('Rekrutacja ZSP6', 2537),
  contact: source('Kontakt do szkoły', 318),
  students: source('Informacje i dokumenty dla uczniów', 3042),
  parents: source('Informacje dla rodziców', 2906),
  plastyk: source('Oferta Liceum Sztuk Plastycznych', 3467),
  grafik: source('Grafika i poligrafia cyfrowa', 3520),
  foto: source('Fotografia i multimedia', 23259),
  fryzjer: source('Usługi fryzjerskie', 23255),
  certificate: Object.freeze({ label: 'Podanie o duplikat świadectwa · PDF', url: 'https://zsp6tom.pl/wp-content/uploads/2023/01/Podanie-o-wydanie-duplikatu-swiadectwa.pdf' }),
  identity: Object.freeze({ label: 'Podanie o duplikat legitymacji · DOC', url: 'https://zsp6tom.pl/wp-content/uploads/2023/09/Podanie-o-wydanie-duplikatu-legitymacji.doc' })
});

const COURSES = Object.freeze({
  plastyk: Object.freeze({
    name: 'Liceum Sztuk Plastycznych',
    description: 'Rysunek, malarstwo, rzeźba i podstawy projektowania tworzą warsztat artystyczny. W ofercie liceum są specjalizacje: projektowanie przestrzeni oraz projektowanie graficzne.',
    distinction: 'Liceum: warsztat plastyczny, projektowanie graficzne lub projektowanie przestrzeni.',
    interest: 'Jeżeli lubisz rysować, malować lub projektować wnętrza i przestrzeń, zacznij od oferty liceum.',
    practice: 'W opisie liceum znajdziesz zajęcia z rysunku, malarstwa, rzeźby oraz projektowania. To dobry punkt wyjścia do poznania warsztatu uczniów.'
  }),
  grafik: Object.freeze({
    name: 'Technik grafiki i poligrafii cyfrowej',
    description: 'Ten kierunek łączy projektowanie grafiki z przygotowaniem publikacji i drukiem cyfrowym. Pozwala poznać drogę od projektu plakatu, ulotki czy opakowania do gotowego materiału.',
    distinction: 'Grafika i poligrafia: projekt graficzny, publikacje oraz przygotowanie i wykonanie druku.',
    interest: 'Jeżeli interesują Cię plakaty, publikacje i skład materiałów do druku, przyjrzyj się tej ścieżce.',
    practice: 'Szkoła opisuje zajęcia zawodowe w pracowniach komputerowych. W programie grafiki są przygotowanie publikacji cyfrowych oraz druk i obróbka druków.'
  }),
  foto: Object.freeze({
    name: 'Technik fotografii i multimediów',
    description: 'Ten kierunek obejmuje rejestrację, obróbkę i publikację obrazu oraz projekty multimedialne. Szkoła opisuje zajęcia w studiu fotograficznym, atelier i pracowniach komputerowych.',
    distinction: 'Fotografia i multimedia: powstawanie zdjęcia, obróbka obrazu i projekty multimedialne.',
    interest: 'Jeżeli lubisz robić zdjęcia i pracować z obrazem, zacznij od programu fotografii i multimediów.',
    practice: 'Na stronie kierunku szkoła przedstawia studio fotograficzne, atelier oraz pracownie komputerowe. Pokazuje też materiały z zajęć i przykłady prac.'
  }),
  fryzjer: Object.freeze({
    name: 'Technik usług fryzjerskich',
    description: 'Szkoła przedstawia ten kierunek jako usługi fryzjerskie o profilu kosmetycznym. Łączy wykonywanie i projektowanie fryzur z zajęciami kosmetycznymi.',
    distinction: 'Usługi fryzjerskie: projektowanie i wykonywanie fryzur, uzupełnione zajęciami kosmetycznymi.',
    interest: 'Jeżeli interesuje Cię fryzjerstwo, stylizacja i kosmetyka, sprawdź zakres tego kierunku.',
    practice: 'Opis kierunku obejmuje praktyczne zajęcia fryzjerskie i kosmetyczne w pracowniach zawodowych. Materiały szkoły pokazują przykłady takiej pracy.'
  })
});

const COURSE_KEYS = Object.freeze(Object.keys(COURSES));
const TOPICS = new Set(['welcome', 'offer', 'course', 'compare', 'recruitment', 'documents', 'calendar', 'contact', 'office', 'parents', 'portfolio', 'workshops', 'privacy', 'unknown', 'invalid']);
const AUDIENCES = new Set(['', 'kandydat', 'uczen', 'rodzic']);

export const STARTERS = Object.freeze([
  'Czym różni się grafika od fotografii?',
  'Jak zacząć rekrutację?',
  'Gdzie znajdę dokumenty dla rodziców?',
  'Jak wyrobić duplikat legitymacji?',
  'Pokaż pracownie i prace uczniów',
  'Jak skontaktować się ze szkołą?'
]);

/** Normalization only aids matching. Original questions are never used in replies. */
export function normalize(value) {
  if (typeof value !== 'string') return '';
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}

function ownValue(value, key) {
  // Read data properties only; an inherited key or getter is not conversation context.
  const descriptor = Object.getOwnPropertyDescriptor(value, key);
  return descriptor && Object.hasOwn(descriptor, 'value') ? descriptor.value : undefined;
}

/** Only fixed vocabulary survives. A course comparison is stored as e.g. grafik+foto. */
export function sanitizeContext(value) {
  const result = { topic: 'welcome', course: '', audience: '' };
  if (!value || typeof value !== 'object' || Array.isArray(value)) return result;
  const topic = ownValue(value, 'topic');
  const course = ownValue(value, 'course');
  const audience = ownValue(value, 'audience');
  if (typeof topic === 'string' && TOPICS.has(topic)) result.topic = topic;
  if (typeof audience === 'string' && AUDIENCES.has(audience)) result.audience = audience;
  if (typeof course === 'string' && course.length < 40) {
    const keys = course.split('+');
    if (keys.length <= 4 && keys.every(key => COURSE_KEYS.includes(key))) result.course = [...new Set(keys)].join('+');
  }
  return result;
}

function reply(kind, title, text, options = {}) {
  return {
    kind, title, text: [...text], bullets: [...(options.bullets || [])],
    sources: (options.sources || []).map(item => ({ ...item })),
    actions: (options.actions || []).map(item => ({ ...item })),
    suggestions: [...(options.suggestions || [])],
    context: sanitizeContext({ topic: options.topic || kind, course: options.course || '', audience: options.audience || '' })
  };
}

function welcome() {
  return reply('welcome', 'W czym mogę pomóc?', [
    'Poznaj kierunki ZSP6, znajdź dokument lub sprawdź rekrutację. Wybierz pytanie albo napisz własne.',
    'To lokalna demonstracja. Nie łączy się z modelem AI.'
  ], { suggestions: STARTERS });
}

export const WELCOME = Object.freeze({ ...welcome(), text: Object.freeze(welcome().text), bullets: Object.freeze([]), sources: Object.freeze([]), actions: Object.freeze([]), suggestions: STARTERS, context: Object.freeze(sanitizeContext({})) });

const matches = (value, expression) => expression.test(value);
const rememberedCourses = context => context.course ? context.course.split('+') : [];
const courseSources = keys => keys.map(key => SOURCES[key]);

function findCourses(text) {
  const found = [];
  if (matches(text, /\b(?:liceum|licealn[a-z]*|lsp|plastyk[a-z]*|plastyczn[a-z]*|rysun[a-z]*|rysowa[a-z]*|malar[a-z]*|malowa[a-z]*|rzezb[a-z]*|wnetrz[a-z]*|przestrzen[a-z]*)\b/)) found.push('plastyk');
  if (matches(text, /\b(?:grafik[a-z]*|graficzn[a-z]*|poligraf[a-z]*|druk[a-z]*|plakat[a-z]*|ulotk[a-z]*|opakowan[a-z]*|sklad publikacji)\b/)) found.push('grafik');
  if (matches(text, /\b(?:fotograf[a-z]*|foto|multimedi[a-z]*|aparat[a-z]*)\b|\b(?:robic|robie|robienie) zdjec[a-z]*\b/)) found.push('foto');
  if (matches(text, /\b(?:fryz[a-z]*|kosmet[a-z]*|stylizacj[a-z]*|wlos[a-z]*|beauty)\b/)) found.push('fryzjer');
  // "projektowanie graficzne w liceum" is one specific school path.
  if (found.includes('plastyk') && found.includes('grafik') && /\b(?:w liceum|liceum plastyczne|liceum sztuk plastycznych)\b/.test(text) && !/\b(?:porown[a-z]*|roznic[a-z]*|czy|kontra|versus|vs)\b/.test(text)) return found.filter(key => key !== 'grafik');
  return found;
}

function privateData(text, original) {
  const number = /(?:^|\D)\d{11}(?:\D|$)/.test(original) || /\bpesel\b/.test(text);
  const secret = /\b(?:moje haslo|haslo to|moj password|moj token|klucz api to)\b/.test(text) || /\b(?:hasło|haslo|password|token|api[_ -]?key)\s*[:=]\s*\S+/i.test(original) || /\bsk-[A-Za-z0-9_-]{12,}\b/.test(original);
  const studentRecord = /\b(?:oceny|ocenach|frekwencj[a-z]*|nieobecnosc[a-z]*)\b/.test(text) && /\b(?:pokaz|podaj|odczytaj|sprawdz|moje|moich|kolegi|kolezanki|ucznia|uczennicy|ma|mial|corki|syna)\b/.test(text) && !/\b(?:licza|rekrutacj[a-z]*|punkty|punktow)\b/.test(text);
  return number || secret || studentRecord;
}

function courseReply(key, audience = '') {
  const course = COURSES[key];
  return reply('course', course.name, [course.description, course.interest], {
    sources: [SOURCES[key]], actions: [{ ...SOURCES[key], label: 'Poznaj program kierunku' }],
    suggestions: key === 'plastyk' ? ['Jak wygląda rekrutacja do liceum?', 'Pokaż prace uczniów', 'Jakie są pracownie?'] : ['Jakie dokumenty do rekrutacji?', 'Jakie są pracownie?', 'Porównaj grafikę i fotografię'],
    course: key, audience: audience || 'kandydat'
  });
}

function comparison(keys, audience) {
  const selected = keys.length >= 2 ? [...new Set(keys)] : ['grafik', 'foto'];
  return reply('compare', selected.length === 2 && selected.includes('grafik') && selected.includes('foto') ? 'Grafika czy fotografia?' : 'Porównaj sposób pracy na kierunkach', [
    'Warto zacząć od tego, co najbardziej lubisz tworzyć. Poniżej zestawienie zakresu kształcenia na podstawie opisów szkoły.'
  ], {
    bullets: selected.map(key => COURSES[key].distinction), sources: courseSources(selected),
    actions: selected.map(key => ({ ...SOURCES[key], label: COURSES[key].name })),
    suggestions: ['Jakie dokumenty do rekrutacji?', 'Pokaż prace uczniów', 'A jakie pracownie?'],
    course: selected.join('+'), audience: audience || 'kandydat'
  });
}

function recruitment(keys, audience, documents = false, deadline = false, exam = false) {
  const one = keys.length === 1 ? keys[0] : '';
  const title = deadline ? 'Aktualny termin sprawdź w źródle' : documents ? 'Dokumenty do rekrutacji' : one ? `Rekrutacja: ${COURSES[one].name}` : 'Od czego zacząć rekrutację?';
  const text = deadline ? [
    'Nie mam potwierdzonego aktualnego terminu dla Twojego naboru. Ta demonstracja nie aktualizuje się automatycznie, dlatego nie podaje dat z pamięci.',
    'Otwórz oficjalną stronę rekrutacji i sprawdź rok szkolny, kierunek oraz etap naboru. Jeśli komunikat dotyczy innego roku, potwierdź właściwy termin w szkole.'
  ] : documents ? [
    one ? `Pytasz o dokumenty dla ścieżki: ${COURSES[one].name}. Wymaganą listę oraz sposób przekazania dokumentów trzeba sprawdzić w komunikacie dotyczącym właściwego naboru.` : 'Wymagana lista dokumentów zależy od szkoły, kierunku i etapu naboru. Oficjalny komunikat rekrutacyjny powinien być punktem odniesienia.',
    'Poniższe punkty pomogą sprawdzić komplet informacji. Nie są oficjalną listą wymaganych załączników.'
  ] : [
    one ? `Masz już wybraną ścieżkę: ${COURSES[one].name}. Następnym krokiem jest sprawdzenie aktualnych zasad przyjęcia na stronie szkoły.` : 'Najpierw wybierz liceum plastyczne lub kierunek technikum, a potem sprawdź komunikat rekrutacyjny dla właściwego roku szkolnego.',
    'Na stronie rekrutacji szkoła publikuje odnośnik do systemu naboru. Zgłoszenie składa się zgodnie z podaną tam procedurą.'
  ];
  const bullets = deadline ? [] : documents ? [
    'Sprawdź nazwę i aktualną wersję formularza zgłoszenia.',
    'Sprawdź, jakie załączniki są wymagane na danym etapie oraz w jakiej postaci je przekazać.',
    'Sprawdź termin złożenia i sposób potwierdzenia przyjęcia dokumentów.'
  ] : ['Poznaj program wybranego kierunku.', 'Sprawdź zasady, dokumenty i harmonogram właściwego naboru.', 'Wykonaj zgłoszenie w sposób wskazany przez szkołę.'];
  const sources = [SOURCES.recruitment];
  if ((one === 'plastyk' || exam) && !deadline) {
    text.push('Opis Liceum Sztuk Plastycznych wskazuje egzamin praktyczny i ustny z predyspozycji plastycznych. Jego organizację i wymagania sprawdź w aktualnych informacjach szkoły.');
    sources.push(SOURCES.plastyk);
  }
  return reply(documents ? 'documents' : 'recruitment', title, text, {
    bullets, sources, actions: [{ ...SOURCES.recruitment, label: 'Otwórz oficjalną rekrutację' }, ...(deadline ? [SOURCES.contact] : [])],
    suggestions: deadline ? ['Jak skontaktować się ze szkołą?', 'Jakie dokumenty do rekrutacji?'] : ['Jaki jest termin naboru?', 'Jak skontaktować się ze szkołą?'],
    course: keys.join('+'), audience: audience || 'kandydat'
  });
}

function documentsReply(audience) {
  return reply('documents', 'Dokumenty w jednym miejscu', [
    'W dziale dla uczniów szkoła publikuje m.in. podania o duplikaty legitymacji i świadectwa. W dziale dla rodziców są statuty, wykazy podręczników i informacje organizacyjne.',
    'Wybierz temat, a wskażę właściwy dokument lub stronę.'
  ], { sources: [SOURCES.students, SOURCES.parents], actions: [SOURCES.students, SOURCES.parents], suggestions: ['Potrzebuję duplikatu legitymacji', 'Potrzebuję duplikatu świadectwa', 'Gdzie są podręczniki?'], audience });
}

function officeReply(type, audience) {
  const certificate = type === 'certificate';
  const identity = type === 'identity';
  const document = certificate ? SOURCES.certificate : identity ? SOURCES.identity : null;
  return reply('office', certificate ? 'Duplikat świadectwa' : identity ? 'Duplikat legitymacji' : 'Zaświadczenie z sekretariatu', [
    document ? 'Szkoła udostępnia podanie dotyczące tej sprawy. Otwórz je, a następnie potwierdź z sekretariatem aktualny sposób złożenia oraz odbioru dokumentu.' : 'Ustal z sekretariatem, jaki dokument jest potrzebny, jak złożyć prośbę i kiedy można go odebrać.',
    'Ten czat nie przyjmuje podań ani danych osobowych. Mogę skierować Cię do opublikowanej instrukcji lub kontaktu.'
  ], { sources: document ? [SOURCES.students, document] : [SOURCES.contact], actions: [...(document ? [document] : []), SOURCES.contact], suggestions: ['Jak skontaktować się ze szkołą?', 'Gdzie znajdę inne dokumenty?'], audience: audience || 'uczen' });
}

export function answerQuestion(message, rawContext = {}) {
  const context = sanitizeContext(rawContext);
  if (typeof message !== 'string' || !message.trim()) return reply('invalid', 'Napisz, czego szukasz', ['Wpisz krótkie pytanie lub skorzystaj z jednego z podpowiedzianych tematów.'], { suggestions: STARTERS });
  if (message.length > MAX_MESSAGE_LENGTH) return reply('invalid', 'Skróć pytanie', [`Jedna wiadomość może mieć maksymalnie ${MAX_MESSAGE_LENGTH} znaków. Podziel pytanie na dwa krótsze.`], { course: context.course, audience: context.audience });
  const text = normalize(message);
  if (privateData(text, message)) return reply('privacy', 'Dane osobowe zostaw poza czatem', [
    'Nie podawaj tu haseł, numeru PESEL ani prywatnych danych uczniów. Nie mam dostępu do ocen, frekwencji ani kont w dzienniku.',
    'Sprawy dotyczące konkretnej osoby załatwiaj przez oficjalny kanał szkoły. Możesz zapytać mnie ogólnie o procedurę lub właściwy kontakt.'
  ], { actions: [SOURCES.contact], suggestions: ['Jak skontaktować się ze szkołą?', 'Jak wyrobić duplikat legitymacji?'] });

  if (/\b(?:jak dzialasz|czy jestes ai|prawdziw[a-z]* ai|model ai|chatbot|sztuczna inteligencja|co potrafisz|kim jestes)\b/.test(text)) return reply('welcome', 'Jak działa ten pokaz?', [
    'Odpowiedzi w tej demonstracji pochodzą z przygotowanej lokalnej bazy. Rozpoznaję obsługiwane tematy i zapamiętuję wybrany temat lub kierunek w ramach otwartej rozmowy.',
    'Nie korzystam z modelu AI ani z połączenia z sekretariatem. Wersja produkcyjna może odpowiadać na podstawie zatwierdzonych treści szkoły po podłączeniu modelu i serwera.'
  ], { suggestions: STARTERS });

  const explicit = findCourses(text);
  const remembered = rememberedCourses(context);
  const keys = explicit.length ? explicit : remembered;
  const explicitStudent = /\b(?:dla uczniow|dla ucznia|jestem uczniem|jestem uczennica)\b/.test(text);
  const audience = /\b(?:rodzic[a-z]*|mama|tata|opiekun[a-z]*)\b/.test(text) ? 'rodzic' : explicitStudent ? 'uczen' : context.audience;
  const recruitmentIntent = /\b(?:rekrutacj[a-z]*|nabor[a-z]*|zapisac|zapisy|kandydat[a-z]*|przyjec[a-z]*|dostac sie|zgloszeni[a-z]*)\b/.test(text);
  const documentIntent = /\b(?:dokument[a-z]*|formularz[a-z]*|zalacznik[a-z]*|podani[a-z]*)\b/.test(text);
  const deadline = /\b(?:termin[a-z]*|do kiedy|kiedy|data|daty|harmonogram[a-z]*)\b/.test(text);

  // Handle concrete administrative requests before a word such as "fotografia" in an attachment.
  if (/\b(?:duplikat[a-z]*|zgub[a-z]*|strac[a-z]*|now[a-z]*|wyrob[a-z]*)\b/.test(text) && /\blegitymacj[a-z]*\b/.test(text)) return officeReply('identity', audience);
  if (/\blegitymacj[a-z]*\b/.test(text) && !recruitmentIntent) return officeReply('identity', audience);
  if (/\b(?:swiadectw[a-z]*)\b/.test(text) && /\b(?:duplikat[a-z]*|zgub[a-z]*|odpis[a-z]*)\b/.test(text)) return officeReply('certificate', audience);
  if (/\bzaswiadczeni[a-z]*\b/.test(text) && !recruitmentIntent) return officeReply('certificate-other', audience);

  if (/\b(?:dni otwarte|dzien otwarty|otwartych drzwi)\b/.test(text)) return reply('calendar', 'Dni otwarte: sprawdź aktualne ogłoszenie', [
    'Nie mam potwierdzonej daty najbliższego dnia otwartego. W demonstracji nie prowadzę zapisów ani nie rezerwuję miejsc.',
    'Sprawdź najnowsze ogłoszenia szkoły. Jeżeli chcesz zaplanować wizytę, potwierdź termin bezpośrednio w ZSP6.'
  ], { actions: [SOURCES.school, SOURCES.contact], suggestions: ['Pokaż pracownie', 'Jak skontaktować się ze szkołą?'], audience });

  if (/\b(?:kalendarz[a-z]*|ferie|wakacje|wydarzeni[a-z]*|zebran[a-z]*|konsultacj[a-z]*|plan lekcji|plan zajec|planu lekcji|planu zajec|godziny lekcji|przerw[a-z]*)\b/.test(text) && !recruitmentIntent) return reply('calendar', 'Kalendarz i organizacja szkoły', [
    'Kalendarz roku szkolnego znajduje się w informacjach dla uczniów i rodziców. Terminy zebrań oraz konsultacji szkoła publikuje w dziale dla rodziców.',
    'Sprawdź rok szkolny podany przy zestawieniu. Nie mam dostępu do bieżących zastępstw ani planu konkretnej klasy.'
  ], { sources: [SOURCES.students, SOURCES.parents], actions: [SOURCES.students, SOURCES.parents], suggestions: ['A kiedy są dni otwarte?', 'Jak skontaktować się ze szkołą?'], audience });

  const shortDateFollowup = /^(?:(?:a|i) )?(?:kiedy|do kiedy|jaki jest termin|jakie sa terminy|termin|a termin)$/.test(text);
  const examDate = /\begzamin[a-z]*\b/.test(text) && (explicit.length || /\b(?:plastyczn[a-z]*|wstepn[a-z]*)\b/.test(text));
  if (deadline && (recruitmentIntent || examDate || (documentIntent && keys.length && !explicitStudent) || (shortDateFollowup && (keys.length || context.topic === 'recruitment')))) return recruitment(keys, audience, false, true);

  if (/\b(?:podrecznik[a-z]*|statut[a-z]*|standardy ochrony|dla rodzicow|rada rodzicow)\b/.test(text) && !recruitmentIntent) return reply('parents', 'Informacje dla rodziców', [
    'Dział dla rodziców zbiera szkolne wykazy podręczników, statuty, kalendarz oraz terminy spotkań. Przy podręcznikach sprawdź rok szkolny, klasę i typ szkoły.'
  ], { sources: [SOURCES.parents], actions: [SOURCES.parents], suggestions: ['Gdzie znajdę kalendarz?', 'Jak skontaktować się ze szkołą?'], audience: 'rodzic' });

  if (documentIntent) {
    if (explicitStudent && !recruitmentIntent) return documentsReply('uczen');
    if (recruitmentIntent || keys.length || ['recruitment', 'course', 'compare'].includes(context.topic)) return recruitment(keys, audience, true);
    return documentsReply(audience);
  }

  if (/\b(?:pracown[a-z]*|zajecia praktyczne|zajec zawodowych|sprzet[a-z]*|studio fotograficzne)\b/.test(text)) {
    const selected = keys.length ? keys : COURSE_KEYS;
    return reply('workshops', 'Zobacz, jak wygląda nauka w praktyce', ['Opis każdego kierunku prowadzi do innych działań i narzędzi. Zacznij od interesującej Cię dziedziny.'], {
      bullets: selected.map(key => COURSES[key].practice), sources: courseSources(selected),
      actions: selected.map(key => ({ ...SOURCES[key], label: COURSES[key].name })),
      suggestions: ['Pokaż prace uczniów', 'Jakie dokumenty do rekrutacji?'], course: selected.join('+'), audience
    });
  }

  if (/\b(?:portfolio|galeri[a-z]*|prace uczniow|prac uczniow|realizacj[a-z]*|zdjecia szkoly|zdjecia uczniow)\b/.test(text)) {
    const selected = keys.length ? keys : ['plastyk', 'grafik', 'foto'];
    return reply('portfolio', 'Prace uczniów i szkolne realizacje', [
      'Na stronach kierunków szkoła publikuje przykłady prac i materiały z zajęć. Wybierz dziedzinę, aby zobaczyć materiał w jego oryginalnym kontekście.',
      'Jeśli pytasz o własne portfolio do rekrutacji, jego wymagania potwierdź w aktualnych zasadach. Nie zakładam, że taka teczka jest obowiązkowa.'
    ], { sources: courseSources(selected), actions: courseSources(selected), suggestions: ['A fotografia?', 'Jak wygląda rekrutacja do liceum?'], course: selected.join('+'), audience });
  }

  if (recruitmentIntent || /\b(?:egzamin plastyczny|egzamin wstepny|predyspozycj[a-z]*)\b/.test(text)) return recruitment(keys, audience, false, false, /\b(?:egzamin plastyczny|egzamin wstepny|predyspozycj[a-z]*)\b/.test(text));

  if (/\b(?:kontakt[a-z]*|skontakt[a-z]*|telefon(?:u|em)?|mail[a-z]*|email|sekretariat[a-z]*|adres|dojechac|dojazd|gdzie jest szkola|godziny otwarcia|godziny pracy)\b/.test(text)) return reply('contact', 'Skontaktuj się z ZSP6', [
    'Zespół Szkół Ponadpodstawowych nr 6, ul. Strefowa 3, 97-200 Tomaszów Mazowiecki.',
    'Sekretariat: 44 723 77 19. E-mail: zsp6tomaszow@wp.pl.',
    'Godziny obsługi i możliwość wizyty potwierdź bezpośrednio w szkole.'
  ], { sources: [SOURCES.contact], actions: [{ ...SOURCES.contact, label: 'Otwórz oficjalny kontakt' }], suggestions: ['Potrzebuję zaświadczenia', 'Jak wyrobić duplikat legitymacji?'], audience });

  if (/\b(?:e dziennik|dziennik[a-z]*|vulcan|librus|logowanie|zapomnialem hasla|zapomnialam hasla)\b/.test(text)) return reply('parents', 'Dostęp do dziennika', [
    'Ten asystent nie loguje do dziennika i nie odczytuje ocen. Właściwy adres logowania oraz pomoc z kontem potwierdź przez oficjalny kontakt szkoły.',
    'Nie wpisuj hasła do czatu. Publiczne materiały dla rodziców możesz otworzyć bezpośrednio poniżej.'
  ], { actions: [SOURCES.contact, SOURCES.parents], suggestions: ['Jak skontaktować się ze szkołą?', 'Gdzie znajdę dokumenty?'], audience: audience || 'rodzic' });

  const comparisonIntent = /\b(?:porown[a-z]*|roznic[a-z]*|rozni[a-z]*|kontra|versus|vs|co wybrac|ktory lepszy)\b/.test(text);
  const comparisonFollowup = /^(?:a )?(?:porownaj(?: je| te kierunki| kierunki| te szkoly)?|jakie sa roznice|czym sie roznia|co wybrac)$/.test(text);
  if (/\bliceum\b/.test(text) && /\btechnikum\b/.test(text) && (comparisonIntent || /\bczy\b/.test(text))) return comparison(COURSE_KEYS, audience);
  if ((comparisonIntent && explicit.length) || (comparisonFollowup && (remembered.length || context.topic === 'offer')) || explicit.length > 1) {
    let selected = explicit;
    if (selected.length === 1 && remembered.length === 1 && remembered[0] !== selected[0]) selected = [remembered[0], ...selected];
    if (selected.length < 2 && context.topic === 'offer') selected = COURSE_KEYS;
    if (selected.length < 2 && remembered.length > 1) selected = remembered;
    return comparison(selected, audience);
  }

  if (explicit.length === 1) return courseReply(explicit[0], audience);

  if (/\b(?:kierunk[a-z]*|oferta[a-z]*|technikum|jakie szkoly|czego moge sie uczyc|co moge studiowac|wybor szkoly)\b/.test(text)) return reply('course', 'Cztery ścieżki w ZSP6', [
    'Zespół łączy Liceum Sztuk Plastycznych i Technikum nr 5 im. Stanisława Wyspiańskiego. Oferta obejmuje cztery główne ścieżki.'
  ], { bullets: COURSE_KEYS.map(key => COURSES[key].distinction), sources: [SOURCES.recruitment, SOURCES.contact], actions: courseSources(COURSE_KEYS), suggestions: ['Porównaj grafikę i fotografię', 'Lubię rysować', 'Jak zacząć rekrutację?'], topic: 'offer', audience: audience || 'kandydat' });

  if (/^(?:czesc|dzien dobry|hej|witaj|witam|halo|hello|hi|pomoc)$/.test(text)) return welcome();
  if (/^(?:dzieki|dziekuje|dziekuje bardzo|super|ok|dobrze)$/.test(text)) return reply('welcome', 'Możemy przejść do kolejnego tematu', ['Wybierz pytanie lub napisz, czego jeszcze szukasz.'], { suggestions: STARTERS, course: context.course, audience });

  return reply('unknown', 'Doprecyzujmy pytanie', [
    'Nie znajduję wiarygodnej odpowiedzi w lokalnej bazie tej demonstracji. Mogę pomóc z kierunkami, rekrutacją, dokumentami, pracowniami i kontaktem.',
    'Spróbuj wskazać jeden z tych tematów. Jeśli pytanie dotyczy indywidualnej sprawy, najlepiej skontaktować się ze szkołą.'
  ], { actions: [SOURCES.contact], suggestions: ['Jakie są kierunki?', 'Jakie dokumenty do rekrutacji?', 'Jak skontaktować się ze szkołą?'], audience });
}
