import { LIMITS, EXAMPLE, normalizeDraft, isReady, draftText } from './logic.mjs';

const title = document.querySelector('#article-title');
const category = document.querySelector('#article-category');
const body = document.querySelector('#article-body');
const download = document.querySelector('#download-draft');
const status = document.querySelector('#editor-status');

function getDraft() {
  return normalizeDraft({ title: title.value, category: category.value, body: body.value });
}

function draw() {
  const draft = getDraft();
  if (title.value !== draft.title) title.value = draft.title;
  if (body.value !== draft.body) body.value = draft.body;
  // User text is always textContent. HTML typed into the editor remains literal text.
  document.querySelector('#preview-title').textContent = draft.title.trim() || 'Tutaj pojawi się tytuł';
  document.querySelector('#preview-category').textContent = draft.category;
  document.querySelector('#preview-body').textContent = draft.body.trim() || 'Tutaj pojawi się treść aktualności.';
  document.querySelector('#title-count').textContent = `${Array.from(draft.title).length} / ${LIMITS.title} znaków`;
  document.querySelector('#body-count').textContent = `${Array.from(draft.body).length} / ${LIMITS.body} znaków`;
  download.disabled = !isReady(draft);
  document.querySelector('#export-hint').textContent = download.disabled ? 'Uzupełnij tytuł i treść, aby pobrać szkic.' : 'Gotowy szkic można pobrać jako zwykły plik tekstowy.';
}

function applyDraft(draft) {
  title.value = draft.title; category.value = draft.category; body.value = draft.body;
  draw();
}

for (const control of [title, category, body]) control.addEventListener('input', () => {
  draw(); status.textContent = '';
});
category.addEventListener('change', draw);
document.querySelector('#editor-form').addEventListener('submit', event => event.preventDefault());
document.querySelector('#reset-example').addEventListener('click', () => {
  applyDraft(EXAMPLE);
  status.textContent = 'Przywrócono przykładowy szkic. Wpisane wcześniej zmiany zastąpiono przykładem.';
  title.focus();
});
download.addEventListener('click', () => {
  const draft = getDraft();
  if (!isReady(draft)) { draw(); return; }
  const url = URL.createObjectURL(new Blob(['\ufeff' + draftText(draft)], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url; link.download = 'ZSP6-szkic-aktualnosci-DEMO.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  status.textContent = 'Przygotowano plik szkicu. Aktualność nie została opublikowana ani wysłana.';
});

document.querySelector('#editor-workspace').hidden = false;
applyDraft(EXAMPLE);
