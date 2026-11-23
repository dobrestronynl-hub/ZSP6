import {works,filterWorks,moveIndex} from './logic.mjs';
const grid=document.querySelector('#portfolio-grid');
const status=document.querySelector('#portfolio-status');
const filters=[...document.querySelectorAll('[data-category-filter]')];
const dialog=document.querySelector('#artwork-dialog');
const photo=document.querySelector('#artwork-photo');
const caption=document.querySelector('#artwork-caption');
const position=document.querySelector('#artwork-position');
const original=document.querySelector('#artwork-original');
const source=document.querySelector('#artwork-source');
const error=document.querySelector('#artwork-error');
const close=document.querySelector('#artwork-close');
const previous=document.querySelector('#artwork-previous');
const next=document.querySelector('#artwork-next');
let selected=works;
let index=0;
let opener=null;

function filter(category) {
  selected=filterWorks(category);
  const ids=new Set(selected.map(item=>item.id));
  grid.querySelectorAll('[data-artwork]').forEach(item=>{item.hidden=!ids.has(item.dataset.artwork);});
  filters.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.categoryFilter===category)));
  status.textContent=`Wyświetlane prace: ${selected.length} z ${works.length}.`;
}
function renderPhoto() {
  const work=selected[index];
  error.hidden=true;photo.hidden=false;photo.src=work.src;photo.alt=work.alt;photo.width=work.width;photo.height=work.height;
  caption.textContent=work.title;position.textContent=`Praca ${index+1} z ${selected.length}`;
  original.href=work.src;source.href=work.source;
  previous.disabled=next.disabled=selected.length<2;
}
function move(step) {index=moveIndex(index,step,selected.length);if(index>=0)renderPhoto();}
filters.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.categoryFilter)));
grid.addEventListener('click',event=>{
  const link=event.target.closest('[data-open-artwork]');
  if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();opener=link;index=selected.findIndex(item=>item.id===link.dataset.openArtwork);
  if(index<0)return;renderPhoto();dialog.showModal();document.body.classList.add('artwork-open');close.focus();
});
photo.addEventListener('error',()=>{photo.hidden=true;error.hidden=false;});
photo.addEventListener('load',()=>{photo.hidden=false;error.hidden=true;});
previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
close.addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}
  if(event.key==='ArrowRight'){event.preventDefault();move(1);}
});
dialog.addEventListener('click',event=>{
  if(event.target!==dialog)return;
  const rect=dialog.getBoundingClientRect();
  if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
});
dialog.addEventListener('close',()=>{document.body.classList.remove('artwork-open');opener?.focus();});
filter('all');
