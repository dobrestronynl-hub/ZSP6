export const LIMITS = Object.freeze({ title: 110, body: 1500 });
export const CATEGORIES = Object.freeze(['Życie szkoły', 'Projekty', 'Rekrutacja']);
export const EXAMPLE = Object.freeze({
  title: 'Przykładowe warsztaty w pracowni',
  category: 'Życie szkoły',
  body: 'To treść demonstracyjna do sprawdzenia wyglądu aktualności. Zmień tytuł, kategorię i opis, a obok zobaczysz podgląd.\n\nTen wpis nie jest ogłoszeniem szkoły i nie zostanie opublikowany.'
});

export function clipText(value, limit) {
  const text = typeof value === 'string' ? value.replace(/\r\n?/g, '\n') : '';
  return Array.from(text).slice(0, limit).join('');
}

export function normalizeDraft(draft = {}) {
  return {
    title: clipText(draft?.title, LIMITS.title),
    category: CATEGORIES.includes(draft?.category) ? draft.category : CATEGORIES[0],
    body: clipText(draft?.body, LIMITS.body)
  };
}

export function isReady(draft) {
  const clean = normalizeDraft(draft);
  return Boolean(clean.title.trim() && clean.body.trim());
}

export function draftText(draft) {
  const clean = normalizeDraft(draft);
  if (!isReady(clean)) throw new RangeError('Uzupełnij tytuł oraz treść szkicu.');
  return [
    'ZSP6 | Nieopublikowany szkic aktualności',
    'DEMONSTRACJA. Ten plik nie oznacza publikacji ani wysłania wpisu do szkoły.',
    '', clean.title.trim(), `Kategoria: ${clean.category}`, '', clean.body.trim(),
    '', 'Szkic został pobrany lokalnie z demonstracji edytora.',
    'Publikacja wymaga docelowego systemu CMS i uprawnień redakcji.'
  ].join('\n');
}
