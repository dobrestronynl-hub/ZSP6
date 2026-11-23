import {storageKey,sanitizePreferences,visibleLinks,togglePin} from './logic.mjs';
const role=document.querySelector('#panel-role');
const list=document.querySelector('#panel-links');
const status=document.querySelector('#panel-status');
const storageNote=document.querySelector('#panel-storage');
const reset=document.querySelector('#panel-reset');
let saved={role:'uczen',pins:[]};
let storageWorks=true;
try {
  const raw=localStorage.getItem(storageKey);
  if(raw){try{saved=sanitizePreferences(JSON.parse(raw));}catch{localStorage.removeItem(storageKey);}}
} catch {storageWorks=false;}
role.value=saved.role;

function save(){try{localStorage.setItem(storageKey,JSON.stringify(saved));storageWorks=true;}catch{storageWorks=false;}}
function node(tag,text,className){const e=document.createElement(tag);if(text)e.textContent=text;if(className)e.className=className;return e;}
function render(focusId){
  const visible=visibleLinks(saved.role,saved.pins);
  list.replaceChildren();
  visible.forEach(item=>{
    const li=node('li');li.dataset.shortcut=item.id;
    const text=node('div');const link=node('a',item.title);link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';
    text.append(link,node('p',item.description));
    const pin=node('button',saved.pins.includes(item.id)?'Odepnij':'Przypnij','button button-secondary');
    pin.type='button';pin.setAttribute('aria-pressed',String(saved.pins.includes(item.id)));
    pin.setAttribute('aria-label',`${saved.pins.includes(item.id)?'Odepnij':'Przypnij'}: ${item.title}`);
    pin.dataset.pin=item.id;
    li.append(text,pin);list.append(li);
  });
  const count=visible.filter(item=>saved.pins.includes(item.id)).length;
  status.textContent=`Przypięte w tym widoku: ${count}. Łącznie zapisane: ${saved.pins.length}.`;
  storageNote.textContent=storageWorks?'Ustawienia zapisują się wyłącznie w tej przeglądarce. Na współdzielonym urządzeniu użyj „Wyczyść ustawienia”, aby usunąć wybór roli i przypięcia.':'Przeglądarka nie pozwala zapisać ustawień. Wybór działa do odświeżenia lub zamknięcia strony.';
  reset.disabled=!saved.pins.length&&saved.role==='uczen';
  if(focusId)list.querySelector(`[data-pin="${focusId}"]`)?.focus();
}
list.addEventListener('click',event=>{
  const button=event.target.closest('[data-pin]');if(!button)return;
  saved.pins=togglePin(saved.pins,button.dataset.pin);save();render(button.dataset.pin);
});
role.addEventListener('change',()=>{saved.role=role.value;save();render();});
reset.addEventListener('click',()=>{
  saved={role:'uczen',pins:[]};role.value='uczen';
  try{localStorage.removeItem(storageKey);storageWorks=true;}catch{storageWorks=false;}
  render();status.textContent='Ustawienia wyczyszczone. Widok ucznia, bez przypiętych odnośników.';role.focus();
});
window.addEventListener('storage',event=>{
  if(event.key!==storageKey)return;
  try{saved=sanitizePreferences(JSON.parse(event.newValue));}catch{saved={role:'uczen',pins:[]};}
  role.value=saved.role;render();
});
render();
