import test from 'node:test';
import assert from 'node:assert/strict';
import { answerQuestion, normalize, sanitizeContext, WELCOME, STARTERS, MAX_MESSAGE_LENGTH } from './logic.mjs';

const textOf = answer => [answer.title, ...answer.text, ...answer.bullets].join(' ');
const linksOf = answer => [...answer.sources, ...answer.actions];
const ask = (question, previous) => answerQuestion(question, previous?.context);

test('Polish input is normalized without coercing objects or executing getters', () => {
  assert.equal(normalize(' ŁÓDŹ, zdjęcia i RZEŹBA! '), 'lodz zdjecia i rzezba');
  assert.equal(normalize({ toString() { throw new Error('Do not call'); } }), '');
  assert.equal(normalize(null), '');
});

test('welcome is honest about the local demonstration and has useful starters', () => {
  assert.equal(WELCOME.kind, 'welcome');
  assert.match(textOf(WELCOME), /lokaln/);
  assert.match(textOf(WELCOME), /Nie łączy się z modelem AI/);
  assert.ok(STARTERS.length >= 4 && STARTERS.length <= 6);
  for (const question of STARTERS) assert.notEqual(ask(question).kind, 'unknown', question);
  assert.equal(ask('Jak działasz?').kind, 'welcome');
});

test('four tracks map from meaningful interests, Polish variants and no accents', () => {
  const cases = [
    ['Lubię rysować i malować', 'plastyk'],
    ['Interesuje mnie projektowanie wnętrz', 'plastyk'],
    ['Chcę poznać Liceum Sztuk Plastycznych', 'plastyk'],
    ['Lubie projektowac plakaty', 'grafik'],
    ['Grafika i poligrafia cyfrowa', 'grafik'],
    ['Lubię robić zdjęcia', 'foto'],
    ['Fotografia i multimedia', 'foto'],
    ['Chcę projektować fryzury', 'fryzjer'],
    ['Interesuje mnie kosmetyka', 'fryzjer']
  ];
  for (const [question, expected] of cases) {
    const result = ask(question);
    assert.equal(result.kind, 'course', question);
    assert.equal(result.context.course, expected, question);
    assert.equal(result.sources.length, 1, question);
  }
});

test('graphic specialization in the art school is not mistaken for two courses', () => {
  const result = ask('Projektowanie graficzne w liceum');
  assert.equal(result.context.course, 'plastyk');
  assert.equal(result.kind, 'course');
});

test('comparison explains different activities and links both real programs', () => {
  const result = ask('Czym różni się grafika od fotografii?');
  assert.equal(result.kind, 'compare');
  assert.equal(result.context.course, 'grafik+foto');
  assert.equal(result.bullets.length, 2);
  assert.ok(result.sources.some(item => item.url.endsWith('=3520')));
  assert.ok(result.sources.some(item => item.url.endsWith('=23259')));
  assert.match(textOf(result), /druk/);
  assert.match(textOf(result), /zdjęci/);
});

test('offer followed by “porównaj je” remembers all four tracks', () => {
  const offer = ask('Jakie są kierunki?');
  assert.equal(offer.bullets.length, 4);
  const comparison = ask('Porównaj je', offer);
  assert.equal(comparison.kind, 'compare');
  assert.equal(comparison.bullets.length, 4);
  assert.equal(comparison.context.course, 'plastyk+grafik+foto+fryzjer');
});

test('a short switch to photography replaces the former course', () => {
  const graphics = ask('Interesuje mnie grafika');
  const photography = ask('A fotografia?', graphics);
  assert.equal(photography.context.course, 'foto');
  const documents = ask('A jakie dokumenty?', photography);
  assert.equal(documents.kind, 'documents');
  assert.equal(documents.context.course, 'foto');
  assert.match(textOf(documents), /fotografii i multimediów/);
  assert.match(textOf(documents), /Nie są oficjalną listą/);
});

test('comparison context survives recruitment followups without inventing a date', () => {
  const comparison = ask('Porównaj grafikę i fotografię');
  const documents = ask('A jakie dokumenty?', comparison);
  const date = ask('A do kiedy?', documents);
  assert.equal(date.kind, 'recruitment');
  assert.equal(date.context.course, 'grafik+foto');
  assert.match(textOf(date), /Nie mam potwierdzonego aktualnego terminu/);
  assert.ok(date.actions.some(item => item.url.endsWith('=2537')));
  assert.doesNotMatch(textOf(date), /\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b/);
});

