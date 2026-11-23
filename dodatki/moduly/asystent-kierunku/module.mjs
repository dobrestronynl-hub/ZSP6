import { recommend } from './logic.mjs';

const interest = document.querySelector('#interest');
const next = document.querySelector('#next-step');
const result = document.querySelector('#result');
const status = document.querySelector('#match-status');

function showResult() {
  if (!interest.reportValidity()) { status.textContent = 'Wybierz obszar zainteresowań, aby zobaczyć propozycję.'; return; }
  const course = recommend(interest.value, next.value);
  if (!course) return;
  document.querySelector('#result-school').textContent = course.school;
  document.querySelector('#result-title').textContent = course.title;
  document.querySelector('#result-description').textContent = course.description;
  document.querySelector('#result-why').textContent = course.why;
  const link = document.querySelector('#result-link');
  link.href = course.actionUrl; link.textContent = course.action;
  result.hidden = false;
  status.textContent = `Propozycja: ${course.title}. Możesz teraz przeczytać uzasadnienie i otworzyć oficjalne informacje.`;
}

document.querySelector('#match').addEventListener('click', showResult);
[interest, next].forEach(field => field.addEventListener('change', () => {
  if (!result.hidden) { result.hidden = true; status.textContent = 'Zmieniono odpowiedź. Kliknij „Pokaż kierunek”, aby odświeżyć propozycję.'; }
}));
document.querySelector('#reset').addEventListener('click', () => {
  interest.value = ''; next.value = 'oferta'; result.hidden = true;
  status.textContent = 'Odpowiedzi wyczyszczone. Możesz sprawdzić kolejny obszar.';
  interest.focus();
});
