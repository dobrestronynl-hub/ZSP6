import { PROFILES, STORAGE_KEY, cleanState, progressFor, checklistText } from './logic.mjs';

let state = cleanState(null), storageAvailable = true;
try { state = cleanState(JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')); }
catch { storageAvailable = false; }
const profile = document.querySelector('#profile');
const list = document.querySelector('#task-list');
const status = document.querySelector('#checklist-status');
profile.value = state.active;

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); storageAvailable = true; }
  catch { storageAvailable = false; }
}
function drawProgress() {
  const { checked, total, percent } = progressFor(state, state.active);
  const progress = document.querySelector('#progress');
  progress.max = total; progress.value = checked;
  document.querySelector('#progress-count').textContent = `Sprawdzone: ${checked} z ${total} (${percent}%)`;
  document.querySelector('#storage-note').textContent = storageAvailable
    ? 'Zaznaczenia zapisują się tylko w tej przeglądarce. Nie trafiają do szkoły. Obie ścieżki mają osobny postęp.'
    : 'Trwały zapis jest niedostępny lub zapisane dane były nieczytelne. Zaznaczenia działają teraz w pamięci strony; mogą zniknąć po odświeżeniu.';
}
function drawList() {
  const data = PROFILES[state.active];
  document.querySelector('#current-path').textContent = data.title;
  list.replaceChildren();
  for (const task of data.tasks) {
    const item = document.createElement('li'), label = document.createElement('label');
    label.className = 'task-label';
    const check = document.createElement('input');
    check.type = 'checkbox'; check.value = task.id; check.id = `task-${task.id}`;
    check.checked = state.steps[state.active].includes(task.id);
    const title = document.createElement('span'); title.textContent = task.label;
    label.append(check, title);
    const details = document.createElement('p'); details.textContent = task.detail;
    const link = document.createElement('a'); link.textContent = task.link; link.href = task.url; link.target = '_blank'; link.rel = 'noopener noreferrer';
    item.append(label, details, link); list.append(item);
    check.addEventListener('change', () => {
      state.steps[state.active] = [...list.querySelectorAll('input:checked')].map(input => input.value);
      persist(); drawProgress();
      status.textContent = check.checked ? `Zaznaczono: ${task.label}.` : `Cofnięto zaznaczenie: ${task.label}.`;
    });
  }
  drawProgress();
}
profile.addEventListener('change', () => {
  state.active = profile.value; persist(); drawList();
  status.textContent = `Wyświetlono osobną listę: ${PROFILES[state.active].title}.`;
});
document.querySelector('#reset').addEventListener('click', () => {
  state.steps[state.active] = []; persist(); drawList();
  status.textContent = `Wyczyszczono zaznaczenia w ścieżce: ${PROFILES[state.active].title}. Druga lista zachowała swój postęp.`;
});
document.querySelector('#download').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob(['\ufeff' + checklistText(state, state.active)], { type: 'text/plain;charset=utf-8' }));
  const a = document.createElement('a'); a.href = url; a.download = `ZSP6-checklista-${state.active}.txt`;
  document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000);
  status.textContent = 'Przygotowano plik TXT z bieżącą listą. Nie wysłano zgłoszenia do szkoły.';
});
drawList();
