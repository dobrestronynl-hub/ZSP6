import { TOPICS, getTopic, instructionText } from './logic.mjs';

const select = document.querySelector('#office-topic');
const result = document.querySelector('#office-result');
const status = document.querySelector('#office-status');
const download = document.querySelector('#download-instructions');
let current = 'kandydat';
const make = (tag, text, attributes = {}) => {
  const element = document.createElement(tag);
  if (text !== undefined) element.textContent = text;
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  return element;
};

function render(id, announce = true) {
  const topic = getTopic(id);
  if (!topic) return;
  current = id; select.value = id;
  const title = make('h3', topic.title, { id: 'office-result-title' });
  const summary = make('p', topic.description);
  const steps = make('ol', undefined, { class: 'office-steps' });
  topic.steps.forEach(step => steps.append(make('li', step)));
  const links = make('ul', undefined, { class: 'office-links' });
  topic.links.forEach(link => {
    const item = make('li');
    item.append(make('a', `${link.label} (${link.type})`, { href: link.url, target: '_blank', rel: 'noopener noreferrer' }));
    links.append(item);
  });
  const question = make('div', undefined, { class: 'question-example' });
  question.append(make('h4', 'Przykład pytania do szkoły'), make('p', topic.question));
  result.replaceChildren(title, summary, steps, make('h4', 'Dokument lub informacja źródłowa'), links, question);
  if (announce) status.textContent = `Wybrano temat: ${topic.label}. Wskazówki są gotowe.`;
}

select.addEventListener('change', () => render(select.value));
download.addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob(['\ufeff' + instructionText(current)], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = `ZSP6-instrukcja-${current}-DEMO.txt`;
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  status.textContent = 'Przygotowano plik instrukcji. Nie wysłano zgłoszenia do szkoły.';
});

render(current, false);
document.querySelector('#office-controls').hidden = false;