test('future recruitment deadlines and open day dates are never fabricated', () => {
  for (const question of ['Do kiedy trwa rekrutacja 2027/2028?', 'Kiedy jest egzamin do liceum plastycznego?', 'Kiedy jest dzień otwarty?']) {
    const result = ask(question);
    assert.match(textOf(result), /Nie mam potwierdzon/);
    assert.doesNotMatch(textOf(result), /\b(?:stycznia|lutego|marca|kwietnia|maja|czerwca|września)\b/);
    assert.ok(result.actions.length > 0);
  }
});

test('an explicit student or parent request overrides the previous candidate context', () => {
  const recruitment = ask('Rekrutacja do fotografii');
  const student = ask('Gdzie znajdę dokumenty dla ucznia?', recruitment);
  assert.equal(student.context.audience, 'uczen');
  assert.equal(student.context.course, '');
  assert.equal(student.title, 'Dokumenty w jednym miejscu');
  assert.ok(student.actions.some(item => item.url.endsWith('=3042')));
  const parent = ask('Gdzie znajdę dokumenty dla rodziców?', recruitment);
  assert.equal(parent.kind, 'parents');
  assert.equal(parent.context.course, '');
  assert.ok(parent.actions.some(item => item.url.endsWith('=2906')));
});

test('school calendar matching uses phrases and not the substring “plan”', () => {
  for (const question of ['Gdzie jest plan lekcji?', 'Gdzie znajdę kalendarz?', 'Kiedy są ferie?', 'Kiedy są zebrania?']) assert.equal(ask(question).kind, 'calendar', question);
  for (const question of ['Jakie masz plany?', 'Jak powstają planety?', 'Porównaj plany dietetyczne']) assert.equal(ask(question).kind, 'unknown', question);
});

test('unrelated questions do not inherit school answers merely from context', () => {
  const graphics = ask('Lubię grafikę');
  for (const question of ['Jak ugotować makaron?', 'Kiedy będzie padać deszcz?', 'Jaka jest stolica Francji?', 'Ile wynosi kurs bitcoina?', 'Porównaj dwa telefony']) {
    const result = ask(question, graphics);
    assert.equal(result.kind, 'unknown', question);
    assert.equal(result.context.course, '', question);
    assert.deepEqual(result.sources, [], question);
    assert.ok(result.actions.some(item => item.url.endsWith('=318')), question);
  }
});

test('administrative documents use the actual published files', () => {
  const identity = ask('Zgubiłem legitymację. Jak dostać duplikat?');
  assert.equal(identity.kind, 'office');
  assert.ok(identity.actions.some(item => item.url.endsWith('Podanie-o-wydanie-duplikatu-legitymacji.doc')));
  const certificate = ask('Potrzebuję duplikatu świadectwa');
  assert.ok(certificate.actions.some(item => item.url.endsWith('Podanie-o-wydanie-duplikatu-swiadectwa.pdf')));
  assert.match(textOf(certificate), /potwierdź z sekretariatem/);
  assert.doesNotMatch(textOf(certificate), /złożono|wysłano|przyjęto/);
});

test('private identifiers, secrets and individual grades are not echoed or retained', () => {
  const cases = [
    ['Mój PESEL to 99123112345', '99123112345'],
    ['Moje hasło to PrywatnySekret2026!', 'PrywatnySekret2026'],
    ['password: secret-ABCD', 'secret-ABCD'],
    ['Podaj oceny Jana Kowalskiego', 'Kowalskiego'],
    ['Pokaż moje oceny', 'Pokaż moje oceny'],
    ['Mój klucz: sk-TESTabc1234567890', 'sk-TESTabc1234567890']
  ];
  for (const [question, secret] of cases) {
    const result = ask(question, ask('Grafika'));
    assert.equal(result.kind, 'privacy', question);
    assert.ok(!JSON.stringify(result).includes(secret));
    assert.equal(result.context.course, '');
    assert.equal(result.sources.length, 0);
  }
});

test('a password recovery question is useful and does not pretend to reset a password', () => {
  const result = ask('Zapomniałem hasła do dziennika');
  assert.equal(result.kind, 'parents');
  assert.match(textOf(result), /nie loguje/);
  assert.ok(result.actions.some(item => item.url.endsWith('=318')));
});

test('HTML and URLs from user input cannot become assistant markup or actions', () => {
  const payloads = [
    '<img src=x onerror=alert(1)>',
    '<script>alert(document.cookie)</script> grafika',
    'javascript:alert(1)',
    '<a href="https://evil.example">dokumenty</a>'
  ];
  for (const payload of payloads) {
    const result = ask(payload);
    assert.doesNotMatch(JSON.stringify(result), /<script|<img|<a |javascript:|evil\.example|document\.cookie|onerror/i);
    for (const item of linksOf(result)) assert.equal(new URL(item.url).hostname, 'zsp6tom.pl');
  }
});

