import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeDraft, isReady, draftText, LIMITS } from './logic.mjs';

test('pusty szkic oraz same białe znaki nie są gotowe do eksportu', () => {
  for (const draft of [{}, { title: '   ', body: 'Opis' }, { title: 'Tytuł', body: '\n\t' }]) {
    assert.equal(isReady(draft), false);
    assert.throws(() => draftText(draft), RangeError);
  }
});
test('eksport zawiera polski tekst, akapity i oznaczenie nieopublikowanego szkicu', () => {
  const text = draftText({ title: 'Łódź i Tomaszów', category: 'Projekty', body: 'Pierwszy akapit.\r\n\r\nDrugi akapit.' });
  assert.match(text, /Łódź i Tomaszów/);
  assert.match(text, /Kategoria: Projekty/);
  assert.match(text, /Pierwszy akapit\.\n\nDrugi akapit\./);
  assert.match(text, /DEMONSTRACJA/);
  assert.match(text, /nie oznacza publikacji/);
});
test('limit Unicode nie przecina emoji i jest stosowany przed eksportem', () => {
  const draft = normalizeDraft({ title: '🎨'.repeat(120), body: 'ą'.repeat(1800), category: 'Nieznana' });
  assert.equal(Array.from(draft.title).length, LIMITS.title);
  assert.equal(Array.from(draft.body).length, LIMITS.body);
  assert.equal(draft.title, '🎨'.repeat(110));
  assert.equal(draft.category, 'Życie szkoły');
});
test('kod HTML pozostaje zwykłym tekstem szkicu', () => {
  const input = '<img src=x onerror=alert(1)><script>console.log(1)</script>';
  const draft = normalizeDraft({ title: '<strong>Tytuł</strong>', category: 'Rekrutacja', body: input });
  assert.equal(draft.body, input);
  assert.ok(draftText(draft).includes(input));
});
test('nieprawidłowe typy nie są zamieniane w nieprzewidzianą treść', () => {
  assert.deepEqual(normalizeDraft(null), { title: '', category: 'Życie szkoły', body: '' });
  assert.deepEqual(normalizeDraft({ title: { toString: () => 'zła treść' }, body: 42, category: '__proto__' }), { title: '', category: 'Życie szkoły', body: '' });
});
