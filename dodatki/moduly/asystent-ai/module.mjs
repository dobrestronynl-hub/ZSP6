import { answerQuestion, WELCOME, STARTERS, MAX_MESSAGE_LENGTH } from './logic.mjs';

const byId = id => document.getElementById(id);
const log = byId('chat-log');
const form = byId('chat-form');
const field = byId('question');
const error = byId('question-error');
const status = byId('chat-status');
const chat = byId('chat-panel');
const chatSlot = byId('conversation-slot');
const layout = byId('conversation-layout');
const sitePreview = byId('site-preview');
const dock = byId('widget-dock');
const closeWidget = byId('close-widget');
const launcher = byId('widget-launcher');
const conversationView = byId('conversation-view');
const websiteView = byId('website-view');
const resetButton = byId('reset-chat');
const saveButton = byId('save-chat');
const MAX_TURNS = 30;
let context = {};
let turns = [];
let view = 'conversation';

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function trustedLink(item, className = '') {
  let url;
  try { url = new URL(item.url); } catch { return null; }
  if (url.protocol !== 'https:' || url.hostname !== 'zsp6tom.pl' || url.username || url.password) return null;
  const link = element('a', className, item.label);
  link.href = url.href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-label', `${item.label} (oficjalna strona szkoły, nowa karta)`);
  return link;
}

function questionButton(question, questionContext) {
  const button = element('button', 'suggestion-button', question);
  button.type = 'button';
  button.addEventListener('click', () => ask(question, questionContext));
  return button;
}

function renderAnswer(answer, initial = false) {
  const article = element('article', 'message assistant-message');
  article.setAttribute('aria-label', 'Odpowiedź asystenta ZSP6');
  article.dataset.kind = answer.kind;
  article.append(element('p', 'speaker', 'Asystent ZSP6'));
  if (answer.title) article.append(element('h4', '', answer.title));
  for (const text of answer.text || []) article.append(element('p', '', text));
  if (answer.bullets?.length) {
    const list = element('ul');
    answer.bullets.forEach(text => list.append(element('li', '', text)));
    article.append(list);
  }
  if (answer.sources?.length) {
    const sources = element('div', 'message-sources');
    sources.append(element('p', 'sources-label', 'Źródła · zsp6tom.pl'));
    answer.sources.forEach(source => {
      const link = trustedLink(source);
      if (link) sources.append(link);
    });
    article.append(sources);
  }
  if (answer.actions?.length) {
    const actions = element('div', 'answer-actions');
    answer.actions.forEach(action => {
      const link = trustedLink(action);
      if (link) actions.append(link);
    });
    article.append(actions);
  }
  const questions = initial ? STARTERS.slice(0, 4) : (answer.suggestions || []).slice(0, 3);
  if (questions.length) {
    const suggestions = element('div', initial ? 'starters' : 'suggestions');
    suggestions.setAttribute('role', 'group');
    suggestions.setAttribute('aria-label', initial ? 'Przykładowe pytania do asystenta' : 'Możesz dopytać');
    questions.forEach(question => suggestions.append(questionButton(question, answer.context)));
    article.append(suggestions);
  }
  log.append(article);
  return article;
}

