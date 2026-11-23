export const STORAGE_KEY = 'zsp6:standalone:recruitment-checklist:v1';
export const PROFILES = Object.freeze({
  liceum: { title: 'Liceum Sztuk Plastycznych', tasks: [
    { id: 'oferta', label: 'Poznałem ofertę liceum i specjalizacje', detail: 'Przeczytaj opis kształcenia plastycznego i zastanów się nad swoim zainteresowaniem projektowaniem.', url: 'https://zsp6tom.pl/?page_id=3467', link: 'Oferta liceum' },
    { id: 'zasady', label: 'Przeczytałem aktualne zasady przyjęcia', detail: 'Sprawdź aktualny komunikat szkoły. Ta lista nie zastępuje regulaminu rekrutacji.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Zasady rekrutacji' },
    { id: 'dokumenty', label: 'Sprawdziłem wymagane dokumenty i terminy', detail: 'Ustal, jakie dokumenty i w jakim terminie należy przekazać. Terminy należy odczytać w oficjalnym źródle.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Dokumenty i terminy' },
    { id: 'egzamin', label: 'Sprawdziłem zasady egzaminu plastycznego', detail: 'Poznaj zakres i organizację egzaminu oraz wskazówki dla kandydatów publikowane przez szkołę.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Informacje dla kandydatów' },
    { id: 'zgloszenie', label: 'Sprawdziłem sposób zgłoszenia i potwierdzenia', detail: 'Przejdź do oficjalnych informacji. Zaznaczenie tej pozycji nie składa zgłoszenia i nie potwierdza przyjęcia.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Oficjalna rekrutacja' }
  ] },
  technikum: { title: 'Technikum nr 5', tasks: [
    { id: 'oferta', label: 'Porównałem kierunki technikum', detail: 'Sprawdź program fotografii, grafiki i poligrafii lub usług fryzjerskich w ofercie szkoły.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Oferta i rekrutacja' },
    { id: 'zasady', label: 'Przeczytałem aktualne zasady przyjęcia', detail: 'Poznaj sposób postępowania opisany w oficjalnych materiałach szkoły.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Zasady rekrutacji' },
    { id: 'dokumenty', label: 'Sprawdziłem wymagane dokumenty i terminy', detail: 'Ustal listę dokumentów, harmonogram oraz ewentualne wymagania dotyczące wybranego zawodu.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Dokumenty i terminy' },
    { id: 'zgloszenie', label: 'Sprawdziłem sposób zgłoszenia i potwierdzenia', detail: 'Zgłoszenie trzeba wykonać zgodnie z oficjalną procedurą. Ta lista służy tylko organizacji przygotowań.', url: 'https://zsp6tom.pl/?page_id=2537', link: 'Oficjalna rekrutacja' }
  ] }
});

export function cleanState(raw) {
  const state = { active: 'liceum', steps: { liceum: [], technikum: [] } };
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return state;
  if (Object.hasOwn(PROFILES, raw.active)) state.active = raw.active;
  for (const profile of Object.keys(PROFILES)) {
    const values = raw.steps?.[profile];
    if (!Array.isArray(values)) continue;
    const valid = new Set(PROFILES[profile].tasks.map(task => task.id));
    state.steps[profile] = [...new Set(values.filter(id => typeof id === 'string' && valid.has(id)))];
  }
  return state;
}

export function progressFor(raw, profile) {
  const state = cleanState(raw);
  if (!Object.hasOwn(PROFILES, profile)) throw new RangeError('Nieznana ścieżka rekrutacji');
  const total = PROFILES[profile].tasks.length;
  const checked = state.steps[profile].length;
  return { checked, total, percent: Math.round(checked / total * 100) };
}

export function checklistText(raw, profile) {
  if (!Object.hasOwn(PROFILES, profile)) throw new RangeError('Nieznana ścieżka rekrutacji');
  const state = cleanState(raw), data = PROFILES[profile];
  return ['ZSP6 | Moja checklista rekrutacji', data.title, '',
    'Lokalna lista pomocnicza. Nie jest zgłoszeniem ani potwierdzeniem przyjęcia.', '',
    ...data.tasks.flatMap(task => [`${state.steps[profile].includes(task.id) ? '[x]' : '[ ]'} ${task.label}`, `    ${task.url}`]),
    '', 'Aktualne zasady, dokumenty i terminy: https://zsp6tom.pl/?page_id=2537',
    'Zaznaczenia wyrażają wyłącznie to, co użytkownik uznał za sprawdzone.', ''].join('\n');
}
