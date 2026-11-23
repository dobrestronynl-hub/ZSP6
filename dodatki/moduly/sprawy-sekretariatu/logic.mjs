export const TOPICS = Object.freeze({
  kandydat: {
    label: 'Rekrutacja i wybór szkoły',
    title: 'Zacznij od zasad rekrutacji',
    description: 'Oficjalna strona rekrutacji jest punktem wyjścia do sprawdzenia zasad i terminów. Przewodnik pomaga przygotować konkretne pytanie do szkoły.',
    steps: [
      'Sprawdź opis interesującego Cię kierunku oraz aktualne informacje na stronie rekrutacji.',
      'Zanotuj, którego kierunku i roku naboru dotyczy Twoje pytanie.',
      'Jeżeli coś pozostaje niejasne, potwierdź szczegóły bezpośrednio w szkole.'
    ],
    links: [{ label: 'Oficjalna rekrutacja ZSP6', url: 'https://zsp6tom.pl/?page_id=2537', type: 'Strona szkoły' }],
    question: 'Pytam o kierunek … i nabór na rok … . Chcę wyjaśnić … .'
  },
  zaswiadczenie: {
    label: 'Zaświadczenie lub inny dokument',
    title: 'Ustal właściwy dokument i sposób odbioru',
    description: 'Rodzaj dokumentu i sposób jego otrzymania należy potwierdzić w sekretariacie. Moduł porządkuje przygotowanie do rozmowy, bez ustalania procedur za szkołę.',
    steps: [
      'Określ nazwę dokumentu lub sprawę, w której potrzebujesz potwierdzenia ze szkoły.',
      'Zapytaj sekretariat, jakie informacje i dokumenty są potrzebne oraz jak je bezpiecznie przekazać.',
      'Uzgodnij sposób złożenia prośby, termin przygotowania i odbiór dokumentu.'
    ],
    links: [{ label: 'Kontakt do ZSP6', url: 'https://zsp6tom.pl/?page_id=318', type: 'Strona szkoły' }],
    question: 'Potrzebuję dokumentu dotyczącego … . Jak złożyć prośbę i ustalić odbiór?'
  },
  swiadectwo: {
    label: 'Duplikat świadectwa',
    title: 'Sprawdź oficjalne podanie o duplikat świadectwa',
    description: 'Szkoła udostępnia formularz podania. Przed złożeniem warto potwierdzić jego aktualność oraz sposób załatwienia sprawy.',
    steps: [
      'Otwórz podanie opublikowane przez szkołę i przeczytaj jego treść.',
      'Potwierdź z sekretariatem aktualny sposób złożenia podania i ewentualne dodatkowe wymagania.',
      'Uzgodnij sposób oraz termin odbioru. Danych z podania nie wpisuj do tej demonstracji.'
    ],
    links: [{ label: 'Podanie o wydanie duplikatu świadectwa', url: 'https://zsp6tom.pl/wp-content/uploads/2023/01/Podanie-o-wydanie-duplikatu-swiadectwa.pdf', type: 'PDF' }],
    question: 'Chcę złożyć podanie o duplikat świadectwa. Czy opublikowany formularz jest aktualny i jak go dostarczyć?'
  },
  legitymacja: {
    label: 'Duplikat legitymacji',
    title: 'Sprawdź podanie i aktualną procedurę',
    description: 'Na stronie szkoły znajduje się odnośnik do podania o duplikat legitymacji. Sekretariat potwierdzi aktualne wymagania i właściwą postać dokumentu.',
    steps: [
      'Otwórz podanie udostępnione przez szkołę.',
      'Zapytaj sekretariat o aktualne wymagania dotyczące duplikatu oraz sposób przekazania podania.',
      'Potwierdź termin i sposób odbioru. Ten przewodnik nie przyjmuje dokumentów ani załączników.'
    ],
    links: [{ label: 'Podanie o wydanie duplikatu legitymacji', url: 'https://zsp6tom.pl/wp-content/uploads/2023/09/Podanie-o-wydanie-duplikatu-legitymacji.doc', type: 'DOC' }],
    question: 'Potrzebuję duplikatu legitymacji. Jakie są aktualne wymagania i jak przekazać podanie?'
  },
  wspolpraca: {
    label: 'Propozycja współpracy ze szkołą',
    title: 'Przygotuj zwięzły opis propozycji',
    description: 'Krótki opis celu i odbiorców ułatwia skierowanie propozycji do właściwej osoby w szkole.',
    steps: [
      'Opisz temat współpracy i to, co proponujesz szkole.',
      'Określ grupę odbiorców, proponowany termin i zakres zaangażowania.',
      'Skontaktuj się ze szkołą, aby ustalić właściwą osobę do dalszej rozmowy.'
    ],
    links: [{ label: 'Kontakt do ZSP6', url: 'https://zsp6tom.pl/?page_id=318', type: 'Strona szkoły' }],
    question: 'Proponuję współpracę dotyczącą … dla … w terminie … . Z kim mogę omówić szczegóły?'
  }
});

export function getTopic(id) {
  return typeof id === 'string' && Object.hasOwn(TOPICS, id) ? TOPICS[id] : null;
}

export function instructionText(id) {
  const topic = getTopic(id);
  if (!topic) throw new RangeError('Nieznany temat sprawy.');
  return [
    'ZSP6 | Przewodnik po sprawach sekretariatu',
    'DEMONSTRACJA. Instrukcja nie jest zgłoszeniem ani potwierdzeniem przyjęcia sprawy.',
    'Stan odnośników: 23.11.2026. Aktualną procedurę potwierdza szkoła.',
    '', topic.label, topic.title, '', topic.description, '',
    ...topic.steps.map((step, index) => `${index + 1}. ${step}`),
    '', 'Przykład pytania do szkoły:', topic.question,
    '', 'Przydatne odnośniki:', ...topic.links.map(link => `${link.label} (${link.type})\n${link.url}`),
    '', 'Kontakt do szkoły:', '44 723 77 19', 'zsp6tomaszow@wp.pl', 'https://zsp6tom.pl/?page_id=318',
    '', 'Pobrany plik jest lokalną instrukcją. Niczego nie wysłano do szkoły.'
  ].join('\n');
}
