import test from 'node:test';
import assert from 'node:assert/strict';
import { TOPICS, getTopic, instructionText } from './logic.mjs';

test('nieznany temat oraz klucze prototypu nie otwierają ścieżki', () => {
  for (const id of ['__proto__', 'constructor', 'toString', '', null, 12]) assert.equal(getTopic(id), null);
  assert.throws(() => instructionText('__proto__'), RangeError);
});
test('instrukcja świadectwa kieruje do właściwego dokumentu, nie do legitymacji', () => {
  const text = instructionText('swiadectwo');
  assert.match(text, /Podanie-o-wydanie-duplikatu-swiadectwa\.pdf/);
  assert.doesNotMatch(text, /Podanie-o-wydanie-duplikatu-legitymacji/);
  assert.match(text, /DEMONSTRACJA/);
  assert.match(text, /Niczego nie wysłano/);
});
test('eksport zmienia się wraz z tematem i zachowuje polski tekst', () => {
  const candidate = instructionText('kandydat');
  const partnership = instructionText('wspolpraca');
  assert.match(candidate, /page_id=2537/);
  assert.match(partnership, /grupę odbiorców/);
  assert.match(partnership, /Proponuję współpracę/);
  assert.notEqual(candidate, partnership);
});
test('odsyłacze tematów prowadzą tylko do oficjalnego serwera szkoły', () => {
  for (const topic of Object.values(TOPICS)) for (const link of topic.links) {
    const url = new URL(link.url);
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'zsp6tom.pl');
  }
});