function showError(message) {
  error.textContent = message;
  error.hidden = !message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function updateCounter() {
  byId('character-count').textContent = `${field.value.length}/${MAX_MESSAGE_LENGTH}`;
}

function ask(question, questionContext = context) {
  if (turns.length >= MAX_TURNS) {
    showError('Ta rozmowa ma już 30 pytań. Zapisz ją lub rozpocznij nową rozmowę.');
    return;
  }
  const answer = answerQuestion(question, questionContext);
  if (answer.kind === 'invalid') {
    showError(answer.text?.[0] || 'Wpisz pytanie, używając najwyżej 600 znaków.');
    field.focus({ preventScroll: true });
    return;
  }
  const questionText = answer.kind === 'privacy'
    ? 'Wiadomość zawierająca prywatne dane została pominięta.'
    : String(question).trim();
  const userMessage = element('article', 'message user-message');
  userMessage.setAttribute('aria-label', 'Twoje pytanie');
  userMessage.append(element('p', 'speaker', 'Ty'), element('p', '', questionText));
  log.append(userMessage);
  renderAnswer(answer);
  context = { ...answer.context };
  turns.push({ question: questionText, answer });
  field.value = '';
  updateCounter();
  showError('');
  saveButton.disabled = false;
  log.scrollTop += userMessage.getBoundingClientRect().top - log.getBoundingClientRect().top - 16;
  field.focus({ preventScroll: true });
}

function resetChat() {
  context = {};
  turns = [];
  field.value = '';
  log.replaceChildren();
  renderAnswer(WELCOME, true);
  log.scrollTop = 0;
  saveButton.disabled = true;
  showError('');
  updateCounter();
  status.textContent = 'Rozmowa została wyczyszczona. Możesz zadać nowe pytanie.';
  field.focus({ preventScroll: true });
}

function setWidgetOpen(open, focus = true) {
  chat.hidden = !open;
  launcher.setAttribute('aria-expanded', String(open));
  byId('launcher-symbol').textContent = open ? '−' : '+';
  if (focus) (open ? field : launcher).focus({ preventScroll: true });
}

function setView(next) {
  view = next;
  const website = next === 'website';
  conversationView.setAttribute('aria-pressed', String(!website));
  websiteView.setAttribute('aria-pressed', String(website));
  layout.hidden = website;
  sitePreview.hidden = !website;
  closeWidget.hidden = !website;
  (website ? dock : chatSlot).append(chat);
  chat.hidden = false;
  if (website) setWidgetOpen(true, false);
}

function saveConversation() {
  if (!turns.length) return;
  const lines = [
    'ZSP6 — rozmowa demonstracyjna z asystentem',
    'Lokalna baza odpowiedzi. Bez połączenia z modelem AI.',
    'Rozmowa nie została wysłana do szkoły.',
    `Zapisano: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}`,
    ''
  ];
  for (const { question, answer } of turns) {
    lines.push(`TY: ${question}`, '', `ASYSTENT: ${answer.title || ''}`, ...(answer.text || []));
    (answer.bullets || []).forEach(text => lines.push(`• ${text}`));
    if (answer.sources?.length) {
      lines.push('', 'Źródła:');
      answer.sources.forEach(source => lines.push(`${source.label}: ${source.url}`));
    }
    if (answer.actions?.length) {
      lines.push('', 'Przydatne odnośniki:');
      answer.actions.forEach(action => lines.push(`${action.label}: ${action.url}`));
    }
    lines.push('', '--------------------------------', '');
  }
  const blob = new Blob(['\uFEFF', lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const download = element('a');
  download.href = url;
  download.download = 'zsp6-rozmowa-demonstracyjna.txt';
  document.body.append(download);
  download.click();
  download.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Przygotowano plik tekstowy z rozmową i odnośnikami do źródeł.';
}

form.addEventListener('submit', event => {
  event.preventDefault();
  ask(field.value);
});
field.addEventListener('input', () => { updateCounter(); showError(''); });
field.addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    if (field.value.trim()) ask(field.value);
    else { showError('Wpisz pytanie lub wybierz jedną z podpowiedzi.'); }
  }
});
resetButton.addEventListener('click', resetChat);
saveButton.addEventListener('click', saveConversation);
conversationView.addEventListener('click', () => setView('conversation'));
websiteView.addEventListener('click', () => setView('website'));
closeWidget.addEventListener('click', () => setWidgetOpen(false));
launcher.addEventListener('click', () => setWidgetOpen(chat.hidden));
chat.addEventListener('keydown', event => {
  if (event.key === 'Escape' && view === 'website') {
    event.preventDefault();
    setWidgetOpen(false);
  }
});
document.querySelectorAll('[data-question]').forEach(button => {
  button.disabled = false;
  button.addEventListener('click', () => {
    setView('conversation');
    ask(button.dataset.question);
    byId('rozmowa').scrollIntoView({ behavior: 'auto', block: 'start' });
  });
});
field.maxLength = MAX_MESSAGE_LENGTH;
for (const control of [field, resetButton, conversationView, websiteView, byId('send-question')]) control.disabled = false;
log.replaceChildren();
renderAnswer(WELCOME, true);