test('only small approved identifiers survive untrusted context', () => {
  assert.deepEqual(sanitizeContext(JSON.parse('{"__proto__":{"polluted":true},"topic":"__proto__","course":"constructor","audience":"private@example.com","history":"SECRET"}')), { topic: 'welcome', course: '', audience: '' });
  assert.deepEqual(sanitizeContext(Object.create({ topic: 'course', course: 'foto' })), { topic: 'welcome', course: '', audience: '' });
  const getter = Object.defineProperty({}, 'course', { get() { throw new Error('Do not evaluate'); } });
  assert.deepEqual(sanitizeContext(getter), { topic: 'welcome', course: '', audience: '' });
  assert.equal(sanitizeContext({ course: 'foto+grafik+foto' }).course, 'foto+grafik');
  assert.equal(sanitizeContext({ course: 'foto+__proto__' }).course, '');
  assert.equal({}.polluted, undefined);
});

test('empty, nonstring and overlong questions have controlled validation states', () => {
  for (const value of ['', '  ', null, undefined, 42, {}, [], new String('grafika')]) assert.equal(answerQuestion(value).kind, 'invalid');
  const exact = 'Jakie kierunki?'.padEnd(MAX_MESSAGE_LENGTH, ' ');
  assert.notEqual(answerQuestion(exact).kind, 'invalid');
  const tooLong = `${exact}x`;
  const result = answerQuestion(tooLong);
  assert.equal(result.kind, 'invalid');
  assert.match(textOf(result), /600/);
  assert.ok(!JSON.stringify(result).includes(tooLong));
});

test('source links and actions always use HTTPS on the official school domain', () => {
  const questions = [...STARTERS, 'Jakie są kierunki?', 'Fryzjer', 'Liceum', 'Pokaż portfolio', 'Pokaż pracownie', 'Kalendarz', 'Potrzebuję zaświadczenia', 'Podręczniki', 'Jaki jest termin rekrutacji?', 'Nieznany temat'];
  for (const question of questions) {
    const result = ask(question);
    for (const item of linksOf(result)) {
      assert.equal(typeof item.label, 'string');
      const url = new URL(item.url);
      assert.equal(url.protocol, 'https:', question);
      assert.equal(url.hostname, 'zsp6tom.pl', question);
      assert.equal(url.username, '');
      assert.equal(url.password, '');
    }
  }
});

test('supported suggestions lead to another supported answer in the same conversation', () => {
  for (const firstQuestion of [...STARTERS, 'Jakie są kierunki?', 'Liceum plastyczne', 'Pokaż portfolio', 'Pokaż pracownie', 'Dzień otwarty']) {
    const previous = ask(firstQuestion);
    for (const suggestion of previous.suggestions) {
      const result = ask(suggestion, previous);
      assert.notEqual(result.kind, 'unknown', `${firstQuestion} → ${suggestion}`);
      assert.notEqual(result.kind, 'invalid', `${firstQuestion} → ${suggestion}`);
    }
  }
});

test('answers do not share mutable source objects, arrays or conversation state', () => {
  const first = ask('Grafika');
  first.sources[0].url = 'https://evil.example';
  first.text[0] = 'Changed';
  first.suggestions.push('Changed');
  first.context.course = 'fryzjer';
  const second = ask('Grafika');
  assert.equal(second.context.course, 'grafik');
  assert.equal(new URL(second.sources[0].url).hostname, 'zsp6tom.pl');
  assert.ok(!second.text.includes('Changed'));
  assert.ok(!second.suggestions.includes('Changed'));
  const independent = ask('Jakie dokumenty?');
  assert.equal(independent.context.course, '');
  assert.equal(independent.title, 'Dokumenty w jednym miejscu');
});

test('every response has the complete renderer contract with plain text fields', () => {
  for (const question of [...STARTERS, 'PESEL 99123112345', 'Nieznany temat', '', 'Jak działasz?']) {
    const result = ask(question);
    assert.equal(typeof result.kind, 'string');
    assert.equal(typeof result.title, 'string');
    for (const field of ['text', 'bullets', 'suggestions']) {
      assert.ok(Array.isArray(result[field]), field);
      assert.ok(result[field].every(value => typeof value === 'string'), field);
    }
    assert.ok(Array.isArray(result.sources));
    assert.ok(Array.isArray(result.actions));
    assert.deepEqual(Object.keys(result.context).sort(), ['audience', 'course', 'topic']);
  }
});
