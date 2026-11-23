import assert from 'node:assert/strict';
import { COURSES, recommend } from './logic.mjs';

assert.equal(Object.keys(COURSES).length, 4);
for (const [id, course] of Object.entries(COURSES)) {
  const program = recommend(id, 'oferta');
  assert.equal(program.title, course.title);
  assert.equal(program.actionUrl, course.url);
  const recruitment = recommend(id, 'rekrutacja');
  assert.equal(recruitment.title, course.title);
  assert.equal(recruitment.actionUrl, 'https://zsp6tom.pl/?page_id=2537');
}
for (const invalid of ['', 'unknown', '__proto__', 'constructor', null, {}, 1]) assert.equal(recommend(invalid), null);
assert.equal(recommend('foto', 'https://invalid.example').actionUrl, 'https://zsp6tom.pl/?page_id=23259');
const mutated = recommend('plastyk'); mutated.title = 'Changed outside';
assert.equal(recommend('plastyk').title, 'Liceum Sztuk Plastycznych');
console.log('PASS: four courses and both next steps; invalid/inherited keys rejected; links remain official; results do not mutate catalogue.');
